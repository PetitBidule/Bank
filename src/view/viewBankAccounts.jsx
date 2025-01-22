import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BankAccount from '../component/BankAccount'

const ViewBankAccounts = () => {
    const TOKEN = sessionStorage.getItem("token");
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
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


    }, []);

    return (
        <div>
            <h1>Bank Accounts</h1>

            <div className="container mx-auto p-4 mt-20">
                {accounts.length === 0 ? (
                    <p className="text-center text-gray-500">Pas de comptes</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {accounts.map(account => (
                            console.log(account),
                            <BankAccount key={account.id} account={account} />
                        ))}
                    </div>
                )}
            </div>



        </div>
    );
};

export default ViewBankAccounts;