import terminals from "@shared/terminals.json";

interface Terminal {
  id: number;
  name: string;
  slug: string;
  icon: string;
  url: string;
  category: string;
  access_level: string;
  sort_order: number;
}

const agents = (terminals as Terminal[]).sort((a, b) => a.sort_order - b.sort_order);

export default function BoliLanding() {
  return (
    <div className="min-h-screen bg-black text-white" data-testid="boli-landing">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          src="/boli/fruitful-portal.mp4"
          autoPlay
          loop
          muted
          playsInline
          data-testid="boli-hero-video"
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
          <img
            src="/boli/boli-logo.png"
            alt="BOLI™ — Cool Shit"
            className="mx-auto w-64 mb-8"
            data-testid="boli-logo"
          />
          <div
            className="inline-block px-4 py-2 rounded-full bg-green-500/20 border border-green-400/40 text-green-300 font-space-mono text-sm mb-6"
            data-testid="boli-open-badge"
          >
            ● WE ARE OPEN
          </div>
          <h1 className="font-orbitron text-3xl md:text-5xl font-bold mb-4">
            BOLI™ 3D Agent Terminals
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            {agents.length} live agent terminals across the FAA.zone™ network — built and firing, not mocked.
          </p>
        </div>
      </section>

      {/* Agent grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          style={{ perspective: "1200px" }}
        >
          {agents.map((agent) => (
            <a
              key={agent.id}
              href={agent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl border border-white/10 bg-white/5 p-6 transition-transform duration-300 ease-out hover:-translate-y-1 hover:rotate-x-6 hover:scale-105 hover:border-yellow-400/50 hover:shadow-[0_10px_30px_rgba(250,204,21,0.15)]"
              style={{ transformStyle: "preserve-3d" }}
              data-testid={`agent-card-${agent.slug}`}
            >
              <div className="text-3xl mb-3">{agent.icon}</div>
              <div className="font-semibold text-sm mb-1">
                {agent.name.replace(agent.icon, "").trim()}
              </div>
              <div className="text-xs text-white/40 font-space-mono uppercase tracking-wide">
                {agent.category} · {agent.access_level}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
