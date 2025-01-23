import * as React from "react";
import { format } from "date-fns";

export default function TransactionDashboard({ transaction }) {
  const isGain = transaction.price >= 0;
  const isLoss = transaction.price < 0;
  const formattedDate = format(new Date(transaction.date), "dd/MM/yyyy HH:mm");

  return (
    <div className={`flex flex-col w-full bg-white shadow-md rounded-lg p-6 mb-4 ${isGain ? 'bg-green-100' : isLoss ? 'bg-red-100' : ''}`}>
       <p className="text-black text-left">Transaction</p>
      <div className="flex flex-row items-center justify-between w-auto">
        {isGain && <h2 className="text-green-500 font-bold text-3xl">Gain</h2>}
        {isLoss && <h2 className="text-red-500 font-bold text-3xl">Loss</h2>}
        <h2 className="text-gray-700 mb-1 text-xl">Transaction de {transaction.source_account} vers {transaction.destination_account}</h2>
        <p className="mx-5 text-gray-700 mb-1 text-xl">{transaction.price.toFixed(2)} Ç</p>
        <p className="mx-5 text-gray-700 mb-1 text-xl">{formattedDate}</p>
        <p className="mx-5 text-gray-700 mb-1 text-xl">{transaction.description}</p>
        <p className="text-gray-700 italic text-xl">Motif: "{transaction.motif}"</p>
      </div>

    </div>
  );
}