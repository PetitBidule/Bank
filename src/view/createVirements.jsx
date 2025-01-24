import axios from "axios";
import React, { useState, useEffect } from 'react';
import AppNavbar from "../component/sideBard"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BeneciciaryModal from "../component/BeneciciaryModal";

const CreateVirements = () => {

    const [virementId, setVirementId] = useState(null);
    const [timer, setTimer] = useState(60);
    const [error, setError] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [beneficiaries, setBeneficiaries] = useState([]);
    const TOKEN = sessionStorage.getItem("token");

    useEffect(() => {
        let interval;
        if (virementId) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [virementId]);

    useEffect(() => {
        if (timer === 0 && virementId) {
            cancelTransaction(virementId);
        }
    }, [timer, virementId]);
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
        setError("There was an error fetching the accounts!");
        console.error("There was an error fetching the accounts!", error);
      });
  }, [TOKEN]);

   useEffect(() => {
        // Fetch user beneficiaries
        axios.get('http://localhost:8000/view_beneficiaries', {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(response => {
                setBeneficiaries(response.data);
            })
            .catch(error => {
                setError('There was an error fetching the beneficiaries!');
                console.error('There was an error fetching the beneficiaries!', error);
            });
    }, [TOKEN]);

    const createTransaction = async (values) => {
        try {
            const response = await axios.post('http://localhost:8000/virements', values, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                }
            });
            const virementId = response.data.id;
            console.log("data",response.data)
            setVirementId(virementId);
            console.log("create id",virementId);
            toast.success(
                <div>
                    Virement created successfully!
                    <button onClick={() => cancelTransaction(virementId)} className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 mt-2">Cancel Virement</button>
                </div>
            );
        } catch (error) {
            setError(error.response.data.detail);
            console.error('Error creating virement:', error);
        }
  }

    const cancelTransaction = async (virementId) => {
        try {
            console.log("Annulation du virement avec l'ID:", virementId);
            await axios.post(`http://localhost:8000/virement/cancel?virement_id=${virementId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                }
            });
            setVirementId(null);
            setTimer(60);
            toast.info('Virement cancelled successfully.');
        } catch (error) {
            console.error('Error canceling virement:', error);
        }
  };

  return (
    <div className="container mx-auto p-4">
      <AppNavbar />
      <BeneciciaryModal />
      <h1 className="text-2xl font-bold mb-4">Create Virements</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          var values_data = Object.fromEntries(formData.entries());
          var values = {
            account_by_id: parseInt(values_data.source_account),
            account_to_id: parseInt(values_data.destination_account),
            balance: parseFloat(values_data.amount),
            motif: values_data.motif,
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Source Account
          </label>
          <select
            name="source_account"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
            required
          >
            <option value="">Select Account</option>
            {accounts.map((account) => (
              <option key={account.id} value={parseInt(account.id)}>
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
            required
          >
            <option value="">Select Account</option>
            {beneficiaries.map((beneficiary) => (
              <option
                key={beneficiary.account_beneficiary}
                value={parseInt(beneficiary.account_beneficiary)}
              >
                {beneficiary.bank_account_beneficiary_iban} (
                {beneficiary.bank_account_beneficiary_name})
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
        >
          Create
        </button>
      </form>
      {virementId && (
        <div className="mt-4">
          <p className="text-green-500">
            Transaction created successfully! Virement ID: {virementId}
          </p>
          <p className="text-gray-500">
            Time remaining to cancel: {timer} seconds
          </p>
          <button
            onClick={cancelTransaction}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 mt-2"
          >
            Cancel Virement
          </button>
           <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default CreateVirements;
