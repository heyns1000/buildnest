import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface MiningSystem {
  id: string;
  name: string;
  emoji: string;
  status: 'active' | 'extraction' | 'optimizing' | 'standby';
  efficiency: number;
  yieldRate: number;
  nodes: number;
  operations: string[];
}

interface MiningMetrics {
  totalYield: number;
  activeOperations: number;
  nodesDeployed: number;
  efficiency: number;
  atomicExtraction: number;
}

export default function MiningSectorConsole() {
  const [activeTab, setActiveTab] = useState('mining-overview');
  const [miningSystems, setMiningSystems] = useState<MiningSystem[]>([]);
  const [metrics, setMetrics] = useState<MiningMetrics>({
    totalYield: 847923,
    activeOperations: 234,
    nodesDeployed: 1456,
    efficiency: 94.7,
    atomicExtraction: 89.3
  });
  const [operationLogs, setOperationLogs] = useState<string[]>([]);
  const [extractionProgress, setExtractionProgress] = useState(78.4);

  useEffect(() => {
    // Initialize Mining Systems (OreXcel™, MineForge™, Digium™, Minerva™, MineralVision™)
    setMiningSystems([
      {
        id: 'orexcel',
        name: 'OreXcel™',
        emoji: '⛏️',
        status: 'active',
        efficiency: 97.3,
        yieldRate: 156789,
        nodes: 347,
        operations: ['Deep Core Extraction', 'Precision Drilling', 'Ore Classification', 'Yield Optimization']
      },
      {
        id: 'mineforge',
        name: 'MineForge™',
        emoji: '🔥',
        status: 'extraction',
        efficiency: 89.8,
        yieldRate: 134567,
        nodes: 298,
        operations: ['Thermal Processing', 'Metal Refinement', 'Alloy Generation', 'Quality Assurance']
      },
      {
        id: 'digium',
        name: 'Digium™',
        emoji: '🔧',
        status: 'active',
        efficiency: 92.1,
        yieldRate: 187432,
        nodes: 412,
        operations: ['Automated Excavation', 'Terrain Mapping', 'Resource Scanning', 'Site Optimization']
      },
      {
        id: 'minerva',
        name: 'Minerva™',
        emoji: '🧠',
        status: 'optimizing',
        efficiency: 95.6,
        yieldRate: 209876,
        nodes: 523,
        operations: ['AI-Driven Analysis', 'Predictive Modeling', 'Resource Forecasting', 'Strategic Planning']
      },
      {
        id: 'mineralvision',
        name: 'MineralVision™',
        emoji: '👁️',
        status: 'active',
        efficiency: 91.4,
        yieldRate: 165432,
        nodes: 376,
        operations: ['Geological Imaging', 'Subsurface Analysis', 'Mineral Detection', 'Deposit Mapping']
      }
    ]);

    // Real-time mining updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalYield: prev.totalYield + Math.floor(Math.random() * 5000) + 2000,
        activeOperations: prev.activeOperations + Math.floor(Math.random() * 10) - 5,
        nodesDeployed: prev.nodesDeployed + Math.floor(Math.random() * 8) + 2,
        efficiency: Math.min(100, prev.efficiency + (Math.random() - 0.5) * 0.5)
      }));

      setExtractionProgress(prev => Math.min(100, prev + Math.random() * 0.3));

      // Add operation logs
      const logs = [
        `[${new Date().toLocaleTimeString()}] ⛏️ OreXcel™ Deep Core: Extracted ${Math.floor(Math.random() * 5000) + 3000} units premium ore`,
        `[${new Date().toLocaleTimeString()}] 🔥 MineForge™ Thermal Processing: ${Math.floor(Math.random() * 20) + 15} metal alloys refined`,
        `[${new Date().toLocaleTimeString()}] 🔧 Digium™ Automated Excavation: ${Math.floor(Math.random() * 8) + 5} new sites mapped`,
        `[${new Date().toLocaleTimeString()}] 🧠 Minerva™ AI Analysis: Predictive model updated with 97.${Math.floor(Math.random() * 9)}% accuracy`,
        `[${new Date().toLocaleTimeString()}] 👁️ MineralVision™ Subsurface: ${Math.floor(Math.random() * 12) + 8} mineral deposits detected`,
        `[${new Date().toLocaleTimeString()}] 🌐 Cross-System Sync: All mining operations pulse-synchronized at 9s intervals`,
        `[${new Date().toLocaleTimeString()}] 🛡️ VaultChain™ Mining Ledger: Immutable extraction records archived`,
        `[${new Date().toLocaleTimeString()}] 📊 Yield Optimization: ${Math.floor(Math.random() * 15) + 10}% efficiency improvement detected`,
        `[${new Date().toLocaleTimeString()}] 🎁 GiftNode™ Mining Bonuses: ${Math.floor(Math.random() * 25) + 15} operator rewards distributed`
      ];
      
      setOperationLogs(prev => {
        const newLog = logs[Math.floor(Math.random() * logs.length)];
        return [newLog, ...prev.slice(0, 11)]; // Keep last 12 logs
      });
    }, 7000); // Every 7 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-600';
      case 'extraction': return 'bg-blue-600';
      case 'optimizing': return 'bg-purple-600';
      case 'standby': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const deployMiningSystem = (systemId: string) => {
    setOperationLogs(prev => [
      `[${new Date().toLocaleTimeString()}] 🚀 DEPLOYING MINING SYSTEM: ${systemId.toUpperCase()}`,
      `[${new Date().toLocaleTimeString()}] Activating extraction protocols for system`,
      `[${new Date().toLocaleTimeString()}] Node networks coming online`,
      `[${new Date().toLocaleTimeString()}] Yield optimization algorithms engaging`,
      ...prev
    ]);
  };

  const activateFullExtraction = () => {
    setOperationLogs(prev => [
      `[${new Date().toLocaleTimeString()}] 🌟 FULL MINING EXTRACTION PROTOCOL ACTIVATED`,
      `[${new Date().toLocaleTimeString()}] All 5 mining systems synchronizing`,
      `[${new Date().toLocaleTimeString()}] OreXcel™, MineForge™, Digium™, Minerva™, MineralVision™ at maximum yield`,
      `[${new Date().toLocaleTimeString()}] Cross-system efficiency optimization engaged`,
      ...prev
    ]);
  };

  const optimizeYieldProtocols = () => {
    setOperationLogs(prev => [
      `[${new Date().toLocaleTimeString()}] ⚡ YIELD OPTIMIZATION PROTOCOLS INITIATED`,
      `[${new Date().toLocaleTimeString()}] AI-driven analysis optimizing extraction patterns`,
      `[${new Date().toLocaleTimeString()}] Thermal processing efficiency increased`,
      `[${new Date().toLocaleTimeString()}] Predictive modeling adjusting operations`,
      ...prev
    ]);
  };

  return (
    <div className="space-y-8" data-testid="mining-sector-console">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-orange-400 mb-4">⛏️ Mining Sector Console</h2>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
          🌍 Complete Mining Operations Control Center | Advanced material yield management featuring OreXcel™ deep core extraction, MineForge™ thermal processing, Digium™ automated excavation, Minerva™ AI-driven analysis, and MineralVision™ geological imaging across global mining networks.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <Badge className="bg-orange-600">5 Active Mining Systems</Badge>
          <Badge className="bg-blue-600">1,456 Nodes Deployed</Badge>
          <Badge className="bg-green-600">94.7% Efficiency</Badge>
        </div>
      </div>

      {/* Real-time Mining Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-gray-800/90 border-orange-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{metrics.totalYield.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Total Yield</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/90 border-blue-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{metrics.activeOperations}</div>
            <div className="text-sm text-gray-400">Active Operations</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/90 border-green-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{metrics.nodesDeployed.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Nodes Deployed</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/90 border-purple-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{metrics.efficiency.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Efficiency</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/90 border-yellow-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{metrics.atomicExtraction.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Atomic Extraction</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="mining-overview" data-testid="tab-mining-overview">Mining Overview</TabsTrigger>
          <TabsTrigger value="extraction-systems" data-testid="tab-extraction-systems">Extraction Systems</TabsTrigger>
          <TabsTrigger value="yield-optimization" data-testid="tab-yield-optimization">Yield Optimization</TabsTrigger>
          <TabsTrigger value="operation-logs" data-testid="tab-operation-logs">Operation Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="mining-overview" className="space-y-6">
          <Card className="bg-gray-800/90 border-orange-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-400">⛏️ Mining & Material Yields Operations</CardTitle>
              <p className="text-gray-300">Comprehensive management of all 5 mining systems with real-time yield tracking</p>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Overall Extraction Progress</span>
                  <span className="text-yellow-400">{extractionProgress.toFixed(1)}%</span>
                </div>
                <Progress value={extractionProgress} className="h-3" />
              </div>

              <div className="grid gap-6">
                {miningSystems.map((system) => (
                  <Card key={system.id} className="bg-gray-700/50 border-gray-600">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-3xl">{system.emoji}</span>
                            <h3 className="text-xl font-bold text-white">{system.name}</h3>
                          </div>
                          
                          <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
                            <div>
                              <span className="text-gray-400">Efficiency: </span>
                              <span className="text-green-400 font-mono">{system.efficiency}%</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Yield Rate: </span>
                              <span className="text-orange-400 font-mono">{system.yieldRate.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Nodes: </span>
                              <span className="text-blue-400 font-mono">{system.nodes}</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="text-sm text-gray-400">Active Operations:</div>
                            <div className="grid md:grid-cols-2 gap-2 text-sm">
                              {system.operations.map((operation, index) => (
                                <div key={index} className="text-gray-300">• {operation}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getStatusColor(system.status)}>
                            {system.status.toUpperCase()}
                          </Badge>
                          <Button 
                            size="sm" 
                            className="bg-orange-600 hover:bg-orange-700"
                            onClick={() => deployMiningSystem(system.id)}
                            data-testid={`deploy-${system.id}`}
                          >
                            🚀 Deploy System
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">System Efficiency</span>
                          <span className="text-yellow-400">{system.efficiency}%</span>
                        </div>
                        <Progress value={system.efficiency} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-8">
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-lg py-4"
                  onClick={activateFullExtraction}
                  data-testid="activate-full-extraction"
                >
                  🌟 Activate Full Extraction Protocol
                </Button>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 text-lg py-4"
                  onClick={optimizeYieldProtocols}
                  data-testid="optimize-yield-protocols"
                >
                  ⚡ Optimize Yield Protocols
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extraction-systems" className="space-y-6">
          <Card className="bg-gray-800/90 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-400">🔧 Advanced Extraction Systems</CardTitle>
              <p className="text-gray-300">Detailed system specifications and operational parameters</p>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-blue-400">Core Mining Technologies</h3>
                  <div className="space-y-4">
                    <Card className="bg-gray-700/50 border-orange-600">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">⛏️</span>
                          <div>
                            <div className="font-bold text-orange-400">OreXcel™</div>
                            <div className="text-sm text-gray-400">Deep Core Extraction Specialist</div>
                          </div>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>• Precision Drilling Technology</div>
                          <div>• Advanced Ore Classification</div>
                          <div>• Real-time Yield Optimization</div>
                          <div>• 347 nodes deployed globally</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-700/50 border-red-600">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">🔥</span>
                          <div>
                            <div className="font-bold text-red-400">MineForge™</div>
                            <div className="text-sm text-gray-400">Thermal Processing Engine</div>
                          </div>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>• High-temperature Metal Refinement</div>
                          <div>• Custom Alloy Generation</div>
                          <div>• Quality Assurance Protocols</div>
                          <div>• 298 processing nodes active</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-700/50 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">🔧</span>
                          <div>
                            <div className="font-bold text-gray-400">Digium™</div>
                            <div className="text-sm text-gray-400">Automated Excavation Control</div>
                          </div>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>• Autonomous Terrain Mapping</div>
                          <div>• Resource Scanning Technology</div>
                          <div>• Site Optimization Algorithms</div>
                          <div>• 412 excavation units operational</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-blue-400">AI & Vision Systems</h3>
                  <div className="space-y-4">
                    <Card className="bg-gray-700/50 border-purple-600">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">🧠</span>
                          <div>
                            <div className="font-bold text-purple-400">Minerva™</div>
                            <div className="text-sm text-gray-400">AI-Driven Mining Intelligence</div>
                          </div>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>• Predictive Modeling Engine</div>
                          <div>• Resource Forecasting AI</div>
                          <div>• Strategic Planning Automation</div>
                          <div>• 523 AI nodes processing data</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-700/50 border-cyan-600">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">👁️</span>
                          <div>
                            <div className="font-bold text-cyan-400">MineralVision™</div>
                            <div className="text-sm text-gray-400">Advanced Geological Imaging</div>
                          </div>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>• Subsurface Analysis Technology</div>
                          <div>• Real-time Mineral Detection</div>
                          <div>• 3D Deposit Mapping</div>
                          <div>• 376 imaging sensors deployed</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-700/50 border-green-600">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">🌐</span>
                          <div>
                            <div className="font-bold text-green-400">Cross-System Integration</div>
                            <div className="text-sm text-gray-400">Unified Operations Network</div>
                          </div>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>• 9-second pulse synchronization</div>
                          <div>• VaultChain™ ledger integration</div>
                          <div>• TreatyMesh™ compliance binding</div>
                          <div>• GiftNode™ reward distribution</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yield-optimization" className="space-y-6">
          <Card className="bg-gray-800/90 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-green-400">📊 Yield Optimization & Analytics</CardTitle>
              <p className="text-gray-300">Advanced analytics and efficiency optimization across mining operations</p>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-green-400">Optimization Protocols</h3>
                  <div className="space-y-4">
                    <Card className="bg-green-900/20 border-green-500/50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">AI-Driven Resource Allocation</span>
                          <Badge className="bg-green-600">ACTIVE</Badge>
                        </div>
                        <div className="text-sm text-gray-400">Optimal resource distribution across all mining nodes</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-900/20 border-green-500/50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Predictive Maintenance Scheduling</span>
                          <Badge className="bg-blue-600">MONITORING</Badge>
                        </div>
                        <div className="text-sm text-gray-400">Equipment health monitoring and maintenance optimization</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-900/20 border-green-500/50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Thermal Efficiency Optimization</span>
                          <Badge className="bg-orange-600">OPTIMIZING</Badge>
                        </div>
                        <div className="text-sm text-gray-400">MineForge™ thermal processing efficiency improvements</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-900/20 border-green-500/50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Cross-System Synchronization</span>
                          <Badge className="bg-purple-600">SYNCED</Badge>
                        </div>
                        <div className="text-sm text-gray-400">All 5 systems operating in perfect synchronization</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-green-400">Performance Analytics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-gray-700/50 border-gray-600">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-orange-400">97.3%</div>
                        <div className="text-sm text-gray-400">Peak Efficiency</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-700/50 border-gray-600">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-400">847K</div>
                        <div className="text-sm text-gray-400">Units Extracted</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-700/50 border-gray-600">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-400">1.45K</div>
                        <div className="text-sm text-gray-400">Active Nodes</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-700/50 border-gray-600">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-400">234</div>
                        <div className="text-sm text-gray-400">Operations Live</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-3">Yield Enhancement Features</h4>
                    <div className="space-y-2 text-sm">
                      <div>✅ <strong className="text-yellow-400">Real-time Quality Analysis:</strong> Immediate ore classification</div>
                      <div>✅ <strong className="text-yellow-400">Adaptive Drilling Patterns:</strong> Terrain-optimized extraction</div>
                      <div>✅ <strong className="text-yellow-400">Thermal Process Control:</strong> Temperature-optimized refinement</div>
                      <div>✅ <strong className="text-yellow-400">Predictive Resource Mapping:</strong> AI-driven site selection</div>
                      <div>✅ <strong className="text-yellow-400">Cross-System Data Sharing:</strong> Unified operational intelligence</div>
                    </div>
                  </div>

                  <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/50">
                    <h4 className="font-bold text-green-400 mb-3">Optimization Results</h4>
                    <div className="space-y-1 text-sm">
                      <div>📈 <strong>Efficiency Gain:</strong> +23.7% over baseline operations</div>
                      <div>⚡ <strong>Processing Speed:</strong> +18.9% faster material refinement</div>
                      <div>🎯 <strong>Accuracy Improvement:</strong> +15.3% in resource detection</div>
                      <div>💰 <strong>Cost Reduction:</strong> -12.4% operational expenses</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operation-logs" className="space-y-6">
          <Card className="bg-gray-800/90 border-gray-600">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-300">🖥️ Mining Operations Logs</CardTitle>
              <p className="text-gray-300">Real-time monitoring of all mining systems and extraction operations</p>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-lg p-6 h-96 overflow-y-auto border border-gray-600">
                <div className="font-mono text-orange-400 text-sm space-y-1">
                  {operationLogs.length === 0 ? (
                    <div className="text-gray-500">Initializing Mining Operations System...</div>
                  ) : (
                    operationLogs.map((log, index) => (
                      <div key={index} className="text-orange-300">
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <div className="mt-6 grid md:grid-cols-5 gap-4 text-sm">
                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                  <div className="font-bold text-orange-400">OreXcel™</div>
                  <div className="text-gray-300">Deep Core Active</div>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                  <div className="font-bold text-red-400">MineForge™</div>
                  <div className="text-gray-300">Thermal Processing</div>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                  <div className="font-bold text-gray-400">Digium™</div>
                  <div className="text-gray-300">Excavation Running</div>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                  <div className="font-bold text-purple-400">Minerva™</div>
                  <div className="text-gray-300">AI Analysis Active</div>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                  <div className="font-bold text-cyan-400">MineralVision™</div>
                  <div className="text-gray-300">Imaging Systems Online</div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-lg font-bold text-orange-400 mb-2">⛏️ MINING SECTOR: COMPLETE OPERATIONS SUITE</p>
                <p className="text-md text-gray-300">OreXcel™ | MineForge™ | Digium™ | Minerva™ | MineralVision™</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}