import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Progress } from './ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface TemporalMotorPanelProps {
  className?: string;
}

export default function TemporalMotorPanel({ className }: TemporalMotorPanelProps) {
  const [chronosData, setChronosData] = useState({
    timeSync: 96.7,
    temporalStability: 89.3,
    chronoField: 92.1,
    phaseAlignment: 88.5,
    status: 'SYNCHRONIZED',
    dimensionalFlux: 15.2,
    timeFlow: 'FORWARD'
  });

  const [syncPulse, setSyncPulse] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Simulate real-time updates every 9 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setChronosData(prev => ({
        timeSync: Math.max(85, Math.min(100, prev.timeSync + (Math.random() - 0.5) * 4)),
        temporalStability: Math.max(80, Math.min(100, prev.temporalStability + (Math.random() - 0.5) * 6)),
        chronoField: Math.max(85, Math.min(100, prev.chronoField + (Math.random() - 0.5) * 5)),
        phaseAlignment: Math.max(75, Math.min(100, prev.phaseAlignment + (Math.random() - 0.5) * 8)),
        status: prev.timeSync > 90 ? 'SYNCHRONIZED' : prev.timeSync > 70 ? 'CALIBRATING' : 'DRIFT DETECTED',
        dimensionalFlux: Math.max(10, Math.min(25, prev.dimensionalFlux + (Math.random() - 0.5) * 3)),
        timeFlow: Math.random() > 0.95 ? 'REVERSE' : Math.random() > 0.98 ? 'PAUSED' : 'FORWARD'
      }));

      // Trigger sync pulse animation
      setSyncPulse(true);
      setTimeout(() => setSyncPulse(false), 1500);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SYNCHRONIZED': return 'text-blue-400';
      case 'CALIBRATING': return 'text-yellow-400';
      case 'DRIFT DETECTED': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getTimeFlowColor = (flow: string) => {
    switch (flow) {
      case 'FORWARD': return 'text-green-400';
      case 'REVERSE': return 'text-red-400';
      case 'PAUSED': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className={`bg-gray-900 border-blue-500 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-blue-400 flex items-center gap-2">
          <motion.div
            className="w-3 h-3 bg-blue-500 rounded-full"
            animate={syncPulse ? { 
              scale: [1, 2, 1], 
              opacity: [1, 0.3, 1],
              rotateZ: [0, 180, 360]
            } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          TEMPORAL MOTOR
          <span className="text-sm text-gray-400">(Chronos Division)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Time Sync Display */}
        <div className="text-center">
          <motion.div
            className="text-4xl font-bold text-blue-400 mb-2"
            animate={syncPulse ? { scale: [1, 1.1, 1] } : {}}
          >
            {chronosData.timeSync.toFixed(1)}%
          </motion.div>
          <div className={`text-sm font-semibold ${getStatusColor(chronosData.status)}`}>
            {chronosData.status}
          </div>
        </div>

        {/* Current Time Display */}
        <div className="text-center py-2 border border-blue-800 rounded bg-blue-950/30">
          <div className="text-xs text-gray-400 mb-1">CHRONOS TIME</div>
          <div className="text-lg font-mono text-blue-300">
            {currentTime.toLocaleTimeString()}
          </div>
          <div className="text-xs text-gray-400">
            {currentTime.toLocaleDateString()}
          </div>
        </div>

        {/* Temporal Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Temporal Stability</span>
              <span className="text-blue-300">{chronosData.temporalStability.toFixed(1)}%</span>
            </div>
            <Progress 
              value={chronosData.temporalStability} 
              className="h-2 bg-gray-700"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Chrono Field</span>
              <span className="text-cyan-300">{chronosData.chronoField.toFixed(1)}%</span>
            </div>
            <Progress 
              value={chronosData.chronoField} 
              className="h-2 bg-gray-700"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Phase Alignment</span>
              <span className="text-purple-300">{chronosData.phaseAlignment.toFixed(1)}%</span>
            </div>
            <Progress 
              value={chronosData.phaseAlignment} 
              className="h-2 bg-gray-700"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Dimensional Flux</span>
              <span className="text-orange-300">{chronosData.dimensionalFlux.toFixed(1)} Hz</span>
            </div>
            <Progress 
              value={(chronosData.dimensionalFlux / 25) * 100} 
              className="h-2 bg-gray-700"
            />
          </div>
        </div>

        {/* Time Flow Indicator */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
          <span className="text-xs text-gray-400">Time Flow Direction</span>
          <div className="flex items-center gap-2">
            <motion.div
              className="flex gap-1"
              animate={chronosData.timeFlow === 'FORWARD' ? { x: [0, 5, 0] } : 
                      chronosData.timeFlow === 'REVERSE' ? { x: [0, -5, 0] } : {}}
              transition={{ 
                duration: 1,
                repeat: chronosData.timeFlow !== 'PAUSED' ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
              <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
            </motion.div>
            <span className={`text-sm font-mono ${getTimeFlowColor(chronosData.timeFlow)}`}>
              {chronosData.timeFlow}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}