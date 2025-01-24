import React, { useState, useEffect } from "react";
import axios from "axios";
import AppNavbar from "../component/sideBard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from '@mui/material/Button';


const CreateTransactions = () => {
  const [transactionId, setTransactionId] = useState(null);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const TOKEN = sessionStorage.getItem("token");
  const client = axios.create({
    baseURL: "http://127.0.0.1:8000/",
  });
  useEffect(() => {
    let interval;
    if (transactionId) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [transactionId]);

  useEffect(() => {
    if (timer === 0 && transactionId) {
      cancelTransaction(transactionId);
    }
  }, [timer, transactionId]);

  useEffect(() => {
    // Fetch user accounts
    axios
      .get("http://localhost:8000/view_accounts", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the accounts!", error);
      });
  }, [TOKEN]);

  const createTransaction = async (values) => {
    if (values.frequency == "none") {
      try {
        const response = await axios.post(
          "http://localhost:8000/transactions",
          values,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );
        const transactionId = response.data.id;
        console.log("values : ", response.data);
        setTransactionId(transactionId);
        toast.success(
          <div>
            Transaction created successfully!
            <button
              onClick={() => cancelTransaction(transactionId)}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 mt-2"
            >
              Cancel Transaction
            </button>
          </div>
        );
      } catch (error) {
        setError(error.response.data.detail);
        console.error("Error creating transaction:", error);
      }
    } else {
      await client
        .post("cron", values, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((response) =>
          console.log(response.data).catch((e) => console.log(e))
        );
    }
  };

  const cancelTransaction = async (transactionId) => {
    try {
      console.log("Annulation de la transaction avec l'ID:", transactionId);
      await axios.post(
        `http://localhost:8000/transaction/cancel?transaction_id=${transactionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      setTransactionId(null);
      setTimer(60);
      toast.info("Transaction cancelled successfully.");
    } catch (error) {
      console.error("Error canceling transaction:", error);
    }
  };

  const stopDirectDebit = async () => {
     await client
        .post("cancel_cron", {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((response) =>
          console.log(response.data).catch((e) => console.log(e))
        );
  }

  return (
    <div className="container mx-auto p-4">
      <AppNavbar />

      <h1 className="text-2xl font-bold mb-4">Create Transaction</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const values = {
            account_by_id: parseInt(formData.get("source_account")),
            account_to_id: parseInt(formData.get("destination_account")),
            balance: parseFloat(formData.get("amount")),
            motif: formData.get("motif"),
            frequency: formData.get("frequency"),
          };
          console.log(values);
          createTransaction(values);
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            className="mt-1 block w-full border bg-white
 border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Motif
          </label>
          <input
            type="text"
            name="motif"
            className="mt-1 block w-full border bg-white
 border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Source Account
          </label>
          <select
            name="source_account"
            className="mt-1 block w-full border bg-white
 border-gray-300 rounded-md shadow-sm p-2"
            required
          >
            <option value="">Select Account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Destination Account
          </label>
          <select
            name="destination_account"
            className="mt-1 block w-full border bg-white
 border-gray-300 rounded-md shadow-sm p-2"
            required
          >
            <option value="">Select Account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Frequency
          </label>
          <select
            name="frequency"
            className="mt-1 block w-full border bg-white
 border-gray-300 rounded-md shadow-sm p-2"
            required
          >
            <option value="none">None</option>
            <option value="5">5 sec</option>
            <option value="86400">1 jours</option>
            <option value="604800">1 semaine</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
        >
          Create
        </button>
      </form>
      <Button variant="outlined" color="error" onClick={stopDirectDebit}>
        Arreter les prélèvement automatique
      </Button>
      <ToastContainer />
    </div>
  );
};

export default CreateTransactions;
