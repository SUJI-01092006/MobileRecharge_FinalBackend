import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import rechargeRoutes from "./routes/rechargeRoutes.js";
import planRoutes from "./routes/planRoutes.js";

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173', 
    'https://mobilerechare-finalfrontend2.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());
app.use(express.json());

// ROOT ROUTE (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Test route without auth
app.get("/api/test", (req, res) => {
  res.json({ message: "Test route working", timestamp: new Date() });
});

// Routes
app.use("/api/auth", authRoutes);
console.log('Auth routes mounted');
app.use("/api/recharge", rechargeRoutes);
app.use("/api/plans", planRoutes);

// Global error handler (must be after all routes)
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  if (!res.headersSent) {
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
