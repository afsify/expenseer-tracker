import express from "express";
const userRouter = express.Router();
import { authorize, protect } from "../middleware/auth.js";
import { updateProfile } from "../controller/account.controller.js";
import {
  checkOTP,
  contactMessage,
  forgotPassword,
  getUser,
  loginUser,
  resetPassword,
  sendOTP,
  registerUser,
} from "../controller/user.controller.js";

//? ============================================= Authorization =============================================

userRouter.post("/send-otp", sendOTP);
userRouter.post("/register-user", registerUser);
userRouter.post("/login-user", loginUser);
userRouter.get("/get-user", protect, getUser);

//? ============================================ Forgot Password ============================================

userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/check-otp", checkOTP);
userRouter.post("/reset-password", resetPassword);

//? ================================================ Contact ================================================

userRouter.post("/contact-message", contactMessage);

//? ================================================ Profile ================================================

userRouter.post("/update-profile", protect, updateProfile);

export default userRouter;
