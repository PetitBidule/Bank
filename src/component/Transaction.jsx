import * as React from "react";
import { format } from "date-fns";

export default function Transaction({ transaction, account }) {
  const isGain = transaction.destination_account === account.id;
  const isLoss = transaction.source_account === account.id;
  const formattedDate = format(new Date(transaction.date), "dd/MM/yyyy HH:mm");

  return (
    <div
      className={`flex flex-col w-full bg-white shadow-md rounded-lg p-6 mb-4 ${
        isGain ? "bg-green-100" : isLoss ? "bg-red-100" : ""
      }`}
    >
      <div className="flex flex-row items-center justify-between">
        {isGain && <h2 className="text-green-500 font-bold text-3xl">Gain</h2>}

        {isLoss && <h2 className="text-red-500 font-bold text-3xl">Loss</h2>}

        {isGain && <p className="text-gray-700 mb-1 text-xl">{transaction.price} Ç</p>}
        {isLoss && <p className="text-gray-700 mb-1 text-xl">-{transaction.price} Ç</p>}
        
        <p className="text-gray-700 mb-1 text-xl">{formattedDate}</p>
        <p className="text-gray-700 mb-1 text-xl">{transaction.description}</p>
        <p className="text-gray-700 italic text-xl">
          Motif: "{transaction.motif}"
        </p>
      </div>
    </div>
  );
}
