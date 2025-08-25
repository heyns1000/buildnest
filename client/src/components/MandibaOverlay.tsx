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
    <div
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
      <img 
        src={MandibaImage} 
        alt="MANDIBA"
        className="w-full h-full object-cover"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
  );
}