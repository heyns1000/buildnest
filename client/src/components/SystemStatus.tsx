import { useEffect } from 'react';
import { useRealTimeData } from '@/hooks/useRealTimeData';

export default function SystemStatus() {
  const { kpiData, alerts } = useRealTimeData();

  useEffect(() => {
    // Initialize charts when component mounts and Chart.js is available
    const initializeCharts = () => {
      if (typeof window !== 'undefined' && (window as any).Chart) {
        const Chart = (window as any).Chart;
        
        // Network Performance Chart
        const networkCtx = document.getElementById('networkChart') as HTMLCanvasElement;
        if (networkCtx) {
          new Chart(networkCtx, {
            type: 'line',
            data: {
              labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
              datasets: [{
                label: 'Network Load %',
                data: [65, 78, 82, 87, 85, 89],
                borderColor: '#facc15',
                backgroundColor: 'rgba(250, 204, 21, 0.1)',
                tension: 0.4
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: { color: '#fcd34d' }
                }
              },
              scales: {
                x: { ticks: { color: '#fcd34d' } },
                y: { ticks: { color: '#fcd34d' } }
              }
            }
          });
        }

        // OmniProof Stability Chart
        const stabilityCtx = document.getElementById('stabilityChart') as HTMLCanvasElement;
        if (stabilityCtx) {
          new Chart(stabilityCtx, {
            type: 'doughnut',
            data: {
              labels: ['Stable', 'Fluctuating', 'Critical'],
              datasets: [{
                data: [92, 6, 2],
                backgroundColor: ['#30d158', '#facc15', '#ff3b30']
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: { color: '#fcd34d' }
                }
              }
            }
          });
        }
      }
    };

    // Wait for Chart.js to be available
    if (typeof window !== 'undefined' && !(window as any).Chart) {
      const checkChart = setInterval(() => {
        if ((window as any).Chart) {
          clearInterval(checkChart);
          initializeCharts();
        }
      }, 100);
    } else {
      initializeCharts();
    }
  }, []);

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'text-apple-green';
      case 'MODERATE': return 'text-faa-yellow';
      case 'ELEVATED': return 'text-orange-400';
      case 'HIGH': return 'text-apple-red';
      default: return 'text-faa-yellow';
    }
  };

  return (
    <section id="system-status" className="mb-16" data-testid="system-status">
      <h2 className="font-orbitron text-3xl font-bold text-faa-yellow text-center mb-12" data-testid="title-system-status">
        ⚡ LIVE SYSTEM STATUS ⚡
      </h2>
      
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" data-testid="kpi-grid">
        <div className="bg-faa-card border border-faa-border rounded-xl p-6 text-center" data-testid="kpi-network-load">
          <div className="text-3xl font-bold text-faa-yellow mb-2 data-pulse-item">{kpiData.networkLoad}%</div>
          <div className="text-faa-yellow-dark text-sm">Network Load</div>
        </div>
        
        <div className="bg-faa-card border border-faa-border rounded-xl p-6 text-center" data-testid="kpi-transaction-velocity">
          <div className="text-3xl font-bold text-apple-green mb-2 data-pulse-item">{kpiData.transactionVelocity}K</div>
          <div className="text-faa-yellow-dark text-sm">TX/sec Velocity</div>
        </div>
        
        <div className="bg-faa-card border border-faa-border rounded-xl p-6 text-center" data-testid="kpi-threat-level">
          <div className={`text-3xl font-bold mb-2 data-pulse-item ${getThreatLevelColor(kpiData.threatLevel)}`}>
            {kpiData.threatLevel}
          </div>
          <div className="text-faa-yellow-dark text-sm">Threat Level</div>
        </div>
        
        <div className="bg-faa-card border border-faa-border rounded-xl p-6 text-center" data-testid="kpi-mist-density">
          <div className="text-3xl font-bold text-faa-yellow mb-2 data-pulse-item">{kpiData.mistDensity}%</div>
          <div className="text-faa-yellow-dark text-sm">Mist Density</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" data-testid="charts-grid">
        <div className="bg-faa-card border border-faa-border rounded-xl p-6">
          <h3 className="font-orbitron text-xl font-bold text-faa-yellow mb-4">Network Performance</h3>
          <div className="chart-container">
            <canvas id="networkChart" data-testid="chart-network-performance"></canvas>
          </div>
        </div>
        
        <div className="bg-faa-card border border-faa-border rounded-xl p-6">
          <h3 className="font-orbitron text-xl font-bold text-faa-yellow mb-4">OmniProof Stability</h3>
          <div className="chart-container">
            <canvas id="stabilityChart" data-testid="chart-stability"></canvas>
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-faa-card border border-faa-border rounded-xl p-6" data-testid="system-alerts">
        <h3 className="font-orbitron text-xl font-bold text-faa-yellow mb-4">🚨 System Alerts</h3>
        <div className="console-output" data-testid="alerts-feed">
          {alerts.map((alert, index) => (
            <div key={index}>
              <span className="timestamp">[{alert.timestamp}]</span> <span className={alert.type}>{alert.message}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
