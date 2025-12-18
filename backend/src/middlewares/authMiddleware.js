import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  jwt.verify(token, process.env.JWT_SECRET || "secret", (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    // token payload uses { id }, so map it back
    req.userId = decoded.id;
    next();
  });
};

export default authMiddleware;
