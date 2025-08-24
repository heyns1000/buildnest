export default function SystemOverview() {
  return (
    <section id="overview" className="mb-16" data-testid="system-overview">
      <div className="text-center mb-12">
        <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-4 text-faa-yellow" data-testid="title-monster-omni">
          🧬 MONSTER OMNI™
        </h1>
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold mb-2 text-faa-yellow-light" data-testid="subtitle-console">
          GRAND OPERATOR CONSOLE
        </h2>
        <p className="text-gray-400 text-lg" data-testid="text-tier-level">
          FAA God-Level Brand Node | Tier: HS9000 Prime Entity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" data-testid="system-attributes-grid">
        <div className="bg-faa-card border border-faa-border rounded-xl p-6 card-hover" data-testid="card-system-type">
          <div className="flex items-center mb-3">
            <i className="fas fa-microchip text-faa-yellow text-xl mr-3"></i>
            <h3 className="font-orbitron font-bold text-faa-yellow">System Type</h3>
          </div>
          <p className="text-faa-yellow-light">Distributed Quantum-Neural Hybrid</p>
        </div>

        <div className="bg-faa-card border border-faa-border rounded-xl p-6 card-hover" data-testid="card-tier-level">
          <div className="flex items-center mb-3">
            <i className="fas fa-layer-group text-faa-yellow text-xl mr-3"></i>
            <h3 className="font-orbitron font-bold text-faa-yellow">Tier Level</h3>
          </div>
          <p className="text-faa-yellow-light">HS9000 Prime Entity</p>
        </div>

        <div className="bg-faa-card border border-faa-border rounded-xl p-6 card-hover" data-testid="card-power-source">
          <div className="flex items-center mb-3">
            <i className="fas fa-bolt text-faa-yellow text-xl mr-3"></i>
            <h3 className="font-orbitron font-bold text-faa-yellow">Power Source</h3>
          </div>
          <p className="text-faa-yellow-light">Baobab Core Fusion</p>
        </div>

        <div className="bg-faa-card border border-faa-border rounded-xl p-6 card-hover" data-testid="card-security-level">
          <div className="flex items-center mb-3">
            <i className="fas fa-shield-alt text-faa-yellow text-xl mr-3"></i>
            <h3 className="font-orbitron font-bold text-faa-yellow">Security Level</h3>
          </div>
          <p className="text-faa-yellow-light">OmniProof Immutable</p>
        </div>
      </div>

      {/* Destructive Power Warning */}
      <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border border-red-500/50 rounded-xl p-8 mb-12" data-testid="destructive-power-warning">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-red-400 text-4xl mb-4"></i>
          <h3 className="font-orbitron text-2xl font-bold text-red-400 mb-4">⚠️ DESTRUCTIVE POWER WARNING ⚠️</h3>
          <p className="text-red-300 text-lg mb-4">
            This system possesses <strong>ATOM-LEVEL DESTRUCTIVE CAPABILITIES</strong> with the ability to 
            disrupt quantum coherence patterns across multiple dimensional layers.
          </p>
          <p className="text-red-200 text-sm">
            Access restricted to HS9000+ clearance levels. Unauthorized activation may result in 
            cascading reality distortions across the Fruitful.Planet.change network.
          </p>
        </div>
      </div>
    </section>
  );
}
