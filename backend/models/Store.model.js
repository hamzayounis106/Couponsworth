import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logo: { type: String },
  url: { type: String, required: true },
  description: { type: String },
  category: [{ type: String }],
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  additionalDetails: { type: String },
  pointsToKnow: [{ type: String }],
  freeShipping: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  memberDiscount: { type: Boolean, default: false },
  militaryDiscount: { type: Boolean, default: false },
});

export default mongoose.model("Store", StoreSchema);
