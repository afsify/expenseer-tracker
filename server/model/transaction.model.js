import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true, default: Date.now },
    accounts: [
      {
        accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
        balance: { type: Number, required: true },
      },
    ],
    entries: [
      {
        type: {
          type: String,
          enum: ["income", "expense", "transfer"],
          required: true,
        },
        amount: { type: Number, required: true },
        accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
        toAccountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" }, // For transfers
        category: String,
        description: String,
        tags: [String],
      },
    ],
    notes: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Add index for better query performance
transactionSchema.index({ userId: 1, date: -1 });

export const Transaction = mongoose.model("Transaction", transactionSchema);
