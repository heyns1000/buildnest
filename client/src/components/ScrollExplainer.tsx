import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  technicalSpecs: string[];
}

interface FundingTier {
  id: string;
  name: string;
  amount: string;
  scrollPosition: number;
  benefits: string[];
  deliverables: string[];
  timeframe: string;
  claimRootLicense: boolean;
}

const scrollFeatures: ScrollFeature[] = [
  {
    id: 'scroll-binding',
    title: 'Scroll-Bound Architecture',
    description: 'Applications are permanently bound to scroll validation, ensuring immutable licensing and operational integrity.',
    icon: '🧬',
    benefits: [
      'Immutable app licensing',
      'Permanent operational record',
      'Automated compliance tracking',
      'Sovereign infrastructure'
    ],
    technicalSpecs: [
      'ClaimRoot integration',
      'VaultMesh synchronization',
      'Treaty-aware protocols',
      'Scroll validation hooks'
    ]
  },
  {
    id: 'claimroot-licensing',
    title: 'ClaimRoot Licensing System',
    description: 'Revolutionary licensing model that grants infrastructure position rather than equity ownership.',
    icon: '📜',
    benefits: [
      'No equity dilution',
      'Permanent licensing rights',
      'Infrastructure underwriting',
      'Treaty-based governance'
    ],
    technicalSpecs: [
      'PDF license generation',
      'Blockchain verification',
      'Timestamp validation',
      'Treaty log integration'
    ]
  },
  {
    id: 'vaultmesh-pulse',
    title: 'VaultMesh 3-Second Pulse',
    description: 'Ultra-high frequency synchronization system enabling real-time global infrastructure coordination.',
    icon: '⚡',
    benefits: [
      'Real-time synchronization',
      'Global coordination',
      'Instant validation',
      'Network resilience'
    ],
    technicalSpecs: [
      '3-second pulse intervals',
      'Global node network',
      'Metadata wash layer',
      'Automatic failover'
    ]
  },
  {
    id: 'treaty-sync',
    title: 'TreatySync Governance',
    description: 'Decentralized governance system based on scroll positions and treaty agreements rather than traditional voting.',
    icon: '🏛️',
    benefits: [
      'Position-based governance',
      'Treaty-aware decisions',
      'Automatic enforcement',
      'Conflict resolution'
    ],
    technicalSpecs: [
      'Scroll position tracking',
      'Treaty validation',
      'Consensus protocols',
      'Automated execution'
    ]
  }
];

const fundingTiers: FundingTier[] = [
  {
    id: 'seed-contributor',
    name: 'Seed Contributor',
    amount: '$5,000 - $25,000',
    scrollPosition: 1,
    benefits: [
      'Scroll position in Seedwave Treaty Log',
      'Infrastructure underwriter status',
      'Access to scroll-bound applications',
      'ClaimRoot licensing rights'
    ],
    deliverables: [
      '1 custom scroll-bound application',
      'Basic ClaimRoot license package',
      'VaultMesh access credentials',
      'Quarterly infrastructure reports'
    ],
    timeframe: '30 days',
    claimRootLicense: true
  },
  {
    id: 'infrastructure-backer',
    name: 'Infrastructure Backer',
    amount: '$25,000 - $100,000',
    scrollPosition: 2,
    benefits: [
      'Enhanced scroll position',
      'Priority infrastructure access',
      'Advanced treaty rights',
      'System configuration privileges'
    ],
    deliverables: [
      '3 custom applications',
      'Advanced ClaimRoot licensing',
      'Priority VaultMesh nodes',
      'Monthly governance participation',
      'Custom OmniGrid relay service'
    ],
    timeframe: '45 days',
    claimRootLicense: true
  },
  {
    id: 'sovereign-partner',
    name: 'Sovereign Partner',
    amount: '$100,000+',
    scrollPosition: 3,
    benefits: [
      'Sovereign scroll status',
      'Treaty co-authorship rights',
      'Infrastructure governance role',
      'Exclusive system access'
    ],
    deliverables: [
      'Unlimited scroll-bound applications',
      'Sovereign ClaimRoot authority',
      'Dedicated VaultMesh infrastructure',
      'Treaty governance participation',
      'Custom Seedling Builder access',
      'Full FAA Admin Dashboard'
    ],
    timeframe: '60 days',
    claimRootLicense: true
  }
];

