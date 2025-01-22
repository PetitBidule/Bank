import React, { useEffect, useState } from 'react';
import { useParams } from "react-router"
import axios from 'axios';
import Transaction from '../component/Transaction'

const ViewBankAccounts = () => {
    const { id } = useParams();
    const TOKEN = sessionStorage.getItem("token");
    const [account, setAccount] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/view_account?account_id=${id}`, {
            params: {
                id
            },
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(response => {
                setAccount(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the accounts!', error);
            });

        axios.get(`http://localhost:8000/account/transactions?account_id=${id}`, {
            params: {
                id
            },
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then(response => {
                console.log(response.data)
                setTransactions(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the accounts!', error);
            });


    }, []);

    return (
        <>
          <div className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-10">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <h1 className="text-2xl font-bold">{account.name}</h1>
                        <p>{account.type}</p>
                        <p>{account.iban}</p>
                        <p>{account.balance} Ç</p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto p-4 mt-20">
                {transactions.length === 0 ? (
                    <p className="text-center text-gray-500">Pas de transaction</p>
                ) : (
                    <div className="flex flex-wrap -mx-2">
                        {transactions.map(transaction => (
                            <Transaction key={transaction.id} transaction={transaction} account={account} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default ViewBankAccounts;