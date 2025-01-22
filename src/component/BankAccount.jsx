import * as React from "react";
import { Link } from "react-router-dom";

export default function BankAccount({ account }) {
  return (
    <Link to={`/account/${account.id}/transactions`} className="block">
      <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:bg-gray-100 cursor-pointer">
        <h2 className="text-xl font-bold mb-2 account-title-color truncate">{account.name}</h2>
        <p className="text-gray-700 mb-1">{account.iban}</p>
        <p className="text-gray-700 mb-4">Balance: {account.balance}</p>
        <p className="text-gray-700 mb-4">{account.type}</p>
      </div>
    </Link>
  );
}