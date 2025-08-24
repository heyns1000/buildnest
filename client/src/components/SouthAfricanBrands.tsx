import { useState, useEffect } from 'react';

interface Brand {
  id: string;
  name: string;
  category: string;
  region: string;
  status: 'Active' | 'Pending' | 'Inactive';
  value: string;
  growth: string;
  lastUpdate: string;
  coordinates: [number, number];
}

interface RegionalMetric {
  label: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}

const southAfricanBrands: Brand[] = [
  {
    id: '1',
    name: 'Shoprite Holdings',
    category: 'Retail',
    region: 'Western Cape',
    status: 'Active',
    value: 'R45.2B',
    growth: '+12.3%',
    lastUpdate: '2 hours ago',
    coordinates: [-33.9249, 18.4241]
  },
  {
    id: '2', 
    name: 'Sasol Limited',
    category: 'Energy',
    region: 'Gauteng',
    status: 'Active',
    value: 'R38.7B',
    growth: '+8.7%',
    lastUpdate: '4 hours ago',
    coordinates: [-26.2041, 28.0473]
  },
  {
    id: '3',
    name: 'Capitec Bank',
    category: 'Financial Services',
    region: 'Western Cape',
    status: 'Active',
    value: 'R52.1B',
    growth: '+15.2%',
    lastUpdate: '1 hour ago',
    coordinates: [-33.9249, 18.4241]
  },
  {
    id: '4',
    name: 'Discovery Limited',
    category: 'Insurance',
    region: 'Gauteng',
    status: 'Active',
    value: 'R28.9B',
    growth: '+6.4%',
    lastUpdate: '3 hours ago',
    coordinates: [-26.2041, 28.0473]
  },
  {
    id: '5',
    name: 'MTN Group',
    category: 'Telecommunications',
    region: 'Gauteng',
    status: 'Active',
    value: 'R67.3B',
    growth: '+19.1%',
    lastUpdate: '1 hour ago',
    coordinates: [-26.2041, 28.0473]
  },
  {
    id: '6',
    name: 'Woolworths Holdings',
    category: 'Retail',
    region: 'Western Cape',
    status: 'Pending',
    value: 'R31.4B',
    growth: '+4.2%',
    lastUpdate: '6 hours ago',
    coordinates: [-33.9249, 18.4241]
  }
];

const regionalMetrics: RegionalMetric[] = [
  {
    label: 'Active Brands',
    value: '847',
    change: '+23 this month',
    icon: 'fas fa-building',
    color: 'text-green-400'
  },
  {
    label: 'Total Value',
    value: 'R2.4T',
    change: '+12.7% YoY',
    icon: 'fas fa-chart-line',
    color: 'text-blue-400'
  },
  {
    label: 'Market Share',
    value: '34.2%',
    change: '+2.1% growth',
    icon: 'fas fa-pie-chart',
    color: 'text-purple-400'
  },
  {
    label: 'Export Volume',
    value: 'R156B',
    change: '+8.9% increase',
    icon: 'fas fa-globe-africa',
    color: 'text-yellow-400'
  }
];

