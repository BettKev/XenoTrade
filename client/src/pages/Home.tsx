import React from 'react';
import { motion } from 'framer-motion';
import { useLogin } from '../contexts/LoginContext';
import { ChartBarIcon, ShieldCheckIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';

const marketStats = [
  { symbol: "BTC/USD", price: "36,789.20", change: "+2.4%" },
  { symbol: "ETH/USD", price: "2,891.15", change: "+1.8%" },
  { symbol: "XRP/USD", price: "0.5891", change: "-0.7%" },
];

const features = [
  {
    title: "Advanced Trading Tools",
    description: "Professional-grade charts, indicators, and real-time analytics",
    icon: <ChartBarIcon className="w-8 h-8" />
  },
  {
    title: "Instant Execution",
    description: "Lightning-fast trade execution with minimal slippage",
    icon: <ClockIcon className="w-8 h-8" />
  },
  {
    title: "Secure Trading",
    description: "Multi-layer security with 2FA and advanced encryption",
    icon: <ShieldCheckIcon className="w-8 h-8" />
  },
  {
    title: "Smart Portfolio",
    description: "Automated portfolio tracking and risk management",
    icon: <CurrencyDollarIcon className="w-8 h-8" />
  }
];

const Home: React.FC = () => {
  const { openLoginModal } = useLogin();

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      {/* Market Ticker */}
      <div className="bg-[#131722] border-b border-gray-800">
        <div className="container mx-auto py-2 px-4 overflow-x-auto">
          <div className="flex space-x-8">
            {marketStats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-2 whitespace-nowrap">
                <span className="font-semibold">{stat.symbol}</span>
                <span>{stat.price}</span>
                <span className={stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                  {stat.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Trade Smarter with XenoTrade
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Experience professional-grade trading with advanced charts, real-time data, and institutional-level execution speed.
          </p>
        </motion.div>
      </section>

      {/* Market Preview Section */}
      <section className="container mx-auto px-6 py-12 bg-[#131722] rounded-lg mx-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Live Market Overview</h2>
          <div className="mt-6 h-[200px] bg-[#1e222d] rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Trading chart preview</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Professional Trading Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#131722] p-6 rounded-lg hover:bg-[#1e222d] transition-all duration-300 border border-gray-800"
            >
              <div className="text-blue-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-lg 
                    transition-colors duration-300 shadow-lg"
          onClick={openLoginModal}
        >
          Start Trading Now
        </motion.button>
      </section>
    </div>
  );
};

export default Home;
