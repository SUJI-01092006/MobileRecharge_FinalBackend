import Recharge from "../models/RechargeModel.js";
import mongoose from "mongoose";

// Create a new recharge (uses userId from auth middleware)
export const createRecharge = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (!mongoose.connection.readyState) {
      console.error('❌ MongoDB not connected, cannot save recharge');
      return res.status(500).json({
        success: false,
        message: "Database connection failed - recharge not saved",
      });
    }

    console.log('💾 Attempting to save recharge to MongoDB...');
    console.log('📊 Request data:', {
      userId: req.userId,
      phoneNumber: req.body.phoneNumber,
      operator: req.body.operator,
      amount: req.body.amount
    });

    // Prefer userId from auth middleware, fallback to explicit userId in body (safety)
    const userId = req.userId || req.body.userId || null;

    const payload = {
      userId,
      phoneNumber: req.body.phoneNumber,
      operator: req.body.operator,
      planId: req.body.planId || null,
      amount: req.body.amount,
      status: req.body.status || "SUCCESS",
      type: req.body.planDetails?.type || req.body.type || "RECHARGE",
    };

    console.log('📝 Payload to save:', payload);
    const recharge = await Recharge.create(payload);
    console.log('✅ Recharge saved successfully:', recharge._id);

    return res.status(201).json({
      success: true,
      message: "Recharge created successfully",
      recharge,
    });
  } catch (error) {
    console.error("❌ Create recharge error:", error.name, error.message);
    console.error("Full error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create recharge: " + error.message,
    });
  }
};

// Get recharge history for a specific user (by userId)
export const getHistory = async (req, res) => {
  try {
    const history = await Recharge.find({ userId: req.params.userId }).sort({
      date: -1,
    });

    return res.json({
      success: true,
      history,
    });
  } catch (error) {
    console.error("Get history error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch recharge history",
    });
  }
};

// Get all users' recharge history (admin)
export const getAllHistory = async (_req, res) => {
  try {
    const history = await Recharge.find()
      .populate("userId", "name email role")
      .sort({ date: -1 });

    return res.json({
      success: true,
      history,
    });
  } catch (error) {
    console.error("Get all history error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch all recharge history",
    });
  }
};
