import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

interface TreatyLog {
  id: string;
  timestamp: string;
  action: string;
  scrollId: string;
  status: 'approved' | 'pending' | 'rejected' | 'executed';
  details: string;
  position: number;
  vaultMeshSync: boolean;
}

interface ScrollPosition {
  id: string;
  holder: string;
  position: number;
  scrollType: string;
  fundingAmount: string;
  claimRootLicense: string;
  treatyRights: string[];
  lastActivity: string;
  status: 'active' | 'pending' | 'suspended';
}

export default function TreatySyncDashboard() {
  const [treatyLogs, setTreatyLogs] = useState<TreatyLog[]>([
    {
      id: 'treaty_001',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      action: 'Scroll Position Granted',
      scrollId: 'scroll_faa_001',
      status: 'executed',
      details: 'Infrastructure underwriter status granted for $50K seed capital',
      position: 1,
      vaultMeshSync: true
    },
    {
      id: 'treaty_002',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      action: 'ClaimRoot License Generated',
      scrollId: 'scroll_faa_002',
      status: 'approved',
      details: 'PDF licensing package created for OmniHealth application',
      position: 2,
      vaultMeshSync: true
    },
    {
      id: 'treaty_003',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      action: 'VaultMesh Expansion Approved',
      scrollId: 'scroll_faa_003',
      status: 'pending',
      details: 'Pulse rate expansion from 9s to 3s requires treaty validation',
      position: 3,
      vaultMeshSync: false
    }
  ]);

  const [scrollPositions, setScrollPositions] = useState<ScrollPosition[]>([
    {
      id: 'pos_001',
      holder: 'Heyns Schoeman (VaultCommander)',
      position: 1,
      scrollType: 'Sovereign Partner',
      fundingAmount: '$50,000',
      claimRootLicense: 'claim_faa_001',
      treatyRights: ['Infrastructure Governance', 'Treaty Co-authorship', 'System Configuration'],
      lastActivity: new Date().toISOString(),
      status: 'active'
    },
    {
      id: 'pos_002',
      holder: 'Infrastructure Backer Alpha',
      position: 2,
      scrollType: 'Infrastructure Backer',
      fundingAmount: '$75,000',
      claimRootLicense: 'claim_faa_002',
      treatyRights: ['Priority Access', 'Advanced Treaties', 'Governance Participation'],
      lastActivity: new Date(Date.now() - 86400000).toISOString(),
      status: 'active'
    }
  ]);

  const [systemMetrics, setSystemMetrics] = useState({
    totalTreaties: 247,
    activeScrolls: 156,
    pendingApprovals: 12,
    vaultMeshHealth: 98,
    claimRootLicenses: 1834,
    treatyExecutions: 89
  });

  // Real-time treaty log updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new treaty activities
      if (Math.random() > 0.7) {
        const newLog: TreatyLog = {
          id: `treaty_${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: ['Scroll Validation', 'License Renewal', 'Position Update', 'Treaty Amendment'][Math.floor(Math.random() * 4)],
          scrollId: `scroll_${Math.random().toString(36).substr(2, 9)}`,
          status: ['approved', 'pending', 'executed'][Math.floor(Math.random() * 3)] as any,
          details: 'Automated treaty system activity',
          position: Math.floor(Math.random() * 1000) + 1,
          vaultMeshSync: Math.random() > 0.2
        };
        
        setTreatyLogs(prev => [newLog, ...prev.slice(0, 9)]);
      }
      
      // Update system metrics
      setSystemMetrics(prev => ({
        totalTreaties: prev.totalTreaties + Math.floor(Math.random() * 3),
        activeScrolls: prev.activeScrolls + Math.floor(Math.random() * 2),
        pendingApprovals: Math.max(0, prev.pendingApprovals + Math.floor(Math.random() * 5) - 2),
        vaultMeshHealth: Math.min(100, Math.max(90, prev.vaultMeshHealth + Math.floor(Math.random() * 6) - 3)),
        claimRootLicenses: prev.claimRootLicenses + Math.floor(Math.random() * 5),
        treatyExecutions: prev.treatyExecutions + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'executed':
      case 'active':
        return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'rejected':
      case 'suspended':
        return 'text-red-400 bg-red-400/20 border-red-400/30';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const executeTreatyAction = async (treatyId: string, action: string) => {
    try {
      const response = await fetch('/api/treaty-execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ treatyId, action })
      });

      if (response.ok) {
        setTreatyLogs(prev => prev.map(log => 
          log.id === treatyId 
            ? { ...log, status: 'executed' as any, vaultMeshSync: true }
            : log
        ));
      }
    } catch (error) {
      console.error('Treaty execution failed:', error);
    }
  };

  return (
    <div className="space-y-6" data-testid="treaty-sync-dashboard">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-orbitron text-4xl font-bold text-faa-yellow mb-2">
          🏛️ TREATY SYNC DASHBOARD
        </h1>
        <p className="text-gray-400">FAA Admin System for TreatySync logs and scroll governance</p>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Treaties', value: systemMetrics.totalTreaties, color: 'text-blue-400' },
          { label: 'Active Scrolls', value: systemMetrics.activeScrolls, color: 'text-green-400' },
          { label: 'Pending Approvals', value: systemMetrics.pendingApprovals, color: 'text-yellow-400' },
          { label: 'VaultMesh Health', value: `${systemMetrics.vaultMeshHealth}%`, color: 'text-purple-400' },
          { label: 'ClaimRoot Licenses', value: systemMetrics.claimRootLicenses, color: 'text-cyan-400' },
          { label: 'Treaty Executions', value: systemMetrics.treatyExecutions, color: 'text-faa-yellow' }
        ].map((metric, index) => (
          <Card key={index} className="bg-faa-card border-faa-border">
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
              <div className="text-xs text-gray-400">{metric.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Treaty Activity Log */}
        <Card className="bg-faa-card border-faa-border">
          <CardHeader>
            <CardTitle className="text-faa-yellow">📜 Real-time Treaty Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {treatyLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 bg-faa-bg border border-faa-border rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs ${getStatusColor(log.status)}`}>
                          {log.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm font-medium text-white">{log.action}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Pos #{log.position}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{log.details}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs ${log.vaultMeshSync ? 'text-green-400' : 'text-red-400'}`}>
                          {log.vaultMeshSync ? '🔗 Synced' : '❌ Unsynced'}
                        </span>
                        {log.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => executeTreatyAction(log.id, 'approve')}
                            className="text-xs px-2 py-1 success-button"
                            data-testid={`button-approve-${log.id}`}
                          >
                            Approve
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        {/* Scroll Positions */}
        <Card className="bg-faa-card border-faa-border">
          <CardHeader>
            <CardTitle className="text-faa-yellow">🧬 Scroll Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scrollPositions.map((position) => (
                <div key={position.id} className="p-4 bg-faa-bg border border-faa-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white">{position.holder}</h3>
                      <p className="text-sm text-gray-400">Position #{position.position} - {position.scrollType}</p>
                    </div>
                    <Badge className={getStatusColor(position.status)}>
                      {position.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Funding:</span>
                      <span className="text-green-400 ml-1 font-semibold">{position.fundingAmount}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">License:</span>
                      <span className="text-blue-400 ml-1 font-mono text-xs">{position.claimRootLicense}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Treaty Rights:</div>
                    <div className="flex flex-wrap gap-1">
                      {position.treatyRights.map((right) => (
                        <Badge key={right} variant="outline" className="text-xs">
                          {right}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    Last Activity: {new Date(position.lastActivity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Treaty Execution Panel */}
      <Card className="bg-faa-card border-faa-border">
        <CardHeader>
          <CardTitle className="text-faa-yellow">⚖️ Treaty Execution Center</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Button className="success-button" data-testid="button-approve-all">
              ✅ Approve All Pending
            </Button>
            <Button className="alert-button" data-testid="button-sync-vaultmesh">
              🔄 Sync VaultMesh
            </Button>
            <Button className="warning-button" data-testid="button-generate-report">
              📊 Generate Report
            </Button>
            <Button className="primary-button" data-testid="button-treaty-settings">
              ⚙️ Treaty Settings
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-faa-bg border border-green-500/50 rounded-lg">
            <div className="text-center text-sm text-green-400">
              🏛️ Sovereign Treaty System Active | All Scroll Positions Validated | VaultMesh Synchronized
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}