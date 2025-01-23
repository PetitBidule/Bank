import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionDashboard from '../component/TransactionDashboard';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [accountId, setAccountId] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const TOKEN = sessionStorage.getItem("token");

    useEffect(() => {
        if (!TOKEN) {
            setError("No token found");
            setLoading(false);
            return;
        }

        axios.post('http://localhost:8000/transactions/history', {}, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(response => {
                setTransactions(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the transactions!', error);
                setError(error.response ? error.response.data.message : error.message);
                setLoading(false);
            });
    }, [TOKEN]);

    const accounts = [
        ...new Map(
          transactions
            .flatMap(transaction => [
              { id: transaction.source_account, name: transaction.source_account_name }, 
              { id: transaction.destination_account, name: transaction.destination_account_name }
            ])
            .map(account => [account.id, account])
        ).values()
      ];

    const filteredTransactions = transactions.filter(transaction => {
        const matchesAccountId = accountId ? (transaction.source_account === accountId) : true;
        const isFloat = !isNaN(searchTerm) && searchTerm.toString().indexOf('.') !== -1;
        const matchesSearchTerm = searchTerm ? (isFloat ? transaction.price && transaction.price.toString().includes(parseFloat(searchTerm)) : transaction.motif && transaction.motif.toLowerCase().includes(searchTerm.toLowerCase())) : true;
        const matchesFilter = filter === 'all' || (filter === 'gain' && transaction.price > 0) || (filter === 'loss' && transaction.price < 0);
        return matchesAccountId && matchesSearchTerm && matchesFilter;
    });

    console.log(filteredTransactions)

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>There was an error fetching the transactions: {error}</p>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="mb-4">
                <label className="block mb-2">Filter by Account id:</label>
                <select
                    value={parseInt(accountId)}
                    onChange={e => setAccountId(parseInt(e.target.value))}
                    className="border p-2 mb-4 w-full"
                >
                    <option value="">All Accounts</option>
                    {accounts.map(account  => (
                        <option key={account.id} value={account.id}>{account.name}</option>
                    ))}
                </select>
                <label className="block mb-2">Search by Amount or Description:</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="border p-2 mb-4 w-full"
                />
                <label className="block mb-2">Filter by Type:</label>
                <select
                    value={filter}
                    onChange={e => {
                        setFilter(e.target.value);
                        console.log("Selected filter: ", e.target.value); // Ajoutez ce console.log pour vérifier la valeur sélectionnée
                    }}
                    className="border p-2 mb-4 w-full"
                >
                    <option value="all">All</option>
                    <option value="gain">Gain</option>
                    <option value="loss">Loss</option>
                </select>
            </div>
            <h2>All Transactions</h2>
            {filteredTransactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <ul>
                    {filteredTransactions.map(transaction => (
                        <TransactionDashboard key={transaction.id} transaction={transaction} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;