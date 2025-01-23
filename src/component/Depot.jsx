import * as React from "react";
import { format } from "date-fns";

export default function Depot({ depot }) {
  const isGain = depot.price >= 0;
  const isLoss = depot.price < 0;
  const formattedDate = format(new Date(depot.date), "dd/MM/yyyy HH:mm");

  return (
    <div className={`flex flex-col w-full bg-white shadow-md rounded-lg p-6 mb-4 ${isGain ? 'bg-green-100' : isLoss ? 'bg-red-100' : ''}`}>
      <p className="text-black text-left">Depot</p>
      <div className="flex flex-row items-center justify-between">
        
        {isGain && <h2 className="text-green-500 font-bold text-3xl">Gain</h2>}

        {isLoss && <h2 className="text-red-500 font-bold text-3xl">Loss</h2>}

        {isGain && <p className="text-gray-700 mb-1 text-xl">{depot.price} Ç</p>}
        {isLoss && <p className="text-gray-700 mb-1 text-xl">-{depot.price} Ç</p>}
        
        <p className="text-gray-700 mb-1 text-xl">{formattedDate}</p>
        <p className="text-gray-700 mb-1 text-xl">{depot.description}</p>
        <p className="text-gray-700 italic text-xl">Motif: "{depot.motif}"</p>
      </div>

    </div>
  );
}