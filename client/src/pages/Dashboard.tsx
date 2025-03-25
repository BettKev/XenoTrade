import React from "react";
import { FiHome, FiSettings, FiLogOut } from "react-icons/fi";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <a href="#" className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-200 rounded-lg">
            <FiHome /> Home
          </a>
          <a href="#" className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-200 rounded-lg">
            <FiSettings /> Settings
          </a>
          <a href="#" className="flex items-center gap-2 p-2 text-red-600 hover:bg-red-100 rounded-lg mt-auto">
            <FiLogOut /> Logout
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Dashboard Content */}
        <main className="p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Dashboard Overview</h3>
            <p className="text-gray-700">Here you can view your recent activities and updates.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;