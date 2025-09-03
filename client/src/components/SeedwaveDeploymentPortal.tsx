import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

interface DeploymentApp {
  appId: string;
  name: string;
  sector: string;
  brand: string;
  scroll_hash: string;
  status: string;
  vault_mesh_linked: boolean;
  omni_grid_washed: boolean;
  treaty_lock: string;
  created_at: string;
  claimroot_license: string;
}

interface AppForm {
  name: string;
  sector: string;
  brand: string;
  deployed_by: string;
}

const SECTORS = [
  'Health', 'Technology', 'Finance', 'Agriculture', 'Energy', 
  'Education', 'Manufacturing', 'Retail', 'Healthcare', 'Media'
];

const BRANDS = [
  'BioFlow', 'TechGrid', 'FinanceCore', 'AgriSeed', 'EnergyPulse',
  'EduFlow', 'ManuGrid', 'RetailSync', 'HealthCore', 'MediaFlux'
];

export default function SeedwaveDeploymentPortal() {
  const [deployedApps, setDeployedApps] = useState<DeploymentApp[]>([]);
  const [deploymentForm, setDeploymentForm] = useState<AppForm>({
    name: '',
    sector: '',
    brand: '',
    deployed_by: 'FAA-X13'
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [pulseData, setPulseData] = useState<any>({});

  // Real-time pulse monitoring for deployed apps (3-second intervals)
  useEffect(() => {
    if (deployedApps.length === 0) return;

    const interval = setInterval(async () => {
      for (const app of deployedApps) {
        try {
          const response = await fetch(`/api/vaultmesh/pulse-sync/${app.appId}`);
          if (response.ok) {
            const data = await response.json();
            setPulseData((prev: any) => ({
              ...prev,
              [app.appId]: data.pulse
            }));
          }
        } catch (error) {
          console.error(`Pulse sync failed for ${app.appId}:`, error);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [deployedApps]);

  const deployScrollApp = async () => {
    if (!deploymentForm.name.trim() || !deploymentForm.sector || !deploymentForm.brand) {
      alert('All fields required for scroll deployment');
      return;
    }

    setIsDeploying(true);

    try {
      const response = await fetch('/api/faa/intake/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deploymentForm)
      });

      const result = await response.json();

      if (response.ok) {
        const newApp: DeploymentApp = {
          appId: result.app.appId,
          name: result.app.name,
          sector: result.app.sector,
          brand: result.app.brand,
          scroll_hash: result.app.scroll_hash,
          status: result.app.status,
          vault_mesh_linked: result.app.vault_mesh_linked,
          omni_grid_washed: result.app.omni_grid_washed,
          treaty_lock: result.app.treaty_lock,
          created_at: result.app.created_at,
          claimroot_license: result.claimroot_license.license_id
        };

        setDeployedApps(prev => [newApp, ...prev]);
        setDeploymentForm(prev => ({ ...prev, name: '' }));
        
        alert(`🚀 Scroll deployment initiated: ${result.app.name}`);
      } else {
        alert(`❌ Deployment failed: ${result.error}`);
      }
    } catch (error) {
      alert(`❌ Network error: ${error}`);
    } finally {
      setIsDeploying(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DEPLOYED': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'DEPLOYING': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'FAILED': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getTreatyLockColor = (lock: string) => {
    switch (lock) {
      case 'CONFIRMED': return 'text-green-400';
      case 'PENDING': return 'text-yellow-400';
      case 'FAILED': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6" data-testid="seedwave-deployment-portal">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-orbitron text-4xl font-bold text-faa-yellow mb-2">
          🚀 SEEDWAVE DEPLOYMENT PORTAL
        </h1>
        <p className="text-gray-300">Scroll-Based App Deployment • VaultMesh-Linked • OmniGrid Washed</p>
        <div className="mt-2">
          <Badge className="bg-purple-400/20 text-purple-400 border-purple-400/30">
            🧬 SOVEREIGN DEPLOYMENT ACTIVE
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deployment Form */}
        <Card className="bg-faa-card border-faa-border">
          <CardHeader>
            <CardTitle className="text-faa-yellow">📦 App Deployment Interface</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 block">App Name</label>
              <Input
                value={deploymentForm.name}
                onChange={(e) => setDeploymentForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter app name (e.g., CorePulse)"
                className="bg-faa-bg border-faa-border text-white"
                data-testid="input-app-name"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 block">Sector</label>
              <Select 
                value={deploymentForm.sector}
                onValueChange={(value) => setDeploymentForm(prev => ({ ...prev, sector: value }))}
              >
                <SelectTrigger className="bg-faa-bg border-faa-border text-white" data-testid="select-sector">
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  {SECTORS.map(sector => (
                    <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 block">Brand</label>
              <Select 
                value={deploymentForm.brand}
                onValueChange={(value) => setDeploymentForm(prev => ({ ...prev, brand: value }))}
              >
                <SelectTrigger className="bg-faa-bg border-faa-border text-white" data-testid="select-brand">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {BRANDS.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 block">Deployed By</label>
              <Input
                value={deploymentForm.deployed_by}
                onChange={(e) => setDeploymentForm(prev => ({ ...prev, deployed_by: e.target.value }))}
                className="bg-faa-bg border-faa-border text-white"
                data-testid="input-deployed-by"
              />
            </div>

            <Button
              onClick={deployScrollApp}
              disabled={isDeploying || !deploymentForm.name.trim() || !deploymentForm.sector || !deploymentForm.brand}
              className="w-full success-button"
              data-testid="button-deploy-app"
            >
              {isDeploying ? '🔄 Deploying Scroll App...' : '🚀 Deploy Scroll-Based App'}
            </Button>

            <div className="p-3 bg-faa-bg border border-blue-500/50 rounded-lg text-xs">
              <div className="text-blue-400 font-semibold mb-2">🔧 Deployment Flow:</div>
              <div className="space-y-1 text-gray-400">
                <div>• Generate metadata & scroll hash</div>
                <div>• Wash through OmniGrid</div>
                <div>• Issue ClaimRoot license</div>
                <div>• Confirm FAA Treaty lock</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-faa-card border-faa-border">
          <CardHeader>
            <CardTitle className="text-faa-yellow">🧬 System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-faa-bg border border-faa-border rounded">
                  <div className="text-green-400 text-xl font-bold">{deployedApps.length}</div>
                  <div className="text-xs text-gray-400">Apps Deployed</div>
                </div>
                <div className="text-center p-3 bg-faa-bg border border-faa-border rounded">
                  <div className="text-blue-400 text-xl font-bold">
                    {deployedApps.filter(app => app.vault_mesh_linked).length}
                  </div>
                  <div className="text-xs text-gray-400">VaultMesh Linked</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-faa-bg border border-faa-border rounded">
                  <div className="text-purple-400 text-xl font-bold">
                    {deployedApps.filter(app => app.omni_grid_washed).length}
                  </div>
                  <div className="text-xs text-gray-400">OmniGrid Washed</div>
                </div>
                <div className="text-center p-3 bg-faa-bg border border-faa-border rounded">
                  <div className="text-faa-yellow text-xl font-bold">
                    {deployedApps.filter(app => app.treaty_lock === 'CONFIRMED').length}
                  </div>
                  <div className="text-xs text-gray-400">Treaty Locked</div>
                </div>
              </div>

              <div className="p-3 bg-faa-bg border border-green-500/50 rounded-lg">
                <div className="text-center text-sm text-green-400">
                  🟢 Replit/CodeNest Integration Live
                </div>
                <div className="text-center text-sm text-green-400">
                  🟢 VaultMesh Listener Registered
                </div>
                <div className="text-center text-sm text-green-400">
                  🟢 UI Hash Tracker Running
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deployed Apps List */}
      {deployedApps.length > 0 && (
        <Card className="bg-faa-card border-faa-border">
          <CardHeader>
            <CardTitle className="text-faa-yellow">📋 Deployed Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AnimatePresence>
                {deployedApps.map((app) => (
                  <motion.div
                    key={app.appId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-faa-bg border border-faa-border rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{app.name}</h3>
                        <p className="text-sm text-gray-400">{app.sector} • {app.brand}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge className={getStatusColor(app.status)}>
                          {app.status}
                        </Badge>
                        <div className={`text-xs font-semibold ${getTreatyLockColor(app.treaty_lock)}`}>
                          🏛️ {app.treaty_lock}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs mb-3">
                      <div className="p-2 bg-faa-card rounded text-center">
                        <div className={app.vault_mesh_linked ? 'text-green-400' : 'text-red-400'}>
                          {app.vault_mesh_linked ? '✅' : '❌'}
                        </div>
                        <div className="text-gray-400">VaultMesh</div>
                      </div>
                      <div className="p-2 bg-faa-card rounded text-center">
                        <div className={app.omni_grid_washed ? 'text-green-400' : 'text-red-400'}>
                          {app.omni_grid_washed ? '🧼' : '❌'}
                        </div>
                        <div className="text-gray-400">OmniGrid</div>
                      </div>
                      <div className="p-2 bg-faa-card rounded text-center">
                        <div className="text-blue-400">📜</div>
                        <div className="text-gray-400">ClaimRoot</div>
                      </div>
                      <div className="p-2 bg-faa-card rounded text-center">
                        <div className="text-purple-400">
                          {pulseData[app.appId]?.pulse_interval || '3s'}
                        </div>
                        <div className="text-gray-400">Pulse</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-gray-500">Hash: </span>
                        <span className="font-mono text-blue-400">{app.scroll_hash}</span>
                      </div>
                      <div className="text-gray-500">
                        {new Date(app.created_at).toLocaleString()}
                      </div>
                    </div>

                    {pulseData[app.appId] && (
                      <div className="mt-2 p-2 bg-faa-card rounded-lg border border-green-500/30">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-green-400">🧬 Live Pulse Data:</span>
                          <span className="text-gray-400">
                            Sync #{pulseData[app.appId].sync_count}
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CorePulse Example */}
      <Card className="bg-faa-card border-purple-500/50">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-purple-400 font-semibold mb-3">📜 THE SCROLL HAS BEEN EMITTED</h3>
            <div className="text-2xl font-bold text-faa-yellow mb-2">CorePulse</div>
            <div className="text-gray-400 mb-4">Health Sector under BioFlow</div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
              <div>
                <div className="text-faa-yellow font-semibold">Generate</div>
                <div className="text-gray-400">Metadata ✅</div>
              </div>
              <div>
                <div className="text-faa-yellow font-semibold">Hash</div>
                <div className="text-gray-400">Complete ✅</div>
              </div>
              <div>
                <div className="text-faa-yellow font-semibold">Wash</div>
                <div className="text-gray-400">OmniGrid ✅</div>
              </div>
              <div>
                <div className="text-faa-yellow font-semibold">License</div>
                <div className="text-gray-400">ClaimRoot ✅</div>
              </div>
              <div>
                <div className="text-faa-yellow font-semibold">Treaty</div>
                <div className="text-gray-400">FAA Lock ✅</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}