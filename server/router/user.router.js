import express from "express";
const userRouter = express.Router();
import { authorize, protect } from "../middleware/auth.js";
import { updateProfile } from "../controller/profile.controller.js";
import {
  createTransaction,
  batchUpload,
  getTransactions,
  getAnalytics,
} from "../controller/transaction.controller.js";
import {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
} from "../controller/account.controller.js";
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

//? ============================================= Account Routes =============================================

userRouter
  .route("/account")
  .post(protect, createAccount)
  .get(protect, getAccounts);

userRouter
  .route("/account/:id")
  .get(protect, getAccountById)
  .put(protect, updateAccount)
  .delete(protect, deleteAccount);

//? ============================================= Transaction Routes =============================================

userRouter
  .route("/transaction")
  .post(protect, createTransaction)
  .get(protect, getTransactions);

userRouter.post("/transaction/batch", protect, batchUpload);
userRouter.get("/transaction/analytics", protect, getAnalytics);

export default userRouter;
