import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTransactions = () => {
    const [transactionId, setTransactionId] = useState(null);
    const [timer, setTimer] = useState(60);
    const [error, setError] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const TOKEN = sessionStorage.getItem("token");

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
            cancelTransaction();
        }
    }, [timer, transactionId]);

    useEffect(() => {
        // Fetch user accounts
        axios.get('http://localhost:8000/view_accounts', {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(response => {
                setAccounts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the accounts!', error);
            });
    }, [TOKEN]);

    const createTransaction = async (values) => {
        try {
            console.log("values : ", values);
            const response = await axios.post('http://localhost:8000/transactions', values, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                }
            });
            setTransactionId(response.data.transaction_id);
        } catch (error) {
            setError(error.response.data.detail);
            console.error('Error creating transaction:', error);
        }
    };

    const cancelTransaction = async () => {
        try {
            await axios.post('http://localhost:8000/transaction/cancel', { transaction_id: transactionId }, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                }
            });
            setTransactionId(null);
            setTimer(60);
        } catch (error) {
            console.error('Error canceling transaction:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Transaction</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                var values_data = Object.fromEntries(formData.entries());
                var values = {
                    "account_by_id": parseInt(values_data.source_account),
                    "account_to_id": parseInt(values_data.destination_account),
                    "balance": parseFloat(values_data.amount),
                    "motif": values_data.motif
                  }
                console.log(values)
                createTransaction(values);
            }} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input type="number" name="amount" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Motif</label>
                    <input type="text" name="motif" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Source Account</label>
                    <select name="source_account" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                        <option value="">Select Account</option>
                        {accounts.map(account => (
                            <option key={account.id} value={parseInt(account.id)}>{account.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Destination Account</label>
                    <select name="destination_account" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                        <option value="">Select Account</option>
                        {accounts.map(account => (
                            <option key={account.id} value={parseInt(account.id)}>{account.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600">Create</button>
            </form>
            {transactionId && (
                <div className="mt-4">
                    <p className="text-green-500">Transaction created successfully! Transaction ID: {transactionId}</p>
                    <p className="text-gray-500">Time remaining to cancel: {timer} seconds</p>
                    <button onClick={cancelTransaction} className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 mt-2">Cancel Transaction</button>
                </div>
            )}
        </div>
    );
};

export default CreateTransactions;