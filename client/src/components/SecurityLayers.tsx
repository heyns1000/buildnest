import { useState } from 'react';
import { useRealTimeData } from '@/hooks/useRealTimeData';

interface SecurityLayer {
  id: string;
  name: string;
  icon: string;
  description: string;
  integrity: number;
  status: 'active' | 'testing' | 'maintenance';
}

const securityLayers: SecurityLayer[] = [
  {
    id: 'faa-verification',
    name: 'FAA Inline Verification',
    icon: 'fas fa-check-circle',
    description: 'Real-time authentication through distributed consensus validation. Verifies every transaction against the global FAA network before execution.',
    integrity: 98,
    status: 'active'
  },
  {
    id: 'ghost-trace',
    name: 'GhostTrace Blackout',
    icon: 'fas fa-user-secret',
    description: 'Advanced obfuscation layer that renders system operations invisible to external monitoring. Creates false digital shadows and trace diversions.',
    integrity: 96,
    status: 'active'
  },
  {
    id: 'omni-trace',
    name: 'OmniTrace Immutable',
    icon: 'fas fa-memory',
    description: 'Quantum-encrypted memory layer that creates an unalterable record of all system states. Any unauthorized modification triggers cascade alerts.',
    integrity: 99,
    status: 'active'
  },
  {
    id: 'fire-ratio',
    name: 'FireRatio Crisis Circuit',
    icon: 'fas fa-fire',
    description: 'Emergency bypass system that activates during critical threats. Automatically isolates compromised sectors while maintaining core operations.',
    integrity: 85,
    status: 'active'
  }
];

export default function SecurityLayers() {
  const [simulatingBreach, setSimulatingBreach] = useState<string | null>(null);
  const { addAlert } = useRealTimeData();

  const getIntegrityColor = (integrity: number) => {
    if (integrity >= 95) return 'bg-apple-green';
    if (integrity >= 90) return 'bg-faa-yellow';
    return 'bg-orange-400';
  };

  const simulateBreach = async (layerId: string) => {
    setSimulatingBreach(layerId);
    
    const layer = securityLayers.find(l => l.id === layerId);
    const layerName = layer?.name || layerId;
    
    const responses = [
      `Simulating breach attempt on ${layerName}...`,
      'THREAT DETECTED: Unauthorized access attempt',
      'Activating countermeasures...',
      'Deploying adaptive defenses...',
      'Breach attempt NEUTRALIZED',
      'System integrity maintained'
    ];
    
    for (let i = 0; i < responses.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const messageType = responses[i].includes('THREAT') ? 'error' : 
                         responses[i].includes('NEUTRALIZED') || responses[i].includes('maintained') ? 'success' : 'warning';
      
      addAlert(responses[i], messageType);
    }
    
    setSimulatingBreach(null);
  };

  return (
    <section id="security" className="mb-16" data-testid="security-layers">
      <h2 className="font-orbitron text-3xl font-bold text-faa-yellow text-center mb-12" data-testid="title-security-layers">
        🛡️ SECURITY LAYERS 🛡️
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-testid="security-layers-grid">
        {securityLayers.map((layer) => (
          <div key={layer.id} className="bg-faa-card border border-faa-border rounded-xl p-6" data-testid={`security-layer-${layer.id}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <i className={`${layer.icon} text-apple-green text-xl mr-3`}></i>
                <h3 className="font-orbitron font-bold text-faa-yellow-light">{layer.name}</h3>
              </div>
              <button
                onClick={() => simulateBreach(layer.id)}
                disabled={simulatingBreach === layer.id}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  simulatingBreach === layer.id
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'alert-button'
                }`}
                data-testid={`button-simulate-breach-${layer.id}`}
              >
                {simulatingBreach === layer.id ? 'Simulating...' : 'Simulate Breach'}
              </button>
            </div>
            
            <p className="text-gray-400 text-sm mb-4">
              {layer.description}
            </p>
            
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div 
                className={`${getIntegrityColor(layer.integrity)} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${layer.integrity}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">
                {layer.name.includes('Immutable') ? 'Immutability' : 
                 layer.name.includes('Blackout') ? 'Stealth' :
                 layer.name.includes('Crisis') ? 'Readiness' : 'Integrity'}: {layer.integrity}%
              </span>
              <span className={`capitalize px-2 py-1 rounded text-xs ${
                layer.status === 'active' ? 'bg-apple-green/20 text-apple-green' :
                layer.status === 'testing' ? 'bg-faa-yellow/20 text-faa-yellow' :
                'bg-orange-400/20 text-orange-400'
              }`}>
                {layer.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
