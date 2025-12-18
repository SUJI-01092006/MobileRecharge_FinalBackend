import mongoose from "mongoose";

// Plan categories should match the tabs used on the frontend
// RECOMMENDED, TRULY UNLIMITED, SMART RECHARGE, DATA, UNLIMITED 5G
const CATEGORY_VALUES = [
  "RECOMMENDED",
  "TRULY UNLIMITED",
  "SMART RECHARGE",
  "DATA",
  "UNLIMITED 5G"
];

const planSchema = new mongoose.Schema({
  operator: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  validity: {
    type: String,
    required: true,
    trim: true
  },
  // e.g. "1.5GB/day", "3GB", etc.
  data: {
    type: String,
    trim: true
  },
  // e.g. "Unlimited calls", "100 mins", etc.
  call: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  // Category that directly maps to the 5 tabs on the Plans page
  type: {
    type: String,
    enum: CATEGORY_VALUES,
    required: true,
    uppercase: true,
    trim: true
  },
  popular: { type: Boolean, default: false }
});

const Plan = mongoose.model("Plan", planSchema);

export default Plan;
