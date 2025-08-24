import { useState } from 'react';

interface Command {
  id: string;
  name: string;
  icon: string;
  type: 'action' | 'success' | 'alert';
}

const commands: Command[] = [
  { id: 'full-diagnostic', name: 'Full System Diagnostic', icon: 'fas fa-diagnoses', type: 'action' },
  { id: 'optimize-cores', name: 'Optimize Logic Cores', icon: 'fas fa-cogs', type: 'success' },
  { id: 'emergency-protocol', name: 'Emergency Protocol', icon: 'fas fa-exclamation-triangle', type: 'alert' },
  { id: 'sync-network', name: 'Sync Global Network', icon: 'fas fa-sync', type: 'action' },
  { id: 'quantum-stabilize', name: 'Quantum Stabilize', icon: 'fas fa-atom', type: 'success' },
  { id: 'mist-purge', name: 'Mist Purge Cycle', icon: 'fas fa-wind', type: 'alert' }
];

const commandResponses = {
  'full-diagnostic': [
    'Initiating comprehensive system diagnostic...',
    'Scanning 20 logic cores: OK',
    'Checking quantum coherence: 98.7% stable',
    'Validating network integrity: All nodes responsive',
    'Testing security layers: All protocols active',
    'Diagnostic complete: System operating at optimal parameters'
  ],
  'optimize-cores': [
    'Beginning logic core optimization sequence...',
    'Balancing quantum entanglement threads...',
    'Redistributing neural cascade loads...',
    'Synchronizing temporal alignment protocols...',
    'Optimization complete: 15% efficiency improvement achieved'
  ],
  'emergency-protocol': [
    'EMERGENCY PROTOCOL ACTIVATED',
    'Isolating non-critical systems...',
    'Activating FireRatio crisis circuits...',
    'Switching to backup power sources...',
    'Emergency mode: ACTIVE - All critical systems protected'
  ],
  'sync-network': [
    'Initiating global network synchronization...',
    'Polling all 8 global nodes...',
    'Establishing quantum communication channels...',
    'Synchronizing atomic clocks...',
    'Network synchronization complete: All nodes aligned'
  ],
  'quantum-stabilize': [
    'Quantum stabilization protocol initiated...',
    'Measuring quantum field fluctuations...',
    'Applying correction matrices...',
    'Recalibrating quantum anchor points...',
    'Quantum stability achieved: Field coherence at 99.2%'
  ],
  'mist-purge': [
    'Initiating atmospheric mist purge cycle...',
    'Scanning environmental data density...',
    'Activating purification algorithms...',
    'Clearing quantum interference patterns...',
    'Mist purge complete: Atmospheric clarity restored'
  ]
};

export default function CommandCenter() {
  const [console, setConsole] = useState<Array<{timestamp: string, message: string, type: string}>>([
    { timestamp: '00:00:00', message: 'MONSTER OMNI™ Command Interface Ready', type: 'info' },
    { timestamp: '00:00:01', message: 'All systems nominal - awaiting chairman input', type: 'success' },
    { timestamp: '00:00:02', message: 'Quantum cores synchronized across 8 global nodes', type: 'info' },
    { timestamp: '00:00:03', message: 'Monitoring for command execution...', type: 'warning' }
  ]);
  const [executingCommand, setExecutingCommand] = useState<string | null>(null);

  const executeCommand = async (commandId: string) => {
    if (executingCommand) return;
    
    setExecutingCommand(commandId);
    setConsole([]);
    
    const responses = commandResponses[commandId as keyof typeof commandResponses] || ['Command executed successfully'];
    
    for (let i = 0; i < responses.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      const messageClass = responses[i].includes('ERROR') ? 'error' : 
                         responses[i].includes('WARNING') ? 'warning' :
                         responses[i].includes('complete') || responses[i].includes('OK') ? 'success' : 'info';
      
      setConsole(prev => [...prev, {
        timestamp,
        message: responses[i],
        type: messageClass
      }]);
    }
    
    setExecutingCommand(null);
  };

  const getButtonClasses = (type: string, commandId: string) => {
    const baseClasses = 'p-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
    
    if (executingCommand === commandId) {
      return `${baseClasses} bg-gray-600 text-gray-300`;
    }
    
    switch (type) {
      case 'success': return `${baseClasses} success-button`;
      case 'alert': return `${baseClasses} alert-button`;
      default: return `${baseClasses} action-button`;
    }
  };

  return (
    <section id="command-center" className="mb-16" data-testid="command-center">
      <h2 className="font-orbitron text-3xl font-bold text-faa-yellow text-center mb-12" data-testid="title-command-center">
        ⚡ CHAIRMAN DECISION NODE ⚡
      </h2>
      
      <div className="bg-faa-card border border-faa-border rounded-xl p-8" data-testid="command-center-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Command Buttons */}
          <div data-testid="command-buttons-section">
            <h3 className="font-orbitron text-xl font-bold text-faa-yellow mb-6">System Commands</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commands.map((command) => (
                <button
                  key={command.id}
                  onClick={() => executeCommand(command.id)}
                  disabled={executingCommand !== null}
                  className={getButtonClasses(command.type, command.id)}
                  data-testid={`button-command-${command.id}`}
                >
                  <i className={`${command.icon} mr-2`}></i>
                  {executingCommand === command.id ? 'Executing...' : command.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Command Console */}
          <div data-testid="command-console-section">
            <h3 className="font-orbitron text-xl font-bold text-faa-yellow mb-6">Command Console</h3>
            <div className="console-output" data-testid="command-console">
              {console.map((entry, index) => (
                <div key={index}>
                  <span className="timestamp">[{entry.timestamp}]</span> <span className={entry.type}>{entry.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
