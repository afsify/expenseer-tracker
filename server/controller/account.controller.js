import { User } from "../model/user.model.js";
import asyncHandler from "express-async-handler";
import { AppError } from "../middleware/error.js";

//! ============================================= Update Profile =============================================

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, place, image } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found");
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
