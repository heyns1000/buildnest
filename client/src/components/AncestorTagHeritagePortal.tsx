import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AncestralRecord {
  id: string;
  ancestorName: string;
  contentType: string;
  title: string;
  description: string;
  culturalSignificance: string;
  linkedGenerations: string[];
  provenanceChain: string[];
  digitalSignature: string;
  timestamp: string;
}

export default function AncestorTagHeritagePortal() {
  const [activeTab, setActiveTab] = useState('heritage-portal');
  const [ancestralRecords, setAncestralRecords] = useState<AncestralRecord[]>([]);
  const [filterAncestor, setFilterAncestor] = useState('');
  const [filterContentType, setFilterContentType] = useState('');
  const [familyTreeData, setFamilyTreeData] = useState<any[]>([]);

  // Demo data for ancestral records
  useEffect(() => {
    setAncestralRecords([
      {
        id: 'AT-001',
        ancestorName: 'Maria Santos-Chen',
        contentType: 'Document',
        title: 'Traditional Recipe Collection',
        description: 'Ancestral cooking techniques passed down through 7 generations',
        culturalSignificance: 'Preserves unique fusion of Portuguese and Chinese culinary traditions',
        linkedGenerations: ['Generation 3', 'Generation 4', 'Generation 5'],
        provenanceChain: ['Physical manuscript → Digital scan → Blockchain verification'],
        digitalSignature: 'AT-PROV-5A2B9C',
        timestamp: '2024-12-21 14:30:00'
      },
      {
        id: 'AT-002',
        ancestorName: 'Chief Standing Bear',
        contentType: 'Oral History',
        title: 'Creation Stories and Wisdom Tales',
        description: 'Sacred stories and moral teachings of the Ponca Nation',
        culturalSignificance: 'Essential spiritual and cultural knowledge for tribal identity',
        linkedGenerations: ['Generation 1', 'Generation 2', 'Generation 3'],
        provenanceChain: ['Spoken tradition → Audio recording → Digital preservation → Cultural validation'],
        digitalSignature: 'AT-ORAL-7F3E8A',
        timestamp: '2024-12-20 09:15:00'
      },
      {
        id: 'AT-003',
        ancestorName: 'Yuki Tanaka-Williams',
        contentType: 'Ritual Description',
        title: 'Tea Ceremony Heritage Protocol',
        description: 'Detailed documentation of family tea ceremony variations',
        culturalSignificance: 'Bridges Japanese ceremonial traditions with modern multicultural practices',
        linkedGenerations: ['Generation 2', 'Generation 3', 'Generation 4', 'Generation 5'],
        provenanceChain: ['Handwritten notes → Photography → Video documentation → Digital archive'],
        digitalSignature: 'AT-RITUAL-9D1C4B',
        timestamp: '2024-12-19 16:45:00'
      }
    ]);

    setFamilyTreeData([
      { name: 'Great-Grandparents', members: 8, documented: 6, regions: ['Ireland', 'China', 'Mexico', 'Nigeria'] },
      { name: 'Grandparents', members: 4, documented: 4, regions: ['California', 'Texas', 'New York'] },
      { name: 'Parents', members: 2, documented: 2, regions: ['California', 'Oregon'] },
      { name: 'Current Generation', members: 5, documented: 5, regions: ['California', 'Washington', 'Colorado'] }
    ]);
  }, []);

  const filteredRecords = ancestralRecords.filter(record => {
    const matchesAncestor = !filterAncestor || record.ancestorName.toLowerCase().includes(filterAncestor.toLowerCase());
    const matchesType = !filterContentType || record.contentType === filterContentType;
    return matchesAncestor && matchesType;
  });

  const metrics = {
    totalTags: ancestralRecords.length,
    uniqueAncestors: new Set(ancestralRecords.map(r => r.ancestorName)).size,
    docCount: ancestralRecords.filter(r => r.contentType === 'Document').length,
    oralCount: ancestralRecords.filter(r => r.contentType === 'Oral History').length,
    ritualCount: ancestralRecords.filter(r => r.contentType === 'Ritual Description').length
  };

  return (
    <div className="space-y-8" data-testid="ancestortag-heritage-portal">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-yellow-400 mb-4">👤 AncestorTag™ Heritage Portal</h2>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
          Experience AncestorTag: Linking Generations in the Digital Cosmos. Seamlessly connect your invaluable cultural content to its ancestral lineage, providing irrefutable digital provenance and enriching history for eons to come.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="heritage-portal" data-testid="tab-heritage-portal">AncestorTag™</TabsTrigger>
          <TabsTrigger value="family-hub" data-testid="tab-family-hub">Family Hub</TabsTrigger>
          <TabsTrigger value="genealogy-mapping" data-testid="tab-genealogy">Genealogy Mapping</TabsTrigger>
          <TabsTrigger value="cultural-preservation" data-testid="tab-cultural">Cultural Preservation</TabsTrigger>
        </TabsList>

        <TabsContent value="heritage-portal" className="space-y-6">
          <Card className="bg-gray-800/90 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-yellow-400">AncestorTag™ Protocols in Action</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-4 gap-8">
                {/* Metrics Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  <Card className="bg-gray-700/50 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-lg text-yellow-400">Dashboard Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div>Total Tags: <span className="font-bold text-white">{metrics.totalTags}</span></div>
                      <div>Unique Ancestors: <span className="font-bold text-white">{metrics.uniqueAncestors}</span></div>
                      <div>Documents Tagged: <span className="font-bold text-white">{metrics.docCount}</span></div>
                      <div>Oral Histories Tagged: <span className="font-bold text-white">{metrics.oralCount}</span></div>
                      <div>Rituals Tagged: <span className="font-bold text-white">{metrics.ritualCount}</span></div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-700/50 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-lg text-yellow-400">Filter Tags</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Input
                        placeholder="Filter by Ancestor Name..."
                        value={filterAncestor}
                        onChange={(e) => setFilterAncestor(e.target.value)}
                        className="bg-gray-600 border-gray-500"
                        data-testid="filter-ancestor"
                      />
                      <Select value={filterContentType} onValueChange={setFilterContentType}>
                        <SelectTrigger className="bg-gray-600 border-gray-500" data-testid="filter-content-type">
                          <SelectValue placeholder="All Content Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Content Types</SelectItem>
                          <SelectItem value="Document">Document</SelectItem>
                          <SelectItem value="Oral History">Oral History</SelectItem>
                          <SelectItem value="Ritual Description">Ritual Description</SelectItem>
                          <SelectItem value="Artifact">Artifact</SelectItem>
                          <SelectItem value="Visual Record">Visual Record</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="secondary" 
                        className="w-full" 
                        onClick={() => { setFilterAncestor(''); setFilterContentType(''); }}
                        data-testid="clear-filters"
                      >
                        Clear Filters
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-yellow-400">Your Tagged Ancestral Records</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-purple-600 hover:bg-purple-700" data-testid="add-tag-button">
                          ➕ Tag New Ancestral Content
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-gray-800 border-gray-600">
                        <DialogHeader>
                          <DialogTitle className="text-yellow-400">Add New Ancestral Tag</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input placeholder="Ancestor Name" className="bg-gray-700 border-gray-600" />
                          <Select>
                            <SelectTrigger className="bg-gray-700 border-gray-600">
                              <SelectValue placeholder="Content Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Document">Document</SelectItem>
                              <SelectItem value="Oral History">Oral History</SelectItem>
                              <SelectItem value="Ritual Description">Ritual Description</SelectItem>
                              <SelectItem value="Artifact">Artifact</SelectItem>
                              <SelectItem value="Visual Record">Visual Record</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input placeholder="Content Title" className="bg-gray-700 border-gray-600" />
                          <Textarea placeholder="Description and Cultural Significance" className="bg-gray-700 border-gray-600" />
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">Create AncestorTag™</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="space-y-4">
                    {filteredRecords.length === 0 ? (
                      <div className="text-center text-gray-400 py-8">
                        No records found. Click "➕ Tag New Ancestral Content" to add your first!
                      </div>
                    ) : (
                      filteredRecords.map((record) => (
                        <Card key={record.id} className="bg-gray-700/50 border-gray-600 hover:bg-gray-700/70 transition-colors">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="text-xl font-bold text-white">{record.title}</h4>
                                <p className="text-yellow-400 font-semibold">Ancestor: {record.ancestorName}</p>
                              </div>
                              <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                                {record.contentType}
                              </Badge>
                            </div>
                            <p className="text-gray-300 mb-4">{record.description}</p>
                            <div className="space-y-2 text-sm">
                              <div><strong className="text-yellow-400">Cultural Significance:</strong> {record.culturalSignificance}</div>
                              <div><strong className="text-yellow-400">Linked Generations:</strong> {record.linkedGenerations.join(', ')}</div>
                              <div><strong className="text-yellow-400">Provenance Chain:</strong> {record.provenanceChain.join(' → ')}</div>
                              <div><strong className="text-yellow-400">Digital Signature:</strong> <code className="text-green-400">{record.digitalSignature}</code></div>
                              <div><strong className="text-yellow-400">Timestamp:</strong> {record.timestamp}</div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="family-hub" className="space-y-6">
          <Card className="bg-gray-800/90 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-yellow-400">Family Hub: Connect & Cherish 👨‍👩‍👧‍👦</CardTitle>
              <p className="text-gray-300">A central space for all your family's needs: from tracking lineage and managing finances to celebrating milestones.</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gray-700/50 border-gray-600 hover:bg-gray-700/70 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">🌳</div>
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Family Tree</h3>
                    <p className="text-gray-300 text-sm mb-4">Visualize and manage your family's atom-level lineage.</p>
                    <Button variant="secondary" className="w-full">Go to Family Tree</Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-700/50 border-gray-600 hover:bg-gray-700/70 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">💰</div>
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Financial Hub</h3>
                    <p className="text-gray-300 text-sm mb-4">Manage family savings, personal wallets, and emergency funds.</p>
                    <Button variant="secondary" className="w-full">Access Finances</Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-700/50 border-gray-600 hover:bg-gray-700/70 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">🎉</div>
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Milestone Tracker</h3>
                    <p className="text-gray-300 text-sm mb-4">Celebrate birthdays, anniversaries, and achievements.</p>
                    <Button variant="secondary" className="w-full">View Milestones</Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-700/50 border-gray-600 hover:bg-gray-700/70 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">📚</div>
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">Story Archive</h3>
                    <p className="text-gray-300 text-sm mb-4">Preserve family stories and memories for future generations.</p>
                    <Button variant="secondary" className="w-full">Browse Stories</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="genealogy-mapping" className="space-y-6">
          <Card className="bg-gray-800/90 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-yellow-400">Genealogy Mapping & Documentation</CardTitle>
              <p className="text-gray-300">Advanced lineage tracking with geographic and cultural mapping capabilities.</p>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-yellow-400">Family Tree Overview</h3>
                  {familyTreeData.map((generation, index) => (
                    <Card key={index} className="bg-gray-700/50 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-white">{generation.name}</h4>
                          <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                            {generation.members} members
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div>Documented: {generation.documented}/{generation.members}</div>
                          <div>Regions: {generation.regions.join(', ')}</div>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2 mt-3">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(generation.documented / generation.members) * 100}%` }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-yellow-400">Geographic Distribution</h3>
                  <Card className="bg-gray-700/50 border-gray-600">
                    <CardContent className="p-6">
                      <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center border border-gray-600">
                        <div className="text-center">
                          <div className="text-4xl mb-2">🗺️</div>
                          <p className="text-gray-400">Interactive Family Map</p>
                          <p className="text-sm text-gray-500">Showing family origins and migration patterns</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-700/50 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-lg text-yellow-400">DNA & Heritage Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-semibold text-yellow-400">European</div>
                          <div className="text-gray-300">35.2%</div>
                        </div>
                        <div>
                          <div className="font-semibold text-yellow-400">East Asian</div>
                          <div className="text-gray-300">28.7%</div>
                        </div>
                        <div>
                          <div className="font-semibold text-yellow-400">Indigenous</div>
                          <div className="text-gray-300">22.1%</div>
                        </div>
                        <div>
                          <div className="font-semibold text-yellow-400">African</div>
                          <div className="text-gray-300">14.0%</div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full border-yellow-500 text-yellow-400">
                        View Detailed Analysis
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cultural-preservation" className="space-y-6">
          <Card className="bg-gray-800/90 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-yellow-400">Cultural Preservation & Digital Archive</CardTitle>
              <p className="text-gray-300">Preserve and share cultural knowledge, traditions, and practices for future generations.</p>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-8">
                <Card className="bg-gray-700/50 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-lg text-yellow-400">🎭 Traditions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="font-semibold text-white">Holiday Celebrations</div>
                      <div className="text-sm text-gray-300">12 documented traditions</div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-semibold text-white">Ceremonial Practices</div>
                      <div className="text-sm text-gray-300">8 ritual descriptions</div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-semibold text-white">Language Preservation</div>
                      <div className="text-sm text-gray-300">3 languages documented</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-700/50 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-lg text-yellow-400">📚 Knowledge Base</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="font-semibold text-white">Recipes & Cooking</div>
                      <div className="text-sm text-gray-300">47 traditional recipes</div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-semibold text-white">Crafts & Skills</div>
                      <div className="text-sm text-gray-300">23 techniques documented</div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-semibold text-white">Wisdom & Proverbs</div>
                      <div className="text-sm text-gray-300">156 sayings collected</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-700/50 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-lg text-yellow-400">🔗 Digital Provenance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="font-semibold text-white">Blockchain Verified</div>
                      <div className="text-sm text-gray-300">89 records secured</div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-semibold text-white">Cross-Referenced</div>
                      <div className="text-sm text-gray-300">234 connections mapped</div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-semibold text-white">Future-Proofed</div>
                      <div className="text-sm text-gray-300">Permanent digital preservation</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3">
                  🚀 Launch Cultural Preservation Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}