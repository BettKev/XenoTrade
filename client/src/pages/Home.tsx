import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLogin } from '../contexts/LoginContext';
import { ChartBarIcon, ShieldCheckIcon, CurrencyDollarIcon, ClockIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { TypeAnimation } from 'react-type-animation';
import AIAssistant from '../components/AIAssistant';
import BACKEND_API_URL from '../config';


interface MarketResponse {
  id: number;
  name: string;
  symbol: string;
  last_price: number;
  change_percent: number;
  volume: number;
}

interface StockResponse {
  id: number;
  symbol: string;
  name: string;
  price: number;
  market_id: number;
}

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

const styles = `
  @keyframes ticker {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  .animate-ticker {
    animation: ticker 30s linear infinite;
  }

  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }

  .typing-cursor {
    display: inline-block;
    width: 2px;
    height: 1em;
    background: linear-gradient(to right, #3b82f6, #9333ea);
    margin-left: 4px;
    animation: blink 1s infinite;
  }
`;

const POLLING_INTERVAL = 5000; // 5 seconds
const WS_URL = 'ws://127.0.0.1:8000/ws';

const Home: React.FC = () => {
  const { openLoginModal } = useLogin();
  const [stocks, setStocks] = useState<StockResponse[]>([]);
  const [marketStats, setMarketStats] = useState<MarketResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showChat, setShowChat] = useState(false);
  
  
  const updateData = useCallback(async () => {
    try {
      const [stocksRes, statsRes] = await Promise.all([
        axios.get(`${BACKEND_API_URL}stocks`),
        axios.get(`${BACKEND_API_URL}market_stats`)
      ]);
      
      setStocks(prevStocks => {
        return stocksRes.data.map((newStock: StockResponse) => ({
          ...newStock,
          change: newStock.price - (prevStocks.find(s => s.id === newStock.id)?.price || newStock.price)
        }));
      });
      
      setMarketStats(prevStats => {
        return statsRes.data.map((newStat: MarketResponse) => ({
          ...newStat,
          change: newStat.change_percent - (prevStats.find(s => s.id === newStat.id)?.change_percent || newStat.change_percent)
        }));
      });
    } catch (error) {
      console.error('Error fetching updates:', error);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [stocksRes, statsRes] = await Promise.all([
          axios.get(`${BACKEND_API_URL}stocks`),
          axios.get(`${BACKEND_API_URL}market_stats`)
        ]);
        console.log("Stocks:", stocksRes.data)
        setStocks(stocksRes.data);
        setMarketStats(statsRes.data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  

  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log('WebSocket Connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'stocks') {
        setStocks(data.data);
      } else if (data.type === 'market_stats') {
        setMarketStats(data.data);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Fallback polling if WebSocket fails
    const pollInterval = setInterval(() => {
      if (ws.readyState !== WebSocket.OPEN) {
        updateData();
      }
    }, POLLING_INTERVAL);

    return () => {
      ws.close();
      clearInterval(pollInterval);
    };
  }, [updateData]);

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      <style>{styles}</style>
      {/* Market Ticker */}
      <div className="bg-[#131722] border-b border-gray-800">
        <div className="container mx-auto py-2 px-4 overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="flex whitespace-nowrap animate-ticker">
              {[...stocks, ...stocks].map((stock, index) => (
                <motion.div
                  key={`${stock.id}-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-2 mx-4"
                >
                  <span className="font-semibold">{stock.id}</span>
                  <span>{stock.price?.toFixed(2)?? "N/A"}</span>
                  <span className={stock.price >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {stock.price >= 0 ? '+' : ''}{stock.price?.toFixed(2)?? "N/A"}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
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
          <h1 className="text-3xl md:text-5xl font-bold mb-6 px-2">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              <TypeAnimation
                sequence={[
                  'Trade Smarter with XenoTrade',
                  2000,
                  'Experience Next-Gen Trading',
                  2000,
                  'Unlock Financial Freedom',
                  2000,
                  'Navigate Markets with Confidence',
                  2000,
                  'Your Success, Our Priority',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={false}
                style={{ 
                  display: 'inline-block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal',
                  wordWrap: 'break-word'
                }}
              />
              <span className="typing-cursor"></span>
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Experience professional-grade trading with advanced charts, real-time data, and institutional-level execution speed.
          </p>
        </motion.div>
      </section>

      {/* Market Stats Section */}
      <section className="container mx-auto px-6 py-12 bg-[#131722] rounded-lg mx-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6">Market Statistics</h2>
              <div className="space-y-4">
                {marketStats.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-[#1e222d] p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">{stat.name}</span>
                      <div className="text-right">
                        <div className="font-semibold">{stat.volume?.toFixed(2)?? "N/A"}</div>
                        <div className={stat.change_percent >= 0 ? 'text-green-400' : 'text-red-400'}>
                          {stat.change_percent >= 0 ? '+' : ''}{stat.last_price?.toFixed(2)?? "N/A"} ({stat.change_percent?.toFixed(2)?? "N/A"}%)
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Active Stocks</h2>
              <div className="space-y-4">
                {stocks.map((stock, index) => (
                  <motion.div
                    key={stock.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-[#1e222d] p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{stock.name}</div>
                        <div className="text-gray-400">{stock.id}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{stock.price?.toFixed(2)?? "N/A"}</div>
                        <div className={stock.price >= 0 ? 'text-green-400' : 'text-red-400'}>
                          {stock.price >= 0 ? '+' : ''}{stock.price?.toFixed(2)?? "N/A"}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-400">
                      Volume: {stock.price.toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
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

      {/* AI Assistant Button & Component */}
      <div className="fixed bottom-4 right-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAIAssistant(!showAIAssistant)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
        >
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
        </motion.button>
      </div>
      {showAIAssistant && <AIAssistant 
  isVisible={showChat} 
  onClose={() => setShowChat(!showChat)} 
/>}
    </div>
  );
};

export default Home;
