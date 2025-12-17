import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Database, Shield, Activity } from 'lucide-react';

interface QueenBeeStatus {
  queen_bee: string;
  repos_monitored: number;
  vault_mesh_sync: boolean;
  last_audit: string;
  deployment_status: string;
  vaultmesh_pulse_interval?: string;
  network_health?: number;
  scrolls_active?: number;
}

interface SecurityOverview {
  total_repos: number;
  repos_with_hooks: number;
  repos_scanned: number;
  security_score: number;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  last_updated: string;
}

export function QueenBeeControlRoom() {
  const [status, setStatus] = useState<QueenBeeStatus | null>(null);
  const [security, setSecurity] = useState<SecurityOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  
  const fetchStatus = async () => {
    try {
      const [statusRes, securityRes] = await Promise.all([
        fetch('/api/queen-bee/status'),
        fetch('/api/queen-bee/security/overview')
      ]);
      
      if (statusRes.ok) {
        const data = await statusRes.json();
        setStatus(data);
      }
      
      if (securityRes.ok) {
        const data = await securityRes.json();
        setSecurity(data);
      }
      
      setLastUpdate(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch Queen Bee status:', error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // Fetch immediately on mount
    fetchStatus();
    
    // Fetch from /api/queen-bee/status every 9 seconds (VaultMesh pulse)
    const interval = setInterval(fetchStatus, 9000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSync = async () => {
    try {
      const response = await fetch('/api/queen-bee/repos/sync', {
        method: 'POST'
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Sync initiated:', data);
        fetchStatus();
      }
    } catch (error) {
      console.error('Failed to initiate sync:', error);
    }
  };
  
  const handleAggregate = async () => {
    try {
      const response = await fetch('/api/queen-bee/audit/aggregate');
      
      if (response.ok) {
        const data = await response.json();
        console.log('Audit aggregated:', data);
        fetchStatus();
      }
    } catch (error) {
      console.error('Failed to aggregate audits:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Initializing Queen Bee Control Room...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            🐝 Queen Bee Control Room
          </h1>
          <p className="text-muted-foreground mt-1">
            Orchestrating security across 84 repositories
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSync} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Repos
          </Button>
          <Button onClick={handleAggregate} variant="outline">
            <Database className="w-4 h-4 mr-2" />
            Aggregate Audits
          </Button>
        </div>
      </div>
      
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Queen Bee Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge 
              variant={status?.queen_bee === 'OPERATIONAL' ? 'default' : 'destructive'}
              className="text-lg"
            >
              {status?.queen_bee || 'UNKNOWN'}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Repositories Monitored</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{status?.repos_monitored || 0}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">VaultMesh Sync</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Activity className={`w-5 h-5 ${status?.vault_mesh_sync ? 'text-green-500 animate-pulse' : 'text-gray-400'}`} />
              <p className="text-xl font-semibold">
                {status?.vault_mesh_sync ? 'ACTIVE' : 'OFFLINE'}
              </p>
            </div>
            {status?.vaultmesh_pulse_interval && (
              <p className="text-xs text-muted-foreground mt-1">
                Pulse: {status.vaultmesh_pulse_interval}
              </p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Deployment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="text-lg">
              {status?.deployment_status || 'UNKNOWN'}
            </Badge>
          </CardContent>
        </Card>
      </div>
      
      {/* Security Overview */}
      {security && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Overview
            </CardTitle>
            <CardDescription>
              Cross-repository security posture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-red-500">
                  {security.vulnerabilities.critical}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">High</p>
                <p className="text-2xl font-bold text-orange-500">
                  {security.vulnerabilities.high}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Medium</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {security.vulnerabilities.medium}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Low</p>
                <p className="text-2xl font-bold text-blue-500">
                  {security.vulnerabilities.low}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* 84-Repo Health Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Repository Health Matrix</CardTitle>
          <CardDescription>
            Visual representation of all 84 monitored repositories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-12 gap-2">
            {Array.from({length: 84}).map((_, i) => (
              <div 
                key={i} 
                className="w-full aspect-square bg-green-500 rounded hover:bg-green-600 transition-colors cursor-pointer" 
                title={`Repository ${i+1} - Status: Healthy`}
              />
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded" />
              <span>Healthy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded" />
              <span>Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded" />
              <span>Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-400 rounded" />
              <span>Unknown</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* VaultMesh Network Info */}
      {status?.network_health !== undefined && (
        <Card>
          <CardHeader>
            <CardTitle>VaultMesh Network</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Network Health</p>
                <p className="text-2xl font-bold">{status.network_health}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scrolls Active</p>
                <p className="text-2xl font-bold">{status.scrolls_active}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Update</p>
                <p className="text-sm">{lastUpdate.toLocaleTimeString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
