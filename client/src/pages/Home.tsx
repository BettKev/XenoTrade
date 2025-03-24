import React from 'react';
import { motion } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: "Real-Time Trading",
    description: "Execute trades instantly with our advanced trading engine",
    icon: "⚡"
  },
  {
    title: "Portfolio Management",
    description: "Track and manage your investments in one place",
    icon: "📊"
  },
  {
    title: "Secure Platform",
    description: "Bank-grade security for your peace of mind",
    icon: "🔒"
  }
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-6">Welcome to XenoTrade</h1>
          <p className="text-xl text-gray-300 mb-8">
            XenoTrade is your trusted platform for seamless and secure trading.
            Join thousands of users who are already benefiting from our cutting-edge tools and services.
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose XenoTrade?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
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
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full 
                    transition-colors duration-300 shadow-lg"
          onClick={() => alert('Get Started!')}
        >
          Start Trading Now
        </motion.button>
      </section>
    </div>
  );
};

export default Home;
