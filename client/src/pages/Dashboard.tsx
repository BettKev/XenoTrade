import React, { useState } from "react";
import { FiHome, FiSettings, FiMenu, FiX } from "react-icons/fi";
import useMetaMask from "../components/WalletConnect";
import TradeForm from "../components/TradeOrderForm";

const Dashboard: React.FC = () => {
  const { isConnected, accounts, balances, connect, disconnect, error } = useMetaMask();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden p-4 text-gray-700"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative w-64 bg-white shadow-md p-4 flex flex-col transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <button className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-200 rounded-lg">
            <FiHome /> Home
          </button>
          <button className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-200 rounded-lg">
            <FiSettings /> Settings
          </button>
        </nav>

        {/* Wallet Connect Section */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-black">Wallet Connection</h3>
          {isConnected ? (
            <div>
              <p className="text-green-600">Connected:</p>
              <ul className="list-disc list-inside">
                {accounts.map((account) => (
                  <li key={account} className="text-gray-700 break-all">{account}</li>
                ))}
              </ul>

              {/* Balances Section */}
              <h3 className="mt-4 text-lg font-semibold">Balances:</h3>
              {balances && Object.keys(balances).length > 0 ? (
                <ul className="list-disc list-inside">
                  {Object.entries(balances).map(([symbol, balance]) => (
                    <li key={symbol} className="text-gray-700">
                      {symbol}: <span className="font-semibold">{balance}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No balances available.</p>
              )}

              <button
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
                onClick={disconnect}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <div>
              <p className="text-red-600">Not connected.</p>
              {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
                onClick={connect}
              >
                Connect Wallet
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        <TradeForm onSubmit={() => alert("Trade placed.")} />
      </div>
    </div>
  );
};

export default Dashboard;
