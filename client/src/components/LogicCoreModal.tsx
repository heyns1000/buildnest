import { useState, useEffect } from 'react';

interface LogicCore {
  id: string;
  name: string;
  icon: string;
  description: string;
  efficiency: number;
  color: string;
}

interface Props {
  core: LogicCore;
  onClose: () => void;
}

const coreDetails = {
  'quantum-entanglement': {
    fullDescription: 'Advanced quantum mechanics manipulation system that creates and maintains entangled particle pairs across multiple dimensional layers. This core enables instantaneous communication and state synchronization regardless of physical distance, forming the backbone of our distributed consciousness architecture.',
    parameters: {
      'Quantum Coherence': '98.7%',
      'Processing Threads': '2,048',
      'Memory Allocation': '847.3 TB',
      'Energy Consumption': '12.4 EJ/hr'
    }
  },
  'neural-cascade': {
    fullDescription: 'Biomimetic neural network system that processes information through cascading decision trees. Utilizes recursive feedback loops to amplify decision-making capabilities and maintain coherent thought patterns across distributed processing nodes.',
    parameters: {
      'Neural Pathways': '1.2M',
      'Cascade Depth': '15 levels',
      'Response Time': '0.003ms',
      'Learning Rate': '87.4%'
    }
  },
  'temporal-sync': {
    fullDescription: 'Sophisticated chronometer system that maintains perfect temporal alignment across all network nodes. Compensates for relativistic effects and ensures all operations occur in synchronized time frames regardless of geographical or dimensional location.',
    parameters: {
      'Time Drift': '±0.001ns',
      'Sync Accuracy': '99.99%',
      'Temporal Range': '±100 years',
      'Quantum Clock': 'Active'
    }
  },
  'mist-manipulation': {
    fullDescription: 'Environmental data density control system that manages atmospheric information layers. Creates and maintains optimal data transmission conditions through manipulation of quantum field fluctuations in the surrounding environment.',
    parameters: {
      'Field Density': '94.2%',
      'Manipulation Range': '50km radius',
      'Atmospheric Control': 'Active',
      'Quantum Interference': 'Minimal'
    }
  }
};

