import { userAxiosInstance } from "../api/axios";
import bannersData from "../assets/data/banners.json";

//? ============================================= Authorization =============================================

export const loginUser = (values) => {
  return userAxiosInstance.post("/login-user", values);
};

export const sendOTP = (values) => {
  return userAxiosInstance.post("/send-otp", values);
};

export const registerUser = (values) => {
  return userAxiosInstance.post("/register-user", values);
};

export const getUser = () => {
  return userAxiosInstance.get("/get-user");
};

//? ============================================ Forget Password ============================================

export const forgotPassword = (values) => {
  return userAxiosInstance.post("/forgot-password", values);
};

export const checkOTP = (values) => {
  return userAxiosInstance.post("/check-otp", values);
};

export const resetPassword = (values) => {
  return userAxiosInstance.post("/reset-password", values);
};

//? =============================================== Home Page ===============================================

export const listBanner = () => {
  // return userAxiosInstance.get("/list-banner");
  return { data: { data: bannersData } };
};

//? ================================================ Contact ================================================

export const primePayment = (values) => {
  return userAxiosInstance.post("/prime-payment", values);
};
export const contactMessage = (values) => {
  return userAxiosInstance.post("/contact-message", values);
};

//? ================================================= About =================================================

export const getAbout = () => {
  return userAxiosInstance.get("/get-about");
};

//? ================================================ Profile ================================================

export const updateProfile = (values) => {
  return userAxiosInstance.post("/update-profile", values);
};

export const findUser = (searchTerm) => {
  return userAxiosInstance.get(`/find-user?search=${searchTerm}`);
};
