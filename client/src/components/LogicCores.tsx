import { useState } from 'react';
import LogicCoreModal from './LogicCoreModal';

interface LogicCore {
  id: string;
  name: string;
  icon: string;
  description: string;
  efficiency: number;
  color: string;
}

const logicCores: LogicCore[] = [
  {
    id: 'quantum-entanglement',
    name: 'Quantum Entanglement',
    icon: 'fas fa-atom',
    description: 'Manipulates quantum states across parallel dimensions',
    efficiency: 92,
    color: 'faa-yellow'
  },
  {
    id: 'neural-cascade',
    name: 'Neural Cascade',
    icon: 'fas fa-brain',
    description: 'Amplifies decision-making through recursive loops',
    efficiency: 87,
    color: 'apple-green'
  },
  {
    id: 'temporal-sync',
    name: 'Temporal Sync',
    icon: 'fas fa-clock',
    description: 'Synchronizes operations across time dilations',
    efficiency: 95,
    color: 'apple-blue'
  },
  {
    id: 'mist-manipulation',
    name: 'Mist Manipulation',
    icon: 'fas fa-cloud',
    description: 'Controls atmospheric data density layers',
    efficiency: 89,
    color: 'faa-yellow'
  },
  {
    id: 'pebble-routing',
    name: 'Pebble Routing',
    icon: 'fas fa-route',
    description: 'Optimizes micro-transaction pathways',
    efficiency: 91,
    color: 'apple-green'
  },
  {
    id: 'conad-loop',
    name: 'Conad Loop',
    icon: 'fas fa-infinity',
    description: 'Recursive feedback optimization engine',
    efficiency: 96,
    color: 'apple-blue'
  },
  {
    id: 'rossouw-protocol',
    name: 'Rossouw Protocol',
    icon: 'fas fa-network-wired',
    description: 'Advanced network consensus mechanism',
    efficiency: 93,
    color: 'faa-yellow'
  },
  {
    id: 'hoenderbleis',
    name: 'Hoenderbleis',
    icon: 'fas fa-shield-virus',
    description: 'Adaptive immune response system',
    efficiency: 88,
    color: 'apple-green'
  }
];

export default function LogicCores() {
  const [selectedCore, setSelectedCore] = useState<LogicCore | null>(null);

  const getEfficiencyColor = (efficiency: number, color: string) => {
    if (color === 'apple-green') return 'bg-apple-green';
    if (color === 'apple-blue') return 'bg-apple-blue';
    return 'bg-faa-yellow';
  };

  return (
    <section id="logic-cores" className="mb-16" data-testid="logic-cores">
      <h2 className="font-orbitron text-3xl font-bold text-faa-yellow text-center mb-12" data-testid="title-logic-cores">
        🧠 LOGIC CORES MATRIX 🧠
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="logic-cores-grid">
        {logicCores.map((core) => (
          <div
            key={core.id}
            className="bg-faa-card border border-faa-border rounded-xl p-6 card-hover cursor-pointer"
            onClick={() => setSelectedCore(core)}
            data-testid={`logic-core-${core.id}`}
          >
            <div className="flex items-center mb-3">
              <i className={`${core.icon} text-faa-yellow text-2xl mr-3`}></i>
              <h3 className="font-orbitron font-bold text-faa-yellow-light">{core.name}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">{core.description}</p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`${getEfficiencyColor(core.efficiency, core.color)} h-2 rounded-full`} 
                style={{ width: `${core.efficiency}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2" data-testid={`efficiency-${core.id}`}>
              Efficiency: {core.efficiency}%
            </p>
          </div>
        ))}
      </div>

      {selectedCore && (
        <LogicCoreModal 
          core={selectedCore} 
          onClose={() => setSelectedCore(null)} 
        />
      )}
    </section>
  );
}
