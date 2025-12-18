import express from "express";
const router = express.Router();
import { getPlans, createPlan, updatePlan, deletePlan } from "../controllers/planController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

router.get("/", getPlans);
router.post("/", authMiddleware, createPlan);
router.put("/:id", authMiddleware, updatePlan);
router.delete("/:id", authMiddleware, deletePlan);

export default router;
