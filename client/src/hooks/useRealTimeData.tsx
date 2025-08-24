import { useState, useEffect, useCallback } from 'react';

interface KPIData {
  networkLoad: number;
  transactionVelocity: string;
  threatLevel: string;
  mistDensity: number;
}

interface Alert {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

const threatLevels = ['LOW', 'MODERATE', 'ELEVATED', 'HIGH'];

const alertMessages = [
  { type: 'info' as const, message: 'Quantum synchronization pulse detected' },
  { type: 'success' as const, message: 'Baobab core temperature normalized' },
  { type: 'warning' as const, message: 'Pebble routing optimization in progress' },
  { type: 'info' as const, message: 'Conad loop iteration completed successfully' },
  { type: 'success' as const, message: 'Rossouw protocol handshake confirmed' },
  { type: 'warning' as const, message: 'Mist density fluctuation in northern sectors' },
  { type: 'info' as const, message: 'Hoenderbleis immune response activated' }
];

export function useRealTimeData() {
  const [kpiData, setKpiData] = useState<KPIData>({
    networkLoad: 87.3,
    transactionVelocity: '15.2',
    threatLevel: 'MODERATE',
    mistDensity: 94.7
  });

  const [alerts, setAlerts] = useState<Alert[]>([
    { timestamp: '12:34:56', message: 'System initialization complete', type: 'info' },
    { timestamp: '12:35:12', message: 'Baobab Core fusion stable at 97.3%', type: 'success' },
    { timestamp: '12:35:28', message: 'Mist density fluctuation detected in Sector 7', type: 'warning' },
    { timestamp: '12:35:45', message: 'Rossouw protocol synchronization verified', type: 'info' },
    { timestamp: '12:36:02', message: 'OmniTrace memory layer integrity confirmed', type: 'success' }
  ]);

  const addAlert = useCallback((message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setAlerts(prev => [...prev, { timestamp, message, type }].slice(-10)); // Keep only last 10 alerts
  }, []);

  // Update KPIs every 3 seconds
  useEffect(() => {
    const kpiInterval = setInterval(() => {
      setKpiData(prev => ({
        networkLoad: Math.round((85 + Math.random() * 10) * 10) / 10,
        transactionVelocity: ((14000 + Math.random() * 3000) / 1000).toFixed(1),
        threatLevel: threatLevels[Math.floor(Math.random() * threatLevels.length)],
        mistDensity: Math.round((90 + Math.random() * 10) * 10) / 10
      }));
    }, 3000);

    return () => clearInterval(kpiInterval);
  }, []);

  // Add new alerts every 5 seconds
  useEffect(() => {
    const alertInterval = setInterval(() => {
      const randomAlert = alertMessages[Math.floor(Math.random() * alertMessages.length)];
      addAlert(randomAlert.message, randomAlert.type);
    }, 5000);

    return () => clearInterval(alertInterval);
  }, [addAlert]);

  return {
    kpiData,
    alerts,
    addAlert
  };
}