export default function LogicCoreModal({ core, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'parameters' | 'submodules' | 'diagnostics'>('overview');
  const [diagnostics, setDiagnostics] = useState<Array<{type: string, message: string, timestamp: string}>>([]);

  useEffect(() => {
    // Initialize diagnostics
    const initialDiagnostics = [
      { type: 'success', message: 'Core initialization: COMPLETE', timestamp: 'DIAG-001' },
      { type: 'info', message: 'Quantum state verification: PASSED', timestamp: 'DIAG-002' },
      { type: 'success', message: 'Memory integrity check: PASSED', timestamp: 'DIAG-003' },
      { type: 'info', message: 'Network connectivity: OPTIMAL', timestamp: 'DIAG-004' },
      { type: 'warning', message: 'Minor oscillation detected in sector 7', timestamp: 'DIAG-005' },
      { type: 'success', message: 'Auto-correction applied: RESOLVED', timestamp: 'DIAG-006' }
    ];
    setDiagnostics(initialDiagnostics);

    // Add new diagnostic entries periodically
    const interval = setInterval(() => {
      const newDiagnostics = [
        { type: 'info', message: 'Quantum coherence check: STABLE', timestamp: `DIAG-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}` },
        { type: 'success', message: 'Memory allocation optimized', timestamp: `DIAG-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}` },
        { type: 'warning', message: 'Minor temperature variance detected', timestamp: `DIAG-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}` },
        { type: 'info', message: 'Processing thread synchronization complete', timestamp: `DIAG-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}` },
        { type: 'success', message: 'Energy consumption within normal parameters', timestamp: `DIAG-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}` }
      ];
      
      const randomDiag = newDiagnostics[Math.floor(Math.random() * newDiagnostics.length)];
      setDiagnostics(prev => [...prev, randomDiag].slice(-8));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const details = coreDetails[core.id as keyof typeof coreDetails] || {
    fullDescription: 'Detailed information about this core is currently being processed...',
    parameters: {
      'Status': 'Unknown',
      'Efficiency': `${core.efficiency}%`,
      'Mode': 'Standby',
      'Priority': 'Normal'
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
      onClick={handleBackdropClick}
      data-testid="logic-core-modal"
    >
      <div className="bg-faa-card text-faa-yellow-light p-6 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-faa-border relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-400 hover:text-faa-yellow text-3xl font-bold transition-colors"
          data-testid="button-close-modal"
        >
          &times;
        </button>

        <div className="mb-6">
          <h2 className="font-orbitron text-2xl font-bold text-faa-yellow flex items-center" data-testid="modal-title">
            <i className={`${core.icon} mr-3`}></i>
            {core.name} Core
          </h2>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-faa-border mb-6" data-testid="modal-tabs">
          {(['overview', 'parameters', 'submodules', 'diagnostics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 rounded-t-lg transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-faa-card text-faa-yellow border-b-2 border-faa-yellow'
                  : 'bg-faa-border text-faa-yellow-light hover:text-faa-yellow'
              }`}
              data-testid={`tab-${tab}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]" data-testid="modal-content">
          {activeTab === 'overview' && (
            <div data-testid="tab-content-overview">
              <h3 className="font-orbitron text-lg font-bold text-faa-yellow mb-4">Core Overview</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {details.fullDescription}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-faa-bg border border-faa-border rounded-lg p-4">
                  <h4 className="font-semibold text-faa-yellow mb-2">Operational Status</h4>
                  <p className="text-apple-green text-sm">FULLY OPERATIONAL</p>
                </div>
                <div className="bg-faa-bg border border-faa-border rounded-lg p-4">
                  <h4 className="font-semibold text-faa-yellow mb-2">Last Maintenance</h4>
                  <p className="text-gray-300 text-sm">2024-01-15 14:32:00 UTC</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'parameters' && (
            <div data-testid="tab-content-parameters">
              <h3 className="font-orbitron text-lg font-bold text-faa-yellow mb-4">Core Parameters</h3>
              <div className="space-y-4">
                {Object.entries(details.parameters).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-faa-bg border border-faa-border rounded-lg">
                    <span className="text-gray-300">{key}</span>
                    <span className="text-faa-yellow font-mono">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'submodules' && (
            <div data-testid="tab-content-submodules">
              <h3 className="font-orbitron text-lg font-bold text-faa-yellow mb-4">Sub-Modules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-faa-bg border border-faa-border rounded-lg p-4">
                  <h4 className="font-semibold text-faa-yellow mb-2">Primary Processor</h4>
                  <p className="text-gray-300 text-sm mb-2">Handles core computational tasks</p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-apple-green h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div className="bg-faa-bg border border-faa-border rounded-lg p-4">
                  <h4 className="font-semibold text-faa-yellow mb-2">Memory Interface</h4>
                  <p className="text-gray-300 text-sm mb-2">Manages data storage and retrieval</p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-apple-blue h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
                <div className="bg-faa-bg border border-faa-border rounded-lg p-4">
                  <h4 className="font-semibold text-faa-yellow mb-2">Quantum Bridge</h4>
                  <p className="text-gray-300 text-sm mb-2">Facilitates entanglement protocols</p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-faa-yellow h-2 rounded-full" style={{ width: '97%' }}></div>
                  </div>
                </div>
                <div className="bg-faa-bg border border-faa-border rounded-lg p-4">
                  <h4 className="font-semibent text-faa-yellow mb-2">Safety Monitor</h4>
                  <p className="text-gray-300 text-sm mb-2">Continuous integrity validation</p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-apple-green h-2 rounded-full" style={{ width: '99%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'diagnostics' && (
            <div data-testid="tab-content-diagnostics">
              <h3 className="font-orbitron text-lg font-bold text-faa-yellow mb-4">Live Diagnostics</h3>
              <div className="console-output" data-testid="diagnostic-console">
                {diagnostics.map((diag, index) => (
                  <div key={index}>
                    <span className="timestamp">[{diag.timestamp}]</span> <span className={diag.type}>{diag.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
