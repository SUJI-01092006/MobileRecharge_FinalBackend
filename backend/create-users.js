import mongoose from "mongoose";
import User from "./src/models/UserModel.js";

const mongoUri = "mongodb+srv://SUJI_G:Suji01092006@apprecharge.3qqwytu.mongodb.net/rechargeDB?retryWrites=true&w=majority";

const createUsers = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('🧹 Cleared existing users');

    // Create admin user
    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: "admin123",
      role: "admin"
    });
    console.log('👑 Admin created:', admin.email);

    // Create regular user
    const user = await User.create({
      name: "Test User",
      email: "user@test.com", 
      password: "user123",
      role: "user"
    });
    console.log('👤 User created:', user.email);

    console.log('\n🎉 Users created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('Admin: admin@test.com / admin123');
    console.log('User:  user@test.com / user123');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

createUsers();