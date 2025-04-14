import dotenv from "dotenv";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";
import { User } from "../model/user.model.js";
import { AppError } from "../middleware/error.js";
import { generateToken } from "../utils/generateToken.js";
import {
  passwordResetEmail,
  accountVerificationEmail,
} from "../utils/emailTemplate.js";
dotenv.config();

//! =============================================== Transporter ===============================================

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

let otp;
function generateSixDigitOTP() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//! ================================================= Send OTP =================================================

export const sendOTP = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new AppError("Email already exists", 400);
  }
  otp = generateSixDigitOTP();
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "✅ Account Verification OTP",
    html: accountVerificationEmail(otp),
  };
  try {
    await transporter.sendMail(mailOptions);
    const userData = { name, email, password };
    res.status(200).json({
      message: "OTP has been sent",
      success: true,
      user: userData,
    });
  } catch (error) {
    throw new AppError("Email sending failed");
  }
});

//! =============================================== Register User ===============================================

export const registerUser = asyncHandler(async (req, res) => {
  const inputOtp = parseInt(req.body.otp);
  if (inputOtp === otp) {
    const { name, email, password } = req.body.user;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = User({
      name: name,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(200).send({
      message: "Registration Success",
      success: true,
    });
  } else {
    throw new AppError("Incorrect OTP");
  }
});

//! ============================================== Login User ==============================================

export const loginUser = asyncHandler(async (req, res) => {
  const { name, email, password, exp } = req.body;
  const userData = await User.findOne({ email });
  if (exp && userData === null) {
    const hashPassword = await bcrypt.hash(password, 10);
    User.create({
      name: name,
      email: email,
      password: hashPassword,
    }).then(async () => {
      let userData = await User.findOne({ email: email });
      let token = generateToken(userData._id);
      res.status(200).send({
        message: "Registration Success",
        success: true,
        token,
      });
    });
  } else if (!userData) {
    throw new AppError("User not found");
  } else if (userData.isActive === false) {
    throw new AppError("User is Blocked");
  } else {
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      throw new AppError("Incorrect Password");
    }
    let token = generateToken(userData._id);
    res.status(200).send({
      message: "Login Success",
      success: true,
      token,
    });
  }
});

//! ============================================ Forgot Password ============================================

export const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new AppError("Email does not exist");
  }
  const otp = generateSixDigitOTP();
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: req.body.email,
    subject: "🔑 Password Reset OTP",
    html: passwordResetEmail(otp),
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message: "OTP has been sent",
      success: true,
      email: req.body.email,
    });
  } catch (error) {
    throw new AppError("Email sending failed");
  }
});

//! =============================================== OTP Check ===============================================

export const checkOTP = asyncHandler(async (req, res) => {
  const inputOtp = parseInt(req.body.otp);
  if (inputOtp === otp) {
    res.status(200).send({
      message: "OTP Matched",
      success: true,
      email: req.body.email,
    });
  } else {
    throw new AppError("Incorrect OTP");
  }
});

//! ============================================= Reset Password =============================================

export const resetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const { password } = req.body.data;
  const hashPassword = await bcrypt.hash(password, 10);
  user.password = hashPassword;
  await user.save();
  res.status(200).send({ message: "Password Updated", success: true });
});

//! =============================================== User Info ===============================================

export const getUser = asyncHandler(async (req, res) => {
  const userData = await User.findById(req.user._id, {
    password: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  });
  if (userData) {
    res.status(200).send({
      success: true,
      auth: true,
      userData,
    });
  } else {
    throw new AppError("Session Expired");
  }
});

//! ============================================= Contact Message =============================================

export const contactMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  const newMessage = Feedback({
    name: name,
    email: email,
    message: message,
  });
  await newMessage.save();
  res.status(200).send({
    message: "Message has been sent",
    success: true,
  });
});
