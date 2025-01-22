import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const TOKEN = sessionStorage.getItem("token");

    useEffect(() => {
        axios.get('/transactions/history', {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(response => {
                console.log(response.data)
                setTransactions(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the transactions!', error);
                setError(error);
                setLoading(false);
            });
    }, [TOKEN]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>There was an error fetching the transactions.</p>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>All Transactions</h2>
            {transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <ul>
                    {transactions.map(transaction => (
                        <li key={transaction.id}>
                            {transaction.date} - {transaction.description} - ${transaction.amount}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;