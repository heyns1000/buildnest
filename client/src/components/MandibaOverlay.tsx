import React from 'react';
import { motion } from 'framer-motion';
import MandibaImage from '@assets/Madiba_mock_1756082668111.png';

interface MandibaOverlayProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export default function MandibaOverlay({ isVisible, onComplete }: MandibaOverlayProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full h-full z-[99999] bg-black flex items-center justify-center"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        backgroundColor: '#000000'
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-8"
        >
          <img 
            src={MandibaImage} 
            alt="MANDIBA"
            className="h-48 md:h-64 mx-auto rounded-lg"
          />
        </motion.div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          className="w-32 h-32 mx-auto border-4 border-yellow-400 rounded-full flex items-center justify-center mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-2 border-yellow-400 border-t-transparent rounded-full"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-2xl text-yellow-300 font-mono"
        >
          INITIALIZING COMPLETE SYSTEM
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 2, duration: 3, ease: "easeInOut" }}
          className="mt-8 h-1 bg-yellow-400 mx-auto max-w-md"
        />
      </motion.div>
    </motion.div>
  );
}