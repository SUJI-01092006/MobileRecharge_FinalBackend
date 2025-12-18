import express from "express";
const router = express.Router();
import {
  createRecharge,
  getHistory,
  getAllHistory,
} from "../controllers/rechargeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

// User creates a recharge (must be authenticated)
router.post("/", authMiddleware, createRecharge);

// Logged-in user (or admin) can fetch their own history by userId
router.get("/history/:userId", authMiddleware, getHistory);

// Admin: fetch all users' history
router.get("/history", authMiddleware, getAllHistory);

export default router;
