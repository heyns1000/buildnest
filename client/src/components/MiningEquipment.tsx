import { useState, useEffect } from 'react';
import { useRealTimeData } from '@/hooks/useRealTimeData';

interface MiningRig {
  id: string;
  name: string;
  type: 'quantum' | 'neural' | 'fusion' | 'temporal';
  status: 'active' | 'maintenance' | 'offline' | 'overclocked';
  hashrate: number;
  temperature: number;
  powerDraw: number;
  efficiency: number;
  location: string;
}

export default function MiningEquipment() {
  const [miningRigs, setMiningRigs] = useState<MiningRig[]>([
    {
      id: 'quantum-array-1',
      name: 'Quantum Array Alpha',
      type: 'quantum',
      status: 'active',
      hashrate: 847.3,
      temperature: 23.7,
      powerDraw: 2847,
      efficiency: 95.2,
      location: 'Americas-1'
    },
    {
      id: 'neural-cluster-1',
      name: 'Neural Cluster Beta',
      type: 'neural',
      status: 'active',
      hashrate: 623.8,
      temperature: 31.4,
      powerDraw: 1923,
      efficiency: 87.6,
      location: 'Europe-1'
    },
    {
      id: 'fusion-reactor-1',
      name: 'Fusion Reactor Gamma',
      type: 'fusion',
      status: 'overclocked',
      hashrate: 1247.9,
      temperature: 68.2,
      powerDraw: 4283,
      efficiency: 78.3,
      location: 'Asia-1'
    },
    {
      id: 'temporal-engine-1',
      name: 'Temporal Engine Delta',
      type: 'temporal',
      status: 'maintenance',
      hashrate: 0,
      temperature: 18.5,
      powerDraw: 150,
      efficiency: 0,
      location: 'Orbital-1'
    },
    {
      id: 'quantum-array-2',
      name: 'Quantum Array Epsilon',
      type: 'quantum',
      status: 'active',
      hashrate: 756.4,
      temperature: 27.1,
      powerDraw: 2654,
      efficiency: 92.8,
      location: 'Africa-1'
    },
    {
      id: 'neural-cluster-2',
      name: 'Neural Cluster Zeta',
      type: 'neural',
      status: 'offline',
      hashrate: 0,
      temperature: 15.2,
      powerDraw: 0,
      efficiency: 0,
      location: 'Oceania-1'
    }
  ]);

  const [selectedRig, setSelectedRig] = useState<string | null>(null);
  const { addAlert } = useRealTimeData();

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMiningRigs(prev => prev.map(rig => {
        if (rig.status === 'active' || rig.status === 'overclocked') {
          return {
            ...rig,
            hashrate: rig.hashrate + (Math.random() - 0.5) * 20,
            temperature: Math.max(15, rig.temperature + (Math.random() - 0.5) * 5),
            powerDraw: rig.powerDraw + (Math.random() - 0.5) * 100,
            efficiency: Math.min(100, Math.max(70, rig.efficiency + (Math.random() - 0.5) * 2))
          };
        }
        return rig;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleRigStatus = (rigId: string) => {
    setMiningRigs(prev => prev.map(rig => {
      if (rig.id === rigId) {
        let newStatus: MiningRig['status'];
        switch (rig.status) {
          case 'active':
            newStatus = 'maintenance';
            break;
          case 'maintenance':
            newStatus = 'active';
            break;
          case 'offline':
            newStatus = 'active';
            break;
          case 'overclocked':
            newStatus = 'active';
            break;
          default:
            newStatus = 'active';
        }
        
        addAlert(`${rig.name} status changed to ${newStatus}`, 'info');
        
        return {
          ...rig,
          status: newStatus,
          hashrate: newStatus === 'active' ? 800 + Math.random() * 400 : 0,
          powerDraw: newStatus === 'active' ? 2000 + Math.random() * 2000 : newStatus === 'maintenance' ? 150 : 0,
          efficiency: newStatus === 'active' ? 85 + Math.random() * 15 : 0
        };
      }
      return rig;
    }));
  };

  const overclockRig = (rigId: string) => {
    setMiningRigs(prev => prev.map(rig => {
      if (rig.id === rigId && rig.status === 'active') {
        addAlert(`${rig.name} overclocked - performance boosted`, 'warning');
        return {
          ...rig,
          status: 'overclocked',
          hashrate: rig.hashrate * 1.5,
          powerDraw: rig.powerDraw * 1.8,
          temperature: rig.temperature * 1.4,
          efficiency: Math.max(70, rig.efficiency * 0.8)
        };
      }
      return rig;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-apple-green';
      case 'overclocked': return 'text-orange-400';
      case 'maintenance': return 'text-faa-yellow';
      case 'offline': return 'text-gray-500';
      default: return 'text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-apple-green/20 text-apple-green border-apple-green/30';
      case 'overclocked': return 'bg-orange-400/20 text-orange-400 border-orange-400/30';
      case 'maintenance': return 'bg-faa-yellow/20 text-faa-yellow border-faa-yellow/30';
      case 'offline': return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quantum': return 'fas fa-atom';
      case 'neural': return 'fas fa-brain';
      case 'fusion': return 'fas fa-fire';
      case 'temporal': return 'fas fa-clock';
      default: return 'fas fa-microchip';
    }
  };

  const getTotalHashrate = () => {
    return miningRigs.reduce((total, rig) => total + rig.hashrate, 0);
  };

  const getTotalPowerDraw = () => {
    return miningRigs.reduce((total, rig) => total + rig.powerDraw, 0);
  };

  const getAverageEfficiency = () => {
    const activeRigs = miningRigs.filter(rig => rig.status !== 'offline');
    if (activeRigs.length === 0) return 0;
    return activeRigs.reduce((total, rig) => total + rig.efficiency, 0) / activeRigs.length;
  };

  return (
    <section id="mining-equipment" className="mb-16" data-testid="mining-equipment">
      <h2 className="font-orbitron text-3xl font-bold text-faa-yellow text-center mb-12" data-testid="title-mining-equipment">
        ⛏️ MINING EQUIPMENT STATUS ⛏️
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-testid="mining-layout">
        {/* Mining Rigs Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="mining-rigs-grid">
          {miningRigs.map((rig) => (
            <div
              key={rig.id}
              className="bg-faa-card border border-faa-border rounded-xl p-6 card-hover cursor-pointer"
              onClick={() => setSelectedRig(selectedRig === rig.id ? null : rig.id)}
              data-testid={`mining-rig-${rig.id}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <i className={`${getTypeIcon(rig.type)} text-faa-yellow text-xl mr-3`}></i>
                  <h3 className="font-semibold text-faa-yellow-light">{rig.name}</h3>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusBadge(rig.status)}`}>
                  {rig.status.toUpperCase()}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-gray-500">Hashrate:</span>
                  <p className="text-faa-yellow font-mono">{rig.hashrate.toFixed(1)} TH/s</p>
                </div>
                <div>
                  <span className="text-gray-500">Temperature:</span>
                  <p className={`font-mono ${rig.temperature > 60 ? 'text-apple-red' : rig.temperature > 40 ? 'text-orange-400' : 'text-apple-green'}`}>
                    {rig.temperature.toFixed(1)}°C
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Power:</span>
                  <p className="text-faa-yellow font-mono">{rig.powerDraw.toFixed(0)} kW</p>
                </div>
                <div>
                  <span className="text-gray-500">Efficiency:</span>
                  <p className="text-apple-green font-mono">{rig.efficiency.toFixed(1)}%</p>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mb-4">
                Location: {rig.location}
              </div>
              
              {selectedRig === rig.id && (
                <div className="pt-4 border-t border-faa-border">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRigStatus(rig.id);
                      }}
                      className="action-button px-3 py-2 rounded text-xs font-semibold"
                      data-testid={`button-toggle-${rig.id}`}
                    >
                      {rig.status === 'active' ? 'Maintenance' : 'Activate'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        overclockRig(rig.id);
                      }}
                      disabled={rig.status !== 'active'}
                      className="alert-button px-3 py-2 rounded text-xs font-semibold disabled:opacity-50"
                      data-testid={`button-overclock-${rig.id}`}
                    >
                      Overclock
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mining Summary */}
        <div className="space-y-6" data-testid="mining-summary">
          <div className="bg-faa-card border border-faa-border rounded-xl p-6">
            <h3 className="font-orbitron text-lg font-bold text-faa-yellow mb-4 flex items-center">
              <i className="fas fa-chart-bar mr-3"></i>
              Mining Overview
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-faa-bg border border-faa-border rounded-lg">
                <span className="text-gray-300">Total Hashrate:</span>
                <span className="text-apple-green font-mono font-bold">{getTotalHashrate().toFixed(1)} TH/s</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-faa-bg border border-faa-border rounded-lg">
                <span className="text-gray-300">Power Draw:</span>
                <span className="text-faa-yellow font-mono">{getTotalPowerDraw().toFixed(0)} kW</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-faa-bg border border-faa-border rounded-lg">
                <span className="text-gray-300">Avg Efficiency:</span>
                <span className="text-apple-green font-mono">{getAverageEfficiency().toFixed(1)}%</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-faa-bg border border-faa-border rounded-lg">
                <span className="text-gray-300">Active Rigs:</span>
                <span className="text-faa-yellow font-bold">
                  {miningRigs.filter(rig => rig.status === 'active' || rig.status === 'overclocked').length}/{miningRigs.length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-faa-card border border-faa-border rounded-xl p-6">
            <h3 className="font-orbitron text-lg font-bold text-faa-yellow mb-4 flex items-center">
              <i className="fas fa-exclamation-triangle mr-3"></i>
              Equipment Alerts
            </h3>
            
            <div className="space-y-2 text-sm">
              {miningRigs.filter(rig => rig.temperature > 60).length > 0 && (
                <div className="flex items-center text-apple-red">
                  <i className="fas fa-thermometer-full mr-2 text-xs"></i>
                  <span>High temperature warning on {miningRigs.filter(rig => rig.temperature > 60).length} rig(s)</span>
                </div>
              )}
              
              {miningRigs.filter(rig => rig.efficiency < 80).length > 0 && (
                <div className="flex items-center text-orange-400">
                  <i className="fas fa-exclamation-triangle mr-2 text-xs"></i>
                  <span>Low efficiency on {miningRigs.filter(rig => rig.efficiency < 80).length} rig(s)</span>
                </div>
              )}
              
              {miningRigs.filter(rig => rig.status === 'offline').length > 0 && (
                <div className="flex items-center text-gray-500">
                  <i className="fas fa-power-off mr-2 text-xs"></i>
                  <span>{miningRigs.filter(rig => rig.status === 'offline').length} rig(s) offline</span>
                </div>
              )}
              
              {miningRigs.every(rig => rig.temperature <= 60 && rig.efficiency >= 80 && rig.status !== 'offline') && (
                <div className="flex items-center text-apple-green">
                  <i className="fas fa-check-circle mr-2 text-xs"></i>
                  <span>All mining equipment operating within normal parameters</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}