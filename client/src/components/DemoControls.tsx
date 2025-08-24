import { useState } from 'react';
import { useRealTimeData } from '@/hooks/useRealTimeData';

interface Scenario {
  id: string;
  name: string;
  icon: string;
  description: string;
  complexity: 'low' | 'medium' | 'high' | 'extreme';
  duration: string;
  parameters: Record<string, string | number>;
}

const demoScenarios: Scenario[] = [
  {
    id: 'network-stress',
    name: 'Network Stress Test',
    icon: 'fas fa-network-wired',
    description: 'Simulates high network load to test system resilience and failover capabilities.',
    complexity: 'medium',
    duration: '5 minutes',
    parameters: {
      'Load Factor': '150%',
      'Node Count': 8,
      'Failure Rate': '2%',
      'Recovery Time': '30s'
    }
  },
  {
    id: 'quantum-instability',
    name: 'Quantum Instability',
    icon: 'fas fa-atom',
    description: 'Introduces quantum field fluctuations to test stability mechanisms.',
    complexity: 'high',
    duration: '3 minutes',
    parameters: {
      'Fluctuation Rate': '25Hz',
      'Coherence Loss': '15%',
      'Stabilization': 'Auto',
      'Recovery Method': 'Quantum Correction'
    }
  },
  {
    id: 'security-breach',
    name: 'Security Breach Simulation',
    icon: 'fas fa-shield-virus',
    description: 'Simulates various attack vectors to validate defense systems.',
    complexity: 'extreme',
    duration: '10 minutes',
    parameters: {
      'Attack Vectors': 12,
      'Breach Attempts': '1000/min',
      'Defense Layers': 4,
      'Threat Level': 'Maximum'
    }
  },
  {
    id: 'cognitive-overload',
    name: 'Cognitive Overload',
    icon: 'fas fa-brain',
    description: 'Tests logic core performance under extreme computational demands.',
    complexity: 'high',
    duration: '7 minutes',
    parameters: {
      'Processing Load': '200%',
      'Decision Trees': 50000,
      'Neural Pathways': '2.5M',
      'Cascade Depth': 20
    }
  }
];

