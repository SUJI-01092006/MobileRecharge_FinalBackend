import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  console.log('=== REGISTER ENDPOINT HIT ===');
  console.log('Request body:', req.body);
  
  try {
    const { name, email, password, userType, role } = req.body;
    console.log('Extracted fields:', { name, email, password: '***', userType, role });

    // Validation
    if (!name || !email || !password) {
      console.log('Validation failed: missing required fields');
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required"
      });
    }

    console.log('Checking for existing user with email:', email);
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists with this email');
      return res.status(400).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    console.log('Creating new user...');
    const userData = {
      name,
      email,
      password,
      role: userType || role || "user",
    };
    console.log('User data to create:', { ...userData, password: '***' });
    
    const user = await User.create(userData);
    console.log('User created successfully:', user._id);

    // Never send password hash back to the client
    const userSafe = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    console.log('Generating token...');
    const token = generateToken(user._id);
    console.log('Token generated successfully');

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: userSafe,
      role: user.role,
      token: token,
    });
  } catch (error) {
    console.error("=== REGISTER ERROR ===");
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error code:', error.code);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }
    return res.status(500).json({
      success: false,
      message: "Failed to register user: " + error.message
    });
  }
};

export const login = async (req, res) => {
  console.log('=== LOGIN ENDPOINT HIT ===');
  console.log('Request body:', req.body);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const userSafe = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(user._id);
    console.log('Login successful! Generated token:', token);

    return res.json({
      success: true,
      message: "Login successful",
      user: userSafe,
      role: user.role,
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to login, try again" });
  }
};
