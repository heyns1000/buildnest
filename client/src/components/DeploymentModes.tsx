import { useState } from 'react';
import { useRealTimeData } from '@/hooks/useRealTimeData';

interface DeploymentMode {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: 'active' | 'standby' | 'disabled';
  powerLevel: number;
  securityRating: string;
}

const deploymentModes: DeploymentMode[] = [
  {
    id: 'ghostgrid',
    name: 'GhostGrid™',
    icon: 'fas fa-ghost',
    description: 'Ultra-stealth deployment mode with maximum anonymity protocols. Creates invisible network pathways that cannot be detected by conventional monitoring systems.',
    status: 'standby',
    powerLevel: 92,
    securityRating: 'PHANTOM-CLASS'
  },
  {
    id: 'vaultgenesis',
    name: 'VaultGenesis™',
    icon: 'fas fa-vault',
    description: 'Maximum security deployment protocol with quantum-encrypted containers. Each transaction exists in an isolated secure environment with multi-dimensional protection.',
    status: 'active',
    powerLevel: 98,
    securityRating: 'IMMUTABLE-PRIME'
  },
  {
    id: 'aurachain',
    name: 'AuraChain™',
    icon: 'fas fa-link',
    description: 'Hyper-scalable blockchain deployment with aura-based consensus mechanisms. Enables infinite throughput while maintaining complete decentralization.',
    status: 'standby',
    powerLevel: 89,
    securityRating: 'CONSENSUS-GRADE'
  }
];

export default function DeploymentModes() {
  const [selectedMode, setSelectedMode] = useState<string | null>('vaultgenesis');
  const [deploymentLog, setDeploymentLog] = useState<Array<{timestamp: string, message: string, type: string}>>([
    { timestamp: '00:00:01', message: 'VaultGenesis™ deployment protocol active', type: 'success' },
    { timestamp: '00:00:02', message: 'Quantum vault containers initialized: 2,048 nodes', type: 'info' },
    { timestamp: '00:00:03', message: 'Multi-dimensional security barriers engaged', type: 'info' },
    { timestamp: '00:00:04', message: 'Immutable-Prime security rating confirmed', type: 'success' }
  ]);
  const { addAlert } = useRealTimeData();

  const activateMode = async (modeId: string) => {
    const mode = deploymentModes.find(m => m.id === modeId);
    if (!mode || mode.status === 'disabled') return;

    setSelectedMode(modeId);
    setDeploymentLog([]);
    
    const activationSequences = {
      ghostgrid: [
        'Initiating GhostGrid™ stealth protocols...',
        'Activating quantum invisibility fields...',
        'Establishing phantom network tunnels...',
        'Deploying spectral routing algorithms...',
        'GhostGrid™ deployment: ACTIVE - Maximum stealth engaged'
      ],
      vaultgenesis: [
        'Activating VaultGenesis™ security protocols...',
        'Initializing quantum vault containers...',
        'Engaging multi-dimensional protection barriers...',
        'Establishing immutable transaction pathways...',
        'VaultGenesis™ deployment: ACTIVE - Maximum security engaged'
      ],
      aurachain: [
        'Initializing AuraChain™ consensus mechanisms...',
        'Establishing aura-based validation nodes...',
        'Deploying infinite scalability protocols...',
        'Synchronizing decentralized consensus layers...',
        'AuraChain™ deployment: ACTIVE - Hyper-scale mode engaged'
      ]
    };

    const sequence = activationSequences[modeId as keyof typeof activationSequences] || ['Mode activated successfully'];
    
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      const messageType = sequence[i].includes('ACTIVE') ? 'success' : 
                         sequence[i].includes('ERROR') ? 'error' : 'info';
      
      setDeploymentLog(prev => [...prev, {
        timestamp,
        message: sequence[i],
        type: messageType
      }]);
      
      addAlert(`Deployment: ${sequence[i]}`, messageType as any);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-apple-green';
      case 'standby': return 'text-faa-yellow';
      case 'disabled': return 'text-gray-500';
      default: return 'text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-apple-green/20 text-apple-green border-apple-green/30';
      case 'standby': return 'bg-faa-yellow/20 text-faa-yellow border-faa-yellow/30';
      case 'disabled': return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
    }
  };

  return (
    <section id="deployment-modes" className="mb-16" data-testid="deployment-modes">
      <h2 className="font-orbitron text-3xl font-bold text-faa-yellow text-center mb-12" data-testid="title-deployment-modes">
        🚀 DEPLOYMENT MODES 🚀
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-testid="deployment-grid">
        {/* Deployment Mode Cards */}
        <div className="space-y-6" data-testid="deployment-modes-cards">
          {deploymentModes.map((mode) => (
            <div
              key={mode.id}
              className={`bg-faa-card border rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                selectedMode === mode.id ? 'border-faa-yellow shadow-lg' : 'border-faa-border card-hover'
              }`}
              onClick={() => activateMode(mode.id)}
              data-testid={`deployment-mode-${mode.id}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <i className={`${mode.icon} text-faa-yellow text-2xl mr-3`}></i>
                  <h3 className="font-orbitron font-bold text-faa-yellow-light">{mode.name}</h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(mode.status)}`}>
                  {mode.status.toUpperCase()}
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">{mode.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Power Level:</span>
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-gray-700 rounded-full h-2 mr-2">
                      <div 
                        className={`h-2 rounded-full ${mode.powerLevel >= 95 ? 'bg-apple-green' : mode.powerLevel >= 90 ? 'bg-faa-yellow' : 'bg-orange-400'}`}
                        style={{ width: `${mode.powerLevel}%` }}
                      ></div>
                    </div>
                    <span className="text-faa-yellow-light font-mono">{mode.powerLevel}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Security Rating:</span>
                  <p className="text-faa-yellow font-mono text-xs mt-1">{mode.securityRating}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Deployment Console */}
        <div className="bg-faa-card border border-faa-border rounded-xl p-6" data-testid="deployment-console">
          <h3 className="font-orbitron text-xl font-bold text-faa-yellow mb-6 flex items-center">
            <i className="fas fa-terminal mr-3"></i>
            Deployment Console
          </h3>
          
          <div className="mb-4">
            <div className="flex items-center justify-between p-3 bg-faa-bg border border-faa-border rounded-lg">
              <span className="text-gray-300">Active Mode:</span>
              <span className="text-faa-yellow font-semibold">
                {selectedMode ? deploymentModes.find(m => m.id === selectedMode)?.name : 'None'}
              </span>
            </div>
          </div>
          
          <div className="console-output" data-testid="deployment-log">
            {deploymentLog.map((entry, index) => (
              <div key={index}>
                <span className="timestamp">[{entry.timestamp}]</span> <span className={entry.type}>{entry.message}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button 
              className="action-button px-4 py-2 rounded-lg text-sm font-semibold"
              onClick={() => selectedMode && activateMode(selectedMode)}
              data-testid="button-refresh-deployment"
            >
              <i className="fas fa-sync mr-2"></i>
              Refresh Status
            </button>
            <button 
              className="alert-button px-4 py-2 rounded-lg text-sm font-semibold"
              onClick={() => {
                setDeploymentLog([]);
                addAlert('Deployment logs cleared', 'info');
              }}
              data-testid="button-clear-log"
            >
              <i className="fas fa-trash mr-2"></i>
              Clear Log
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}