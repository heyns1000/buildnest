import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

interface PulseSyncComponentsProps {
  className?: string;
}

export default function PulseSyncComponents({ className }: PulseSyncComponentsProps) {
  const [syncData, setSyncData] = useState({
    pulseIndex: {
      frequency: 142.7,
      amplitude: 87.3,
      coherence: 94.1,
      status: 'LOCKED'
    },
    autoSign: {
      signatureMatch: 98.2,
      verification: 91.6,
      integrity: 96.8,
      status: 'VERIFIED'
    },
    omniTrace: {
      traceDepth: 15.7,
      pathAccuracy: 89.4,
      convergence: 92.3,
      status: 'TRACKING'
    }
  });

  const [globalPulse, setGlobalPulse] = useState(false);

  // Global pulse sync every 9 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncData(prev => ({
        pulseIndex: {
          frequency: Math.max(120, Math.min(180, prev.pulseIndex.frequency + (Math.random() - 0.5) * 10)),
          amplitude: Math.max(70, Math.min(100, prev.pulseIndex.amplitude + (Math.random() - 0.5) * 8)),
          coherence: Math.max(85, Math.min(100, prev.pulseIndex.coherence + (Math.random() - 0.5) * 5)),
          status: Math.random() > 0.8 ? 'SYNCING' : Math.random() > 0.9 ? 'DRIFT' : 'LOCKED'
        },
        autoSign: {
          signatureMatch: Math.max(90, Math.min(100, prev.autoSign.signatureMatch + (Math.random() - 0.5) * 3)),
          verification: Math.max(80, Math.min(100, prev.autoSign.verification + (Math.random() - 0.5) * 6)),
          integrity: Math.max(90, Math.min(100, prev.autoSign.integrity + (Math.random() - 0.5) * 4)),
          status: Math.random() > 0.85 ? 'VERIFYING' : Math.random() > 0.95 ? 'INVALID' : 'VERIFIED'
        },
        omniTrace: {
          traceDepth: Math.max(10, Math.min(25, prev.omniTrace.traceDepth + (Math.random() - 0.5) * 3)),
          pathAccuracy: Math.max(75, Math.min(100, prev.omniTrace.pathAccuracy + (Math.random() - 0.5) * 7)),
          convergence: Math.max(80, Math.min(100, prev.omniTrace.convergence + (Math.random() - 0.5) * 5)),
          status: Math.random() > 0.7 ? 'TRACKING' : Math.random() > 0.9 ? 'LOST' : 'CONVERGED'
        }
      }));

      // Trigger global pulse
      setGlobalPulse(true);
      setTimeout(() => setGlobalPulse(false), 1500);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      'LOCKED': 'text-green-400',
      'SYNCING': 'text-yellow-400',
      'DRIFT': 'text-red-400',
      'VERIFIED': 'text-blue-400',
      'VERIFYING': 'text-yellow-400',
      'INVALID': 'text-red-400',
      'TRACKING': 'text-cyan-400',
      'CONVERGED': 'text-green-400',
      'LOST': 'text-red-400'
    };
    return statusColors[status] || 'text-gray-400';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Global Sync Indicator */}
      <div className="text-center mb-6">
        <motion.div
          className="inline-flex items-center gap-3 px-4 py-2 bg-gray-800 rounded-lg border border-gray-600"
          animate={globalPulse ? { 
            scale: [1, 1.05, 1],
            borderColor: ['#4B5563', '#F59E0B', '#4B5563']
          } : {}}
        >
          <motion.div
            className="w-4 h-4 bg-yellow-500 rounded-full"
            animate={globalPulse ? {
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            } : {
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: globalPulse ? 1.5 : 2,
              repeat: globalPulse ? 0 : Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="text-yellow-400 font-mono text-sm">
            FRUITFUL PLANET CHANGE SYNC
          </span>
          <span className="text-gray-400 text-xs">
            9s intervals
          </span>
        </motion.div>
      </div>

      {/* Pulse Sync Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PulseIndex */}
        <Card className="bg-gray-900 border-cyan-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-cyan-400 flex items-center gap-2 text-lg">
              <motion.div
                className="w-3 h-3 bg-cyan-500 rounded-full"
                animate={globalPulse ? { 
                  scale: [1, 2, 1],
                  opacity: [1, 0.3, 1]
                } : {
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: globalPulse ? 1.5 : 60 / syncData.pulseIndex.frequency,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              PulseIndex™
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">
                {syncData.pulseIndex.frequency.toFixed(1)} Hz
              </div>
              <div className={`text-xs font-semibold ${getStatusColor(syncData.pulseIndex.status)}`}>
                {syncData.pulseIndex.status}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Amplitude</span>
                <span className="text-cyan-300">{syncData.pulseIndex.amplitude.toFixed(1)}%</span>
              </div>
              <Progress value={syncData.pulseIndex.amplitude} className="h-1 bg-gray-700" />

              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Coherence</span>
                <span className="text-cyan-300">{syncData.pulseIndex.coherence.toFixed(1)}%</span>
              </div>
              <Progress value={syncData.pulseIndex.coherence} className="h-1 bg-gray-700" />
            </div>
          </CardContent>
        </Card>

        {/* AutoSign */}
        <Card className="bg-gray-900 border-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-400 flex items-center gap-2 text-lg">
              <motion.div
                className="w-3 h-3 bg-blue-500 rounded-full"
                animate={globalPulse ? { 
                  rotateZ: [0, 360],
                  scale: [1, 1.3, 1]
                } : {}}
                transition={{ duration: 1.5 }}
              />
              AutoSign™
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {syncData.autoSign.signatureMatch.toFixed(1)}%
              </div>
              <div className={`text-xs font-semibold ${getStatusColor(syncData.autoSign.status)}`}>
                {syncData.autoSign.status}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Verification</span>
                <span className="text-blue-300">{syncData.autoSign.verification.toFixed(1)}%</span>
              </div>
              <Progress value={syncData.autoSign.verification} className="h-1 bg-gray-700" />

              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Integrity</span>
                <span className="text-blue-300">{syncData.autoSign.integrity.toFixed(1)}%</span>
              </div>
              <Progress value={syncData.autoSign.integrity} className="h-1 bg-gray-700" />
            </div>
          </CardContent>
        </Card>

        {/* OmniTrace */}
        <Card className="bg-gray-900 border-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-orange-400 flex items-center gap-2 text-lg">
              <motion.div
                className="w-3 h-3 bg-orange-500 rounded-full"
                animate={globalPulse ? { 
                  scale: [1, 0.5, 1.5, 1],
                  opacity: [1, 0.3, 0.8, 1]
                } : {}}
                transition={{ duration: 1.5 }}
              />
              OmniTrace™
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">
                {syncData.omniTrace.traceDepth.toFixed(1)}
              </div>
              <div className={`text-xs font-semibold ${getStatusColor(syncData.omniTrace.status)}`}>
                {syncData.omniTrace.status}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Path Accuracy</span>
                <span className="text-orange-300">{syncData.omniTrace.pathAccuracy.toFixed(1)}%</span>
              </div>
              <Progress value={syncData.omniTrace.pathAccuracy} className="h-1 bg-gray-700" />

              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Convergence</span>
                <span className="text-orange-300">{syncData.omniTrace.convergence.toFixed(1)}%</span>
              </div>
              <Progress value={syncData.omniTrace.convergence} className="h-1 bg-gray-700" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}