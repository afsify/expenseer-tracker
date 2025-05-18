import { User } from "../model/user.model.js";
import asyncHandler from "express-async-handler";
import { AppError } from "../middleware/error.js";
import { Account } from "../model/account.model.js";

//! ============================================= Update Profile =============================================

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, place, image } = req.body;
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.name = name;
  user.phone = phone;
  user.place = place;
  user.image = image;
  await user.save();

  const userData = await User.findById(req.user._id, {
    password: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  });

  res.status(200).json({
    message: "Profile Updated",
    success: true,
    userData,
  });
});

//! ============================================= Account Controllers =============================================

export const createAccount = asyncHandler(async (req, res) => {
  const account = new Account({
    ...req.body,
    userId: req.user._id,
  });

  await account.save();

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    account,
  });
});

export const getAccounts = asyncHandler(async (req, res) => {
  const accounts = await Account.find({
    userId: req.user._id,
    isActive: true,
  });

  res.status(200).json({
    success: true,
    count: accounts.length,
    accounts,
  });
});

export const updateAccount = asyncHandler(async (req, res) => {
  const account = await Account.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!account) {
    throw new AppError("Account not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Account updated successfully",
    account,
  });
});

export const deleteAccount = asyncHandler(async (req, res) => {
  const account = await Account.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { isActive: false },
    { new: true }
  );

  if (!account) {
    throw new AppError("Account not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Account deactivated successfully",
  });
});
