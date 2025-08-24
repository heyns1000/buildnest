import { useState } from 'react';

interface BrandEntity {
  id: string;
  name: string;
  type: 'Active Scroll' | 'Quantum Brand' | 'Meta Economy' | 'Interstellar Op';
  status: 'Online' | 'Syncing' | 'Maintenance' | 'Critical';
  metrics: {
    engagement: number;
    revenue: string;
    growth: string;
  };
  region: string;
  lastSync: string;
}

interface SystemMetric {
  label: string;
  value: string;
  status: 'operational' | 'warning' | 'critical';
  icon: string;
}

const brandEntities: BrandEntity[] = [
  {
    id: '1',
    name: 'VaultMesh Core',
    type: 'Active Scroll',
    status: 'Online',
    metrics: { engagement: 94, revenue: 'R2.4M', growth: '+12.3%' },
    region: 'Global',
    lastSync: '2 mins ago'
  },
  {
    id: '2',
    name: 'QuantumFlow Prime',
    type: 'Quantum Brand',
    status: 'Online',
    metrics: { engagement: 87, revenue: 'R1.8M', growth: '+8.7%' },
    region: 'Americas',
    lastSync: '5 mins ago'
  },
  {
    id: '3',
    name: 'MetaChain Nexus',
    type: 'Meta Economy',
    status: 'Syncing',
    metrics: { engagement: 76, revenue: 'R3.1M', growth: '+15.2%' },
    region: 'Europe',
    lastSync: '1 min ago'
  },
  {
    id: '4',
    name: 'StellarBridge Alpha',
    type: 'Interstellar Op',
    status: 'Online',
    metrics: { engagement: 92, revenue: 'R890K', growth: '+22.1%' },
    region: 'Asia Pacific',
    lastSync: '3 mins ago'
  },
  {
    id: '5',
    name: 'CrateSync Dynamic',
    type: 'Active Scroll',
    status: 'Maintenance',
    metrics: { engagement: 68, revenue: 'R1.2M', growth: '+4.5%' },
    region: 'Africa',
    lastSync: '15 mins ago'
  },
  {
    id: '6',
    name: 'NovaGrid Enterprise',
    type: 'Quantum Brand',
    status: 'Critical',
    metrics: { engagement: 45, revenue: 'R560K', growth: '-2.1%' },
    region: 'Middle East',
    lastSync: '32 mins ago'
  }
];

const systemMetrics: SystemMetric[] = [
  {
    label: 'Infinite Ledger Protocol',
    value: 'Active',
    status: 'operational',
    icon: 'fas fa-infinity'
  },
  {
    label: 'VaultMesh Network',
    value: 'Online',
    status: 'operational',
    icon: 'fas fa-network-wired'
  },
  {
    label: 'Quantum Coherence',
    value: '98.7%',
    status: 'operational',
    icon: 'fas fa-atom'
  },
  {
    label: 'Meta-Economy Sync',
    value: 'Degraded',
    status: 'warning',
    icon: 'fas fa-globe'
  }
];

