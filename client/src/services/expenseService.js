import { userAxiosInstance } from "../api/axios";

// Accounts API
export const getAccounts = () => {
  return userAxiosInstance.get("/account");
};

export const createAccount = (accountData) => {
  return userAxiosInstance.post("/account", accountData);
};

export const updateAccount = (id, updateData) => {
  return userAxiosInstance.patch(`/account/${id}`, updateData);
};

export const deleteAccount = (id) => {
  return userAxiosInstance.delete(`/account/${id}`);
};

// Transactions API
export const getTransactions = (params = {}) => {
  return userAxiosInstance.get("/transaction", { params });
};

export const createTransaction = (transactionData) => {
  return userAxiosInstance.post("/transaction", transactionData);
};

export const batchUploadTransactions = (transactions) => {
  return userAxiosInstance.post("/transaction/batch", transactions);
};

export const getTransactionAnalytics = (period = "month") => {
  return userAxiosInstance.get("/transaction/analytics", {
    params: { period },
  });
};
