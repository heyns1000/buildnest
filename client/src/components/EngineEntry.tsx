import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface EngineEntryProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export default function EngineEntry({ isVisible, onComplete }: EngineEntryProps) {
  if (!isVisible) return null;

  const engines = [
    { name: 'OMNI ENGINE', description: 'Full spectrum operations control', color: 'bg-yellow-500' },
    { name: 'QUANTUM ENGINE', description: 'Advanced quantum processing', color: 'bg-blue-500' },
    { name: 'NEURAL ENGINE', description: 'AI-powered decision making', color: 'bg-green-500' },
    { name: 'FUSION ENGINE', description: 'Multi-system integration', color: 'bg-purple-500' },
    { name: 'TEMPORAL ENGINE', description: 'Time-sensitive operations', color: 'bg-red-500' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full h-full z-[99999] bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center"
    >
      <div className="text-center space-y-8 p-8">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl font-bold text-yellow-400 mb-4"
          style={{ fontFamily: 'Orbitron, monospace' }}
        >
          SELECT ENGINE
        </motion.h1>
        
        <motion.p 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-300 mb-8"
        >
          Choose your operational engine to enter FAA.zone™ MONSTER OMNI™
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
          {engines.map((engine, index) => (
            <motion.div
              key={engine.name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 border border-gray-600 rounded-lg p-6 cursor-pointer hover:border-yellow-400 transition-all duration-300"
              onClick={onComplete}
            >
              <div className={`w-12 h-12 ${engine.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                <div className="w-6 h-6 bg-white rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{engine.name}</h3>
              <p className="text-gray-400 text-sm">{engine.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8"
        >
          <Button 
            onClick={onComplete}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 text-lg"
          >
            ENTER SYSTEM →
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}