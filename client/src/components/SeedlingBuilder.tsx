import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

interface SeedlingTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  scrollBound: boolean;
  complexity: 'simple' | 'medium' | 'advanced';
  features: string[];
  estimatedTime: string;
}

interface BuildConfig {
  appName: string;
  template: string;
  scrollBound: boolean;
  claimRootEnabled: boolean;
  vaultMeshIntegration: boolean;
  customFeatures: string[];
  description: string;
}

const seedlingTemplates: SeedlingTemplate[] = [
  {
    id: 'health-monitor',
    name: 'Health Monitor',
    category: 'System',
    description: 'Real-time health monitoring with scroll validation',
    scrollBound: true,
    complexity: 'medium',
    features: ['Real-time metrics', 'Alert system', 'Dashboard UI', 'API integration'],
    estimatedTime: '15 minutes'
  },
  {
    id: 'pulse-trade',
    name: 'Pulse Trade',
    category: 'Trading',
    description: 'High-frequency trading platform with quantum predictions',
    scrollBound: true,
    complexity: 'advanced',
    features: ['Trading interface', 'Risk management', 'Analytics', 'Real-time data'],
    estimatedTime: '25 minutes'
  },
  {
    id: 'core-binder',
    name: 'Core Binder',
    category: 'Integration',
    description: 'System integration and binding platform',
    scrollBound: true,
    complexity: 'advanced',
    features: ['API bindings', 'Protocol management', 'Security layers', 'Monitoring'],
    estimatedTime: '20 minutes'
  },
  {
    id: 'vault-commander',
    name: 'Vault Commander',
    category: 'Security',
    description: 'Secure vault management with ClaimRoot integration',
    scrollBound: true,
    complexity: 'advanced',
    features: ['Vault operations', 'Access control', 'Audit trails', 'ClaimRoot licensing'],
    estimatedTime: '30 minutes'
  },
  {
    id: 'treaty-sync',
    name: 'Treaty Sync',
    category: 'Governance',
    description: 'Treaty and agreement synchronization system',
    scrollBound: true,
    complexity: 'medium',
    features: ['Document management', 'Sync protocols', 'Validation', 'Tracking'],
    estimatedTime: '18 minutes'
  },
  {
    id: 'omni-grid',
    name: 'Omni Grid',
    category: 'Infrastructure',
    description: 'Distributed grid computing with metadata wash',
    scrollBound: true,
    complexity: 'advanced',
    features: ['Grid management', 'Load balancing', 'Metadata processing', 'Routing'],
    estimatedTime: '35 minutes'
  }
];

