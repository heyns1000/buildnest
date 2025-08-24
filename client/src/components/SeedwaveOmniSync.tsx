import { useState, useEffect } from 'react';

interface ScrollData {
  id: string;
  brandName: string;
  icon: string;
  scrollType: 'tokenized' | 'identity' | 'security' | 'infrastructure' | 'content' | 'analytics' | 'commerce' | 'governance';
  masterLicenseFee: number;
  monthlyTiers: {
    local: number;
    regional: number;
    global: number;
  };
  royaltyPercentage: number;
  splitMode: 'standard' | 'premium' | 'enterprise' | 'custom';
  activationCountdown: number;
  vaultId: string;
  claimRootLink: string;
  deploymentRegions: string[];
  status: 'active' | 'pending' | 'activating' | 'deployed' | 'maintenance';
  lastUpdated: string;
  features: string[];
  category: string;
  priority: 'high' | 'medium' | 'low';
}

interface VaultPayMetrics {
  totalTransactions: number;
  monthlyRevenue: number;
  activeLicenses: number;
  pendingPayments: number;
}

// Generate all 7038 scrolls
const generateAllScrolls = (): ScrollData[] => {
  const scrolls: ScrollData[] = [];
  const brands = [
    'VaultMesh™', 'OmniGrid™', 'ClaimRoot™', 'CodeNest™', 'TreatyMesh™', 'EcoFlow™', 
    'BioSense™', 'CrateDance™', 'AuraSync™', 'MetaVerse Nexus™', 'DataStream Forge™', 
    'QuantumPulse™', 'SonicGrid™', 'VisualFlow™', 'AudioPulse™', 'MotionPlex™'
  ];
  
  const icons = ['🔒', '🌐', '⚡', '</>', '🤝', '🍃', '🧬', '📦', '🌟', '🎮', '🔧', '⚛️', '🎵', '🎬', '🎤', '🎯'];
  const scrollTypes: ('tokenized' | 'identity' | 'security' | 'infrastructure' | 'content' | 'analytics' | 'commerce' | 'governance')[] = 
    ['tokenized', 'identity', 'security', 'infrastructure', 'content', 'analytics', 'commerce', 'governance'];
  const regions = ['North America', 'Europe', 'Asia-Pacific', 'Latin America', 'Africa', 'Global'];
  const statuses: ('active' | 'pending' | 'activating' | 'deployed' | 'maintenance')[] = 
    ['active', 'pending', 'activating', 'deployed', 'maintenance'];
  
  for (let i = 1; i <= 7038; i++) {
    const brandIndex = i % brands.length;
    const scroll: ScrollData = {
      id: `scroll-${String(i).padStart(4, '0')}`,
      brandName: `${brands[brandIndex]} ${i}`,
      icon: icons[brandIndex],
      scrollType: scrollTypes[i % scrollTypes.length],
      masterLicenseFee: Math.floor(Math.random() * 50000) + 5000,
      monthlyTiers: {
        local: Math.floor(Math.random() * 500) + 50,
        regional: Math.floor(Math.random() * 2000) + 200,
        global: Math.floor(Math.random() * 5000) + 500
      },
      royaltyPercentage: Math.floor(Math.random() * 30) + 5,
      splitMode: ['standard', 'premium', 'enterprise', 'custom'][i % 4] as any,
      activationCountdown: Math.floor(Math.random() * 86400),
      vaultId: `vault-${String(i).padStart(6, '0')}`,
      claimRootLink: `https://claimroot.faa.zone/scroll/${i}`,
      deploymentRegions: regions.slice(0, Math.floor(Math.random() * 4) + 1),
      status: statuses[i % statuses.length],
      lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      features: [
        'Real-time Processing',
        'Blockchain Verification',
        'AI Integration',
        'Global Deployment'
      ].slice(0, Math.floor(Math.random() * 4) + 1),
      category: ['quantum', 'blockchain', 'ai-intelligence', 'neural-networks'][i % 4],
      priority: ['high', 'medium', 'low'][i % 3] as any
    };
    scrolls.push(scroll);
  }
  
  return scrolls;
};

