import { adminAxiosInstance } from "../api/axios";

//? ============================================= Authorization =============================================

export const adminLogin = (values) => {
  return adminAxiosInstance.post("/signin", values);
};

export const getAdmin = () => {
  return adminAxiosInstance.get("/get-admin");
};

//? ============================================== Dashboard ==============================================

export const listDashboard = () => {
  return adminAxiosInstance.get("/list-dashboard");
};

//? ============================================== User Manage ==============================================

export const listUser = () => {
  return adminAxiosInstance.get("/list-user");
};

export const blockUser = (userId) => {
  return adminAxiosInstance.post(`/block-user/${userId}`);
};

export const unblockUser = (userId) => {
  return adminAxiosInstance.post(`/unblock-user/${userId}`);
};

//? ============================================= Banner Manage =============================================

export const listBanner = () => {
  return adminAxiosInstance.get("/list-Banner");
};

export const insertBanner = (values) => {
  return adminAxiosInstance.post("/insert-Banner", values);
};

export const editBanner = (bannerId, values) => {
  return adminAxiosInstance.post(`/edit-Banner/${bannerId}`, values);
};

export const bannerStatus = (bannerId, status) => {
  return adminAxiosInstance.post(`/banner-status/${bannerId}`, { status });
};

export const deleteBanner = (bannerId) => {
  return adminAxiosInstance.delete(`/delete-Banner/${bannerId}`);
};

//? =============================================== Settings ===============================================

export const listFeedback = () => {
  return adminAxiosInstance.get("/list-feedback");
};

//? =============================================== Settings ===============================================

export const updateAbout = (adminId, values) => {
  return adminAxiosInstance.post(`/update-about/${adminId}`, values);
};
