import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Progress } from './ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface FusionMotorPanelProps {
  className?: string;
}

export default function FusionMotorPanel({ className }: FusionMotorPanelProps) {
  const [thermalData, setThermalData] = useState({
    efficiency: 78.5,
    temperature: 1247,
    pressure: 94.2,
    energy: 99.1,
    status: 'OPTIMAL',
    cognitiveLoad: 73.5,
    pulseRate: 142
  });

  const [pulseActive, setPulseActive] = useState(false);

  // Simulate real-time updates every 9 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setThermalData(prev => ({
        efficiency: Math.max(70, Math.min(100, prev.efficiency + (Math.random() - 0.5) * 5)),
        temperature: Math.max(1200, Math.min(1300, prev.temperature + (Math.random() - 0.5) * 20)),
        pressure: Math.max(85, Math.min(100, prev.pressure + (Math.random() - 0.5) * 4)),
        energy: Math.max(90, Math.min(100, prev.energy + (Math.random() - 0.5) * 3)),
        status: prev.efficiency > 75 ? 'OPTIMAL' : prev.efficiency > 50 ? 'STABLE' : 'CRITICAL',
        cognitiveLoad: Math.max(60, Math.min(90, prev.cognitiveLoad + (Math.random() - 0.5) * 8)),
        pulseRate: Math.max(120, Math.min(180, prev.pulseRate + (Math.random() - 0.5) * 10))
      }));

      // Trigger pulse animation
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 1000);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPTIMAL': return 'text-green-400';
      case 'STABLE': return 'text-yellow-400';
      case 'CRITICAL': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className={`bg-gray-900 border-orange-500 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-orange-400 flex items-center gap-2">
          <motion.div
            className="w-3 h-3 bg-orange-500 rounded-full"
            animate={pulseActive ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          FUSION MOTOR
          <span className="text-sm text-gray-400">(Thermal Division)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Efficiency Display */}
        <div className="text-center">
          <motion.div
            className="text-4xl font-bold text-orange-400 mb-2"
            animate={pulseActive ? { scale: [1, 1.1, 1] } : {}}
          >
            {thermalData.efficiency.toFixed(1)}%
          </motion.div>
          <div className={`text-sm font-semibold ${getStatusColor(thermalData.status)}`}>
            {thermalData.status}
          </div>
        </div>

        {/* Thermal Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Temperature</span>
              <span className="text-orange-300">{thermalData.temperature}°K</span>
            </div>
            <Progress 
              value={(thermalData.temperature - 1200) / 100 * 100} 
              className="h-2 bg-gray-700"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Pressure</span>
              <span className="text-blue-300">{thermalData.pressure.toFixed(1)} Bar</span>
            </div>
            <Progress 
              value={thermalData.pressure} 
              className="h-2 bg-gray-700"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Energy Output</span>
              <span className="text-green-300">{thermalData.energy.toFixed(1)}%</span>
            </div>
            <Progress 
              value={thermalData.energy} 
              className="h-2 bg-gray-700"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Cognitive Load</span>
              <span className="text-purple-300">{thermalData.cognitiveLoad.toFixed(1)}%</span>
            </div>
            <Progress 
              value={thermalData.cognitiveLoad} 
              className="h-2 bg-gray-700"
            />
          </div>
        </div>

        {/* Pulse Rate Indicator */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
          <span className="text-xs text-gray-400">Fusion Pulse Rate</span>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-orange-500 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 60 / thermalData.pulseRate,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="text-orange-300 text-sm font-mono">
              {thermalData.pulseRate} BPM
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}