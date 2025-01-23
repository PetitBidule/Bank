import * as React from "react";
import { format } from "date-fns";

export default function Virement({ virement, account }) {
  const isGain = virement.destination_account === account.id;
  const isLoss = virement.source_account === account.id;
  const formattedDate = format(new Date(virement.date), "dd/MM/yyyy HH:mm");

  return (
    <div className={`flex flex-col w-full bg-white shadow-md rounded-lg p-6 mb-4 ${isGain ? 'bg-green-100' : isLoss ? 'bg-red-100' : ''}`}>
      <p className="text-black text-left">Virement</p>
      <div className="flex flex-row items-center justify-between">
        
        {isGain && <h2 className="text-green-500 font-bold text-3xl">Gain</h2>}

        {isLoss && <h2 className="text-red-500 font-bold text-3xl">Loss</h2>}

        {isGain && <p className="text-gray-700 mb-1 text-xl">{virement.price} Ç</p>}
        {isLoss && <p className="text-gray-700 mb-1 text-xl">-{virement.price} Ç</p>}
        
        <p className="text-gray-700 mb-1 text-xl">{formattedDate}</p>
        <p className="text-gray-700 mb-1 text-xl">{virement.description}</p>
        <p className="text-gray-700 italic text-xl">Motif: "{virement.motif}"</p>
      </div>

    </div>
  );
}