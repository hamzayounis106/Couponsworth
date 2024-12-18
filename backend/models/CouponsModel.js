import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  description: { type: String },
  expiryDate: { type: Date },
  discount: { type: Number },

  terms: { type: String },

  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
});

export default mongoose.model("Coupon", CouponSchema);
