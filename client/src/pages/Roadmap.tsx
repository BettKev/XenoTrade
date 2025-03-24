import React from 'react';
import { motion } from 'framer-motion';

interface RoadmapPhase {
  title: string;
  description: string[];
  status: 'completed' | 'in-progress' | 'upcoming';
}

const roadmapData: RoadmapPhase[] = [
  {
    title: 'Phase 1: MVP Development',
    description: [
      'Frontend Development (React + Vite PWA)',
      'Backend Implementation (Node.js + Express)',
      'AI Models Integration',
      'Blockchain Integration with Hedera',
    ],
    status: 'in-progress',
  },
  {
    title: 'Phase 2: AI Model Optimization & Beta Testing',
    description: [
      'AI Trading Assistant Refinement',
      'Market Predictor AI Training',
      'Risk Management System Implementation',
      'Beta Testing Program Launch',
    ],
    status: 'upcoming',
  },
  {
    title: 'Phase 3: Smart Contract Deployment & NSE Integration',
    description: [
      'Smart Contract Development & Auditing',
      'NSE Market Data Integration',
      'Asset Tokenization Implementation',
      'Regulatory Compliance Integration',
    ],
    status: 'upcoming',
  },
  {
    title: 'Phase 4: Full Launch & User Acquisition',
    description: [
      'Platform Launch Marketing Campaign',
      'Community Building Initiatives',
      'Educational Content Release',
      'Partnership Development',
    ],
    status: 'upcoming',
  },
];

const Roadmap: React.FC = () => {
  const getStatusColor = (status: RoadmapPhase['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'upcoming':
        return 'bg-gray-500';
    }
  };

  const progressVariants = {
    initial: { width: 0 },
    animate: (status: RoadmapPhase['status']) => ({
      width: status === 'completed' ? '100%' : status === 'in-progress' ? '50%' : '0%',
      transition: { duration: 1.5, ease: "easeInOut" }
    })
  };

  const phaseVariants = {
    hover: {
      scale: 1.02,
      translateY: -5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">Development Roadmap</h1>
          <p className="text-gray-300 mb-12">
            Track our progress as we build the future of tokenized trading in Kenya.
          </p>

          <div className="space-y-8">
            {roadmapData.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover="hover"
                variants={phaseVariants}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative pl-8 pb-8 border-l-2 border-gray-700 last:border-l-0"
              >
                {/* Timeline dot */}
                <div className={`absolute left-[-9px] w-4 h-4 rounded-full ${getStatusColor(phase.status)}`} />
                
                {/* Phase content */}
                <div className="bg-gray-800 rounded-lg p-6 shadow-xl overflow-hidden relative">
                  {/* Progress bar */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 ${getStatusColor(phase.status)}`}
                    variants={progressVariants}
                    initial="initial"
                    animate="animate"
                    custom={phase.status}
                  />

                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                    {phase.title}
                    <motion.span 
                      className={`text-xs px-3 py-1 rounded-full ${
                        phase.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                        phase.status === 'in-progress' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {phase.status === 'completed' ? 'Completed' :
                       phase.status === 'in-progress' ? 'In Progress' :
                       'Upcoming'}
                    </motion.span>
                  </h3>
                  <ul className="space-y-2">
                    {phase.description.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ x: 10 }}
                        transition={{ delay: index * 0.2 + itemIndex * 0.1 }}
                        className="flex items-center gap-2 text-gray-300 cursor-pointer"
                      >
                        <motion.svg 
                          className={`w-5 h-5 ${
                            phase.status === 'completed' ? 'text-green-500' :
                            phase.status === 'in-progress' ? 'text-blue-500' :
                            'text-gray-500'
                          }`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          {phase.status === 'completed' ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          )}
                        </motion.svg>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Roadmap;