export default function ScrollExplainer() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'funding' | 'technical'>('overview');

  const scrollData = {
    totalScrolls: 247,
    activeLicenses: 1834,
    vaultMeshNodes: 89,
    treatyPositions: 156
  };

  return (
    <div className="space-y-6" data-testid="scroll-explainer">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-orbitron text-5xl font-bold text-faa-yellow mb-4">
          📜 SCROLL SYSTEM EXPLAINER
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Revolutionary scroll-based infrastructure funding model. Not equity. Not debt. 
          But permanent infrastructure position in the sovereign digital ecosystem.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="flex bg-faa-bg border border-faa-border rounded-lg p-1">
          {[
            { id: 'overview', label: '🌟 Overview', testId: 'tab-overview' },
            { id: 'features', label: '🧬 Features', testId: 'tab-features' },
            { id: 'funding', label: '💰 Funding', testId: 'tab-funding' },
            { id: 'technical', label: '⚙️ Technical', testId: 'tab-technical' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2 rounded text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-faa-yellow text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
              data-testid={tab.testId}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Overview Stats */}
            <Card className="bg-faa-card border-faa-border">
              <CardHeader>
                <CardTitle className="text-faa-yellow text-center">🏛️ Scroll Ecosystem Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-green-400">{scrollData.totalScrolls}</div>
                    <div className="text-sm text-gray-400">Active Scrolls</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-blue-400">{scrollData.activeLicenses}</div>
                    <div className="text-sm text-gray-400">ClaimRoot Licenses</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-purple-400">{scrollData.vaultMeshNodes}</div>
                    <div className="text-sm text-gray-400">VaultMesh Nodes</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-faa-yellow">{scrollData.treatyPositions}</div>
                    <div className="text-sm text-gray-400">Treaty Positions</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Value Propositions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: '🚫',
                  title: 'No Equity Dilution',
                  description: 'Fund infrastructure growth without giving away ownership or control of your digital assets.'
                },
                {
                  icon: '⚡',
                  title: 'Operational Capital',
                  description: 'Your funding directly powers real infrastructure expansion and application deployment.'
                },
                {
                  icon: '🔒',
                  title: 'Permanent Position',
                  description: 'Scroll positions are immutable and provide lasting infrastructure underwriting status.'
                }
              ].map((prop, index) => (
                <Card key={index} className="bg-faa-card border-faa-border">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{prop.icon}</div>
                    <h3 className="text-xl font-bold text-faa-yellow mb-3">{prop.title}</h3>
                    <p className="text-gray-400">{prop.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Section */}
            <Card className="bg-faa-card border-green-500">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-green-400 mb-4">Ready to Secure Your Scroll Position?</h2>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Join the first sovereign scroll-based funding model and become an infrastructure underwriter 
                  in the next generation of unstoppable digital systems.
                </p>
                <div className="space-x-4">
                  <Button className="success-button" data-testid="button-start-funding">
                    🚀 Start Funding Process
                  </Button>
                  <Button variant="outline" className="border-faa-border text-white" data-testid="button-technical-docs">
                    📋 Technical Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'features' && (
          <motion.div
            key="features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {scrollFeatures.map((feature) => (
                <Card 
                  key={feature.id} 
                  className={`bg-faa-card border-faa-border cursor-pointer transition-all ${
                    activeFeature === feature.id ? 'border-faa-yellow shadow-lg' : ''
                  }`}
                  onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                  data-testid={`feature-${feature.id}`}
                >
                  <CardHeader>
                    <CardTitle className="text-faa-yellow flex items-center">
                      <span className="text-2xl mr-3">{feature.icon}</span>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">{feature.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-green-400 mb-2">Benefits</h4>
                        <ul className="space-y-1">
                          {feature.benefits.map((benefit, index) => (
                            <li key={index} className="text-xs text-gray-300">
                              ✓ {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {activeFeature === feature.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                        >
                          <h4 className="text-sm font-semibold text-blue-400 mb-2">Technical Specs</h4>
                          <ul className="space-y-1">
                            {feature.technicalSpecs.map((spec, index) => (
                              <li key={index} className="text-xs text-gray-300">
                                ⚙️ {spec}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'funding' && (
          <motion.div
            key="funding"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card className="bg-faa-card border-faa-border">
              <CardHeader>
                <CardTitle className="text-faa-yellow text-center">💰 Funding Tiers & Scroll Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {fundingTiers.map((tier) => (
                    <div key={tier.id} className="p-6 bg-faa-bg border border-faa-border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-faa-yellow">{tier.name}</h3>
                          <p className="text-2xl font-bold text-green-400">{tier.amount}</p>
                        </div>
                        <div className="text-center">
                          <Badge className="bg-purple-400/20 text-purple-400 mb-2">
                            Scroll Position {tier.scrollPosition}
                          </Badge>
                          <div className="text-sm text-gray-400">⏱️ {tier.timeframe}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-green-400 mb-3">🎯 Benefits</h4>
                          <ul className="space-y-2">
                            {tier.benefits.map((benefit, index) => (
                              <li key={index} className="text-sm text-gray-300 flex items-start">
                                <span className="text-green-400 mr-2">✓</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-blue-400 mb-3">📦 Deliverables</h4>
                          <ul className="space-y-2">
                            {tier.deliverables.map((deliverable, index) => (
                              <li key={index} className="text-sm text-gray-300 flex items-start">
                                <span className="text-blue-400 mr-2">📋</span>
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-faa-border flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          {tier.claimRootLicense && (
                            <Badge className="bg-green-400/20 text-green-400">
                              📜 ClaimRoot Licensed
                            </Badge>
                          )}
                        </div>
                        <Button className="success-button" data-testid={`button-select-${tier.id}`}>
                          Select {tier.name}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'technical' && (
          <motion.div
            key="technical"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-faa-card border-faa-border">
                <CardHeader>
                  <CardTitle className="text-faa-yellow">🏗️ Architecture Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">Scroll Validation Layer</h4>
                    <p className="text-sm text-gray-400">
                      Every application is bound to immutable scroll validation, ensuring permanent 
                      licensing and operational integrity through ClaimRoot protocols.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-2">VaultMesh Network</h4>
                    <p className="text-sm text-gray-400">
                      3-second pulse synchronization across global infrastructure nodes enables 
                      real-time validation and instant treaty consensus.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-400 mb-2">Treaty Governance</h4>
                    <p className="text-sm text-gray-400">
                      Position-based governance system where scroll holders participate in 
                      infrastructure decisions without traditional voting mechanisms.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-faa-card border-faa-border">
                <CardHeader>
                  <CardTitle className="text-faa-yellow">📋 Implementation Stack</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">Frontend Layer</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• React + TypeScript with scroll-bound hooks</li>
                      <li>• useButtonSanity() UI integrity validation</li>
                      <li>• Real-time VaultMesh synchronization</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-2">Backend Services</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• PostgreSQL with Drizzle ORM</li>
                      <li>• Express.js with treaty-aware middleware</li>
                      <li>• ClaimRoot PDF generation pipeline</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-400 mb-2">Infrastructure</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Replit deployment ecosystem</li>
                      <li>• OmniGrid metadata wash layer</li>
                      <li>• Seedling Builder no-code generation</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* API Documentation Preview */}
            <Card className="bg-faa-card border-faa-border">
              <CardHeader>
                <CardTitle className="text-faa-yellow">🔧 API Integration Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black p-4 rounded font-mono text-sm space-y-2">
                  <div className="text-green-400"># Scroll Validation API</div>
                  <div className="text-gray-300">POST /api/scroll-validate</div>
                  <div className="text-gray-400">{"{ \"scrollId\": \"scroll_123\", \"action\": \"validate\" }"}</div>
                  
                  <div className="text-green-400 mt-4"># ClaimRoot License Generation</div>
                  <div className="text-gray-300">POST /api/claimroot-generate</div>
                  <div className="text-gray-400">{"{ \"appId\": \"app_456\", \"licenseeId\": \"user_789\" }"}</div>
                  
                  <div className="text-green-400 mt-4"># VaultMesh Sync Status</div>
                  <div className="text-gray-300">GET /api/vaultmesh-status</div>
                  <div className="text-gray-400">{"{ \"pulse\": \"3s\", \"nodes\": 89, \"sync\": \"active\" }"}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}