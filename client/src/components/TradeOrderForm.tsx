import React, { useState } from "react";

interface TradeFormProps {
  onSubmit: (tradeData: { asset: string; type: "buy" | "sell"; amount: number }) => void;
}

const TradeForm: React.FC<TradeFormProps> = ({ onSubmit }) => {
  const [asset, setAsset] = useState("");
  const [type, setType] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!asset || amount <= 0) {
      alert("Please enter a valid asset and amount.");
      return;
    }
    onSubmit({ asset, type, amount });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col gap-4"
    >
      <input 
        type="text" 
        placeholder="Asset Name" 
        value={asset} 
        onChange={(e) => setAsset(e.target.value)}
        className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
      <select 
        value={type} 
        onChange={(e) => setType(e.target.value as "buy" | "sell")}
        className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      >
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      <input 
        type="number" 
        placeholder="Amount" 
        value={amount} 
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        className="p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
      <button 
        type="submit" 
        className="p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
      >
        Submit Trade
      </button>
    </form>
  );
};

export default TradeForm;