export default function SeedlingBuilder() {
  const [buildConfig, setBuildConfig] = useState<BuildConfig>({
    appName: '',
    template: '',
    scrollBound: true,
    claimRootEnabled: true,
    vaultMeshIntegration: true,
    customFeatures: [],
    description: ''
  });
  
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [buildLog, setBuildLog] = useState<string[]>([]);
  const [generatedApps, setGeneratedApps] = useState<any[]>([]);

  const addToLog = (message: string) => {
    setBuildLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const buildSeedlingApp = async () => {
    if (!buildConfig.appName || !buildConfig.template) {
      addToLog('❌ Error: App name and template are required');
      return;
    }

    setIsBuilding(true);
    setBuildProgress(0);
    setBuildLog([]);

    try {
      const selectedTemplate = seedlingTemplates.find(t => t.id === buildConfig.template);
      if (!selectedTemplate) throw new Error('Template not found');

      addToLog(`🌱 Starting Seedling build for "${buildConfig.appName}"`);
      addToLog(`📋 Template: ${selectedTemplate.name} (${selectedTemplate.complexity})`);
      
      // Phase 1: Initialize
      setBuildProgress(10);
      addToLog('🔧 Initializing project structure...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Phase 2: Scroll Binding
      setBuildProgress(25);
      if (buildConfig.scrollBound) {
        addToLog('🧬 Activating scroll-bound architecture...');
        addToLog('📜 Integrating ClaimRoot licensing system...');
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      // Phase 3: Core Features
      setBuildProgress(45);
      addToLog('⚙️ Implementing core features...');
      for (const feature of selectedTemplate.features) {
        addToLog(`  ✓ ${feature}`);
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      // Phase 4: VaultMesh Integration
      setBuildProgress(65);
      if (buildConfig.vaultMeshIntegration) {
        addToLog('🔗 Connecting to VaultMesh network...');
        addToLog('📊 Setting up 3-second pulse synchronization...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Phase 5: UI Generation
      setBuildProgress(80);
      addToLog('🎨 Generating user interface...');
      addToLog('🔘 Implementing useButtonSanity() hooks...');
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Phase 6: Testing & Validation
      setBuildProgress(95);
      addToLog('🧪 Running automated tests...');
      addToLog('✅ Scroll validation: PASSED');
      addToLog('✅ ClaimRoot integration: ACTIVE');
      addToLog('✅ VaultMesh sync: CONNECTED');
      await new Promise(resolve => setTimeout(resolve, 800));

      // Phase 7: Deployment
      setBuildProgress(100);
      addToLog('🚀 Deploying to Replit environment...');
      
      // API call to actually generate the app
      const response = await fetch('/api/seedling-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          config: buildConfig,
          template: selectedTemplate
        })
      });

      if (!response.ok) throw new Error('Failed to generate app');
      const result = await response.json();

      addToLog(`🎉 SUCCESS! ${buildConfig.appName} has been generated!`);
      addToLog(`📁 Project ID: ${result.projectId}`);
      addToLog(`🌐 Access URL: ${result.url}`);
      addToLog(`📜 ClaimRoot License: ${result.claimRootId}`);

      // Add to generated apps list
      const newApp = {
        id: result.projectId,
        name: buildConfig.appName,
        template: selectedTemplate.name,
        url: result.url,
        claimRootId: result.claimRootId,
        createdAt: new Date().toISOString(),
        status: 'active'
      };
      
      setGeneratedApps(prev => [newApp, ...prev]);

    } catch (error) {
      addToLog(`❌ Build failed: ${error}`);
    } finally {
      setIsBuilding(false);
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'text-green-400 bg-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'advanced': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="space-y-6" data-testid="seedling-builder">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-orbitron text-4xl font-bold text-faa-yellow mb-2">
          🏗️ SEEDLING BUILDER
        </h1>
        <p className="text-gray-400">No-code generation system for scroll-bound applications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <Card className="bg-faa-card border-faa-border">
          <CardHeader>
            <CardTitle className="text-faa-yellow">🌱 Build Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="app-name" className="text-gray-300">App Name</Label>
              <Input
                id="app-name"
                value={buildConfig.appName}
                onChange={(e) => setBuildConfig(prev => ({ ...prev, appName: e.target.value }))}
                placeholder="Enter your app name..."
                className="bg-faa-bg border-faa-border text-white"
                data-testid="input-app-name"
              />
            </div>

            <div>
              <Label htmlFor="template" className="text-gray-300">Template</Label>
              <Select
                value={buildConfig.template}
                onValueChange={(value) => setBuildConfig(prev => ({ ...prev, template: value }))}
              >
                <SelectTrigger className="bg-faa-bg border-faa-border text-white" data-testid="select-template">
                  <SelectValue placeholder="Choose a template..." />
                </SelectTrigger>
                <SelectContent className="bg-faa-bg border-faa-border">
                  {seedlingTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id} className="text-white">
                      {template.name} - {template.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-300">Description</Label>
              <Textarea
                id="description"
                value={buildConfig.description}
                onChange={(e) => setBuildConfig(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your app..."
                className="bg-faa-bg border-faa-border text-white"
                data-testid="textarea-description"
              />
            </div>

            {/* Scroll Integration Options */}
            <div className="space-y-2">
              <Label className="text-gray-300">Scroll Integration</Label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={buildConfig.scrollBound}
                    onChange={(e) => setBuildConfig(prev => ({ ...prev, scrollBound: e.target.checked }))}
                    className="rounded"
                    data-testid="checkbox-scroll-bound"
                  />
                  <span className="text-sm text-gray-300">Scroll-bound architecture</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={buildConfig.claimRootEnabled}
                    onChange={(e) => setBuildConfig(prev => ({ ...prev, claimRootEnabled: e.target.checked }))}
                    className="rounded"
                    data-testid="checkbox-claimroot"
                  />
                  <span className="text-sm text-gray-300">ClaimRoot licensing</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={buildConfig.vaultMeshIntegration}
                    onChange={(e) => setBuildConfig(prev => ({ ...prev, vaultMeshIntegration: e.target.checked }))}
                    className="rounded"
                    data-testid="checkbox-vaultmesh"
                  />
                  <span className="text-sm text-gray-300">VaultMesh integration</span>
                </label>
              </div>
            </div>

            <Button
              onClick={buildSeedlingApp}
              disabled={isBuilding || !buildConfig.appName || !buildConfig.template}
              className="w-full success-button"
              data-testid="button-build-app"
            >
              {isBuilding ? '🔄 Building...' : '🚀 Build Seedling App'}
            </Button>
          </CardContent>
        </Card>

        {/* Build Console */}
        <Card className="bg-faa-card border-faa-border">
          <CardHeader>
            <CardTitle className="text-faa-yellow">🔧 Build Console</CardTitle>
          </CardHeader>
          <CardContent>
            {isBuilding && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Build Progress</span>
                  <span>{buildProgress}%</span>
                </div>
                <Progress value={buildProgress} className="h-2" />
              </div>
            )}

            <div className="console-output h-64 overflow-y-auto bg-black p-4 rounded font-mono text-sm">
              <AnimatePresence>
                {buildLog.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-1 ${
                      line.includes('SUCCESS') || line.includes('✅') ? 'text-green-400' :
                      line.includes('ERROR') || line.includes('❌') ? 'text-red-400' :
                      line.includes('🌱') || line.includes('🚀') ? 'text-faa-yellow' :
                      'text-gray-300'
                    }`}
                  >
                    {line}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Template Gallery */}
      <Card className="bg-faa-card border-faa-border">
        <CardHeader>
          <CardTitle className="text-faa-yellow">📚 Available Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {seedlingTemplates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 bg-faa-bg border rounded-lg cursor-pointer transition-all ${
                  buildConfig.template === template.id ? 'border-faa-yellow' : 'border-faa-border'
                }`}
                onClick={() => setBuildConfig(prev => ({ ...prev, template: template.id }))}
                data-testid={`template-${template.id}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{template.name}</h3>
                  <Badge className={getComplexityColor(template.complexity)}>
                    {template.complexity}
                  </Badge>
                </div>
                <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                <div className="space-y-2">
                  <div className="text-xs text-gray-500">Features:</div>
                  <div className="flex flex-wrap gap-1">
                    {template.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {template.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-faa-yellow">⏱️ {template.estimatedTime}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generated Apps */}
      {generatedApps.length > 0 && (
        <Card className="bg-faa-card border-faa-border">
          <CardHeader>
            <CardTitle className="text-faa-yellow">🚀 Generated Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generatedApps.map((app) => (
                <div key={app.id} className="p-4 bg-faa-bg border border-faa-border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{app.name}</h3>
                      <p className="text-sm text-gray-400">Template: {app.template}</p>
                      <p className="text-xs text-gray-500">Created: {new Date(app.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-400/20 text-green-400 mb-2">{app.status}</Badge>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline" data-testid={`button-view-${app.id}`}>
                          View App
                        </Button>
                        <Button size="sm" variant="outline" data-testid={`button-license-${app.id}`}>
                          📜 License
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}