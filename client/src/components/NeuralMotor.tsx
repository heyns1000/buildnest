import { useState, useEffect } from 'react';
import { useRealTimeData } from '@/hooks/useRealTimeData';

interface NeuralEngine {
  id: string;
  name: string;
  synapseCount: number;
  neuronFiring: number;
  memoryCapacity: number;
  learningRate: number;
  cognitionLevel: number;
  status: 'thinking' | 'learning' | 'dreaming' | 'broem';
}

export default function NeuralMotor() {
  const [neuralEngines, setNeuralEngines] = useState<NeuralEngine[]>([
    {
      id: 'ne-alpha',
      name: 'Neural Motor Alpha',
      synapseCount: 1247000,
      neuronFiring: 847.3,
      memoryCapacity: 95.2,
      learningRate: 87.6,
      cognitionLevel: 92.4,
      status: 'thinking'
    },
    {
      id: 'ne-beta',
      name: 'Neural Motor Beta',
      synapseCount: 987000,
      neuronFiring: 623.8,
      memoryCapacity: 78.9,
      learningRate: 91.2,
      cognitionLevel: 88.7,
      status: 'learning'
    },
    {
      id: 'ne-gamma',
      name: 'Neural Motor Gamma',
      synapseCount: 1556000,
      neuronFiring: 1024.7,
      memoryCapacity: 97.8,
      learningRate: 94.3,
      cognitionLevel: 96.1,
      status: 'broem'
    }
  ]);

  const { addAlert } = useRealTimeData();

  useEffect(() => {
    const interval = setInterval(() => {
      setNeuralEngines(prev => prev.map(engine => ({
        ...engine,
        synapseCount: Math.floor(engine.synapseCount + (Math.random() - 0.5) * 10000),
        neuronFiring: Math.max(100, engine.neuronFiring + (Math.random() - 0.5) * 50),
        memoryCapacity: Math.min(100, Math.max(70, engine.memoryCapacity + (Math.random() - 0.5) * 3)),
        learningRate: Math.min(100, Math.max(80, engine.learningRate + (Math.random() - 0.5) * 2)),
        cognitionLevel: Math.min(100, Math.max(85, engine.cognitionLevel + (Math.random() - 0.5) * 2))
      })));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const toggleMotor = (engineId: string) => {
    setNeuralEngines(prev => prev.map(engine => {
      if (engine.id === engineId) {
        const newStatus = engine.status === 'thinking' ? 'learning' : 
                         engine.status === 'learning' ? 'dreaming' :
                         engine.status === 'dreaming' ? 'broem' : 'thinking';
        addAlert(`Neural Motor ${engineId} now ${newStatus} - BROEM BROEM!`, 'info');
        return { ...engine, status: newStatus };
      }
      return engine;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'thinking': return 'text-purple-400';
      case 'learning': return 'text-apple-blue';
      case 'dreaming': return 'text-pink-400 animate-pulse';
      case 'broem': return 'text-faa-yellow animate-bounce';
      default: return 'text-gray-400';
    }
  };

  const getMotorSound = (status: string) => {
    switch (status) {
      case 'thinking': return '🧠 BZZZP BZZZP';
      case 'learning': return '📚 WHOOP WHOOP';
      case 'dreaming': return '💭 zzz... zzz...';
      case 'broem': return '🔥 BROEM BROEM';
      default: return '❓ unknown';
    }
  };

  const getThoughtPattern = (status: string) => {
    switch (status) {
      case 'thinking': return ['💡', '⚡', '🔮', '🌟'];
      case 'learning': return ['📖', '🎓', '💾', '🔍'];
      case 'dreaming': return ['☁️', '🌙', '✨', '🦄'];
      case 'broem': return ['💥', '🔥', '⚡', '💢'];
      default: return ['❓'];
    }
  };

  return (
    <div className="bg-faa-card border border-faa-border rounded-xl p-6" data-testid="neural-motor">
      <h3 className="font-orbitron text-xl font-bold text-faa-yellow mb-4 flex items-center">
        <i className="fas fa-brain mr-3 animate-pulse"></i>
        Neural Motors - Cognition Division
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {neuralEngines.map((engine) => (
          <div
            key={engine.id}
            className="bg-faa-bg border border-faa-border rounded-lg p-4 cursor-pointer hover:border-faa-yellow transition-all duration-300"
            onClick={() => toggleMotor(engine.id)}
            data-testid={`neural-motor-${engine.id}`}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-faa-yellow-light">{engine.name}</h4>
              <span className={`text-sm font-bold ${getStatusColor(engine.status)}`}>
                {engine.status.toUpperCase()}
              </span>
            </div>
            
            <div className="text-center mb-3">
              <div className={`text-lg font-mono ${getStatusColor(engine.status)}`}>
                {getMotorSound(engine.status)}
              </div>
              <div className="flex justify-center space-x-1 mt-1">
                {getThoughtPattern(engine.status).map((emoji, idx) => (
                  <span key={idx} className="text-xs animate-ping" style={{animationDelay: `${idx * 200}ms`}}>
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">Synapses:</span>
                <span className="text-purple-400 ml-1">{(engine.synapseCount / 1000).toFixed(0)}K</span>
              </div>
              <div>
                <span className="text-gray-500">Firing:</span>
                <span className="text-apple-blue ml-1">{engine.neuronFiring.toFixed(1)}/s</span>
              </div>
              <div>
                <span className="text-gray-500">Memory:</span>
                <span className="text-apple-green ml-1">{engine.memoryCapacity.toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-gray-500">Learning:</span>
                <span className="text-faa-yellow ml-1">{engine.learningRate.toFixed(1)}%</span>
              </div>
            </div>
            
            <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  engine.status === 'broem' ? 'bg-faa-yellow animate-pulse' :
                  engine.status === 'thinking' ? 'bg-purple-400' :
                  engine.status === 'learning' ? 'bg-apple-blue' :
                  'bg-pink-400'
                }`}
                style={{ width: `${engine.cognitionLevel}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Cognition Level: {engine.cognitionLevel.toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}