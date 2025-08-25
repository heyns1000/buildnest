import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AIEngine {
  id: string;
  name: string;
  icon: string;
  description: string;
  efficiency: string;
  status: 'Active' | 'Standby';
  progress: string;
}

interface KPIMetrics {
  networkLoad: number;
  securityScore: number;
  equipmentUptime: number;
  costSavings: number;
  roi: number;
  responseTime: number;
}

export default function BuildNestAIEngineConsole() {
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [engines, setEngines] = useState<AIEngine[]>([
    {
      id: "corethink",
      name: "Corethink™",
      icon: "🧠",
      description: "Primary cognitive processing engine",
      efficiency: "85.3%",
      status: "Active",
      progress: "92%"
    },
    {
      id: "truthweight", 
      name: "TruthWeight™",
      icon: "🔍", 
      description: "Data validation and truth assessment",
      efficiency: "91.7%",
      status: "Active", 
      progress: "88%"
    },
    {
      id: "ecosynth",
      name: "EchoSynth™", 
      icon: "🔄",
      description: "Pattern recognition and synthesis",
      efficiency: "89.2%",
      status: "Standby",
      progress: "45%"
    },
    {
      id: "autosigil",
      name: "AutoSigil™",
      icon: "🛡️",
      description: "Automated security and encryption", 
      efficiency: "96.4%",
      status: "Active",
      progress: "97%"
    },
    {
      id: "pulseindex",
      name: "PulseIndex™",
      icon: "📊", 
      description: "Real-time indexing and monitoring",
      efficiency: "87.9%",
      status: "Active",
      progress: "83%"
    },
    {
      id: "omnitrace", 
      name: "OmniTrace™",
      icon: "📋",
      description: "Comprehensive system tracing",
      efficiency: "93.1%", 
      status: "Standby",
      progress: "72%"
    },
    {
      id: "lifthalo",
      name: "LiftHalo™",
      icon: "🔒", 
      description: "Elevated security protocols",
      efficiency: "94.8%",
      status: "Active", 
      progress: "89%"
    },
    {
      id: "mirrorloop",
      name: "MirrorLoop™",
      icon: "🔄", 
      description: "Recursive optimization cycles",
      efficiency: "82.6%",
      status: "Standby",
      progress: "56%"
    },
    {
      id: "fireratio", 
      name: "FireRatio™",
      icon: "🔥",
      description: "Performance scaling optimization",
      efficiency: "90.3%",
      status: "Active",
      progress: "95%"
    }
  ]);

  const [kpiMetrics, setKpiMetrics] = useState<KPIMetrics>({
    networkLoad: 78.5,
    securityScore: 94.2,
    equipmentUptime: 99.1,
    costSavings: 12.7,
    roi: 145,
    responseTime: 0.3
  });

  const [demoConfig, setDemoConfig] = useState({
    industry: "Education",
    dataVolume: "Large",
    network: "Global",
    security: "High"
  });

  const [operationLogs, setOperationLogs] = useState<string[]>([
    "[11:49:35] ✓ BuildNest Dashboard initialized",
    "[11:49:36] ℹ Starting simulation with current parameters...",
    "[11:49:37] ✓ Simulation complete - all systems operational",
    "[11:49:38] ℹ Corethink™ activated",
    "[11:49:39] ℹ AutoSigil™ activated",
    "[11:49:40] ℹ Connecting to live data streams...",
    "[11:49:41] ✓ Live mode activated - metrics updating every 5 seconds"
  ]);

  const industryOptions = ["Finance", "Healthcare", "Manufacturing", "Technology", "Agriculture", "Mining", "Education"];
  const dataVolumeOptions = ["Small", "Medium", "Large", "Enterprise"];
  const networkOptions = ["Local", "Regional", "Global", "Multi-Cloud"];
  const securityOptions = ["Standard", "High", "Maximum", "Classified"];

  // Live data simulation
  useEffect(() => {
    if (isLiveMode) {
      const interval = setInterval(() => {
        setKpiMetrics(prev => ({
          ...prev,
          networkLoad: Math.max(0, Math.min(100, prev.networkLoad + (Math.random() - 0.5) * 20)),
          securityScore: Math.max(80, Math.min(100, prev.securityScore + (Math.random() - 0.5) * 5)),
          equipmentUptime: Math.max(90, Math.min(100, prev.equipmentUptime + (Math.random() - 0.5) * 2)),
          responseTime: Math.max(0.1, Math.min(2.0, prev.responseTime + (Math.random() - 0.5) * 0.5))
        }));

        const timestamp = new Date().toLocaleTimeString();
        setOperationLogs(prev => [
          ...prev.slice(-10),
          `[${timestamp}] ℹ Live update: Network load ${Math.round(kpiMetrics.networkLoad * 10) / 10}%`
        ]);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isLiveMode, kpiMetrics.networkLoad]);

  const toggleEngineStatus = (engineId: string) => {
    setEngines(prev => prev.map(engine => 
      engine.id === engineId 
        ? { ...engine, status: engine.status === 'Active' ? 'Standby' : 'Active' }
        : engine
    ));

    const timestamp = new Date().toLocaleTimeString();
    const engine = engines.find(e => e.id === engineId);
    setOperationLogs(prev => [
      ...prev.slice(-10),
      `[${timestamp}] ℹ ${engine?.name} ${engine?.status === 'Active' ? 'deactivated' : 'activated'}`
    ]);
  };

  const generateSimulation = () => {
    const timestamp = new Date().toLocaleTimeString();
    setOperationLogs(prev => [
      ...prev.slice(-10),
      `[${timestamp}] ⚡ Simulation generated with ${demoConfig.industry} parameters`,
      `[${timestamp}] ✓ ${demoConfig.dataVolume} data volume configured`,
      `[${timestamp}] ✓ ${demoConfig.network} network topology activated`
    ]);
  };

  const connectLiveData = () => {
    setIsLiveMode(true);
    const timestamp = new Date().toLocaleTimeString();
    setOperationLogs(prev => [
      ...prev.slice(-10),
      `[${timestamp}] 📊 Live data stream connected`,
      `[${timestamp}] ✓ Real-time monitoring activated`
    ]);
  };

  const stopLiveData = () => {
    setIsLiveMode(false);
    const timestamp = new Date().toLocaleTimeString();
    setOperationLogs(prev => [
      ...prev.slice(-10),
      `[${timestamp}] ⚡ Live data stream disconnected`,
      `[${timestamp}] ℹ Returning to simulation mode`
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-yellow-400 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-6xl mx-auto w-16 h-16 flex items-center justify-center"
          >
            🏗️
          </motion.div>
          <h1 className="text-4xl font-bold">FAA.zone™ MONSTER OMNI™ BuildNest Dashboard</h1>
          <p className="text-yellow-200/80">Advanced sector-specific brand management with AI-powered real-time metrics and ecosystem integration</p>
        </div>

        {/* Demo Configuration Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/70 rounded-xl p-6 border border-yellow-500/30"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            🔧 DEMO CONFIGURATION PANEL
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Industry</label>
              <select 
                value={demoConfig.industry}
                onChange={(e) => setDemoConfig(prev => ({ ...prev, industry: e.target.value }))}
                className="w-full bg-slate-800 border border-yellow-500/30 rounded-lg px-3 py-2 text-yellow-400"
              >
                {industryOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Data Volume</label>
              <select 
                value={demoConfig.dataVolume}
                onChange={(e) => setDemoConfig(prev => ({ ...prev, dataVolume: e.target.value }))}
                className="w-full bg-slate-800 border border-yellow-500/30 rounded-lg px-3 py-2 text-yellow-400"
              >
                {dataVolumeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Network Topology</label>
              <select 
                value={demoConfig.network}
                onChange={(e) => setDemoConfig(prev => ({ ...prev, network: e.target.value }))}
                className="w-full bg-slate-800 border border-yellow-500/30 rounded-lg px-3 py-2 text-yellow-400"
              >
                {networkOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Security Level</label>
              <select 
                value={demoConfig.security}
                onChange={(e) => setDemoConfig(prev => ({ ...prev, security: e.target.value }))}
                className="w-full bg-slate-800 border border-yellow-500/30 rounded-lg px-3 py-2 text-yellow-400"
              >
                {securityOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Live KPI Metrics */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/70 rounded-xl p-6 border border-yellow-500/30"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            📊 LIVE KPI METRICS
            {isLiveMode && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-green-500 rounded-full"
              />
            )}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Network Load</span>
                <span className="font-bold">{kpiMetrics.networkLoad.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <motion.div
                  className="bg-yellow-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${kpiMetrics.networkLoad}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Security Score</span>
                <span className="font-bold">{kpiMetrics.securityScore.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <motion.div
                  className="bg-green-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${kpiMetrics.securityScore}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Equipment Uptime</span>
                <span className="font-bold">{kpiMetrics.equipmentUptime.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <motion.div
                  className="bg-blue-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${kpiMetrics.equipmentUptime}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <span>Cost Savings</span>
              <span className="text-2xl font-bold text-green-400">${kpiMetrics.costSavings.toFixed(1)}M</span>
            </div>
            <div className="space-y-2">
              <span>ROI</span>
              <span className="text-2xl font-bold text-yellow-400">{kpiMetrics.roi}%</span>
            </div>
            <div className="space-y-2">
              <span>Response Time</span>
              <span className="text-2xl font-bold text-blue-400">{kpiMetrics.responseTime.toFixed(1)}s</span>
            </div>
          </div>
        </motion.div>

        {/* Control Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateSimulation}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all"
          >
            ⚡ Generate Simulation
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={connectLiveData}
            disabled={isLiveMode}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all"
          >
            📊 Connect Live Data
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={stopLiveData}
            disabled={!isLiveMode}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all"
          >
            ⚡ Stop Live Data
          </motion.button>
        </div>

        {/* 9 AI Processing Engines */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/70 rounded-xl p-6 border border-yellow-500/30"
        >
          <h2 className="text-2xl font-bold mb-6">🧠 9 AI PROCESSING ENGINES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engines.map((engine, index) => (
              <motion.div
                key={engine.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  engine.status === 'Active' 
                    ? 'bg-yellow-900/20 border-yellow-400' 
                    : 'bg-slate-800/50 border-slate-600'
                }`}
                onClick={() => toggleEngineStatus(engine.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{engine.icon}</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    engine.status === 'Active' ? 'bg-green-600' : 'bg-gray-600'
                  }`}>
                    {engine.status}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">{engine.name}</h3>
                <p className="text-yellow-200/80 text-sm mb-3">{engine.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Efficiency</span>
                    <span>{engine.efficiency}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      className="bg-yellow-400 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: engine.progress }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* African Schools Deployment Config */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/70 rounded-xl p-6 border border-yellow-500/30"
        >
          <h2 className="text-2xl font-bold mb-6">🏫 AFRICAN SCHOOLS DEPLOYMENT CONFIG</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-3">Optimized Configuration</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Industry:</span>
                  <span className="text-yellow-400">Education</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Volume:</span>
                  <span className="text-yellow-400">Large</span>
                </div>
                <div className="flex justify-between">
                  <span>Network:</span>
                  <span className="text-yellow-400">Global</span>
                </div>
                <div className="flex justify-between">
                  <span>Security:</span>
                  <span className="text-yellow-400">High</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Active Engines for Schools</h3>
              <div className="space-y-1 text-sm">
                <div>• Corethink™ - Educational planning</div>
                <div>• AutoSigil™ - Security for schools</div>
                <div>• PulseIndex™ - Infrastructure monitoring</div>
                <div>• LiftHalo™ - Safety protocols</div>
                <div>• FireRatio™ - Performance optimization</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Operations Log */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/70 rounded-xl p-6 border border-yellow-500/30"
        >
          <h2 className="text-2xl font-bold mb-6">📋 OPERATIONS LOG</h2>
          <div className="bg-slate-900 rounded-lg p-4 max-h-64 overflow-y-auto">
            {operationLogs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="text-sm text-green-400 font-mono mb-1"
              >
                {log}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}