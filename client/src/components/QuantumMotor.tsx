import { useState, useEffect } from 'react';
import { useRealTimeData } from '@/hooks/useRealTimeData';

interface QuantumEngine {
  id: string;
  name: string;
  cohesionLevel: number;
  particlePairs: number;
  fieldStability: number;
  quantumNoise: number;
  entanglementDepth: number;
  status: 'spinning' | 'stabilizing' | 'idle' | 'broem';
}

export default function QuantumMotor() {
  const [quantumEngines, setQuantumEngines] = useState<QuantumEngine[]>([
    {
      id: 'qe-alpha',
      name: 'Quantum Motor Alpha',
      cohesionLevel: 98.7,
      particlePairs: 2048,
      fieldStability: 94.2,
      quantumNoise: 2.3,
      entanglementDepth: 15,
      status: 'spinning'
    },
    {
      id: 'qe-beta',
      name: 'Quantum Motor Beta',
      cohesionLevel: 96.4,
      particlePairs: 1856,
      fieldStability: 91.8,
      quantumNoise: 3.1,
      entanglementDepth: 12,
      status: 'spinning'
    },
    {
      id: 'qe-gamma',
      name: 'Quantum Motor Gamma',
      cohesionLevel: 99.1,
      particlePairs: 2304,
      fieldStability: 97.3,
      quantumNoise: 1.8,
      entanglementDepth: 18,
      status: 'broem'
    }
  ]);

  const { addAlert } = useRealTimeData();

  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumEngines(prev => prev.map(engine => ({
        ...engine,
        cohesionLevel: Math.min(100, Math.max(90, engine.cohesionLevel + (Math.random() - 0.5) * 2)),
        particlePairs: Math.floor(engine.particlePairs + (Math.random() - 0.5) * 200),
        fieldStability: Math.min(100, Math.max(85, engine.fieldStability + (Math.random() - 0.5) * 3)),
        quantumNoise: Math.max(0.5, engine.quantumNoise + (Math.random() - 0.5) * 0.5)
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const toggleMotor = (engineId: string) => {
    setQuantumEngines(prev => prev.map(engine => {
      if (engine.id === engineId) {
        const newStatus = engine.status === 'spinning' ? 'idle' : 
                         engine.status === 'idle' ? 'broem' : 'spinning';
        addAlert(`Quantum Motor ${engineId} ${newStatus} - BROEM BROEM!`, 'info');
        return { ...engine, status: newStatus };
      }
      return engine;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'spinning': return 'text-apple-green';
      case 'broem': return 'text-faa-yellow animate-pulse';
      case 'stabilizing': return 'text-orange-400';
      case 'idle': return 'text-gray-500';
      default: return 'text-gray-400';
    }
  };

  const getMotorSound = (status: string) => {
    switch (status) {
      case 'spinning': return '🌀 WHIRRRRR';
      case 'broem': return '💥 BROEM BROEM';
      case 'stabilizing': return '⚡ BZZZZT';
      case 'idle': return '😴 silence';
      default: return '❓ unknown';
    }
  };

  return (
    <div className="bg-faa-card border border-faa-border rounded-xl p-6" data-testid="quantum-motor">
      <h3 className="font-orbitron text-xl font-bold text-faa-yellow mb-4 flex items-center">
        <i className="fas fa-atom mr-3 animate-spin"></i>
        Quantum Motors - BROEM Division
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quantumEngines.map((engine) => (
          <div
            key={engine.id}
            className="bg-faa-bg border border-faa-border rounded-lg p-4 cursor-pointer hover:border-faa-yellow transition-all duration-300"
            onClick={() => toggleMotor(engine.id)}
            data-testid={`quantum-motor-${engine.id}`}
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
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">Cohesion:</span>
                <span className="text-apple-green ml-1">{engine.cohesionLevel.toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-gray-500">Pairs:</span>
                <span className="text-faa-yellow ml-1">{engine.particlePairs}</span>
              </div>
              <div>
                <span className="text-gray-500">Stability:</span>
                <span className="text-apple-blue ml-1">{engine.fieldStability.toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-gray-500">Noise:</span>
                <span className="text-orange-400 ml-1">{engine.quantumNoise.toFixed(1)}dB</span>
              </div>
            </div>
            
            <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  engine.status === 'broem' ? 'bg-faa-yellow animate-pulse' :
                  engine.status === 'spinning' ? 'bg-apple-green' :
                  'bg-gray-500'
                }`}
                style={{ width: `${engine.entanglementDepth * 5}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Entanglement Depth: {engine.entanglementDepth} layers
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}