export default function DemoControls() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [demoLog, setDemoLog] = useState<Array<{timestamp: string, message: string, type: string}>>([
    { timestamp: '00:00:00', message: 'Demo control system initialized', type: 'info' },
    { timestamp: '00:00:01', message: 'All scenario parameters loaded', type: 'success' },
    { timestamp: '00:00:02', message: 'System ready for demonstration', type: 'info' }
  ]);
  
  const { addAlert } = useRealTimeData();

  const runScenario = async (scenarioId: string) => {
    if (isRunning) return;
    
    const scenario = demoScenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    setSelectedScenario(scenarioId);
    setIsRunning(true);
    setDemoLog([]);
    
    const scenarioSequences = {
      'network-stress': [
        'Initializing network stress test protocol...',
        'Increasing network load to 150% capacity...',
        'Monitoring node performance across 8 global nodes...',
        'Introducing controlled packet loss scenarios...',
        'Testing failover mechanisms... PASSED',
        'Network resilience test: COMPLETED successfully'
      ],
      'quantum-instability': [
        'Activating quantum field manipulation systems...',
        'Introducing controlled coherence fluctuations...',
        'Measuring quantum state degradation patterns...',
        'Activating automatic stabilization protocols...',
        'Quantum correction algorithms: ENGAGED',
        'Field stability restored: Test COMPLETED'
      ],
      'security-breach': [
        'Launching multi-vector attack simulation...',
        'Deploying 1000 breach attempts per minute...',
        'Testing GhostTrace blackout protocols...',
        'Activating FireRatio crisis circuits...',
        'All attack vectors successfully neutralized',
        'Security validation: PASSED with flying colors'
      ],
      'cognitive-overload': [
        'Increasing logic core processing load to 200%...',
        'Generating 50,000 parallel decision trees...',
        'Activating 2.5M neural pathway connections...',
        'Testing cascade depth limits at 20 levels...',
        'Cognitive performance: OPTIMAL under extreme load',
        'Logic core stress test: COMPLETED successfully'
      ]
    };

    const sequence = scenarioSequences[scenarioId as keyof typeof scenarioSequences] || ['Scenario executed successfully'];
    
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      const messageType = sequence[i].includes('COMPLETED') || sequence[i].includes('PASSED') ? 'success' : 
                         sequence[i].includes('ERROR') ? 'error' : 'info';
      
      setDemoLog(prev => [...prev, {
        timestamp,
        message: sequence[i],
        type: messageType
      }]);
      
      addAlert(`Demo: ${sequence[i]}`, messageType as any);
    }
    
    setIsRunning(false);
  };

  const stopScenario = () => {
    setIsRunning(false);
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setDemoLog(prev => [...prev, {
      timestamp,
      message: 'Scenario execution terminated by user',
      type: 'warning'
    }]);
    addAlert('Demo scenario stopped by user', 'warning');
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return 'text-apple-green';
      case 'medium': return 'text-faa-yellow';
      case 'high': return 'text-orange-400';
      case 'extreme': return 'text-apple-red';
      default: return 'text-gray-400';
    }
  };

  const getComplexityBadge = (complexity: string) => {
    switch (complexity) {
      case 'low': return 'bg-apple-green/20 text-apple-green border-apple-green/30';
      case 'medium': return 'bg-faa-yellow/20 text-faa-yellow border-faa-yellow/30';
      case 'high': return 'bg-orange-400/20 text-orange-400 border-orange-400/30';
      case 'extreme': return 'bg-apple-red/20 text-apple-red border-apple-red/30';
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
    }
  };

  return (
    <section id="demo-controls" className="mb-16" data-testid="demo-controls">
      <h2 className="font-orbitron text-3xl font-bold text-faa-yellow text-center mb-12" data-testid="title-demo-controls">
        🎮 DEMO CONTROL PANEL 🎮
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-testid="demo-layout">
        {/* Scenario Selection */}
        <div className="space-y-4" data-testid="scenario-selection">
          <h3 className="font-orbitron text-xl font-bold text-faa-yellow mb-4 flex items-center">
            <i className="fas fa-play-circle mr-3"></i>
            Available Scenarios
          </h3>
          
          {demoScenarios.map((scenario) => (
            <div
              key={scenario.id}
              className={`bg-faa-card border rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                selectedScenario === scenario.id ? 'border-faa-yellow shadow-lg' : 'border-faa-border card-hover'
              } ${isRunning && selectedScenario !== scenario.id ? 'opacity-50' : ''}`}
              onClick={() => !isRunning && setSelectedScenario(scenario.id)}
              data-testid={`scenario-${scenario.id}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <i className={`${scenario.icon} text-faa-yellow text-xl mr-3`}></i>
                  <h4 className="font-semibold text-faa-yellow-light">{scenario.name}</h4>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-semibold border ${getComplexityBadge(scenario.complexity)}`}>
                  {scenario.complexity.toUpperCase()}
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-3">{scenario.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-500">Duration:</span>
                  <span className="text-faa-yellow-light ml-1">{scenario.duration}</span>
                </div>
                <div>
                  <span className="text-gray-500">Parameters:</span>
                  <span className="text-faa-yellow-light ml-1">{Object.keys(scenario.parameters).length}</span>
                </div>
              </div>
              
              {selectedScenario === scenario.id && (
                <div className="mt-4 pt-4 border-t border-faa-border">
                  <h5 className="text-faa-yellow text-sm font-semibold mb-2">Scenario Parameters:</h5>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(scenario.parameters).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-400">{key}:</span>
                        <span className="text-faa-yellow-light">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Demo Console */}
        <div className="bg-faa-card border border-faa-border rounded-xl p-6" data-testid="demo-console">
          <h3 className="font-orbitron text-xl font-bold text-faa-yellow mb-6 flex items-center">
            <i className="fas fa-terminal mr-3"></i>
            Demo Console
          </h3>
          
          <div className="mb-6">
            <div className="flex items-center justify-between p-3 bg-faa-bg border border-faa-border rounded-lg mb-4">
              <span className="text-gray-300">Status:</span>
              <span className={`font-semibold ${isRunning ? 'text-orange-400' : 'text-apple-green'}`}>
                {isRunning ? 'RUNNING' : 'READY'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <button
                onClick={() => selectedScenario && runScenario(selectedScenario)}
                disabled={!selectedScenario || isRunning}
                className="success-button px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-run-scenario"
              >
                <i className="fas fa-play mr-2"></i>
                {isRunning ? 'Running...' : 'Run Scenario'}
              </button>
              
              <button
                onClick={stopScenario}
                disabled={!isRunning}
                className="alert-button px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-stop-scenario"
              >
                <i className="fas fa-stop mr-2"></i>
                Stop
              </button>
            </div>
          </div>
          
          <div className="console-output" data-testid="demo-log">
            {demoLog.map((entry, index) => (
              <div key={index}>
                <span className="timestamp">[{entry.timestamp}]</span> <span className={entry.type}>{entry.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}