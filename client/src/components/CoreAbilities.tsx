import { useState } from 'react';
import { useRealTimeData } from '@/hooks/useRealTimeData';

interface CoreAbility {
  id: string;
  name: string;
  icon: string;
  description: string;
  enabled: boolean;
  powerConsumption: number;
  compatibilityLevel: number;
  category: 'cognitive' | 'operational' | 'defensive' | 'analysis';
}

export default function CoreAbilities() {
  const [abilities, setAbilities] = useState<CoreAbility[]>([
    {
      id: 'corethink',
      name: 'Corethink™',
      icon: 'fas fa-brain',
      description: 'Advanced quantum cognition system for deep analytical processing and pattern recognition.',
      enabled: true,
      powerConsumption: 23.7,
      compatibilityLevel: 98,
      category: 'cognitive'
    },
    {
      id: 'truthweight',
      name: 'TruthWeight™',
      icon: 'fas fa-balance-scale',
      description: 'Probability assessment engine that determines veracity and reliability of incoming data streams.',
      enabled: true,
      powerConsumption: 18.4,
      compatibilityLevel: 95,
      category: 'analysis'
    },
    {
      id: 'echosynth',
      name: 'EchoSynth™',
      icon: 'fas fa-wave-square',
      description: 'Signal synthesis and resonance amplification for enhanced communication protocols.',
      enabled: false,
      powerConsumption: 31.2,
      compatibilityLevel: 87,
      category: 'operational'
    },
    {
      id: 'autosigil',
      name: 'AutoSigil™',
      icon: 'fas fa-signature',
      description: 'Automated cryptographic signature generation with quantum-resistant security protocols.',
      enabled: true,
      powerConsumption: 15.8,
      compatibilityLevel: 99,
      category: 'defensive'
    },
    {
      id: 'pulseindex',
      name: 'PulseIndex™',
      icon: 'fas fa-heartbeat',
      description: 'Real-time system health monitoring with predictive maintenance capabilities.',
      enabled: true,
      powerConsumption: 12.3,
      compatibilityLevel: 96,
      category: 'operational'
    },
    {
      id: 'omnitrace',
      name: 'OmniTrace™',
      icon: 'fas fa-route',
      description: 'Complete transaction pathway mapping with full audit trail capabilities.',
      enabled: true,
      powerConsumption: 28.9,
      compatibilityLevel: 94,
      category: 'analysis'
    },
    {
      id: 'lifthalo',
      name: 'LiftHalo™',
      icon: 'fas fa-circle-notch',
      description: 'Gravitational field manipulation for enhanced data transmission and processing.',
      enabled: false,
      powerConsumption: 45.6,
      compatibilityLevel: 82,
      category: 'operational'
    },
    {
      id: 'mirrorloop',
      name: 'MirrorLoop™',
      icon: 'fas fa-mirror',
      description: 'Self-reflection and recursive improvement algorithms for continuous optimization.',
      enabled: true,
      powerConsumption: 19.7,
      compatibilityLevel: 91,
      category: 'cognitive'
    },
    {
      id: 'fireratio',
      name: 'FireRatio™',
      icon: 'fas fa-fire',
      description: 'Emergency response system with rapid threat neutralization capabilities.',
      enabled: true,
      powerConsumption: 35.4,
      compatibilityLevel: 89,
      category: 'defensive'
    }
  ]);

  const { addAlert } = useRealTimeData();

  const toggleAbility = (abilityId: string) => {
    setAbilities(prev => prev.map(ability => {
      if (ability.id === abilityId) {
        const newEnabled = !ability.enabled;
        addAlert(
          `${ability.name} ${newEnabled ? 'activated' : 'deactivated'}`,
          newEnabled ? 'success' : 'warning'
        );
        return { ...ability, enabled: newEnabled };
      }
      return ability;
    }));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cognitive': return 'text-purple-400';
      case 'operational': return 'text-apple-blue';
      case 'defensive': return 'text-apple-green';
      case 'analysis': return 'text-faa-yellow';
      default: return 'text-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cognitive': return 'fas fa-brain';
      case 'operational': return 'fas fa-cogs';
      case 'defensive': return 'fas fa-shield-alt';
      case 'analysis': return 'fas fa-chart-line';
      default: return 'fas fa-circle';
    }
  };

  const getTotalPowerConsumption = () => {
    return abilities
      .filter(ability => ability.enabled)
      .reduce((total, ability) => total + ability.powerConsumption, 0);
  };

  const getEnabledCount = () => {
    return abilities.filter(ability => ability.enabled).length;
  };

  const categories = Array.from(new Set(abilities.map(a => a.category)));

  return (
    <section id="core-abilities" className="mb-16" data-testid="core-abilities">
      <h2 className="font-orbitron text-3xl font-bold text-faa-yellow text-center mb-12" data-testid="title-core-abilities">
        ⚡ CORE ABILITIES MATRIX ⚡
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-testid="abilities-layout">
        {/* Abilities Grid */}
        <div className="lg:col-span-2 space-y-6" data-testid="abilities-grid">
          {categories.map(category => (
            <div key={category} className="bg-faa-card border border-faa-border rounded-xl p-6">
              <h3 className={`font-orbitron text-lg font-bold mb-4 flex items-center ${getCategoryColor(category)}`}>
                <i className={`${getCategoryIcon(category)} mr-3`}></i>
                {category.charAt(0).toUpperCase() + category.slice(1)} Abilities
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {abilities.filter(ability => ability.category === category).map((ability) => (
                  <div
                    key={ability.id}
                    className={`border rounded-lg p-4 transition-all duration-300 ${
                      ability.enabled 
                        ? 'border-faa-yellow bg-faa-yellow/5' 
                        : 'border-faa-border bg-faa-bg'
                    }`}
                    data-testid={`ability-card-${ability.id}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <i className={`${ability.icon} text-faa-yellow mr-2`}></i>
                        <span className="font-semibold text-faa-yellow-light">{ability.name}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={ability.enabled}
                          onChange={() => toggleAbility(ability.id)}
                          className="sr-only peer"
                          data-testid={`checkbox-${ability.id}`}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-faa-yellow"></div>
                      </label>
                    </div>
                    
                    <p className="text-gray-400 text-xs mb-3">{ability.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Power:</span>
                        <span className="text-faa-yellow-light ml-1">{ability.powerConsumption}EJ</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Compat:</span>
                        <span className="text-apple-green ml-1">{ability.compatibilityLevel}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* System Summary */}
        <div className="space-y-6" data-testid="abilities-summary">
          <div className="bg-faa-card border border-faa-border rounded-xl p-6">
            <h3 className="font-orbitron text-lg font-bold text-faa-yellow mb-4 flex items-center">
              <i className="fas fa-tachometer-alt mr-3"></i>
              System Overview
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-faa-bg border border-faa-border rounded-lg">
                <span className="text-gray-300">Active Abilities:</span>
                <span className="text-apple-green font-bold">{getEnabledCount()}/{abilities.length}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-faa-bg border border-faa-border rounded-lg">
                <span className="text-gray-300">Power Draw:</span>
                <span className="text-faa-yellow font-mono">{getTotalPowerConsumption().toFixed(1)} EJ/hr</span>
              </div>
              
              <div className="p-3 bg-faa-bg border border-faa-border rounded-lg">
                <span className="text-gray-300 block mb-2">System Load:</span>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      getTotalPowerConsumption() > 150 ? 'bg-apple-red' :
                      getTotalPowerConsumption() > 100 ? 'bg-orange-400' :
                      'bg-apple-green'
                    }`}
                    style={{ width: `${Math.min((getTotalPowerConsumption() / 200) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-1 block">
                  {((getTotalPowerConsumption() / 200) * 100).toFixed(1)}% of maximum capacity
                </span>
              </div>
            </div>
          </div>

          <div className="bg-faa-card border border-faa-border rounded-xl p-6">
            <h3 className="font-orbitron text-lg font-bold text-faa-yellow mb-4 flex items-center">
              <i className="fas fa-exclamation-triangle mr-3"></i>
              Ability Warnings
            </h3>
            
            <div className="space-y-2 text-sm">
              {abilities.filter(a => a.enabled && a.compatibilityLevel < 90).length > 0 ? (
                abilities
                  .filter(a => a.enabled && a.compatibilityLevel < 90)
                  .map(ability => (
                    <div key={ability.id} className="flex items-center text-orange-400">
                      <i className="fas fa-exclamation-triangle mr-2 text-xs"></i>
                      <span>{ability.name}: Low compatibility ({ability.compatibilityLevel}%)</span>
                    </div>
                  ))
              ) : (
                <div className="flex items-center text-apple-green">
                  <i className="fas fa-check-circle mr-2 text-xs"></i>
                  <span>All active abilities operating within normal parameters</span>
                </div>
              )}
              
              {getTotalPowerConsumption() > 150 && (
                <div className="flex items-center text-apple-red">
                  <i className="fas fa-exclamation-triangle mr-2 text-xs"></i>
                  <span>High power consumption detected - consider deactivating non-essential abilities</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}