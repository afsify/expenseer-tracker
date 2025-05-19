import asyncHandler from "express-async-handler";
import { AppError } from "../middleware/error.js";
import { Account } from "../model/account.model.js";
import { Transaction } from "../model/transaction.model.js";

// Helper function to update account balances
const updateAccountBalances = async (userId, transaction) => {
  try {
    for (const account of transaction.accounts) {
      const updatedAccount = await Account.findOneAndUpdate(
        { _id: account.accountId, userId },
        { balance: account.balance },
        { new: true }
      );

      if (!updatedAccount) {
        throw new AppError(`Account ${account.accountId} not found`, 404);
      }
    }
  } catch (error) {
    throw new AppError(
      `Failed to update account balances: ${error.message}`,
      500
    );
  }
};

//! ============================================= Create Transaction =============================================
export const createTransaction = asyncHandler(async (req, res) => {
  const transaction = new Transaction({
    ...req.body,
    userId: req.user._id,
  });

  // Validate transaction data
  if (!transaction.accounts || transaction.accounts.length === 0) {
    throw new AppError("Transaction must include at least one account", 400);
  }

  await transaction.save();
  await updateAccountBalances(req.user._id, transaction);

  res.status(201).json({
    success: true,
    message: "Transaction created successfully",
    transaction,
  });
});

//! ============================================= Batch Upload Transactions =============================================
export const batchUpload = asyncHandler(async (req, res) => {
  if (!Array.isArray(req.body)) {
    throw new AppError("Batch upload requires an array of transactions", 400);
  }

  if (req.body.length === 0) {
    throw new AppError("No transactions provided for batch upload", 400);
  }

  const transactions = req.body.map((t) => ({
    ...t,
    userId: req.user._id,
  }));

  const savedTransactions = await Transaction.insertMany(transactions);

  // Update balances for each transaction
  for (const transaction of savedTransactions) {
    await updateAccountBalances(req.user._id, transaction);
  }

  res.status(201).json({
    success: true,
    message: `${savedTransactions.length} transactions processed successfully`,
    count: savedTransactions.length,
    transactions: savedTransactions,
  });
});

//! ============================================= Get Transactions =============================================
export const getTransactions = asyncHandler(async (req, res) => {
  const { startDate, endDate, type } = req.query;
  const query = { userId: req.user._id };

  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  if (type) {
    query["entries.type"] = type;
  }

  const transactions = await Transaction.find(query)
    .sort({ date: -1 })
    .populate("accounts.accountId", "name type balance currency");

  res.status(200).json({
    success: true,
    count: transactions.length,
    transactions,
  });
});

//! ============================================= Get Transaction Analytics =============================================
export const getAnalytics = asyncHandler(async (req, res) => {
  const { period = "month" } = req.query;
  const userId = req.user._id;

  // Implement your analytics logic here
  const analytics = await generateTransactionAnalytics(userId, period);

  res.status(200).json({
    success: true,
    period,
    analytics,
  });
});

// Helper function for analytics (would be in a separate service file in production)
async function generateTransactionAnalytics(userId, period) {
  // Your analytics generation logic here
  return {
    monthlySummaries: {},
    categorySpending: {},
    accountBalances: {},
    incomeSources: {},
  };
}
