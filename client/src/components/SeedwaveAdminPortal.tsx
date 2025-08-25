import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectorData {
  id: string;
  name: string;
  icon: string;
  category: string;
  brandCount: number;
  status: 'Active' | 'Monitoring' | 'Sync';
  signalStrength: number;
}

interface NavigationItem {
  id: string;
  name: string;
  icon: string;
  url: string;
  status: 'current' | 'active' | 'monitoring';
}

interface AccessPortal {
  id: string;
  name: string;
  icon: string;
  color: string;
  access: string;
  description: string;
}

export default function SeedwaveAdminPortal() {
  const [activeSector, setActiveSector] = useState('agriculture');
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);

  const accessPortals: AccessPortal[] = [
    {
      id: 'loyalty',
      name: 'Loyalty Access',
      icon: '🪙',
      color: 'bg-blue-600 hover:bg-blue-700',
      access: 'Premium',
      description: 'Core loyalty member portal access'
    },
    {
      id: 'shareholder',
      name: 'Shareholder Access',
      icon: '📊',
      color: 'bg-gray-800 hover:bg-gray-900',
      access: 'Executive',
      description: 'Shareholder portal and analytics'
    },
    {
      id: 'service-provider',
      name: 'Service Provider',
      icon: '🤝',
      color: 'bg-green-500 hover:bg-green-600',
      access: 'Partner',
      description: 'Service provider management portal'
    },
    {
      id: 'family',
      name: 'Family Access',
      icon: '👨‍👩‍👧‍👦',
      color: 'bg-purple-500 hover:bg-purple-600',
      access: 'Family',
      description: 'Family member access and benefits'
    }
  ];

  const navigationItems: NavigationItem[] = [
    { id: 'quick-view', name: 'Quick View', icon: '🏁', url: 'quick-view.html', status: 'current' },
    { id: 'pulse-monitor', name: 'Signal Sync', icon: '📡', url: 'pulse-monitor.html', status: 'active' },
    { id: 'node-status', name: 'Node Index', icon: '🧩', url: 'node-status.html', status: 'active' },
    { id: 'sector-grid', name: 'Sector Grid', icon: '🏙️', url: 'sector-grid.html', status: 'active' },
    { id: 'licensing', name: 'License Ledger', icon: '🔐', url: 'licensing.html', status: 'active' },
    { id: 'clause-index', name: 'FAA Clauses', icon: '📜', url: 'clause-index.html', status: 'active' },
    { id: 'scrollmap', name: 'ScrollMap', icon: '🗺️', url: 'scrollmap.html', status: 'active' },
    { id: 'ecosystem', name: 'Ecosystem Mesh', icon: '🌿', url: 'ecosystem.html', status: 'monitoring' },
    { id: 'brandmetrics', name: 'Brand Metrics', icon: '🔍', url: 'brandmetrics.html', status: 'active' },
    { id: 'scroll-layers', name: 'Scroll Layers', icon: '🧬', url: 'scroll-layers.html', status: 'active' },
    { id: 'grid-index', name: 'Grid Index', icon: '📊', url: 'grid-index.html', status: 'active' },
    { id: 'node-packs', name: 'Node Packs', icon: '📁', url: 'node-packs.html', status: 'active' },
    { id: 'audit-tracker', name: 'Audit Tracker', icon: '📈', url: 'audit-tracker.html', status: 'active' },
    { id: 'signal-zones', name: 'Signal Zones', icon: '🛰️', url: 'signal-zones.html', status: 'active' },
    { id: 'ecosync-logs', name: 'Ecosync Logs', icon: '📥', url: 'ecosync-logs.html', status: 'active' }
  ];

  const sectorData: SectorData[] = [
    { id: 'agriculture', name: 'Agriculture & Biotech', icon: '🌱', category: 'Primary', brandCount: 247, status: 'Active', signalStrength: 94.2 },
    { id: 'fsf', name: 'Food, Soil & Farming', icon: '🥦', category: 'Primary', brandCount: 189, status: 'Active', signalStrength: 91.8 },
    { id: 'banking', name: 'Banking & Finance', icon: '🏦', category: 'Financial', brandCount: 456, status: 'Active', signalStrength: 98.7 },
    { id: 'creative', name: 'Creative Tech', icon: '🖋️', category: 'Technology', brandCount: 312, status: 'Monitoring', signalStrength: 87.3 },
    { id: 'logistics', name: 'Logistics & Packaging', icon: '📦', category: 'Operations', brandCount: 298, status: 'Active', signalStrength: 93.1 },
    { id: 'education-ip', name: 'Education & IP', icon: '📚', category: 'Knowledge', brandCount: 234, status: 'Active', signalStrength: 89.6 },
    { id: 'fashion', name: 'Fashion & Identity', icon: '✂', category: 'Consumer', brandCount: 178, status: 'Sync', signalStrength: 82.4 },
    { id: 'gaming', name: 'Gaming & Simulation', icon: '🎮', category: 'Entertainment', brandCount: 367, status: 'Active', signalStrength: 96.2 },
    { id: 'health', name: 'Health & Hygiene', icon: '🧠', category: 'Healthcare', brandCount: 423, status: 'Active', signalStrength: 97.8 },
    { id: 'housing', name: 'Housing & Infrastructure', icon: '🏗️', category: 'Infrastructure', brandCount: 345, status: 'Active', signalStrength: 88.9 },
    { id: 'justice', name: 'Justice & Ethics', icon: '⚖', category: 'Governance', brandCount: 156, status: 'Monitoring', signalStrength: 91.3 },
    { id: 'knowledge', name: 'Knowledge & Archives', icon: '📖', category: 'Knowledge', brandCount: 289, status: 'Active', signalStrength: 94.7 },
    { id: 'micromesh', name: 'Micro-Mesh Logistics', icon: '☰', category: 'Operations', brandCount: 145, status: 'Sync', signalStrength: 85.1 },
    { id: 'media', name: 'Motion, Media & Sonic', icon: '🎬', category: 'Entertainment', brandCount: 398, status: 'Active', signalStrength: 92.6 },
    { id: 'nutrition', name: 'Nutrition & Food Chain', icon: '✿', category: 'Primary', brandCount: 267, status: 'Active', signalStrength: 90.4 },
    { id: 'ai-logic', name: 'AI, Logic & Grid', icon: '🧠', category: 'Technology', brandCount: 578, status: 'Active', signalStrength: 99.1 },
    { id: 'packaging', name: 'Packaging & Materials', icon: '📦', category: 'Operations', brandCount: 234, status: 'Active', signalStrength: 87.2 },
    { id: 'quantum', name: 'Quantum Protocols', icon: '✴️', category: 'Technology', brandCount: 89, status: 'Monitoring', signalStrength: 94.8 },
    { id: 'ritual', name: 'Ritual & Culture', icon: '☯', category: 'Social', brandCount: 123, status: 'Sync', signalStrength: 83.7 },
    { id: 'saas', name: 'SaaS & Licensing', icon: '🔑', category: 'Technology', brandCount: 445, status: 'Active', signalStrength: 95.3 },
    { id: 'trade', name: 'Trade Systems', icon: '🧺', category: 'Commercial', brandCount: 356, status: 'Active', signalStrength: 89.8 },
    { id: 'utilities', name: 'Utilities & Energy', icon: '🔋', category: 'Infrastructure', brandCount: 198, status: 'Active', signalStrength: 96.4 },
    { id: 'voice', name: 'Voice & Audio', icon: '🎙️', category: 'Entertainment', brandCount: 167, status: 'Monitoring', signalStrength: 88.3 },
    { id: 'webless', name: 'Webless Tech & Nodes', icon: '📡', category: 'Technology', brandCount: 145, status: 'Sync', signalStrength: 92.1 },
    { id: 'nft', name: 'NFT & Ownership', icon: '🔁', category: 'Digital', brandCount: 234, status: 'Active', signalStrength: 87.9 },
    { id: 'education-youth', name: 'Education & Youth', icon: '🎓', category: 'Knowledge', brandCount: 298, status: 'Active', signalStrength: 93.5 },
    { id: 'zerowaste', name: 'Zero Waste', icon: '♻️', category: 'Environmental', brandCount: 178, status: 'Monitoring', signalStrength: 86.7 },
    { id: 'professional', name: 'Professional Services', icon: '🧾', category: 'Business', brandCount: 389, status: 'Active', signalStrength: 91.4 },
    { id: 'payroll-mining', name: 'Payroll Mining & Accounting', icon: '🪙', category: 'Financial', brandCount: 267, status: 'Active', signalStrength: 97.2 }
  ];

  const [currentStats, setCurrentStats] = useState({
    totalBrands: sectorData.reduce((sum, sector) => sum + sector.brandCount, 0),
    activeSectors: sectorData.filter(s => s.status === 'Active').length,
    averageSignal: Math.round(sectorData.reduce((sum, sector) => sum + sector.signalStrength, 0) / sectorData.length * 10) / 10,
    syncOperations: sectorData.filter(s => s.status === 'Sync').length
  });

  // Live pulse simulation
  useEffect(() => {
    if (isLiveMode) {
      const interval = setInterval(() => {
        setPulseActive(prev => !prev);
        setCurrentStats(prev => ({
          ...prev,
          totalBrands: prev.totalBrands + Math.floor((Math.random() - 0.5) * 10),
          averageSignal: Math.max(80, Math.min(100, prev.averageSignal + (Math.random() - 0.5) * 2))
        }));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isLiveMode]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Monitoring': return 'text-yellow-600 bg-yellow-100';
      case 'Sync': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Primary': 'border-l-green-500',
      'Financial': 'border-l-blue-500',
      'Technology': 'border-l-purple-500',
      'Operations': 'border-l-orange-500',
      'Knowledge': 'border-l-indigo-500',
      'Consumer': 'border-l-pink-500',
      'Entertainment': 'border-l-red-500',
      'Healthcare': 'border-l-cyan-500',
      'Infrastructure': 'border-l-gray-500',
      'Governance': 'border-l-yellow-500',
      'Social': 'border-l-teal-500',
      'Commercial': 'border-l-emerald-500',
      'Digital': 'border-l-violet-500',
      'Environmental': 'border-l-lime-500',
      'Business': 'border-l-slate-500'
    };
    return colors[category as keyof typeof colors] || 'border-l-gray-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      {/* Global Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white py-8 mb-8 shadow-xl"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            animate={pulseActive ? { scale: 1.02 } : { scale: 1 }}
            className="text-4xl font-extrabold"
          >
            FAA.ZONE™
          </motion.h1>
          <p className="text-lg opacity-90 mt-2">The Earth's Financial Allocation Architecture</p>
          <p className="text-xs opacity-70 mt-1">Live Omni-View Pulse Grid</p>
        </div>
      </motion.header>

      {/* Admin Portal Header */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-indigo-700 text-white py-6 mb-8 shadow relative"
      >
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold">🦁 Seedwave™ Admin Portal</h1>
          <p className="text-sm opacity-80 mt-2">✿Corebrands management & AI logic deployment center</p>
        </div>
        
        {/* Access Portals */}
        <div className="container mx-auto px-6 mt-4 md:absolute md:right-6 md:top-6 flex flex-wrap justify-center gap-2">
          {accessPortals.map((portal, index) => (
            <motion.button
              key={portal.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className={`${portal.color} text-white text-sm font-semibold px-4 py-1 rounded shadow transition-all`}
              title={portal.description}
            >
              {portal.icon} {portal.name}
            </motion.button>
          ))}
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6">
        {/* Master Pulse Dashboard Header */}
        <motion.header
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white shadow p-6 flex flex-col sm:flex-row justify-between items-center rounded-lg mb-8"
        >
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-700">🍇 Fruitful™ Master Pulse Dashboard</h1>
            <p className="text-sm text-gray-500">VaultMesh Actuarial Grid · Real-Time Scroll Activity</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm mt-4 sm:mt-0 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow"
            >
              🧑‍✈️ FAA Owner
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-gray-600 text-white rounded shadow"
            >
              🖥️ Hardware Access
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-green-500 text-white rounded shadow"
            >
              🤝 Distributor Panel
            </motion.button>
          </div>
        </motion.header>

        {/* Stats Overview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Brands</p>
                <p className="text-2xl font-bold text-indigo-600">{currentStats.totalBrands.toLocaleString()}</p>
              </div>
              <div className="text-3xl">🏢</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Sectors</p>
                <p className="text-2xl font-bold text-green-600">{currentStats.activeSectors}</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Signal</p>
                <p className="text-2xl font-bold text-blue-600">{currentStats.averageSignal}%</p>
              </div>
              <div className="text-3xl">📡</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Sync Operations</p>
                <p className="text-2xl font-bold text-purple-600">{currentStats.syncOperations}</p>
              </div>
              <div className="text-3xl">🔄</div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Menu */}
        <motion.nav
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-100 flex flex-wrap gap-y-2 gap-x-6 px-6 py-3 text-sm overflow-x-auto rounded-lg mb-8"
        >
          {navigationItems.map((item, index) => (
            <motion.a
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              href="#"
              className={`flex items-center gap-2 transition-all duration-200 hover:-translate-y-1 hover:scale-105 ${
                item.status === 'current' 
                  ? 'text-indigo-700 font-semibold' 
                  : item.status === 'monitoring'
                  ? 'text-green-600 font-semibold'
                  : 'hover:text-indigo-600'
              }`}
            >
              {item.icon} {item.name}
              {item.status === 'current' && ' (Current)'}
            </motion.a>
          ))}
        </motion.nav>

        {/* Live Mode Toggle */}
        <div className="flex justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLiveMode(!isLiveMode)}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              isLiveMode 
                ? 'bg-green-600 text-white shadow-lg' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isLiveMode ? '🟢 Live Pulse Active' : '⚪ Activate Live Pulse'}
          </motion.button>
        </div>

        {/* Sector Grid */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white border rounded-lg shadow mb-8"
        >
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">📊 Sector Navigation Grid</h2>
            <p className="text-gray-600">Click any sector to view brand snapshots and operational details</p>
          </div>
          
          <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {sectorData.map((sector, index) => (
              <motion.button
                key={sector.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.03 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSector(sector.id)}
                className={`p-4 rounded-lg border-l-4 text-left transition-all ${getCategoryColor(sector.category)} ${
                  activeSector === sector.id 
                    ? 'bg-indigo-50 border-indigo-300 shadow-md' 
                    : 'bg-gray-50 hover:bg-gray-100 hover:shadow'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg">{sector.icon}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(sector.status)}`}>
                    {sector.status}
                  </span>
                </div>
                <div className="text-sm font-medium text-gray-700 mb-1">{sector.name}</div>
                <div className="text-xs text-gray-500 mb-2">{sector.category}</div>
                <div className="flex justify-between text-xs">
                  <span className="font-semibold">{sector.brandCount} brands</span>
                  <span className="text-blue-600">{sector.signalStrength}%</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Active Sector Details */}
        <AnimatePresence mode="wait">
          {activeSector && (
            <motion.div
              key={activeSector}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow p-6 mb-8"
            >
              {(() => {
                const sector = sectorData.find(s => s.id === activeSector);
                return sector ? (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{sector.icon}</span>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800">{sector.name}</h3>
                          <p className="text-gray-600">{sector.category} Sector</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(sector.status)}`}>
                          {sector.status}
                        </div>
                        <div className="text-2xl font-bold text-blue-600 mt-1">{sector.signalStrength}%</div>
                        <div className="text-sm text-gray-500">Signal Strength</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Brand Portfolio</h4>
                        <div className="text-3xl font-bold text-indigo-600">{sector.brandCount}</div>
                        <div className="text-sm text-gray-500">Active Brands</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Operational Status</h4>
                        <div className="text-lg font-bold text-green-600">{sector.status}</div>
                        <div className="text-sm text-gray-500">Current Mode</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Signal Quality</h4>
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-3 mr-3">
                            <motion.div
                              className="bg-blue-500 h-3 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${sector.signalStrength}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                          <span className="text-sm font-semibold">{sector.signalStrength}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Brand Snapshot Preview</h4>
                      <p className="text-sm text-gray-600">
                        This sector contains {sector.brandCount} active brands with comprehensive operational data, 
                        real-time metrics, and integrated VaultMesh™ protocols. Signal strength at {sector.signalStrength}% 
                        indicates optimal connectivity to the Fruitful™ ecosystem.
                      </p>
                    </div>
                  </div>
                ) : null;
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}