import { useState } from 'react';
import DeploymentModes from './DeploymentModes';
import CoreAbilities from './CoreAbilities';
import DemoControls from './DemoControls';
import MiningEquipment from './MiningEquipment';
import FinancialTracking from './FinancialTracking';
import OperationsLogging from './OperationsLogging';
import MotorControls from './MotorControls';
import CodeNestDashboard from './CodeNestDashboard';
import CrateDancePricing from './CrateDancePricing';
import MediaSonicDashboard from './MediaSonicDashboard';
import HotStackDeployment from './HotStackDeployment';
import LoopPayPortal from './LoopPayPortal';
import SecureSignAPI from './SecureSignAPI';
import SouthAfricanBrands from './SouthAfricanBrands';
import BrandControlCenter from './BrandControlCenter';
import FAAPayrollOS from './FAAPayrollOS';
import SeedwaveOmniSync from './SeedwaveOmniSync';
import AncestorTagHeritagePortal from './AncestorTagHeritagePortal';
import MonsterOmniOperatorConsole from './MonsterOmniOperatorConsole';
import FAADemoDashboard from './FAADemoDashboard';
import GlobalPaymentPortal from './GlobalPaymentPortal';
import MasterIndexSystem from './MasterIndexSystem';
import FAAOmniExtractDashboard from './FAAOmniExtractDashboard';
import CubeLatticeArkConsole from './CubeLatticeArkConsole';
import VaultMeshPayrollOS from './VaultMeshPayrollOS';
import SectorScrollsManager from './SectorScrollsManager';
import TreatyMeshController from './TreatyMeshController';
import MiningSectorConsole from './MiningSectorConsole';

interface TabSection {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType;
  description: string;
  category: 'operations' | 'management' | 'monitoring' | 'development' | 'business' | 'enterprise';
}

