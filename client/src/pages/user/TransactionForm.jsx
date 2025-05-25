import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const TransactionForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const { authToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [transactionType, setTransactionType] = useState("expense");

  const watchTransactionType = watch("type", "expense");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("/api/accounts", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, [authToken]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Prepare the transaction data with account balances
      const transactionData = {
        ...data,
        accounts: accounts.map((acc) => ({
          accountId: acc._id,
          balance: acc.balance, // You would calculate the new balance based on the transaction
        })),
      };

      const response = await axios.post("/api/transactions", transactionData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      onSuccess(response.data);
      reset();
    } catch (error) {
      console.error("Error submitting transaction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Transaction Type
          </label>
          <select
            {...register("type", { required: true })}
            onChange={(e) => setTransactionType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {watchTransactionType === "transfer" ? "From Account" : "Account"}
          </label>
          <select
            {...register("accountId", { required: "Account is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value="">Select Account</option>
            {accounts.map((account) => (
              <option key={account._id} value={account._id}>
                {account.name} ({account.type.replace("_", " ")}) -{" "}
                {account.currency} {account.balance.toFixed(2)}
              </option>
            ))}
          </select>
          {errors.accountId && (
            <p className="mt-1 text-sm text-red-600">
              {errors.accountId.message}
            </p>
          )}
        </div>

        {watchTransactionType === "transfer" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              To Account
            </label>
            <select
              {...register("toAccountId", {
                required:
                  watchTransactionType === "transfer"
                    ? "Destination account is required"
                    : false,
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="">Select Destination Account</option>
              {accounts.map((account) => (
                <option key={account._id} value={account._id}>
                  {account.name} ({account.type.replace("_", " ")}) -{" "}
                  {account.currency} {account.balance.toFixed(2)}
                </option>
              ))}
            </select>
            {errors.toAccountId && (
              <p className="mt-1 text-sm text-red-600">
                {errors.toAccountId.message}
              </p>
            )}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          step="0.01"
          {...register("amount", {
            required: "Amount is required",
            min: { value: 0.01, message: "Amount must be greater than 0" },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>

      {watchTransactionType !== "transfer" && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            {...register("category")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        {isLoading ? "Saving..." : "Save Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
