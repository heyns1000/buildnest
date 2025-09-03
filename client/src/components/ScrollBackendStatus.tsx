import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BackendStatus {
  pythonActive: boolean;
  nodeActive: boolean;
  vaultMeshConnected: boolean;
  scrollPulseActive: boolean;
  lastCheck: string;
}

export default function ScrollBackendStatus() {
  const [status, setStatus] = useState<BackendStatus>({
    pythonActive: false,
    nodeActive: true,
    vaultMeshConnected: true,
    scrollPulseActive: true,
    lastCheck: new Date().toISOString()
  });

  const [testResults, setTestResults] = useState<string[]>([]);

  const checkBackendStatus = async () => {
    const results: string[] = [];
    let pythonActive = false;
    let nodeActive = false;

    try {
      // Test Python backend
      const pythonResponse = await fetch('http://localhost:3000/health', {
        method: 'GET',
        signal: AbortSignal.timeout(2000)
      });
      
      if (pythonResponse.ok) {
        pythonActive = true;
        results.push('✅ Python FastAPI backend: OPERATIONAL');
      } else {
        results.push('❌ Python FastAPI backend: HTTP ERROR');
      }
    } catch (error) {
      results.push('❌ Python FastAPI backend: CONNECTION FAILED');
    }

    try {
      // Test Node.js backend
      const nodeResponse = await fetch('/api/health', {
        method: 'GET',
        signal: AbortSignal.timeout(2000)
      });
      
      if (nodeResponse.ok) {
        nodeActive = true;
        results.push('✅ Node.js Express backend: OPERATIONAL');
      } else {
        results.push('❌ Node.js Express backend: HTTP ERROR');
      }
    } catch (error) {
      results.push('❌ Node.js Express backend: CONNECTION FAILED');
    }

    setStatus({
      pythonActive,
      nodeActive,
      vaultMeshConnected: pythonActive || nodeActive,
      scrollPulseActive: pythonActive || nodeActive,
      lastCheck: new Date().toISOString()
    });

    setTestResults(results);
  };

  useEffect(() => {
    checkBackendStatus();
    const interval = setInterval(checkBackendStatus, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const startPythonBackend = async () => {
    try {
      const response = await fetch('/api/start-python-backend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        setTimeout(checkBackendStatus, 2000); // Check status after 2 seconds
      }
    } catch (error) {
      console.error('Failed to start Python backend:', error);
    }
  };

  const getStatusColor = (active: boolean) => 
    active ? 'bg-green-400/20 text-green-400 border-green-400/30' : 'bg-red-400/20 text-red-400 border-red-400/30';

  return (
    <Card className="bg-faa-card border-faa-border" data-testid="scroll-backend-status">
      <CardHeader>
        <CardTitle className="text-faa-yellow">🔧 Scroll Backend Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Backend Status Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-faa-bg border border-faa-border rounded-lg">
            <Badge className={getStatusColor(status.pythonActive)}>
              {status.pythonActive ? '🐍 PYTHON ACTIVE' : '🐍 PYTHON INACTIVE'}
            </Badge>
            <div className="text-xs text-gray-400 mt-1">FastAPI • Port 3000</div>
            <div className="text-xs text-gray-400">Scroll-signed TreatySync</div>
          </div>

          <div className="text-center p-3 bg-faa-bg border border-faa-border rounded-lg">
            <Badge className={getStatusColor(status.nodeActive)}>
              {status.nodeActive ? '⚡ NODE.JS ACTIVE' : '⚡ NODE.JS INACTIVE'}
            </Badge>
            <div className="text-xs text-gray-400 mt-1">Express • Port 5000</div>
            <div className="text-xs text-gray-400">Frontend Integration</div>
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-2 bg-faa-bg border border-faa-border rounded">
            <div className={`text-sm font-semibold ${status.vaultMeshConnected ? 'text-green-400' : 'text-red-400'}`}>
              {status.vaultMeshConnected ? '🔗 VaultMesh Connected' : '❌ VaultMesh Disconnected'}
            </div>
          </div>
          <div className="text-center p-2 bg-faa-bg border border-faa-border rounded">
            <div className={`text-sm font-semibold ${status.scrollPulseActive ? 'text-green-400' : 'text-red-400'}`}>
              {status.scrollPulseActive ? '🧬 Scroll Pulse Active' : '❌ Scroll Pulse Inactive'}
            </div>
          </div>
        </div>

        {/* Test Results */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-300">Connection Tests:</div>
          {testResults.map((result, index) => (
            <div key={index} className="text-xs p-2 bg-faa-bg border border-faa-border rounded font-mono">
              {result}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex space-x-2">
          <Button
            onClick={checkBackendStatus}
            size="sm"
            className="flex-1 primary-button"
            data-testid="button-check-status"
          >
            🔄 Refresh Status
          </Button>
          
          {!status.pythonActive && (
            <Button
              onClick={startPythonBackend}
              size="sm"
              className="flex-1 success-button"
              data-testid="button-start-python"
            >
              🚀 Start Python Backend
            </Button>
          )}
        </div>

        {/* Architecture Info */}
        <div className="p-3 bg-faa-bg border border-purple-500/50 rounded-lg">
          <div className="text-center text-sm">
            <div className="text-purple-400 font-semibold mb-2">🏗️ SCROLL ARCHITECTURE</div>
            <div className="text-xs text-gray-400">
              Dual backend system: Python FastAPI for cryptographic scroll operations,
              Node.js Express for frontend integration and real-time features.
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center">
          Last checked: {new Date(status.lastCheck).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}