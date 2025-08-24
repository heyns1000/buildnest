import { useState, useEffect } from 'react';
import { useRealTimeData } from '@/hooks/useRealTimeData';

interface OperationLog {
  id: string;
  timestamp: string;
  module: string;
  operation: string;
  status: 'success' | 'warning' | 'error' | 'info';
  duration: number;
  details: Record<string, any>;
  metadata: {
    userId?: string;
    nodeId: string;
    version: string;
    hash: string;
  };
}

interface SystemMetadata {
  category: string;
  entries: Array<{
    key: string;
    value: string | number;
    type: 'string' | 'number' | 'boolean' | 'timestamp';
    lastUpdated: string;
  }>;
}

export default function OperationsLogging() {
  const [operationLogs, setOperationLogs] = useState<OperationLog[]>([
    {
      id: 'op-001',
      timestamp: '2024-12-20T14:23:45.123Z',
      module: 'QuantumCore',
      operation: 'Entanglement Sync',
      status: 'success',
      duration: 847,
      details: {
        particlePairs: 2048,
        coherenceLevel: 98.7,
        energyConsumption: '23.4 EJ'
      },
      metadata: {
        nodeId: 'americas-1',
        version: '2.4.7',
        hash: 'a7f3d9e2c8b1'
      }
    },
    {
      id: 'op-002',
      timestamp: '2024-12-20T14:22:33.456Z',
      module: 'SecurityLayer',
      operation: 'Breach Detection',
      status: 'warning',
      duration: 234,
      details: {
        threatsDetected: 3,
        mitigated: 3,
        severityLevel: 'moderate'
      },
      metadata: {
        nodeId: 'europe-1',
        version: '2.4.7',
        hash: 'b8e4f1a9d2c3'
      }
    },
    {
      id: 'op-003',
      timestamp: '2024-12-20T14:21:18.789Z',
      module: 'MiningRig',
      operation: 'Hashrate Optimization',
      status: 'success',
      duration: 1567,
      details: {
        beforeHashrate: 756.4,
        afterHashrate: 823.7,
        improvement: '8.9%'
      },
      metadata: {
        nodeId: 'asia-1',
        version: '2.4.6',
        hash: 'c9f5e2b8a1d4'
      }
    },
    {
      id: 'op-004',
      timestamp: '2024-12-20T14:20:02.012Z',
      module: 'NetworkCore',
      operation: 'Global Synchronization',
      status: 'error',
      duration: 0,
      details: {
        failedNodes: ['oceania-1'],
        errorCode: 'SYNC_TIMEOUT',
        retryAttempts: 3
      },
      metadata: {
        nodeId: 'quantum-1',
        version: '2.4.7',
        hash: 'd1a6f3c9e2b5'
      }
    }
  ]);

  const [systemMetadata, setSystemMetadata] = useState<SystemMetadata[]>([
    {
      category: 'System Configuration',
      entries: [
        { key: 'Core Version', value: 'MONSTER OMNI v2.4.7', type: 'string', lastUpdated: '2024-12-20T14:00:00Z' },
        { key: 'Active Nodes', value: 8, type: 'number', lastUpdated: '2024-12-20T14:23:45Z' },
        { key: 'Quantum Coherence', value: 98.7, type: 'number', lastUpdated: '2024-12-20T14:23:45Z' },
        { key: 'Security Level', value: 'OmniProof Immutable', type: 'string', lastUpdated: '2024-12-20T14:00:00Z' }
      ]
    },
    {
      category: 'Performance Metrics',
      entries: [
        { key: 'Transaction Velocity', value: 15247, type: 'number', lastUpdated: '2024-12-20T14:23:45Z' },
        { key: 'Network Load', value: 87.3, type: 'number', lastUpdated: '2024-12-20T14:23:45Z' },
        { key: 'Uptime', value: '99.97%', type: 'string', lastUpdated: '2024-12-20T14:23:45Z' },
        { key: 'Last Downtime', value: '2024-12-15T02:34:12Z', type: 'timestamp', lastUpdated: '2024-12-15T02:34:12Z' }
      ]
    },
    {
      category: 'Security Status',
      entries: [
        { key: 'Active Threats', value: 0, type: 'number', lastUpdated: '2024-12-20T14:23:45Z' },
        { key: 'Breach Attempts (24h)', value: 2847, type: 'number', lastUpdated: '2024-12-20T14:23:45Z' },
        { key: 'Neutralized Threats', value: 2847, type: 'number', lastUpdated: '2024-12-20T14:23:45Z' },
        { key: 'Security Integrity', value: 99.8, type: 'number', lastUpdated: '2024-12-20T14:23:45Z' }
      ]
    },
    {
      category: 'Operational Data',
      entries: [
        { key: 'Total Operations', value: 15847392, type: 'number', lastUpdated: '2024-12-20T14:23:45Z' },
        { key: 'Failed Operations', value: 247, type: 'number', lastUpdated: '2024-12-20T14:23:45Z' },
        { key: 'Success Rate', value: 99.998, type: 'number', lastUpdated: '2024-12-20T14:23:45Z' },
        { key: 'Average Response Time', value: 0.847, type: 'number', lastUpdated: '2024-12-20T14:23:45Z' }
      ]
    }
  ]);

  const [selectedLogLevel, setSelectedLogLevel] = useState<'all' | 'error' | 'warning' | 'success' | 'info'>('all');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<OperationLog | null>(null);
  const { addAlert } = useRealTimeData();

  // Simulate real-time log updates
  useEffect(() => {
    const interval = setInterval(() => {
      const modules = ['QuantumCore', 'SecurityLayer', 'MiningRig', 'NetworkCore', 'LogicCore', 'DeploymentEngine'];
      const operations = [
        'Sync Operation', 'Security Scan', 'Performance Check', 'Data Validation',
        'Quantum Stabilization', 'Network Optimization', 'Threat Analysis'
      ];
      const statuses: OperationLog['status'][] = ['success', 'info', 'warning'];
      
      if (Math.random() < 0.4) {
        const newLog: OperationLog = {
          id: `op-${Date.now()}`,
          timestamp: new Date().toISOString(),
          module: modules[Math.floor(Math.random() * modules.length)],
          operation: operations[Math.floor(Math.random() * operations.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          duration: Math.floor(Math.random() * 2000) + 100,
          details: {
            result: 'Completed successfully',
            affectedComponents: Math.floor(Math.random() * 5) + 1
          },
          metadata: {
            nodeId: ['americas-1', 'europe-1', 'asia-1'][Math.floor(Math.random() * 3)],
            version: '2.4.7',
            hash: Math.random().toString(16).substr(2, 12)
          }
        };
        
        setOperationLogs(prev => [newLog, ...prev].slice(0, 50));
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return 'fas fa-check-circle text-apple-green';
      case 'warning': return 'fas fa-exclamation-triangle text-orange-400';
      case 'error': return 'fas fa-times-circle text-apple-red';
      case 'info': return 'fas fa-info-circle text-apple-blue';
      default: return 'fas fa-circle text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': return 'bg-apple-green/20 text-apple-green border-apple-green/30';
      case 'warning': return 'bg-orange-400/20 text-orange-400 border-orange-400/30';
      case 'error': return 'bg-apple-red/20 text-apple-red border-apple-red/30';
      case 'info': return 'bg-apple-blue/20 text-apple-blue border-apple-blue/30';
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
    }
  };

  const filteredLogs = operationLogs.filter(log => {
    if (selectedLogLevel !== 'all' && log.status !== selectedLogLevel) return false;
    if (selectedModule !== 'all' && log.module !== selectedModule) return false;
    return true;
  });

  const uniqueModules = Array.from(new Set(operationLogs.map(log => log.module)));

  const formatValue = (value: string | number, type: string) => {
    switch (type) {
      case 'timestamp':
        return new Date(value as string).toLocaleString();
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value;
      default:
        return value.toString();
    }
  };

  const exportLogs = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `operations-log-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    addAlert('Operations log exported successfully', 'success');
  };

  return (
    <section id="operations-logging" className="mb-16" data-testid="operations-logging">
      <h2 className="font-orbitron text-3xl font-bold text-faa-yellow text-center mb-12" data-testid="title-operations-logging">
        📊 OPERATIONS LOGGING & METADATA 📊
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-testid="logging-layout">
        {/* Operations Log */}
        <div className="lg:col-span-2 bg-faa-card border border-faa-border rounded-xl p-6" data-testid="operations-log">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-orbitron text-xl font-bold text-faa-yellow flex items-center">
              <i className="fas fa-list mr-3"></i>
              Operations Log
            </h3>
            <button
              onClick={exportLogs}
              className="action-button px-4 py-2 rounded-lg text-sm font-semibold"
              data-testid="button-export-logs"
            >
              <i className="fas fa-download mr-2"></i>
              Export
            </button>
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Filter by Level:</label>
              <select
                value={selectedLogLevel}
                onChange={(e) => setSelectedLogLevel(e.target.value as any)}
                className="w-full bg-faa-bg border border-faa-border rounded-lg px-3 py-2 text-faa-yellow-light"
                data-testid="filter-log-level"
              >
                <option value="all">All Levels</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
                <option value="success">Success</option>
                <option value="info">Info</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Filter by Module:</label>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="w-full bg-faa-bg border border-faa-border rounded-lg px-3 py-2 text-faa-yellow-light"
                data-testid="filter-module"
              >
                <option value="all">All Modules</option>
                {uniqueModules.map(module => (
                  <option key={module} value={module}>{module}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Log Entries */}
          <div className="space-y-3 max-h-96 overflow-y-auto" data-testid="log-entries">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 bg-faa-bg border border-faa-border rounded-lg cursor-pointer hover:border-faa-yellow transition-colors"
                onClick={() => setSelectedLog(log)}
                data-testid={`log-entry-${log.id}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <i className={`${getStatusIcon(log.status)} mr-3`}></i>
                    <span className="font-semibold text-faa-yellow-light">{log.operation}</span>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusBadge(log.status)}`}>
                    {log.status.toUpperCase()}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Module:</span>
                    <span className="text-faa-yellow-light ml-1">{log.module}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Duration:</span>
                    <span className="text-faa-yellow-light ml-1">{log.duration}ms</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Node:</span>
                    <span className="text-faa-yellow-light ml-1">{log.metadata.nodeId}</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-2">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Metadata Tables */}
        <div className="space-y-6" data-testid="metadata-tables">
          {systemMetadata.map((category) => (
            <div key={category.category} className="bg-faa-card border border-faa-border rounded-xl p-6">
              <h3 className="font-orbitron text-lg font-bold text-faa-yellow mb-4 flex items-center">
                <i className="fas fa-table mr-3"></i>
                {category.category}
              </h3>
              
              <div className="space-y-2">
                {category.entries.map((entry) => (
                  <div key={entry.key} className="flex justify-between items-center p-2 bg-faa-bg border border-faa-border rounded">
                    <span className="text-gray-300 text-sm">{entry.key}:</span>
                    <span className="text-faa-yellow-light font-mono text-sm">
                      {formatValue(entry.value, entry.type)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
          onClick={() => setSelectedLog(null)}
          data-testid="log-detail-modal"
        >
          <div 
            className="bg-faa-card border border-faa-border rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-orbitron text-xl font-bold text-faa-yellow">Operation Details</h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-faa-yellow text-2xl"
                data-testid="button-close-detail"
              >
                &times;
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400">Operation:</span>
                  <p className="text-faa-yellow-light font-semibold">{selectedLog.operation}</p>
                </div>
                <div>
                  <span className="text-gray-400">Module:</span>
                  <p className="text-faa-yellow-light">{selectedLog.module}</p>
                </div>
                <div>
                  <span className="text-gray-400">Status:</span>
                  <p className={`font-semibold ${selectedLog.status === 'success' ? 'text-apple-green' : selectedLog.status === 'error' ? 'text-apple-red' : selectedLog.status === 'warning' ? 'text-orange-400' : 'text-apple-blue'}`}>
                    {selectedLog.status.toUpperCase()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Duration:</span>
                  <p className="text-faa-yellow-light">{selectedLog.duration}ms</p>
                </div>
              </div>
              
              <div>
                <span className="text-gray-400">Timestamp:</span>
                <p className="text-faa-yellow-light font-mono">{new Date(selectedLog.timestamp).toLocaleString()}</p>
              </div>
              
              <div>
                <span className="text-gray-400">Details:</span>
                <pre className="bg-faa-bg border border-faa-border rounded p-3 text-faa-yellow-light text-sm mt-2 overflow-x-auto">
                  {JSON.stringify(selectedLog.details, null, 2)}
                </pre>
              </div>
              
              <div>
                <span className="text-gray-400">Metadata:</span>
                <pre className="bg-faa-bg border border-faa-border rounded p-3 text-faa-yellow-light text-sm mt-2 overflow-x-auto">
                  {JSON.stringify(selectedLog.metadata, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}