import { useState } from 'react';

interface NetworkNode {
  id: string;
  name: string;
  status: 'online' | 'maintenance' | 'standby';
  icon: string;
}

const networkNodes: NetworkNode[] = [
  { id: 'americas-1', name: 'Americas-1', status: 'online', icon: 'fas fa-server' },
  { id: 'europe-1', name: 'Europe-1', status: 'online', icon: 'fas fa-server' },
  { id: 'asia-1', name: 'Asia-1', status: 'online', icon: 'fas fa-server' },
  { id: 'africa-1', name: 'Africa-1', status: 'online', icon: 'fas fa-server' },
  { id: 'oceania-1', name: 'Oceania-1', status: 'maintenance', icon: 'fas fa-server' },
  { id: 'arctic-1', name: 'Arctic-1', status: 'online', icon: 'fas fa-server' },
  { id: 'orbital-1', name: 'Orbital-1', status: 'online', icon: 'fas fa-satellite' },
  { id: 'quantum-1', name: 'Quantum-1', status: 'standby', icon: 'fas fa-atom' }
];

export default function OmniNetwork() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-apple-green';
      case 'maintenance': return 'text-orange-400';
      case 'standby': return 'text-faa-yellow';
      default: return 'text-gray-400';
    }
  };

  const getStatusCount = (status: string) => {
    return networkNodes.filter(node => node.status === status).length;
  };

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
  };

  return (
    <section id="network" className="mb-16" data-testid="omni-network">
      <h2 className="font-orbitron text-3xl font-bold text-faa-yellow text-center mb-12" data-testid="title-omni-network">
        🌐 GLOBAL OMNI-NETWORK 🌐
      </h2>
      
      <div className="bg-faa-card border border-faa-border rounded-xl p-8" data-testid="network-container">
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-8" data-testid="network-nodes-grid">
          {networkNodes.map((node) => (
            <div
              key={node.id}
              className={`omni-node rounded-lg p-4 text-center cursor-pointer ${
                selectedNode === node.id ? 'active-node' : ''
              }`}
              onClick={() => handleNodeClick(node.id)}
              data-testid={`network-node-${node.id}`}
            >
              <i className={`${node.icon} text-faa-yellow text-xl mb-2`}></i>
              <div className="text-xs text-faa-yellow-light">{node.name}</div>
              <div className={`text-xs capitalize ${getStatusColor(node.status)}`}>
                {node.status}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center" data-testid="network-summary">
          <p className="text-gray-400 mb-4">
            Global network spans {networkNodes.length} primary nodes with 99.97% uptime
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <div data-testid="status-online">
              <span className="text-apple-green">●</span> Online ({getStatusCount('online')})
            </div>
            <div data-testid="status-maintenance">
              <span className="text-orange-400">●</span> Maintenance ({getStatusCount('maintenance')})
            </div>
            <div data-testid="status-standby">
              <span className="text-faa-yellow">●</span> Standby ({getStatusCount('standby')})
            </div>
          </div>
          {selectedNode && (
            <div className="mt-4 p-3 bg-faa-bg border border-faa-border rounded-lg" data-testid="node-status-display">
              <p className="text-faa-yellow">
                Node {selectedNode} selected: Status query initiated
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
