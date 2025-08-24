import { useState, useEffect } from 'react';
import { useRealTimeData } from '@/hooks/useRealTimeData';

interface FusionEngine {
  id: string;
  name: string;
  plasmaTemp: number;
  fusionRate: number;
  containmentField: number;
  energyOutput: number;
  fuelLevel: number;
  status: 'igniting' | 'burning' | 'cooling' | 'broem';
}

export default function FusionMotor() {
  const [fusionEngines, setFusionEngines] = useState<FusionEngine[]>([
    {
      id: 'fe-alpha',
      name: 'Fusion Motor Alpha',
      plasmaTemp: 150000000,
      fusionRate: 847.3,
      containmentField: 99.2,
      energyOutput: 4283.7,
      fuelLevel: 87.4,
      status: 'burning'
    },
    {
      id: 'fe-beta',
      name: 'Fusion Motor Beta',
      plasmaTemp: 125000000,
      fusionRate: 623.8,
      containmentField: 95.8,
      energyOutput: 3247.1,
      fuelLevel: 76.2,
      status: 'igniting'
    },
    {
      id: 'fe-gamma',
      name: 'Fusion Motor Gamma',
      plasmaTemp: 200000000,
      fusionRate: 1247.9,
      containmentField: 98.7,
      energyOutput: 5892.4,
      fuelLevel: 91.8,
      status: 'broem'
    }
  ]);

  const { addAlert } = useRealTimeData();

  useEffect(() => {
    const interval = setInterval(() => {
      setFusionEngines(prev => prev.map(engine => ({
        ...engine,
        plasmaTemp: Math.max(50000000, engine.plasmaTemp + (Math.random() - 0.5) * 20000000),
        fusionRate: Math.max(100, engine.fusionRate + (Math.random() - 0.5) * 100),
        containmentField: Math.min(100, Math.max(90, engine.containmentField + (Math.random() - 0.5) * 2)),
        energyOutput: Math.max(1000, engine.energyOutput + (Math.random() - 0.5) * 500),
        fuelLevel: Math.max(0, engine.fuelLevel - Math.random() * 0.1)
      })));
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const toggleMotor = (engineId: string) => {
    setFusionEngines(prev => prev.map(engine => {
      if (engine.id === engineId) {
        const newStatus = engine.status === 'igniting' ? 'burning' : 
                         engine.status === 'burning' ? 'cooling' :
                         engine.status === 'cooling' ? 'broem' : 'igniting';
        addAlert(`Fusion Motor ${engineId} ${newStatus} - BROEM BROEM!`, 'warning');
        return { ...engine, status: newStatus };
      }
      return engine;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'igniting': return 'text-orange-400 animate-pulse';
      case 'burning': return 'text-apple-red';
      case 'cooling': return 'text-apple-blue';
      case 'broem': return 'text-faa-yellow animate-bounce';
      default: return 'text-gray-400';
    }
  };

  const getMotorSound = (status: string) => {
    switch (status) {
      case 'igniting': return '🔥 FWOOSH FWOOSH';
      case 'burning': return '☀️ ROARRRRR';
      case 'cooling': return '❄️ hissss...';
      case 'broem': return '💥 BROEM BROEM';
      default: return '❓ unknown';
    }
  };

  const getFlameEmojis = (status: string) => {
    switch (status) {
      case 'igniting': return ['🔥', '⚡', '💨', '✨'];
      case 'burning': return ['🔥', '🌋', '☀️', '💥'];
      case 'cooling': return ['❄️', '💧', '🌊', '🧊'];
      case 'broem': return ['💥', '⚡', '🔥', '💢'];
      default: return ['❓'];
    }
  };

  const formatTemp = (temp: number) => {
    return `${(temp / 1000000).toFixed(0)}M°C`;
  };

  return (
    <div className="bg-faa-card border border-faa-border rounded-xl p-6" data-testid="fusion-motor">
      <h3 className="font-orbitron text-xl font-bold text-faa-yellow mb-4 flex items-center">
        <i className="fas fa-fire mr-3 animate-pulse"></i>
        Fusion Motors - Thermal Division
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fusionEngines.map((engine) => (
          <div
            key={engine.id}
            className="bg-faa-bg border border-faa-border rounded-lg p-4 cursor-pointer hover:border-faa-yellow transition-all duration-300"
            onClick={() => toggleMotor(engine.id)}
            data-testid={`fusion-motor-${engine.id}`}
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
                {getFlameEmojis(engine.status).map((emoji, idx) => (
                  <span key={idx} className="text-xs animate-pulse" style={{animationDelay: `${idx * 150}ms`}}>
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">Plasma:</span>
                <span className="text-apple-red ml-1">{formatTemp(engine.plasmaTemp)}</span>
              </div>
              <div>
                <span className="text-gray-500">Fusion:</span>
                <span className="text-orange-400 ml-1">{engine.fusionRate.toFixed(1)}/s</span>
              </div>
              <div>
                <span className="text-gray-500">Field:</span>
                <span className="text-apple-green ml-1">{engine.containmentField.toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-gray-500">Energy:</span>
                <span className="text-faa-yellow ml-1">{engine.energyOutput.toFixed(0)}MW</span>
              </div>
            </div>
            
            <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  engine.status === 'broem' ? 'bg-faa-yellow animate-pulse' :
                  engine.status === 'burning' ? 'bg-apple-red' :
                  engine.status === 'igniting' ? 'bg-orange-400' :
                  'bg-apple-blue'
                }`}
                style={{ width: `${engine.fuelLevel}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Fuel Level: {engine.fuelLevel.toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}