const tabSections: TabSection[] = [
  // Core Operations
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
    id: 'hotstack',
    name: 'HotStack™ Omnidrop',
    icon: 'fas fa-fire',
    component: HotStackDeployment,
    description: 'Rapid deployment system with drag & drop file upload and countdown timer',
    category: 'operations'
  },
  
  // Development & Code Management
  {
    id: 'codenest',
    name: 'CodeNest™ Dashboard',
    icon: 'fas fa-code',
    component: CodeNestDashboard,
    description: 'Complete project management with API keys, templates, and code editor',
    category: 'development'
  },
  {
    id: 'media-sonic',
    name: 'Media & Sonic Studio',
    icon: 'fas fa-music',
    component: MediaSonicDashboard,
    description: 'Media production dashboard with Firebase integration and audio library',
    category: 'development'
  },
  {
    id: 'securesign',
    name: 'SecureSign™ API',
    icon: 'fas fa-file-signature',
    component: SecureSignAPI,
    description: 'Digital signature and NDA management with API key administration',
    category: 'development'
  },
  
  // Business & Financial
  {
    id: 'looppay',
    name: 'LoopPay™ Portal',
    icon: 'fas fa-credit-card',
    component: LoopPayPortal,
    description: 'Sovereign payment portal with currency converter and AI assistant',
    category: 'business'
  },
  {
    id: 'crate-dance',
    name: 'Crate Dance Pricing',
    icon: 'fas fa-dollar-sign',
    component: CrateDancePricing,
    description: 'Sponsorship tier pricing with PayPal integration and multi-language support',
    category: 'business'
  },
  {
    id: 'financial',
    name: 'Financial Tracking',
    icon: 'fas fa-chart-line',
    component: FinancialTracking,
    description: 'Financial metrics and transaction tracking',
    category: 'business'
  },
  
  // Enterprise & Management
  {
    id: 'brand-control',
    name: 'Brand Control Center',
    icon: 'fas fa-gem',
    component: BrandControlCenter,
    description: 'FAA™ Brand Control Center SPA with comprehensive brand entity management',
    category: 'enterprise'
  },
  {
    id: 'south-africa',
    name: 'South African Brands',
    icon: 'fas fa-globe-africa',
    component: SouthAfricanBrands,
    description: 'Regional brand intelligence dashboard with maps, charts, and AI analysis',
    category: 'enterprise'
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
  
  // Advanced Enterprise & Management  
  {
    id: 'faa-payroll',
    name: 'FAA™ Payroll OS',
    icon: 'fas fa-users-cog',
    component: FAAPayrollOS,
    description: 'Global payroll enterprise system with cultural harmony and multi-language support',
    category: 'enterprise'
  },
  {
    id: 'seedwave-omnisync',
    name: 'Seedwave-OmniSync™',
    icon: 'fas fa-scroll',
    component: SeedwaveOmniSync,
    description: 'Full system extraction managing 7038 active scrolls with real-time data processing',
    category: 'management'
  },
  
  // 33-Year Giant Ecosystem - Beyond AI Systems
  {
    id: 'ancestortag-heritage',
    name: 'AncestorTag™ Heritage',
    icon: 'fas fa-users',
    component: AncestorTagHeritagePortal,
    description: 'Advanced genealogy and digital heritage preservation with blockchain provenance',
    category: 'enterprise'
  },
  {
    id: 'monster-omni-console',
    name: 'MONSTER OMNI™ Console',
    icon: 'fas fa-satellite-dish',
    component: MonsterOmniOperatorConsole,
    description: 'Grand operator console with 20 fused logic engines and destructive power capabilities',
    category: 'operations'
  },
  {
    id: 'faa-demo-dashboard',
    name: 'FAA.zone™ Live Demo',
    icon: 'fas fa-atom',
    component: FAADemoDashboard,
    description: 'Atom-level engine management with real-time KPI monitoring and demo configuration',
    category: 'development'
  },
  {
    id: 'global-payment-portal',
    name: 'Global Payment Portal',
    icon: 'fas fa-globe-americas',
    component: GlobalPaymentPortal,
    description: 'Comprehensive payment systems with multi-currency support, PayPal integration, and SSO',
    category: 'business'
  },
  {
    id: 'master-index-system',
    name: 'Master Index System',
    icon: 'fas fa-sitemap',
    component: MasterIndexSystem,
    description: 'Complete sector index and master navigation for the entire Fruitful ecosystem',
    category: 'management'
  },

  // VAULT LEVEL 7 IP HSOMI9000 Systems - Complete FAA OMNI Extraction
  {
    id: 'faa-omni-extract',
    name: 'FAA OMNI Extraction',
    icon: 'fas fa-rocket',
    component: FAAOmniExtractDashboard,
    description: 'VaultCommander Heyns Schoeman · FAA-X13 Authority | Ultimate Omni Extraction Command Interface',
    category: 'operations'
  },
  {
    id: 'cube-lattice-ark',
    name: 'Cube Lattice Ark Console',
    icon: 'fas fa-cube',
    component: CubeLatticeArkConsole,
    description: 'Advanced Cube Lattice transition management from (2) to (3) with Ark (1) integration',
    category: 'operations'
  },
  {
    id: 'vaultmesh-payroll',
    name: 'VaultMesh™ Payroll OS',
    icon: 'fas fa-money-check-alt',
    component: VaultMeshPayrollOS,
    description: 'FAA Payroll Atom-Level Extraction System | 1500+ page architecture with GiftNode™/ClawNode™',
    category: 'enterprise'
  },
  {
    id: 'sector-scrolls',
    name: 'Sector Scrolls Manager',
    icon: 'fas fa-scroll',
    component: SectorScrollsManager,
    description: 'FAA OMNIDROP ATOM-LEVEL MASTER INDEX | 15 sector scrolls with 7,038+ brand scrolls',
    category: 'management'
  },
  {
    id: 'treaty-mesh',
    name: 'TreatyMesh™ Controller',
    icon: 'fas fa-handshake',
    component: TreatyMeshController,
    description: 'FAA Treaty Mesh Infinite Ledger Protocol with immutable VaultChain™ anchoring',
    category: 'enterprise'
  },
  {
    id: 'mining-sector',
    name: 'Mining Sector Console',
    icon: 'fas fa-hammer',
    component: MiningSectorConsole,
    description: 'Complete Mining Operations Control Center | OreXcel™, MineForge™, Digium™, Minerva™, MineralVision™',
    category: 'operations'
  },

  // Monitoring & Logging
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

  const categories = ['all', 'operations', 'development', 'business', 'enterprise', 'management', 'monitoring'];
  
  const filteredTabs = tabSections.filter(tab => 
    activeCategory === 'all' || tab.category === activeCategory
  );

  const ActiveComponent = tabSections.find(tab => tab.id === activeTab)?.component;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'operations': return 'text-apple-green';
      case 'development': return 'text-purple-400';
      case 'business': return 'text-yellow-400';
      case 'enterprise': return 'text-blue-400';
      case 'management': return 'text-apple-blue';
      case 'monitoring': return 'text-faa-yellow';
      default: return 'text-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'operations': return 'fas fa-cogs';
      case 'development': return 'fas fa-code';
      case 'business': return 'fas fa-briefcase';
      case 'enterprise': return 'fas fa-building';
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