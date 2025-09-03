import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

interface CoreModulesProps {
  className?: string;
}

export default function CoreModules({ className }: CoreModulesProps) {
  const [moduleData, setModuleData] = useState({
    corethink: {
      efficiency: 73.5,
      cognitiveLoad: 82.1,
      processingSpeed: 94.7,
      status: 'ANALYZING'
    },
    truthweight: {
      accuracy: 96.4,
      validation: 88.3,
      trustIndex: 91.7,
      status: 'VALIDATING'
    },
    ecosynth: {
      synthesis: 87.9,
      harmonics: 93.2,
      resonance: 85.6,
      status: 'HARMONIZING'
    }
  });

  const [flowActive, setFlowActive] = useState(false);

  // Simulate real-time updates every 9 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setModuleData(prev => ({
        corethink: {
          efficiency: Math.max(60, Math.min(100, prev.corethink.efficiency + (Math.random() - 0.5) * 8)),
          cognitiveLoad: Math.max(70, Math.min(100, prev.corethink.cognitiveLoad + (Math.random() - 0.5) * 6)),
          processingSpeed: Math.max(80, Math.min(100, prev.corethink.processingSpeed + (Math.random() - 0.5) * 4)),
          status: Math.random() > 0.7 ? 'ANALYZING' : Math.random() > 0.3 ? 'PROCESSING' : 'IDLE'
        },
        truthweight: {
          accuracy: Math.max(85, Math.min(100, prev.truthweight.accuracy + (Math.random() - 0.5) * 3)),
          validation: Math.max(75, Math.min(100, prev.truthweight.validation + (Math.random() - 0.5) * 5)),
          trustIndex: Math.max(80, Math.min(100, prev.truthweight.trustIndex + (Math.random() - 0.5) * 4)),
          status: Math.random() > 0.6 ? 'VALIDATING' : Math.random() > 0.3 ? 'CROSS-CHECKING' : 'VERIFIED'
        },
        ecosynth: {
          synthesis: Math.max(75, Math.min(100, prev.ecosynth.synthesis + (Math.random() - 0.5) * 6)),
          harmonics: Math.max(80, Math.min(100, prev.ecosynth.harmonics + (Math.random() - 0.5) * 5)),
          resonance: Math.max(70, Math.min(100, prev.ecosynth.resonance + (Math.random() - 0.5) * 7)),
          status: Math.random() > 0.5 ? 'HARMONIZING' : Math.random() > 0.3 ? 'SYNTHESIZING' : 'RESONANT'
        }
      }));

      // Trigger flow animation
      setFlowActive(true);
      setTimeout(() => setFlowActive(false), 2000);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      'ANALYZING': 'text-yellow-400',
      'PROCESSING': 'text-blue-400',
      'IDLE': 'text-gray-400',
      'VALIDATING': 'text-green-400',
      'CROSS-CHECKING': 'text-orange-400',
      'VERIFIED': 'text-emerald-400',
      'HARMONIZING': 'text-purple-400',
      'SYNTHESIZING': 'text-pink-400',
      'RESONANT': 'text-cyan-400'
    };
    return statusColors[status] || 'text-gray-400';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Module Flow Visualization */}
      <div className="flex items-center justify-between mb-6">
        <motion.div
          className="flex items-center gap-4"
          animate={flowActive ? { scale: [1, 1.05, 1] } : {}}
        >
          {/* Flow arrows */}
          <motion.div
            className="text-2xl text-yellow-400"
            animate={flowActive ? { x: [0, 10, 0], opacity: [0.5, 1, 0.5] } : {}}
          >
            ⟶
          </motion.div>
          <span className="text-sm text-gray-400 font-mono">Corethink</span>
          <motion.div
            className="text-2xl text-green-400"
            animate={flowActive ? { x: [0, 10, 0], opacity: [0.5, 1, 0.5] } : {}}
            transition={{ delay: 0.3 }}
          >
            ⟶
          </motion.div>
          <span className="text-sm text-gray-400 font-mono">TruthWeight</span>
          <motion.div
            className="text-2xl text-purple-400"
            animate={flowActive ? { x: [0, 10, 0], opacity: [0.5, 1, 0.5] } : {}}
            transition={{ delay: 0.6 }}
          >
            ⟶
          </motion.div>
          <span className="text-sm text-gray-400 font-mono">EchoSynth</span>
        </motion.div>
      </div>

      {/* Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Corethink Module */}
        <Card className="bg-gray-900 border-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-yellow-400 flex items-center gap-2 text-lg">
              <motion.div
                className="w-3 h-3 bg-yellow-500 rounded-full"
                animate={flowActive ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] } : {}}
              />
              Corethink™
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {moduleData.corethink.efficiency.toFixed(1)}%
              </div>
              <div className={`text-xs font-semibold ${getStatusColor(moduleData.corethink.status)}`}>
                {moduleData.corethink.status}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Cognitive Load</span>
                <span className="text-yellow-300">{moduleData.corethink.cognitiveLoad.toFixed(1)}%</span>
              </div>
              <Progress value={moduleData.corethink.cognitiveLoad} className="h-1 bg-gray-700" />

              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Processing Speed</span>
                <span className="text-yellow-300">{moduleData.corethink.processingSpeed.toFixed(1)}%</span>
              </div>
              <Progress value={moduleData.corethink.processingSpeed} className="h-1 bg-gray-700" />
            </div>
          </CardContent>
        </Card>

        {/* TruthWeight Module */}
        <Card className="bg-gray-900 border-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-400 flex items-center gap-2 text-lg">
              <motion.div
                className="w-3 h-3 bg-green-500 rounded-full"
                animate={flowActive ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] } : {}}
                transition={{ delay: 0.3 }}
              />
              TruthWeight™
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {moduleData.truthweight.accuracy.toFixed(1)}%
              </div>
              <div className={`text-xs font-semibold ${getStatusColor(moduleData.truthweight.status)}`}>
                {moduleData.truthweight.status}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Validation</span>
                <span className="text-green-300">{moduleData.truthweight.validation.toFixed(1)}%</span>
              </div>
              <Progress value={moduleData.truthweight.validation} className="h-1 bg-gray-700" />

              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Trust Index</span>
                <span className="text-green-300">{moduleData.truthweight.trustIndex.toFixed(1)}%</span>
              </div>
              <Progress value={moduleData.truthweight.trustIndex} className="h-1 bg-gray-700" />
            </div>
          </CardContent>
        </Card>

        {/* EchoSynth Module */}
        <Card className="bg-gray-900 border-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-400 flex items-center gap-2 text-lg">
              <motion.div
                className="w-3 h-3 bg-purple-500 rounded-full"
                animate={flowActive ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] } : {}}
                transition={{ delay: 0.6 }}
              />
              EchoSynth™
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {moduleData.ecosynth.synthesis.toFixed(1)}%
              </div>
              <div className={`text-xs font-semibold ${getStatusColor(moduleData.ecosynth.status)}`}>
                {moduleData.ecosynth.status}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Harmonics</span>
                <span className="text-purple-300">{moduleData.ecosynth.harmonics.toFixed(1)}%</span>
              </div>
              <Progress value={moduleData.ecosynth.harmonics} className="h-1 bg-gray-700" />

              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Resonance</span>
                <span className="text-purple-300">{moduleData.ecosynth.resonance.toFixed(1)}%</span>
              </div>
              <Progress value={moduleData.ecosynth.resonance} className="h-1 bg-gray-700" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}