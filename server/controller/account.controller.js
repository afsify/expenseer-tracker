import asyncHandler from "express-async-handler";
import { AppError } from "../middleware/error.js";
import { Account } from "../model/account.model.js";

//! ============================================= Create Account =============================================
export const createAccount = asyncHandler(async (req, res) => {
  const { name, type, balance, currency, description } = req.body;

  // Validate required fields
  if (!name || !type) {
    throw new AppError("Name and type are required fields", 400);
  }

  const account = new Account({
    name,
    type,
    balance: balance || 0,
    currency: currency || "INR",
    description,
    userId: req.user._id,
  });

  await account.save();

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    account,
  });
});

//! ============================================= Get All Accounts =============================================
export const getAccounts = asyncHandler(async (req, res) => {
  const accounts = await Account.find({
    userId: req.user._id,
    isActive: true,
  }).sort({ createdAt: -1 });

  if (!accounts || accounts.length === 0) {
    throw new AppError("No accounts found", 404);
  }

  res.status(200).json({
    success: true,
    count: accounts.length,
    accounts,
  });
});

//! ============================================= Update Account =============================================
export const updateAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (Object.keys(updateData).length === 0) {
    throw new AppError("No update data provided", 400);
  }

  const account = await Account.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!account) {
    throw new AppError("Account not found or you don't have permission", 404);
  }

  res.status(200).json({
    success: true,
    message: "Account updated successfully",
    account,
  });
});

//! ============================================= Delete Account =============================================
export const deleteAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const account = await Account.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    { isActive: false },
    { new: true }
  );

  if (!account) {
    throw new AppError("Account not found or you don't have permission", 404);
  }

  res.status(200).json({
    success: true,
    message: "Account deactivated successfully",
  });
});

//! ============================================= Get Account by ID =============================================
export const getAccountById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const account = await Account.findOne({
    _id: id,
    userId: req.user._id,
    isActive: true,
  });

  if (!account) {
    throw new AppError("Account not found or you don't have permission", 404);
  }

  res.status(200).json({
    success: true,
    account,
  });
});
