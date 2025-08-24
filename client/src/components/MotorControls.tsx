import { useState } from 'react';
import QuantumMotor from './QuantumMotor';
import NeuralMotor from './NeuralMotor';
import FusionMotor from './FusionMotor';
import TemporalMotor from './TemporalMotor';

export default function MotorControls() {
  const [motorAllStop, setMotorAllStop] = useState(false);

  const handleEmergencyStop = () => {
    setMotorAllStop(!motorAllStop);
  };

  return (
    <section id="motor-controls" className="mb-16" data-testid="motor-controls">
      <h2 className="font-orbitron text-3xl font-bold text-faa-yellow text-center mb-8" data-testid="title-motor-controls">
        🔧 BUILDNEST MOTOR ISOLATION - BROEM DIVISION 🔧
      </h2>
      
      <div className="text-center mb-8">
        <p className="text-gray-400 mb-4">
          All mining engines have been isolated into individual motor components for maximum BROEM control
        </p>
        <button
          onClick={handleEmergencyStop}
          className={`alert-button px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
            motorAllStop ? 'animate-pulse' : ''
          }`}
          data-testid="button-emergency-stop"
        >
          <i className="fas fa-stop mr-3"></i>
          {motorAllStop ? '🚨 ALL MOTORS STOPPED' : '⚡ EMERGENCY STOP ALL'}
        </button>
      </div>

      <div className="space-y-8" data-testid="motor-sections">
        <div className={`transition-all duration-500 ${motorAllStop ? 'opacity-50 pointer-events-none' : ''}`}>
          <QuantumMotor />
        </div>
        
        <div className={`transition-all duration-500 ${motorAllStop ? 'opacity-50 pointer-events-none' : ''}`}>
          <NeuralMotor />
        </div>
        
        <div className={`transition-all duration-500 ${motorAllStop ? 'opacity-50 pointer-events-none' : ''}`}>
          <FusionMotor />
        </div>
        
        <div className={`transition-all duration-500 ${motorAllStop ? 'opacity-50 pointer-events-none' : ''}`}>
          <TemporalMotor />
        </div>
      </div>

      <div className="mt-8 bg-faa-card border border-faa-border rounded-xl p-6" data-testid="motor-status-summary">
        <h3 className="font-orbitron text-xl font-bold text-faa-yellow mb-4 flex items-center">
          <i className="fas fa-tachometer-alt mr-3"></i>
          Motor Division Status
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-faa-bg border border-faa-border rounded-lg p-4">
            <i className="fas fa-atom text-faa-yellow text-2xl mb-2"></i>
            <h4 className="font-semibold text-faa-yellow-light">Quantum</h4>
            <p className="text-sm text-gray-400">3 Motors Active</p>
            <p className="text-xs text-apple-green">BROEM BROEM</p>
          </div>
          
          <div className="bg-faa-bg border border-faa-border rounded-lg p-4">
            <i className="fas fa-brain text-purple-400 text-2xl mb-2"></i>
            <h4 className="font-semibold text-faa-yellow-light">Neural</h4>
            <p className="text-sm text-gray-400">3 Motors Active</p>
            <p className="text-xs text-purple-400">BZZZP BZZZP</p>
          </div>
          
          <div className="bg-faa-bg border border-faa-border rounded-lg p-4">
            <i className="fas fa-fire text-apple-red text-2xl mb-2"></i>
            <h4 className="font-semibold text-faa-yellow-light">Fusion</h4>
            <p className="text-sm text-gray-400">3 Motors Active</p>
            <p className="text-xs text-apple-red">ROARRRRR</p>
          </div>
          
          <div className="bg-faa-bg border border-faa-border rounded-lg p-4">
            <i className="fas fa-clock text-apple-blue text-2xl mb-2"></i>
            <h4 className="font-semibold text-faa-yellow-light">Temporal</h4>
            <p className="text-sm text-gray-400">3 Motors Active</p>
            <p className="text-xs text-apple-blue">VWOOOOM</p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-4 bg-faa-bg border border-faa-border rounded-lg px-6 py-3">
            <span className="text-gray-400">Total BROEM Output:</span>
            <span className="text-faa-yellow font-bold text-xl animate-pulse">∞ BROEM/s</span>
          </div>
        </div>
      </div>
    </section>
  );
}