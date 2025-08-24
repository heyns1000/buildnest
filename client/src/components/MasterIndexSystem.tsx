import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface SectorData {
  id: string;
  name: string;
  type: string;
  status: 'operational' | 'maintenance' | 'developing';
  completion: number;
  connections: number;
  description: string;
  subSystems: string[];
}

interface ScrollData {
  id: string;
  title: string;
  sector: string;
  type: 'protocol' | 'framework' | 'engine' | 'service';
  importance: 'critical' | 'high' | 'medium' | 'low';
  lastUpdated: string;
}

export default function MasterIndexSystem() {
  const [sectors, setSectors] = useState<SectorData[]>([]);
  const [scrolls, setScrolls] = useState<ScrollData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [systemMetrics, setSystemMetrics] = useState({
    totalSectors: 0,
    operationalSectors: 0,
    totalScrolls: 0,
    criticalScrolls: 0
  });

  // Initialize data
  useEffect(() => {
    const sectorData: SectorData[] = [
      {
        id: 'fruitful-global',
        name: 'Fruitful Global™',
        type: 'Core Platform',
        status: 'operational',
        completion: 98,
        connections: 1547,
        description: 'Primary global platform encompassing all Fruitful operations',
        subSystems: ['VaultMesh', 'AgroChain', 'PulseGrid', 'Economic Engine']
      },
      {
        id: 'monster-omni',
        name: 'MONSTER OMNI™',
        type: 'Operator Console',
        status: 'operational',
        completion: 95,
        connections: 892,
        description: 'Grand operator console with 20 fused logic engines',
        subSystems: ['Quantum Mesh', 'Neural Matrix', 'Crypto Genesis', 'Reality Synthesis']
      },
      {
        id: 'ancestortag',
        name: 'AncestorTag™',
        type: 'Heritage System',
        status: 'operational',
        completion: 91,
        connections: 432,
        description: 'Digital heritage and genealogy preservation platform',
        subSystems: ['Heritage Portal', 'Cultural Archive', 'Genealogy Mapping', 'Provenance Chain']
      },
      {
        id: 'faa-zone',
        name: 'FAA.zone™',
        type: 'Development Framework',
        status: 'operational',
        completion: 89,
        connections: 1203,
        description: 'Comprehensive development and trial dashboard system',
        subSystems: ['Atom-Level Engines', 'Demo Framework', 'KPI Tracking', 'Operations Log']
      },
      {
        id: 'payment-portal',
        name: 'Global Payment Portal',
        type: 'Financial System',
        status: 'operational',
        completion: 94,
        connections: 678,
        description: 'Multi-currency payment processing and SSO management',
        subSystems: ['PayPal Integration', 'Currency Converter', 'AI Assistant', 'SSO Management']
      },
      {
        id: 'minenest',
        name: 'MineNest™',
        type: 'Mining Protocol',
        status: 'developing',
        completion: 76,
        connections: 234,
        description: 'Specialized mining and resources sector framework',
        subSystems: ['NestTrack', 'VaultLink Compliance', 'Professional Services Mesh', 'Asset Tracking']
      },
      {
        id: 'vaultmesh',
        name: 'VaultMesh™',
        type: 'Security Layer',
        status: 'operational',
        completion: 97,
        connections: 2134,
        description: 'Advanced security and vault management system',
        subSystems: ['Security Layers', 'Vault Management', 'Compliance Engine', 'Threat Detection']
      },
      {
        id: 'quantum-cores',
        name: 'Quantum Core Array',
        type: 'Processing Engine',
        status: 'maintenance',
        completion: 85,
        connections: 567,
        description: 'Quantum processing and computation infrastructure',
        subSystems: ['Quantum Processors', 'Entanglement Matrix', 'Coherence Control', 'Temporal Sync']
      },
      {
        id: 'faa-8000-extract',
        name: 'FAA 8000™ OMNI EXTRACT',
        type: 'Data Extraction System',
        status: 'operational',
        completion: 96,
        connections: 1823,
        description: 'Advanced data extraction and processing system with comprehensive system analysis',
        subSystems: ['Global Chat Extract', 'Thread Summary', 'Test Session Analysis', 'Module Dependency Tree']
      },
      {
        id: 'faa-8000-modules',
        name: 'FAA 8000™ SUPER PAGE MODULE',
        type: 'Module Framework',
        status: 'operational',
        completion: 93,
        connections: 1456,
        description: 'Sovereign-grade WordPress plugin and module management system',
        subSystems: ['Module Verification', 'Plugin Stack', 'Code Features', 'FAA Sovereignty Integration']
      },
      {
        id: 'verified-plugin-stack',
        name: 'Faa Inline Verified Plugin Stack',
        type: 'Plugin Verification',
        status: 'operational',
        completion: 91,
        connections: 734,
        description: 'Comprehensive plugin verification and deployment system with security protocols',
        subSystems: ['Token Signing', 'IP Timestamp', 'Cloud Dependencies', 'Live Demo Scroll']
      },
      {
        id: 'vaultcommander',
        name: 'VAULTCOMMANDER OMNIEXECUTIVE',
        type: 'Command & Control',
        status: 'operational',
        completion: 98,
        connections: 2567,
        description: 'Executive state management and command system with operational sovereignty',
        subSystems: ['Cube Lattice Ark', 'Final Command Status', 'Hawes Submission', 'Silent Service Protocol']
      }
    ];

    const scrollData: ScrollData[] = [
      { id: 'scroll-001', title: 'Primary Economic Shield Protocol', sector: 'fruitful-global', type: 'protocol', importance: 'critical', lastUpdated: '2024-12-21' },
      { id: 'scroll-002', title: 'MONSTER OMNI Logic Core Matrix', sector: 'monster-omni', type: 'engine', importance: 'critical', lastUpdated: '2024-12-21' },
      { id: 'scroll-003', title: 'AncestorTag Digital Provenance Chain', sector: 'ancestortag', type: 'framework', importance: 'high', lastUpdated: '2024-12-20' },
      { id: 'scroll-004', title: 'FAA Atom-Level Processing Engine', sector: 'faa-zone', type: 'engine', importance: 'critical', lastUpdated: '2024-12-21' },
      { id: 'scroll-005', title: 'Global Currency Exchange Protocol', sector: 'payment-portal', type: 'service', importance: 'high', lastUpdated: '2024-12-19' },
      { id: 'scroll-006', title: 'MineNest Resource Optimization Core', sector: 'minenest', type: 'engine', importance: 'medium', lastUpdated: '2024-12-18' },
      { id: 'scroll-007', title: 'VaultMesh Security Architecture', sector: 'vaultmesh', type: 'framework', importance: 'critical', lastUpdated: '2024-12-21' },
      { id: 'scroll-008', title: 'Quantum Entanglement Stabilizer', sector: 'quantum-cores', type: 'engine', importance: 'high', lastUpdated: '2024-12-17' },
      { id: 'scroll-009', title: 'Neural Pattern Recognition Matrix', sector: 'monster-omni', type: 'protocol', importance: 'critical', lastUpdated: '2024-12-20' },
      { id: 'scroll-010', title: 'Blockchain Reconstruction Engine', sector: 'monster-omni', type: 'engine', importance: 'critical', lastUpdated: '2024-12-21' },
      { id: 'scroll-011', title: 'Heritage Cultural Preservation System', sector: 'ancestortag', type: 'service', importance: 'high', lastUpdated: '2024-12-19' },
      { id: 'scroll-012', title: 'Real-Time Demo Configuration Engine', sector: 'faa-zone', type: 'engine', importance: 'medium', lastUpdated: '2024-12-20' },
      { id: 'scroll-013', title: 'SSO Authentication Framework', sector: 'payment-portal', type: 'framework', importance: 'high', lastUpdated: '2024-12-18' },
      { id: 'scroll-014', title: 'Mining Compliance Validation Protocol', sector: 'minenest', type: 'protocol', importance: 'high', lastUpdated: '2024-12-17' },
      { id: 'scroll-015', title: 'Advanced Threat Mitigation System', sector: 'vaultmesh', type: 'service', importance: 'critical', lastUpdated: '2024-12-21' },
      { id: 'scroll-016', title: 'FAA 8000™ Global Chat Extraction Protocol', sector: 'faa-8000-extract', type: 'protocol', importance: 'critical', lastUpdated: '2024-12-21' },
      { id: 'scroll-017', title: 'Thread Summary Analysis Engine', sector: 'faa-8000-extract', type: 'engine', importance: 'high', lastUpdated: '2024-12-21' },
      { id: 'scroll-018', title: 'Super Page Module Verification System', sector: 'faa-8000-modules', type: 'framework', importance: 'critical', lastUpdated: '2024-12-21' },
      { id: 'scroll-019', title: 'WordPress Sovereignty Integration', sector: 'faa-8000-modules', type: 'service', importance: 'high', lastUpdated: '2024-12-21' },
      { id: 'scroll-020', title: 'Inline Plugin Token Signing Protocol', sector: 'verified-plugin-stack', type: 'protocol', importance: 'critical', lastUpdated: '2024-12-21' },
      { id: 'scroll-021', title: 'IP Timestamp Verification Engine', sector: 'verified-plugin-stack', type: 'engine', importance: 'high', lastUpdated: '2024-12-21' },
      { id: 'scroll-022', title: 'VaultCommander Executive State Protocol', sector: 'vaultcommander', type: 'protocol', importance: 'critical', lastUpdated: '2024-12-21' },
      { id: 'scroll-023', title: 'Cube Lattice Ark Management System', sector: 'vaultcommander', type: 'framework', importance: 'critical', lastUpdated: '2024-12-21' },
      { id: 'scroll-024', title: 'Silent Service Command Integration', sector: 'vaultcommander', type: 'service', importance: 'high', lastUpdated: '2024-12-21' }
    ];

    setSectors(sectorData);
    setScrolls(scrollData);

    // Calculate metrics
    setSystemMetrics({
      totalSectors: sectorData.length,
      operationalSectors: sectorData.filter(s => s.status === 'operational').length,
      totalScrolls: scrollData.length,
      criticalScrolls: scrollData.filter(s => s.importance === 'critical').length
    });
  }, []);

  const filteredScrolls = scrolls.filter(scroll => {
    const matchesSearch = scroll.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scroll.sector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'all' || scroll.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const getSectorStatus = (sector: SectorData) => {
    switch(sector.status) {
      case 'operational': return { color: 'bg-green-600', text: 'Operational' };
      case 'maintenance': return { color: 'bg-yellow-600', text: 'Maintenance' };
      case 'developing': return { color: 'bg-blue-600', text: 'Developing' };
      default: return { color: 'bg-gray-600', text: 'Unknown' };
    }
  };

  const getImportanceColor = (importance: string) => {
    switch(importance) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-8" data-testid="master-index-system">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-purple-400 mb-4">📊 Fruitful Global™ Sector Index</h2>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
          Comprehensive overview and management interface for all operational sectors, protocols, and system scrolls within the Fruitful ecosystem.
        </p>
      </div>

      {/* System Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="bg-gray-800/90 border-purple-500/20">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-400">{systemMetrics.totalSectors}</div>
            <div className="text-sm text-gray-400">Total Sectors</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/90 border-green-500/20">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-400">{systemMetrics.operationalSectors}</div>
            <div className="text-sm text-gray-400">Operational</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/90 border-blue-500/20">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-400">{systemMetrics.totalScrolls}</div>
            <div className="text-sm text-gray-400">System Scrolls</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/90 border-red-500/20">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-red-400">{systemMetrics.criticalScrolls}</div>
            <div className="text-sm text-gray-400">Critical Scrolls</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sector-overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="sector-overview" data-testid="tab-sector-overview">Sector Overview</TabsTrigger>
          <TabsTrigger value="system-scrolls" data-testid="tab-system-scrolls">System Scrolls</TabsTrigger>
          <TabsTrigger value="network-topology" data-testid="tab-network-topology">Network Topology</TabsTrigger>
          <TabsTrigger value="system-health" data-testid="tab-system-health">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="sector-overview" className="space-y-6">
          <Card className="bg-gray-800/90 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-400">🌐 Active Sector Dashboard</CardTitle>
              <p className="text-gray-300">Real-time overview of all operational sectors and their current status.</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectors.map((sector) => {
                  const status = getSectorStatus(sector);
                  return (
                    <Card key={sector.id} className="bg-gray-700/50 border-gray-600 hover:bg-gray-700/70 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-white">{sector.name}</h3>
                            <p className="text-gray-400 text-sm">{sector.type}</p>
                          </div>
                          <Badge className={status.color}>
                            {status.text}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-4">{sector.description}</p>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Completion</span>
                              <span className="text-yellow-400">{sector.completion}%</span>
                            </div>
                            <Progress value={sector.completion} className="h-2" />
                          </div>
                          
                          <div className="text-sm">
                            <span className="text-gray-400">Connections: </span>
                            <span className="text-white font-mono">{sector.connections.toLocaleString()}</span>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="text-xs text-gray-400">Sub-Systems:</div>
                            <div className="flex flex-wrap gap-1">
                              {sector.subSystems.slice(0, 3).map((system, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {system}
                                </Badge>
                              ))}
                              {sector.subSystems.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{sector.subSystems.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700" data-testid={`access-${sector.id}`}>
                          Access Sector
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system-scrolls" className="space-y-6">
          <Card className="bg-gray-800/90 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-400">📜 System Scrolls Repository</CardTitle>
              <p className="text-gray-300">Complete archive of protocols, frameworks, engines, and services across all sectors.</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                  placeholder="Search scrolls by title or sector..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-700 border-gray-600 flex-1"
                  data-testid="search-scrolls"
                />
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2"
                  data-testid="filter-sector"
                >
                  <option value="all">All Sectors</option>
                  {sectors.map((sector) => (
                    <option key={sector.id} value={sector.id}>
                      {sector.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                {filteredScrolls.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    No scrolls found matching your criteria.
                  </div>
                ) : (
                  filteredScrolls.map((scroll) => (
                    <Card key={scroll.id} className="bg-gray-700/50 border-gray-600 hover:bg-gray-700/70 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-white">{scroll.title}</h3>
                              <Badge className={getImportanceColor(scroll.importance)}>
                                {scroll.importance}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {scroll.type}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span>Sector: {sectors.find(s => s.id === scroll.sector)?.name || scroll.sector}</span>
                              <span>Updated: {scroll.lastUpdated}</span>
                            </div>
                          </div>
                          <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
                            Access Scroll
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network-topology" className="space-y-6">
          <Card className="bg-gray-800/90 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-green-400">🕸️ Network Topology Map</CardTitle>
              <p className="text-gray-300">Visual representation of sector interconnections and data flow patterns.</p>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-4">Primary Connections</h3>
                  <div className="space-y-4">
                    {sectors.filter(s => s.status === 'operational').map((sector) => (
                      <Card key={sector.id} className="bg-gray-700/50 border-gray-600">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-bold text-white">{sector.name}</div>
                              <div className="text-sm text-gray-400">{sector.connections} active connections</div>
                            </div>
                            <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/50">
                              <div className="text-green-400 font-bold">{Math.floor(sector.connections / 100)}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-4">System Integration Map</h3>
                  <Card className="bg-gray-700/50 border-gray-600">
                    <CardContent className="p-6">
                      <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center border border-gray-600">
                        <div className="text-center">
                          <div className="text-4xl mb-2">🗺️</div>
                          <p className="text-gray-400">Interactive Network Topology</p>
                          <p className="text-sm text-gray-500">Real-time sector interconnection visualization</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-green-400">Direct Links</div>
                      <div className="text-2xl text-white">{sectors.reduce((sum, s) => sum + s.connections, 0).toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-blue-400">Data Throughput</div>
                      <div className="text-2xl text-white">847 TB/s</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system-health" className="space-y-6">
          <Card className="bg-gray-800/90 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-yellow-400">💊 System Health Dashboard</CardTitle>
              <p className="text-gray-300">Comprehensive health monitoring and performance analytics for all sectors.</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-yellow-400">Performance Metrics</h3>
                  
                  <Card className="bg-gray-700/50 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Overall System Health</span>
                        <span className="text-green-400 font-bold">97.3%</span>
                      </div>
                      <Progress value={97.3} className="h-3" />
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-700/50 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Network Stability</span>
                        <span className="text-green-400 font-bold">99.1%</span>
                      </div>
                      <Progress value={99.1} className="h-3" />
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-700/50 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Data Integrity</span>
                        <span className="text-green-400 font-bold">98.7%</span>
                      </div>
                      <Progress value={98.7} className="h-3" />
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-700/50 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Security Status</span>
                        <span className="text-green-400 font-bold">99.8%</span>
                      </div>
                      <Progress value={99.8} className="h-3" />
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-yellow-400">Real-Time Alerts</h3>
                  
                  <Card className="bg-gray-700/50 border-gray-600">
                    <CardContent className="p-4">
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-green-400">✓ All sectors operational</span>
                          <span className="text-gray-400">2 min ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-400">ℹ Quantum cores maintenance scheduled</span>
                          <span className="text-gray-400">15 min ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-400">✓ VaultMesh security scan complete</span>
                          <span className="text-gray-400">1 hour ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-yellow-400">⚠ MineNest performance optimization</span>
                          <span className="text-gray-400">2 hours ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-400">✓ Payment portal currency sync</span>
                          <span className="text-gray-400">3 hours ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-700/50 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-lg text-yellow-400">System Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">CPU Usage</span>
                          <span className="text-green-400">34%</span>
                        </div>
                        <Progress value={34} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Memory Usage</span>
                          <span className="text-yellow-400">67%</span>
                        </div>
                        <Progress value={67} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Storage Usage</span>
                          <span className="text-green-400">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Network I/O</span>
                          <span className="text-blue-400">23%</span>
                        </div>
                        <Progress value={23} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}