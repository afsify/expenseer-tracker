import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["bank", "digital_wallet", "cash", "investment", "other"],
  },
  balance: { type: Number, default: 0 },
  currency: { type: String, default: "INR" },
  description: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const Account = mongoose.model("Account", accountSchema);
