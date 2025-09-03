import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface Scenario {
  id: string;
  name: string;
  description: string;
  duration: number;
  parameters: number;
  difficulty: 'MEDIUM' | 'HIGH' | 'EXTREME';
  icon: string;
}

interface DemoControlPanelProps {
  className?: string;
}

export default function DemoControlPanel({ className }: DemoControlPanelProps) {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [scenarioProgress, setScenarioProgress] = useState(0);
  const [systemStatus, setSystemStatus] = useState('READY');

  const scenarios: Scenario[] = [
    {
      id: 'network-stress',
      name: 'Network Stress Test',
      description: 'Simulates high network load to test system resilience and failover capabilities.',
      duration: 5,
      parameters: 4,
      difficulty: 'MEDIUM',
      icon: '🌐'
    },
    {
      id: 'quantum-instability',
      name: 'Quantum Instability',
      description: 'Introduces quantum field fluctuations to test stability mechanisms.',
      duration: 3,
      parameters: 4,
      difficulty: 'HIGH',
      icon: '⚛️'
    },
    {
      id: 'security-breach',
      name: 'Security Breach Simulation',
      description: 'Simulates various attack vectors to validate defense systems.',
      duration: 10,
      parameters: 4,
      difficulty: 'EXTREME',
      icon: '🛡️'
    },
    {
      id: 'cognitive-overload',
      name: 'Cognitive Overload',
      description: 'Tests logic core performance under extreme computational demands.',
      duration: 7,
      parameters: 4,
      difficulty: 'HIGH',
      icon: '🧠'
    }
  ];

  const runScenario = async (scenario: Scenario) => {
    if (activeScenario) return;
    
    setActiveScenario(scenario.id);
    setSystemStatus('RUNNING');
    setConsoleOutput([]);
    setScenarioProgress(0);

    // Simulate real scenario execution
    const steps = getScenarioSteps(scenario.id);
    const totalSteps = steps.length;
    
    for (let i = 0; i < totalSteps; i++) {
      const step = steps[i];
      const timestamp = new Date().toLocaleTimeString();
      
      // Add console output
      setConsoleOutput(prev => [...prev, `[${timestamp}] ${step.message}`]);
      setScenarioProgress(((i + 1) / totalSteps) * 100);
      
      // Wait for step duration
      await new Promise(resolve => setTimeout(resolve, step.duration));
      
      // Update system metrics based on step
      if (step.updateMetrics) {
        // Trigger system updates through API
        try {
          await fetch('/api/scenario-update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              scenario: scenario.id, 
              step: i, 
              metrics: step.metrics 
            })
          });
        } catch (error) {
          console.error('Failed to update metrics:', error);
        }
      }
    }

    setSystemStatus('COMPLETED');
    setTimeout(() => {
      setActiveScenario(null);
      setSystemStatus('READY');
    }, 2000);
  };

  const stopScenario = () => {
    const timestamp = new Date().toLocaleTimeString();
    setConsoleOutput(prev => [...prev, `[${timestamp}] SCENARIO STOPPED BY USER`]);
    setActiveScenario(null);
    setSystemStatus('READY');
    setScenarioProgress(0);
  };

  const getScenarioSteps = (scenarioId: string) => {
    switch (scenarioId) {
      case 'network-stress':
        return [
          { message: 'Initializing network stress test protocol...', duration: 1000, updateMetrics: false },
          { message: 'Increasing network load to 150% capacity...', duration: 2000, updateMetrics: true, metrics: { networkLoad: 150 } },
          { message: 'Monitoring mode performance across 5 global nodes...', duration: 2000, updateMetrics: true, metrics: { activeNodes: 5 } },
          { message: 'Introducing controlled packet loss scenarios...', duration: 2000, updateMetrics: true, metrics: { packetLoss: 5.2 } },
          { message: 'Testing failover mechanisms... PASSED', duration: 1500, updateMetrics: false },
          { message: 'Network resilience test: COMPLETED successfully', duration: 500, updateMetrics: false }
        ];
      
      case 'quantum-instability':
        return [
          { message: 'Activating quantum field generators...', duration: 1000, updateMetrics: false },
          { message: 'Introducing quantum fluctuation patterns...', duration: 1500, updateMetrics: true, metrics: { quantumStability: 75 } },
          { message: 'Monitoring dimensional flux variations...', duration: 2000, updateMetrics: true, metrics: { dimensionalFlux: 23.7 } },
          { message: 'Testing quantum error correction... ACTIVE', duration: 1500, updateMetrics: true, metrics: { errorCorrection: true } },
          { message: 'Quantum instability test: STABILIZED', duration: 1000, updateMetrics: false }
        ];
      
      case 'security-breach':
        return [
          { message: 'Initiating security breach simulation...', duration: 1000, updateMetrics: false },
          { message: 'Deploying 12 breach attempts across attack vectors...', duration: 2000, updateMetrics: true, metrics: { attackVectors: 12 } },
          { message: 'Testing defense layer responses...', duration: 2500, updateMetrics: true, metrics: { defenseActivated: true } },
          { message: 'Simulating advanced persistent threats...', duration: 3000, updateMetrics: true, metrics: { threatLevel: 'Maximum' } },
          { message: 'Validating incident response protocols...', duration: 2000, updateMetrics: false },
          { message: 'Security breach simulation: ALL THREATS NEUTRALIZED', duration: 500, updateMetrics: false }
        ];
      
      case 'cognitive-overload':
        return [
          { message: 'Initializing cognitive stress protocols...', duration: 1000, updateMetrics: false },
          { message: 'Increasing computational load to extreme levels...', duration: 2000, updateMetrics: true, metrics: { cognitiveLoad: 95 } },
          { message: 'Testing parallel processing capabilities...', duration: 2500, updateMetrics: true, metrics: { parallelThreads: 256 } },
          { message: 'Monitoring logic core thermal management...', duration: 2000, updateMetrics: true, metrics: { coreTemp: 87 } },
          { message: 'Cognitive overload test: PERFORMANCE MAINTAINED', duration: 500, updateMetrics: false }
        ];
      
      default:
        return [{ message: 'Unknown scenario', duration: 1000, updateMetrics: false }];
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-400/20';
      case 'HIGH': return 'text-orange-400 bg-orange-400/20';
      case 'EXTREME': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Demo Control Panel Header */}
      <Card className="bg-gray-900 border-yellow-500">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center gap-3 text-2xl">
            <span className="text-2xl">🎮</span>
            DEMO CONTROL PANEL
            <span className="text-2xl">🎮</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Scenarios */}
        <Card className="bg-gray-900 border-gray-600">
          <CardHeader>
            <CardTitle className="text-orange-400 flex items-center gap-2">
              💡 Available Scenarios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {scenarios.map((scenario) => (
              <motion.div
                key={scenario.id}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  activeScenario === scenario.id 
                    ? 'border-yellow-400 bg-yellow-400/10' 
                    : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                }`}
                whileHover={{ scale: 1.02 }}
                onClick={() => activeScenario ? null : runScenario(scenario)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{scenario.icon}</span>
                    <h3 className="text-white font-semibold">{scenario.name}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(scenario.difficulty)}`}>
                    {scenario.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm mb-3">{scenario.description}</p>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Duration: {scenario.duration} minutes</span>
                  <span>Parameters: {scenario.parameters}</span>
                </div>

                {activeScenario === scenario.id && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-yellow-400 mb-1">
                      <span>Running...</span>
                      <span>{scenarioProgress.toFixed(0)}%</span>
                    </div>
                    <Progress value={scenarioProgress} className="h-2" />
                  </div>
                )}
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Demo Console */}
        <Card className="bg-gray-900 border-green-500">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center justify-between">
              <span className="flex items-center gap-2">
                &gt; Demo Console
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">Status:</span>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  systemStatus === 'READY' ? 'text-green-400 bg-green-400/20' :
                  systemStatus === 'RUNNING' ? 'text-yellow-400 bg-yellow-400/20' :
                  'text-blue-400 bg-blue-400/20'
                }`}>
                  {systemStatus}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black rounded p-4 font-mono text-sm h-64 overflow-y-auto">
              <AnimatePresence>
                {consoleOutput.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-1 ${
                      line.includes('PASSED') || line.includes('COMPLETED') || line.includes('STABILIZED') || line.includes('NEUTRALIZED') ? 'text-green-400' :
                      line.includes('ERROR') || line.includes('FAILED') ? 'text-red-400' :
                      line.includes('RUNNING') || line.includes('ACTIVE') ? 'text-yellow-400' :
                      'text-green-300'
                    }`}
                  >
                    {line}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {!activeScenario && consoleOutput.length === 0 && (
                <div className="text-gray-500">
                  Console ready. Select a scenario to begin testing...
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-4">
              {activeScenario && (
                <Button 
                  onClick={stopScenario}
                  variant="destructive"
                  size="sm"
                >
                  Stop
                </Button>
              )}
              <Button 
                onClick={() => setConsoleOutput([])}
                variant="outline"
                size="sm"
                disabled={!!activeScenario}
              >
                Clear Console
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}