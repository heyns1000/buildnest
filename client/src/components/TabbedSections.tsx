import { useState } from 'react';
import DeploymentModes from './DeploymentModes';
import CoreAbilities from './CoreAbilities';
import DemoControls from './DemoControls';
import MiningEquipment from './MiningEquipment';
import FinancialTracking from './FinancialTracking';
import OperationsLogging from './OperationsLogging';
import MotorControls from './MotorControls';

interface TabSection {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType;
  description: string;
  category: 'operations' | 'management' | 'monitoring';
}

const tabSections: TabSection[] = [
  {
    id: 'deployment',
    name: 'Deployment',
    icon: 'fas fa-rocket',
    component: DeploymentModes,
    description: 'Advanced deployment configurations and protocols',
    category: 'operations'
  },
  {
    id: 'abilities',
    name: 'Core Abilities',
    icon: 'fas fa-brain',
    component: CoreAbilities,
    description: 'System capabilities and feature toggles',
    category: 'operations'
  },
  {
    id: 'motors',
    name: 'Motor Controls',
    icon: 'fas fa-cogs',
    component: MotorControls,
    description: 'Isolated motor engines with BROEM controls',
    category: 'operations'
  },
  {
    id: 'demo',
    name: 'Demo Controls',
    icon: 'fas fa-play-circle',
    component: DemoControls,
    description: 'System demonstration and scenario testing',
    category: 'management'
  },
  {
    id: 'mining',
    name: 'Mining Equipment',
    icon: 'fas fa-tools',
    component: MiningEquipment,
    description: 'Mining hardware status and management',
    category: 'management'
  },
  {
    id: 'financial',
    name: 'Financial',
    icon: 'fas fa-chart-line',
    component: FinancialTracking,
    description: 'Financial metrics and transaction tracking',
    category: 'monitoring'
  },
  {
    id: 'logging',
    name: 'Operations Log',
    icon: 'fas fa-list-alt',
    component: OperationsLogging,
    description: 'Comprehensive system logging and metadata',
    category: 'monitoring'
  }
];

export default function TabbedSections() {
  const [activeTab, setActiveTab] = useState<string>('deployment');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'operations', 'management', 'monitoring'];
  
  const filteredTabs = tabSections.filter(tab => 
    activeCategory === 'all' || tab.category === activeCategory
  );

  const ActiveComponent = tabSections.find(tab => tab.id === activeTab)?.component;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'operations': return 'text-apple-green';
      case 'management': return 'text-apple-blue';
      case 'monitoring': return 'text-faa-yellow';
      default: return 'text-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'operations': return 'fas fa-cogs';
      case 'management': return 'fas fa-tasks';
      case 'monitoring': return 'fas fa-chart-bar';
      default: return 'fas fa-circle';
    }
  };

  return (
    <section id="tabbed-sections" className="mb-16" data-testid="tabbed-sections">
      <h2 className="font-orbitron text-3xl font-bold text-faa-yellow text-center mb-12" data-testid="title-advanced-operations">
        🔧 ADVANCED OPERATIONS CENTER 🔧
      </h2>
      
      <div className="bg-faa-card border border-faa-border rounded-xl overflow-hidden" data-testid="tabbed-container">
        {/* Category Filter */}
        <div className="bg-faa-bg border-b border-faa-border p-4" data-testid="category-filter">
          <div className="flex items-center justify-center space-x-4">
            <span className="text-gray-400 text-sm">Filter by category:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  if (category !== 'all') {
                    const firstTabInCategory = tabSections.find(tab => tab.category === category);
                    if (firstTabInCategory) {
                      setActiveTab(firstTabInCategory.id);
                    }
                  }
                }}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === category
                    ? 'bg-faa-yellow text-faa-bg'
                    : 'text-faa-yellow-light hover:text-faa-yellow'
                }`}
                data-testid={`category-filter-${category}`}
              >
                {category === 'all' ? (
                  <span>All</span>
                ) : (
                  <span className="flex items-center">
                    <i className={`${getCategoryIcon(category)} mr-1`}></i>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-faa-bg border-b border-faa-border" data-testid="tab-navigation">
          <div className="flex overflow-x-auto scrollbar-hide">
            {filteredTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-6 py-4 flex items-center space-x-3 transition-all duration-300 min-w-0 ${
                  activeTab === tab.id
                    ? 'bg-faa-card text-faa-yellow border-b-2 border-faa-yellow'
                    : 'text-faa-yellow-light hover:text-faa-yellow hover:bg-faa-card/50'
                }`}
                data-testid={`tab-${tab.id}`}
              >
                <i className={`${tab.icon} text-lg flex-shrink-0`}></i>
                <div className="text-left min-w-0">
                  <div className="font-semibold whitespace-nowrap">{tab.name}</div>
                  <div className={`text-xs ${getCategoryColor(tab.category)} whitespace-nowrap`}>
                    {tab.category}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Description */}
        {tabSections.find(tab => tab.id === activeTab) && (
          <div className="bg-faa-bg border-b border-faa-border px-6 py-3" data-testid="tab-description">
            <p className="text-gray-400 text-sm">
              {tabSections.find(tab => tab.id === activeTab)?.description}
            </p>
          </div>
        )}

        {/* Tab Content */}
        <div className="p-6" data-testid="tab-content">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </section>
  );
}