export default function BrandControlCenter() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedEntity, setSelectedEntity] = useState<BrandEntity | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredEntities = brandEntities.filter(entity => {
    const typeMatch = filterType === 'all' || entity.type === filterType;
    const statusMatch = filterStatus === 'all' || entity.status === filterStatus;
    return typeMatch && statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return 'text-green-400';
      case 'Syncing': return 'text-blue-400';
      case 'Maintenance': return 'text-yellow-400';
      case 'Critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleEntityAction = (entityId: string, action: string) => {
    console.log(`${action} action triggered for entity ${entityId}`);
    // Handle entity actions (activate, sync, maintenance, etc.)
  };

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { id: 'rapid-deploy', name: 'Rapid Deploy Brands', icon: 'fas fa-dollar-sign' },
    { id: 'deploy-vault', name: 'Deploy Vault', icon: 'fas fa-box-open' },
    { id: 'brand-builder', name: 'Brand Builder', icon: 'fas fa-tools' },
    { id: 'licenses', name: 'My Licenses', icon: 'fas fa-file-contract' },
    { id: 'interstellar-ops', name: 'Interstellar Ops', icon: 'fas fa-rocket' },
    { id: 'quantum-brands', name: 'Quantum Brands', icon: 'fas fa-atom' },
    { id: 'meta-economy', name: 'Meta-Economy', icon: 'fas fa-globe' },
    { id: 'settings', name: 'Settings', icon: 'fas fa-cog' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0 w-80 bg-gray-800 border-r border-gray-700`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-yellow-400">Brand Navigator</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {sidebarItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-yellow-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-yellow-400'
                  }`}
                >
                  <i className={`${item.icon} text-lg`}></i>
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                <i className="fas fa-bars"></i>
              </button>
              <h1 className="text-2xl font-bold">
                <i className="fas fa-gem text-yellow-400 mr-2"></i>
                FAA™ Brand Control Center
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">Systems Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {/* Dashboard Overview */}
          {activeSection === 'dashboard' && (
            <div className="space-y-8">
              {/* System Status Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <i className={`${metric.icon} text-2xl text-yellow-400`}></i>
                      <div className={`w-3 h-3 rounded-full ${getStatusBadgeColor(metric.status)}`}></div>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{metric.label}</h3>
                    <p className={`text-sm ${
                      metric.status === 'operational' ? 'text-green-400' :
                      metric.status === 'warning' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Active Scrolls Summary */}
              <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-blue-400">Active Scrolls Overview</h2>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-400">7,038</p>
                      <p className="text-sm text-gray-400">Total Live</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-400">150</p>
                      <p className="text-sm text-gray-400">Daily Rate</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">Active Users</p>
                    <p className="text-xl font-bold text-blue-400">1,200+</p>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">Monthly Payouts</p>
                    <p className="text-xl font-bold text-green-400">R50M+</p>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">Avg. Royalty</p>
                    <p className="text-xl font-bold text-purple-400">9%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Brand Management Sections */}
          {(activeSection === 'rapid-deploy' || activeSection === 'quantum-brands' || activeSection === 'meta-economy' || activeSection === 'interstellar-ops') && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-4 text-yellow-400">
                  Brand Management - {activeSection.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h2>
                <div className="flex flex-wrap gap-4">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="all">All Types</option>
                    <option value="Active Scroll">Active Scrolls</option>
                    <option value="Quantum Brand">Quantum Brands</option>
                    <option value="Meta Economy">Meta Economy</option>
                    <option value="Interstellar Op">Interstellar Ops</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="Online">Online</option>
                    <option value="Syncing">Syncing</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              {/* Brand Entity Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEntities.map(entity => (
                  <div
                    key={entity.id}
                    className="bg-gray-800 border border-gray-700 p-6 rounded-xl hover:border-yellow-500 transition-colors cursor-pointer"
                    onClick={() => setSelectedEntity(entity)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg text-yellow-400">
                        <i className="fas fa-gem mr-2"></i>
                        {entity.name}
                      </h3>
                      <span className={`text-sm ${getStatusColor(entity.status)}`}>
                        ● {entity.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-400">
                        <i className="fas fa-tag mr-2"></i>
                        {entity.type}
                      </p>
                      <p className="text-sm text-gray-400">
                        <i className="fas fa-globe mr-2"></i>
                        {entity.region}
                      </p>
                      <p className="text-sm text-gray-400">
                        <i className="fas fa-clock mr-2"></i>
                        {entity.lastSync}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Engagement</p>
                        <p className="font-bold text-blue-400">{entity.metrics.engagement}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Revenue</p>
                        <p className="font-bold text-green-400">{entity.metrics.revenue}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Growth</p>
                        <p className={`font-bold ${
                          entity.metrics.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {entity.metrics.growth}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEntityAction(entity.id, 'manage');
                        }}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                      >
                        Manage
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEntityAction(entity.id, 'sync');
                        }}
                        className="flex-1 px-3 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                      >
                        Sync
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Entity Detail Modal */}
      {selectedEntity && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-yellow-400">{selectedEntity.name}</h2>
                  <p className="text-gray-400">{selectedEntity.type} • {selectedEntity.region}</p>
                </div>
                <button
                  onClick={() => setSelectedEntity(null)}
                  className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-3">Performance Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={getStatusColor(selectedEntity.status)}>
                        {selectedEntity.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Engagement:</span>
                      <span className="text-blue-400">{selectedEntity.metrics.engagement}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue:</span>
                      <span className="text-green-400">{selectedEntity.metrics.revenue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Growth:</span>
                      <span className={
                        selectedEntity.metrics.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'
                      }>
                        {selectedEntity.metrics.growth}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-3">Operations</h3>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      Force Sync
                    </button>
                    <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors">
                      Enter Maintenance
                    </button>
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                      Activate
                    </button>
                    <button className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                      Emergency Stop
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}