const vaultPayMetrics: VaultPayMetrics = {
  totalTransactions: 45892,
  monthlyRevenue: 2847591,
  activeLicenses: 6834,
  pendingPayments: 342
};

export default function SeedwaveOmniSync() {
  const [scrolls] = useState<ScrollData[]>(generateAllScrolls());
  const [filteredScrolls, setFilteredScrolls] = useState<ScrollData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedScroll, setSelectedScroll] = useState<ScrollData | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);
  
  const scrollsPerPage = 50;

  useEffect(() => {
    let filtered = scrolls;

    if (searchTerm) {
      filtered = filtered.filter(scroll =>
        scroll.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scroll.vaultId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(scroll => scroll.scrollType === selectedType);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(scroll => scroll.status === selectedStatus);
    }

    setFilteredScrolls(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedType, selectedStatus, scrolls]);

  const paginatedScrolls = filteredScrolls.slice(
    (currentPage - 1) * scrollsPerPage,
    currentPage * scrollsPerPage
  );

  const totalPages = Math.ceil(filteredScrolls.length / scrollsPerPage);

  const formatCountdown = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'activating': return 'text-blue-400';
      case 'deployed': return 'text-purple-400';
      case 'maintenance': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tokenized': return 'fas fa-coins';
      case 'identity': return 'fas fa-id-card';
      case 'security': return 'fas fa-shield-alt';
      case 'infrastructure': return 'fas fa-server';
      case 'content': return 'fas fa-file-alt';
      case 'analytics': return 'fas fa-chart-bar';
      case 'commerce': return 'fas fa-shopping-cart';
      case 'governance': return 'fas fa-gavel';
      default: return 'fas fa-scroll';
    }
  };

  const startDataExtraction = async () => {
    setIsExtracting(true);
    setExtractionProgress(0);

    // Simulate extraction process
    for (let i = 0; i <= 100; i += 2) {
      setExtractionProgress(i);
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    setIsExtracting(false);
    alert('🎉 Seedwave-OmniSync™ extraction complete! All 7038 scrolls processed successfully.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-blue-500">Seedwave-OmniSync™</span>
          <span className="text-yellow-500 ml-2">Full System Extraction</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Managing {scrolls.length.toLocaleString()} active scrolls across the FAA ecosystem
        </p>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-blue-400 mb-2">
            <i className="fas fa-scroll mr-2"></i>
            Total Scrolls
          </h3>
          <p className="text-3xl font-bold">{scrolls.length.toLocaleString()}</p>
          <p className="text-sm text-gray-400 mt-1">Active in ecosystem</p>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-green-400 mb-2">
            <i className="fas fa-dollar-sign mr-2"></i>
            Monthly Revenue
          </h3>
          <p className="text-3xl font-bold">${vaultPayMetrics.monthlyRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-400 mt-1">From all scrolls</p>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-purple-400 mb-2">
            <i className="fas fa-key mr-2"></i>
            Active Licenses
          </h3>
          <p className="text-3xl font-bold">{vaultPayMetrics.activeLicenses.toLocaleString()}</p>
          <p className="text-sm text-gray-400 mt-1">Currently deployed</p>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-yellow-400 mb-2">
            <i className="fas fa-clock mr-2"></i>
            Pending Payments
          </h3>
          <p className="text-3xl font-bold">{vaultPayMetrics.pendingPayments}</p>
          <p className="text-sm text-gray-400 mt-1">Awaiting processing</p>
        </div>
      </div>

      {/* Extraction Control */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600/30 p-6 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-blue-400">
            <i className="fas fa-download mr-2"></i>
            Data Extraction Protocol
          </h3>
          <button
            onClick={startDataExtraction}
            disabled={isExtracting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isExtracting ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Extracting...
              </>
            ) : (
              <>
                <i className="fas fa-rocket mr-2"></i>
                Start Extraction
              </>
            )}
          </button>
        </div>
        
        {isExtracting && (
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-300"
              style={{ width: `${extractionProgress}%` }}
            />
          </div>
        )}
        
        <p className="text-blue-300 mt-2">
          Extract all scroll data for SAP, Deel, and Sage integration. Processing {scrolls.length.toLocaleString()} records.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Search Scrolls</label>
            <input
              type="text"
              placeholder="Search by name or vault ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Scroll Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="all">All Types</option>
              <option value="tokenized">Tokenized</option>
              <option value="identity">Identity</option>
              <option value="security">Security</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="content">Content</option>
              <option value="analytics">Analytics</option>
              <option value="commerce">Commerce</option>
              <option value="governance">Governance</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="activating">Activating</option>
              <option value="deployed">Deployed</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <i className="fas fa-filter mr-2"></i>
              Apply Filters
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredScrolls.length.toLocaleString()} of {scrolls.length.toLocaleString()} scrolls
        </div>
      </div>

      {/* Scrolls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedScrolls.map(scroll => (
          <div
            key={scroll.id}
            onClick={() => setSelectedScroll(scroll)}
            className="bg-gray-800 border border-gray-700 p-6 rounded-xl cursor-pointer hover:border-blue-500 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{scroll.icon}</span>
                <div>
                  <h4 className="font-bold">{scroll.brandName}</h4>
                  <p className="text-xs text-gray-400">{scroll.id}</p>
                </div>
              </div>
              <span className={`text-sm ${getStatusColor(scroll.status)}`}>
                ● {scroll.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <i className={`${getTypeIcon(scroll.scrollType)} text-blue-400`}></i>
                <span className="text-sm capitalize">{scroll.scrollType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">License Fee:</span>
                <span className="text-sm font-bold text-green-400">${scroll.masterLicenseFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Royalty:</span>
                <span className="text-sm font-bold text-yellow-400">{scroll.royaltyPercentage}%</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              <p>Vault: {scroll.vaultId}</p>
              <p>Updated: {new Date(scroll.lastUpdated).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
        >
          Previous
        </button>
        
        <span className="text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Scroll Detail Modal */}
      {selectedScroll && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-4xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedScroll.brandName}</h2>
                  <p className="text-gray-400">{selectedScroll.id} • {selectedScroll.vaultId}</p>
                </div>
                <button
                  onClick={() => setSelectedScroll(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-3">Scroll Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="capitalize">{selectedScroll.scrollType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={getStatusColor(selectedScroll.status)}>
                        {selectedScroll.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Priority:</span>
                      <span className="capitalize">{selectedScroll.priority}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Split Mode:</span>
                      <span className="capitalize">{selectedScroll.splitMode}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold mb-3">Financial Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Master License:</span>
                      <span className="text-green-400 font-bold">
                        ${selectedScroll.masterLicenseFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Royalty %:</span>
                      <span className="text-yellow-400 font-bold">
                        {selectedScroll.royaltyPercentage}%
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Monthly Tiers:</p>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center">
                          <p className="text-gray-400">Local</p>
                          <p className="font-bold">${selectedScroll.monthlyTiers.local}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-400">Regional</p>
                          <p className="font-bold">${selectedScroll.monthlyTiers.regional}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-400">Global</p>
                          <p className="font-bold">${selectedScroll.monthlyTiers.global}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-bold mb-3">Deployment Regions</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedScroll.deploymentRegions.map((region, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                    >
                      {region}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-bold mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedScroll.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => window.open(selectedScroll.claimRootLink, '_blank')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <i className="fas fa-external-link-alt mr-2"></i>
                  View ClaimRoot
                </button>
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <i className="fas fa-download mr-2"></i>
                  Export Data
                </button>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <i className="fas fa-sync mr-2"></i>
                  Sync Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}