export default function SouthAfricanBrands() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [brands, setBrands] = useState<Brand[]>(southAfricanBrands);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [analysisQuery, setAnalysisQuery] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const regions = ['all', 'Western Cape', 'Gauteng', 'KwaZulu-Natal', 'Eastern Cape', 'Free State'];
  const categories = ['all', 'Retail', 'Energy', 'Financial Services', 'Insurance', 'Telecommunications', 'Mining'];

  // Filter brands based on selected criteria
  const filteredBrands = brands.filter(brand => {
    const matchesRegion = selectedRegion === 'all' || brand.region === selectedRegion;
    const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory;
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesCategory && matchesSearch;
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBrands(prev => prev.map(brand => ({
        ...brand,
        lastUpdate: Math.random() > 0.9 ? 'Just now' : brand.lastUpdate
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleBrandAnalysis = async () => {
    if (!analysisQuery.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const responses = {
        'growth trends': 'South African brands show strong growth in telecommunications (+19.1%) and financial services (+15.2%). The retail sector maintains steady performance with established players like Shoprite and Woolworths leading market expansion.',
        'market opportunities': 'Key opportunities exist in renewable energy transition, fintech innovation, and e-commerce expansion. The telecommunications sector shows particular promise with 5G infrastructure development.',
        'regional analysis': 'Gauteng leads in financial services and telecommunications, while Western Cape dominates retail and insurance sectors. Cross-regional partnerships could unlock additional value.',
        'investment outlook': 'Current market conditions favor diversified portfolios with emphasis on ESG-compliant brands. Technology adoption and digital transformation present significant upside potential.'
      };

      const query = analysisQuery.toLowerCase();
      const response = Object.entries(responses).find(([key]) => query.includes(key))?.[1] || 
        'Based on current market data, South African brands demonstrate resilience with strong fundamentals. Growth drivers include digital transformation, regional expansion, and sustainability initiatives. Consider sector diversification for optimal portfolio performance.';
      
      setAnalysisResult(response);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-400';
      case 'Pending': return 'text-yellow-400';
      case 'Inactive': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const renderMap = () => (
    <div className="bg-gray-800 rounded-lg p-6 h-96">
      <h4 className="font-bold mb-4 text-yellow-500">
        <i className="fas fa-map-marker-alt mr-2"></i>
        Brand Distribution Map
      </h4>
      <div className="relative w-full h-full bg-gray-700 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-map text-6xl text-gray-500 mb-4"></i>
          <p className="text-gray-400">Interactive map showing brand locations</p>
          <p className="text-sm text-gray-500 mt-2">
            {filteredBrands.length} brands displayed
          </p>
        </div>
        {/* Brand markers would be rendered here in a real implementation */}
        <div className="absolute top-4 left-4 bg-gray-900 p-2 rounded">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Active ({brands.filter(b => b.status === 'Active').length})</span>
          </div>
          <div className="flex items-center gap-2 text-xs mt-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span>Pending ({brands.filter(b => b.status === 'Pending').length})</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`space-y-6 transition-colors duration-300 ${
      isDarkMode ? 'text-gray-100' : 'text-gray-900'
    }`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-blue-500">Fruitful | </span>
            <span className="text-yellow-500">South Africa Dashboard</span>
          </h1>
          <p className="text-gray-400">Regional brand intelligence and market analytics</p>
        </div>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-full ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { id: 'overview', name: 'Overview', icon: 'fas fa-home' },
          { id: 'brands', name: 'Brand Portfolio', icon: 'fas fa-building' },
          { id: 'analytics', name: 'Market Analytics', icon: 'fas fa-chart-bar' },
          { id: 'map', name: 'Geographic View', icon: 'fas fa-map' },
          { id: 'ai-insights', name: 'AI Insights', icon: 'fas fa-brain' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-yellow-600 text-white'
                : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <i className={`${tab.icon} mr-2`}></i>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionalMetrics.map((metric, index) => (
              <div key={index} className={`p-6 rounded-xl ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {metric.label}
                    </p>
                    <p className="text-2xl font-bold mt-1">{metric.value}</p>
                    <p className={`text-sm mt-1 ${metric.color}`}>{metric.change}</p>
                  </div>
                  <i className={`${metric.icon} text-2xl ${metric.color}`}></i>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border`}>
              <h3 className="text-xl font-bold mb-6 text-yellow-500">
                <i className="fas fa-clock mr-2"></i>
                Recent Updates
              </h3>
              <div className="space-y-4">
                {brands.slice(0, 5).map(brand => (
                  <div key={brand.id} className={`p-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{brand.name}</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {brand.category} • {brand.region}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-400">{brand.value}</p>
                        <p className="text-sm text-green-400">{brand.growth}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {renderMap()}
          </div>
        </div>
      )}

      {/* Brand Portfolio Tab */}
      {activeTab === 'brands' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className={`p-6 rounded-xl ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border`}>
            <h3 className="text-xl font-bold mb-4 text-yellow-500">
              <i className="fas fa-filter mr-2"></i>
              Filter Brands
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Region</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                >
                  {regions.map(region => (
                    <option key={region} value={region}>
                      {region === 'all' ? 'All Regions' : region}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <i className="fas fa-download mr-2"></i>
                  Export Data
                </button>
              </div>
            </div>
          </div>

          {/* Brand Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBrands.map(brand => (
              <div
                key={brand.id}
                onClick={() => setSelectedBrand(brand)}
                className={`p-6 rounded-xl cursor-pointer transition-all hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-yellow-500' : 'bg-white border-gray-200 hover:border-yellow-500'
                } border`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-lg">{brand.name}</h4>
                  <span className={`text-sm ${getStatusColor(brand.status)}`}>
                    ● {brand.status}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <i className="fas fa-tag mr-2"></i>
                    {brand.category}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    {brand.region}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-xl text-green-400">{brand.value}</p>
                    <p className="text-sm text-green-400">{brand.growth}</p>
                  </div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Updated {brand.lastUpdate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Map Tab */}
      {activeTab === 'map' && (
        <div className="space-y-6">
          <div className="h-96">
            {renderMap()}
          </div>
          <div className={`p-6 rounded-xl ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border`}>
            <h3 className="text-xl font-bold mb-4 text-yellow-500">Regional Distribution</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {regions.filter(r => r !== 'all').map(region => {
                const count = brands.filter(b => b.region === region).length;
                return (
                  <div key={region} className="text-center">
                    <p className="font-bold text-2xl text-blue-400">{count}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {region}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* AI Insights Tab */}
      {activeTab === 'ai-insights' && (
        <div className="space-y-6">
          <div className={`p-6 rounded-xl ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border`}>
            <h3 className="text-xl font-bold mb-6 text-purple-500">
              <i className="fas fa-brain mr-2"></i>
              AI Market Analysis
            </h3>
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="Ask about market trends, growth opportunities, regional analysis..."
                value={analysisQuery}
                onChange={(e) => setAnalysisQuery(e.target.value)}
                className={`flex-1 px-4 py-3 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              />
              <button
                onClick={handleBrandAnalysis}
                disabled={isAnalyzing}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <>
                    <i className="fas fa-search mr-2"></i>
                    Analyze
                  </>
                )}
              </button>
            </div>
            
            {analysisResult && (
              <div className={`p-6 rounded-lg border ${
                isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <h4 className="font-bold mb-3 text-purple-400">Analysis Results:</h4>
                <p className="text-lg leading-relaxed">{analysisResult}</p>
              </div>
            )}

            {/* Quick Analysis Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {[
                'Growth trends',
                'Market opportunities', 
                'Regional analysis',
                'Investment outlook'
              ].map(query => (
                <button
                  key={query}
                  onClick={() => {
                    setAnalysisQuery(query);
                    setTimeout(handleBrandAnalysis, 100);
                  }}
                  className={`p-3 rounded-lg text-sm transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600' 
                      : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Brand Detail Modal */}
      {selectedBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full max-h-96 overflow-y-auto rounded-xl ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border`}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedBrand.name}</h2>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {selectedBrand.category} • {selectedBrand.region}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className={`p-2 rounded-lg ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-3">Performance Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Current Value:</span>
                      <span className="font-bold text-green-400">{selectedBrand.value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Growth Rate:</span>
                      <span className="font-bold text-green-400">{selectedBrand.growth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={getStatusColor(selectedBrand.status)}>
                        {selectedBrand.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-3">Location Details</h3>
                  <div className="space-y-2">
                    <p>Region: {selectedBrand.region}</p>
                    <p>Coordinates: {selectedBrand.coordinates.join(', ')}</p>
                    <p>Last Update: {selectedBrand.lastUpdate}</p>
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