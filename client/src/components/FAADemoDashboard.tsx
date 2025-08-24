import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface EngineNode {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'standby' | 'maintenance';
  efficiency: number;
  dataFlow: number;
  description: string;
}

interface DemoScenario {
  industry: string;
  company: string;
  useCase: string;
  priority: string;
}

export default function FAADemoDashboard() {
  const [demoScenario, setDemoScenario] = useState<DemoScenario>({
    industry: '',
    company: '',
    useCase: '',
    priority: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [engineNodes, setEngineNodes] = useState<EngineNode[]>([]);
  const [operationsLog, setOperationsLog] = useState<string[]>([]);
  const [kpiMetrics, setKpiMetrics] = useState({
    totalNodes: 0,
    activeEngines: 0,
    dataProcessed: 0,
    efficiency: 0
  });

  // Initialize engine nodes
  useEffect(() => {
    setEngineNodes([
      {
        id: 'engine-001',
        name: 'Quantum Processing Engine',
        type: 'Quantum Core',
        status: 'active',
        efficiency: 97.3,
        dataFlow: 15.7,
        description: 'Primary quantum computation engine for atom-level processing'
      },
      {
        id: 'engine-002',
        name: 'Neural Pattern Analyzer',
        type: 'AI Core',
        status: 'active',
        efficiency: 94.8,
        dataFlow: 12.4,
        description: 'Advanced AI pattern recognition and decision making engine'
      },
      {
        id: 'engine-003',
        name: 'Blockchain Synthesizer',
        type: 'Crypto Core',
        status: 'active',
        efficiency: 91.2,
        dataFlow: 8.9,
        description: 'Cryptocurrency protocol analysis and reconstruction engine'
      },
      {
        id: 'engine-004',
        name: 'Reality Mapper',
        type: 'Reality Core',
        status: 'standby',
        efficiency: 88.5,
        dataFlow: 6.3,
        description: 'Physical reality modeling and simulation engine'
      },
      {
        id: 'engine-005',
        name: 'Economic Predictor',
        type: 'Economic Core',
        status: 'active',
        efficiency: 92.7,
        dataFlow: 11.2,
        description: 'Economic trend analysis and financial modeling engine'
      },
      {
        id: 'engine-006',
        name: 'Security Orchestrator',
        type: 'Security Core',
        status: 'active',
        efficiency: 99.1,
        dataFlow: 13.8,
        description: 'Advanced security protocols and threat mitigation engine'
      }
    ]);

    // Calculate initial KPIs
    updateKPIs();
  }, []);

  const updateKPIs = () => {
    setKpiMetrics({
      totalNodes: engineNodes.length,
      activeEngines: engineNodes.filter(e => e.status === 'active').length,
      dataProcessed: Math.floor(Math.random() * 500) + 1000,
      efficiency: Math.floor(Math.random() * 10) + 90
    });
  };

  const generateDemo = () => {
    if (!demoScenario.industry || !demoScenario.company || !demoScenario.useCase) {
      alert('Please fill all scenario fields before generating demo');
      return;
    }

    setIsGenerating(true);
    setOperationsLog([]);

    const logMessages = [
      `[${new Date().toLocaleTimeString()}] Initializing demo for ${demoScenario.industry} sector`,
      `[${new Date().toLocaleTimeString()}] Configuring engines for ${demoScenario.company} use case`,
      `[${new Date().toLocaleTimeString()}] Loading ${demoScenario.useCase} protocols`,
      `[${new Date().toLocaleTimeString()}] Quantum Engine: Atom-level analysis initiated`,
      `[${new Date().toLocaleTimeString()}] Neural Engine: Pattern recognition optimized`,
      `[${new Date().toLocaleTimeString()}] Blockchain Engine: Crypto protocols synchronized`,
      `[${new Date().toLocaleTimeString()}] Security Engine: Threat assessment active`,
      `[${new Date().toLocaleTimeString()}] Economic Engine: Market analysis running`,
      `[${new Date().toLocaleTimeString()}] Demo scenario generated successfully`,
      `[${new Date().toLocaleTimeString()}] All engines operational - Ready for live demonstration`
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < logMessages.length) {
        setOperationsLog(prev => [...prev, logMessages[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        updateKPIs();
      }
    }, 800);
  };

  return (
    <div className="space-y-8" data-testid="faa-demo-dashboard">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-yellow-400 mb-4">🚀 FAA.zone™ Live Trial Dashboard</h2>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
          Configure your scenario to experience the real-time power of our Atom-Level Engines. See how each node streamlines operations, enhances security, and drives tangible business outcomes.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Demo Controls Panel */}
        <Card className="lg:col-span-1 bg-gray-800/90 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-yellow-400">Configure Your Demo Scenario</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Industry Sector:</label>
              <Select value={demoScenario.industry} onValueChange={(value) => setDemoScenario({...demoScenario, industry: value})}>
                <SelectTrigger className="bg-gray-700 border-gray-600" data-testid="select-industry">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">Financial Services</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail & E-commerce</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="energy">Energy & Utilities</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Company Size:</label>
              <Select value={demoScenario.company} onValueChange={(value) => setDemoScenario({...demoScenario, company: value})}>
                <SelectTrigger className="bg-gray-700 border-gray-600" data-testid="select-company">
                  <SelectValue placeholder="Select Company Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="startup">Startup (1-50 employees)</SelectItem>
                  <SelectItem value="sme">SME (51-500 employees)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (500+ employees)</SelectItem>
                  <SelectItem value="corporation">Corporation (10,000+ employees)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Primary Use Case:</label>
              <Select value={demoScenario.useCase} onValueChange={(value) => setDemoScenario({...demoScenario, useCase: value})}>
                <SelectTrigger className="bg-gray-700 border-gray-600" data-testid="select-usecase">
                  <SelectValue placeholder="Select Use Case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automation">Process Automation</SelectItem>
                  <SelectItem value="analytics">Data Analytics</SelectItem>
                  <SelectItem value="security">Security Enhancement</SelectItem>
                  <SelectItem value="optimization">Performance Optimization</SelectItem>
                  <SelectItem value="integration">System Integration</SelectItem>
                  <SelectItem value="prediction">Predictive Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Priority Level:</label>
              <Select value={demoScenario.priority} onValueChange={(value) => setDemoScenario({...demoScenario, priority: value})}>
                <SelectTrigger className="bg-gray-700 border-gray-600" data-testid="select-priority">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Research & Development</SelectItem>
                  <SelectItem value="medium">Medium - Operational Improvement</SelectItem>
                  <SelectItem value="high">High - Critical Business Need</SelectItem>
                  <SelectItem value="urgent">Urgent - Crisis Response</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
              onClick={generateDemo}
              disabled={isGenerating}
              data-testid="generate-demo-button"
            >
              {isGenerating ? '⚡ Generating Demo...' : '🚀 Generate Live Demo'}
            </Button>
          </CardContent>
        </Card>

        {/* KPI Metrics & Operations Log */}
        <div className="lg:col-span-2 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800/90 border-green-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{kpiMetrics.totalNodes}</div>
                <div className="text-sm text-gray-400">Total Nodes</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/90 border-blue-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{kpiMetrics.activeEngines}</div>
                <div className="text-sm text-gray-400">Active Engines</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/90 border-purple-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{kpiMetrics.dataProcessed}</div>
                <div className="text-sm text-gray-400">Data Processed (GB)</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/90 border-yellow-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{kpiMetrics.efficiency}%</div>
                <div className="text-sm text-gray-400">System Efficiency</div>
              </CardContent>
            </Card>
          </div>

          {/* Operations Log */}
          <Card className="bg-gray-800/90 border-gray-600">
            <CardHeader>
              <CardTitle className="text-lg text-yellow-400">Live Operations Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-lg p-4 h-64 overflow-y-auto border border-gray-600">
                <div className="font-mono text-green-400 text-sm space-y-1">
                  {operationsLog.length === 0 ? (
                    <div className="text-gray-500">Configure scenario and generate demo to see live operations...</div>
                  ) : (
                    operationsLog.map((log, index) => (
                      <div key={index} className="text-green-300">
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Engine Nodes Grid */}
      <Card className="bg-gray-800/90 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-2xl text-yellow-400">⚙️ Atom-Level Engine Nodes</CardTitle>
          <p className="text-gray-300">Monitor individual engine performance and operational status in real-time.</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engineNodes.map((engine) => (
              <Card key={engine.id} className={`bg-gray-700/50 border-gray-600 transition-all duration-300 ${
                engine.status === 'active' ? 'shadow-lg shadow-yellow-500/20' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="text-2xl">⚙️</span>
                      {engine.name}
                    </h3>
                    <Badge 
                      variant={engine.status === 'active' ? 'default' : engine.status === 'standby' ? 'secondary' : 'destructive'}
                      className={engine.status === 'active' ? 'bg-green-600' : ''}
                    >
                      {engine.status}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{engine.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Efficiency</span>
                        <span className="text-yellow-400">{engine.efficiency}%</span>
                      </div>
                      <Progress value={engine.efficiency} className="h-2" />
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-gray-400">Data Flow: </span>
                      <span className="text-white font-mono">{engine.dataFlow} TB/s</span>
                    </div>
                    
                    <Badge variant="outline" className="text-xs">
                      {engine.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Demo Metadata Table */}
      <Card className="bg-gray-800/90 border-gray-600">
        <CardHeader>
          <CardTitle className="text-lg text-yellow-400">Demo Configuration Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-yellow-900/20">
                  <th className="border border-gray-600 p-3 text-left text-yellow-400 font-bold">Parameter</th>
                  <th className="border border-gray-600 p-3 text-left text-yellow-400 font-bold">Value</th>
                  <th className="border border-gray-600 p-3 text-left text-yellow-400 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 p-3 text-yellow-400 font-medium">Industry Sector</td>
                  <td className="border border-gray-600 p-3 text-gray-300">{demoScenario.industry || 'Not configured'}</td>
                  <td className="border border-gray-600 p-3">
                    <Badge variant={demoScenario.industry ? 'default' : 'secondary'} className={demoScenario.industry ? 'bg-green-600' : ''}>
                      {demoScenario.industry ? 'Set' : 'Pending'}
                    </Badge>
                  </td>
                </tr>
                <tr className="bg-gray-800/50">
                  <td className="border border-gray-600 p-3 text-yellow-400 font-medium">Company Size</td>
                  <td className="border border-gray-600 p-3 text-gray-300">{demoScenario.company || 'Not configured'}</td>
                  <td className="border border-gray-600 p-3">
                    <Badge variant={demoScenario.company ? 'default' : 'secondary'} className={demoScenario.company ? 'bg-green-600' : ''}>
                      {demoScenario.company ? 'Set' : 'Pending'}
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 p-3 text-yellow-400 font-medium">Use Case</td>
                  <td className="border border-gray-600 p-3 text-gray-300">{demoScenario.useCase || 'Not configured'}</td>
                  <td className="border border-gray-600 p-3">
                    <Badge variant={demoScenario.useCase ? 'default' : 'secondary'} className={demoScenario.useCase ? 'bg-green-600' : ''}>
                      {demoScenario.useCase ? 'Set' : 'Pending'}
                    </Badge>
                  </td>
                </tr>
                <tr className="bg-gray-800/50">
                  <td className="border border-gray-600 p-3 text-yellow-400 font-medium">Priority Level</td>
                  <td className="border border-gray-600 p-3 text-gray-300">{demoScenario.priority || 'Not configured'}</td>
                  <td className="border border-gray-600 p-3">
                    <Badge variant={demoScenario.priority ? 'default' : 'secondary'} className={demoScenario.priority ? 'bg-green-600' : ''}>
                      {demoScenario.priority ? 'Set' : 'Pending'}
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center">
        <Card className="bg-gradient-to-r from-yellow-900/20 to-blue-900/20 border-yellow-500/30">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Ready to Experience the Full Power?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              This demo showcases just a fraction of FAA.zone™'s capabilities. Schedule a personalized consultation to explore how our atom-level engines can transform your specific business operations.
            </p>
            <Button className="bg-gradient-to-r from-yellow-500 to-blue-500 hover:from-yellow-600 hover:to-blue-600 text-black font-bold text-lg px-8 py-3">
              🚀 Schedule Full System Demo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}