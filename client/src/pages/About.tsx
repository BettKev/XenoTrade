import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">About XenoTrade</h1>
          
          <div className="space-y-6 text-gray-300">
            <p>
              XenoTrade is an AI-powered platform that enables retail investors in Kenya 
              to trade tokenized assets of NSE-listed companies. Built on the Hedera 
              Blockchain and MERN stack, it offers real-time analytics, low transaction 
              costs, and automated trading strategies.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Our Mission</h2>
            <p>
              Our mission is to democratize access to financial markets by leveraging 
              cutting-edge technology and artificial intelligence, making trading 
              accessible and efficient for everyone.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Key Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>AI-Powered Trading Insights</li>
              <li>Tokenized NSE Assets</li>
              <li>Real-time Market Analytics</li>
              <li>Secure Blockchain Infrastructure</li>
              <li>Low Transaction Costs</li>
              <li>Automated Trading Strategies</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
