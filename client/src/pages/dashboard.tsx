import { useEffect } from 'react';
import Header from '@/components/Header';
import SystemOverview from '@/components/SystemOverview';
import SystemStatus from '@/components/SystemStatus';
import LogicCores from '@/components/LogicCores';
import OmniNetwork from '@/components/OmniNetwork';
import SecurityLayers from '@/components/SecurityLayers';
import CommandCenter from '@/components/CommandCenter';
import TabbedSections from '@/components/TabbedSections';
import FusionMotorPanel from '@/components/FusionMotorPanel';
import TemporalMotorPanel from '@/components/TemporalMotorPanel';
import CoreModules from '@/components/CoreModules';
import PulseSyncComponents from '@/components/PulseSyncComponents';
import DemoControlPanel from '@/components/DemoControlPanel';
import AppNavigation from '@/components/AppNavigation';

export default function Dashboard() {
  useEffect(() => {
    // Initialize Chart.js when component mounts
    if (typeof window !== 'undefined' && (window as any).Chart) {
      (window as any).Chart.defaults.color = '#fcd34d';
      (window as any).Chart.defaults.backgroundColor = 'rgba(250, 204, 21, 0.1)';
      (window as any).Chart.defaults.borderColor = '#facc15';
    }
  }, []);

  return (
    <div className="animated-grid-bg min-h-screen" data-testid="dashboard-main">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SystemOverview />
        
        {/* BuildNest Dashboard Integration - Motor Divisions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <FusionMotorPanel />
          <TemporalMotorPanel />
        </div>

        {/* Core Cognitive Modules Flow */}
        <CoreModules className="mb-8" />

        {/* Pulse Sync Components */}
        <PulseSyncComponents className="mb-8" />

        {/* Demo Control Panel - Real Functional Scenarios */}
        <DemoControlPanel className="mb-8" />

        {/* Scroll-Backed Applications Navigation */}
        <AppNavigation className="mb-8" />

        <SystemStatus />
        <LogicCores />
        <OmniNetwork />
        <SecurityLayers />
        <CommandCenter />
        <TabbedSections />
      </main>
    </div>
  );
}
