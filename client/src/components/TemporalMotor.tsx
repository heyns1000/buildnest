import { useState, useEffect } from 'react';
import { useRealTimeData } from '@/hooks/useRealTimeData';

interface TemporalEngine {
  id: string;
  name: string;
  timeRate: number;
  chronoSync: number;
  temporalStability: number;
  dimensionPhase: number;
  causalityIndex: number;
  status: 'accelerating' | 'decelerating' | 'synchronized' | 'broem';
}

export default function TemporalMotor() {
  const [temporalEngines, setTemporalEngines] = useState<TemporalEngine[]>([
    {
      id: 'te-alpha',
      name: 'Temporal Motor Alpha',
      timeRate: 1.0,
      chronoSync: 99.7,
      temporalStability: 94.2,
      dimensionPhase: 847.3,
      causalityIndex: 96.4,
      status: 'synchronized'
    },
    {
      id: 'te-beta',
      name: 'Temporal Motor Beta',
      timeRate: 0.75,
      chronoSync: 87.3,
      temporalStability: 91.8,
      dimensionPhase: 623.8,
      causalityIndex: 88.7,
      status: 'accelerating'
    },
    {
      id: 'te-gamma',
      name: 'Temporal Motor Gamma',
      timeRate: 1.25,
      chronoSync: 98.1,
      temporalStability: 97.3,
      dimensionPhase: 1024.7,
      causalityIndex: 99.2,
      status: 'broem'
    }
  ]);

  const { addAlert } = useRealTimeData();

  useEffect(() => {
    const interval = setInterval(() => {
      setTemporalEngines(prev => prev.map(engine => ({
        ...engine,
        timeRate: Math.max(0.1, Math.min(2.0, engine.timeRate + (Math.random() - 0.5) * 0.1)),
        chronoSync: Math.min(100, Math.max(80, engine.chronoSync + (Math.random() - 0.5) * 2)),
        temporalStability: Math.min(100, Math.max(85, engine.temporalStability + (Math.random() - 0.5) * 3)),
        dimensionPhase: Math.max(100, engine.dimensionPhase + (Math.random() - 0.5) * 50),
        causalityIndex: Math.min(100, Math.max(85, engine.causalityIndex + (Math.random() - 0.5) * 1))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleMotor = (engineId: string) => {
    setTemporalEngines(prev => prev.map(engine => {
      if (engine.id === engineId) {
        const newStatus = engine.status === 'accelerating' ? 'decelerating' : 
                         engine.status === 'decelerating' ? 'synchronized' :
                         engine.status === 'synchronized' ? 'broem' : 'accelerating';
        addAlert(`Temporal Motor ${engineId} ${newStatus} through time - BROEM BROEM!`, 'info');
        return { ...engine, status: newStatus };
      }
      return engine;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accelerating': return 'text-apple-green animate-pulse';
      case 'decelerating': return 'text-orange-400';
      case 'synchronized': return 'text-apple-blue';
      case 'broem': return 'text-faa-yellow animate-spin';
      default: return 'text-gray-400';
    }
  };

  const getMotorSound = (status: string) => {
    switch (status) {
      case 'accelerating': return '⚡ VWOOOOM';
      case 'decelerating': return '⏰ whiirrr...';
      case 'synchronized': return '🕐 tick-tock-tick';
      case 'broem': return '💫 BROEM BROEM';
      default: return '❓ unknown';
    }
  };

  const getTimeEmojis = (status: string) => {
    switch (status) {
      case 'accelerating': return ['⚡', '💨', '🚀', '⭐'];
      case 'decelerating': return ['⏰', '🐌', '⌛', '🕐'];
      case 'synchronized': return ['🕐', '⚙️', '🔗', '✨'];
      case 'broem': return ['💫', '🌀', '⚡', '💥'];
      default: return ['❓'];
    }
  };

  const getTimeDirection = (timeRate: number) => {
    if (timeRate > 1.1) return '⏩ FAST FORWARD';
    if (timeRate < 0.9) return '⏪ SLOW MOTION';
    return '⏸️ NORMAL TIME';
  };

  return (
    <div className="bg-faa-card border border-faa-border rounded-xl p-6" data-testid="temporal-motor">
      <h3 className="font-orbitron text-xl font-bold text-faa-yellow mb-4 flex items-center">
        <i className="fas fa-clock mr-3 animate-spin"></i>
        Temporal Motors - Chronos Division
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {temporalEngines.map((engine) => (
          <div
            key={engine.id}
            className="bg-faa-bg border border-faa-border rounded-lg p-4 cursor-pointer hover:border-faa-yellow transition-all duration-300"
            onClick={() => toggleMotor(engine.id)}
            data-testid={`temporal-motor-${engine.id}`}
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
                {getTimeEmojis(engine.status).map((emoji, idx) => (
                  <span key={idx} className="text-xs animate-pulse" style={{animationDelay: `${idx * 300}ms`}}>
                    {emoji}
                  </span>
                ))}
              </div>
              <div className="text-xs mt-1 text-purple-400">
                {getTimeDirection(engine.timeRate)}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">Rate:</span>
                <span className="text-purple-400 ml-1">{engine.timeRate.toFixed(2)}x</span>
              </div>
              <div>
                <span className="text-gray-500">Sync:</span>
                <span className="text-apple-blue ml-1">{engine.chronoSync.toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-gray-500">Stability:</span>
                <span className="text-apple-green ml-1">{engine.temporalStability.toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-gray-500">Phase:</span>
                <span className="text-faa-yellow ml-1">{engine.dimensionPhase.toFixed(0)}°</span>
              </div>
            </div>
            
            <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  engine.status === 'broem' ? 'bg-faa-yellow animate-pulse' :
                  engine.status === 'accelerating' ? 'bg-apple-green' :
                  engine.status === 'decelerating' ? 'bg-orange-400' :
                  'bg-apple-blue'
                }`}
                style={{ width: `${engine.causalityIndex}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Causality Index: {engine.causalityIndex.toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}