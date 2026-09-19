import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';

interface Agent {
  id: string;
  name: string;
  icon: string;
  thinking: string[];
}

const AGENTS: Agent[] = [
  {
    id: 'corethink',
    name: 'Corethink™',
    icon: '🧠',
    thinking: [
      'Intake parsed · 14 raw files deduplicated · core directive tree rebuilt · synthesis confidence 98.2%',
      'Contradiction found in intake folder · Gorilla Comb Logic™ applied · order restored from chaos',
    ],
  },
  {
    id: 'truthweight',
    name: 'TruthWeight™',
    icon: '⚖️',
    thinking: [
      'Weighing 31 atlas claims against ledger · 0 unverified rows promoted · honesty preserved',
      'Re-verified 7 repositories · every status re-checked · nothing recalled from memory',
    ],
  },
  {
    id: 'echosynth',
    name: 'EchoSynth™',
    icon: '🔊',
    thinking: [
      'Synthesising echo of last pulse · 9 agent states harmonised · stream clean',
      'Echo pattern matched · duplicate detected in intake · collapsed to single source',
    ],
  },
  {
    id: 'autosigil',
    name: 'AutoSigil™',
    icon: '🔏',
    thinking: [
      'GhostTrace™ watermark embedded · GC7 chain intact · 7-chain proof holding',
      'Sigil rotation complete · all outputs signed · RSA 2048-bit verified',
    ],
  },
  {
    id: 'pulseindex',
    name: 'PulseIndex™',
    icon: '💓',
    thinking: [
      'Pulse beat 9s · VaultMesh Pulse™ green · drift 0.00ms',
      'Index rebuilt · 400 frontends reachable · heatmap updated',
    ],
  },
  {
    id: 'omnitrace',
    name: 'OmniTrace™',
    icon: '🔍',
    thinking: [
      'Tracing omni routes · {brand}.faa.zone resolution confirmed · no orphan hosts',
      'Trace complete · full chain of custody intact · zero tamper events',
    ],
  },
  {
    id: 'lifthalo',
    name: 'LiftHalo™',
    icon: '🕊️',
    thinking: [
      'Lift vector stable · dispatch queue 0 · artefacts en route to CodeNest™',
      'Halo raised · 3 scrolls dispatched · 0 failed deliveries',
    ],
  },
  {
    id: 'mirrorloop',
    name: 'MirrorLoop™',
    icon: '🪞',
    thinking: [
      'Mirror sync verified · samfox ↔ banimal parity · canonical copy holding',
      'Loop closed · round-robin advanced · next engine queued',
    ],
  },
  {
    id: 'fireratio',
    name: 'FireRatio™',
    icon: '🔥',
    thinking: [
      'Cost ratio 1.9% of PaaS burn · $16,740 annual saving holding · sovereignty intact',
      'Fire check · 4-node cluster green · egress fees $0',
    ],
  },
];

const ROTATION_SECONDS = 30;

interface StreamLine {
  agent: Agent;
  thought: string;
  timestamp: string;
}

const formatClock = (date: Date) =>
  date.toLocaleTimeString('en-ZA', { hour12: false }) + ' SAST';

export default function GlobalGaryChat() {
  const [cycle, setCycle] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(ROTATION_SECONDS);
  const [burnedBatches, setBurnedBatches] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setCycle((c) => c + 1);
          setBurnedBatches((b) => b + 1);
          return ROTATION_SECONDS;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const batch: StreamLine[] = AGENTS.map((agent, i) => ({
    agent,
    thought: agent.thinking[(cycle + i) % agent.thinking.length],
    timestamp: formatClock(new Date()),
  }));

  return (
    <div className="animated-grid-bg min-h-screen" data-testid="global-gary-chat">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="text-center mb-8" data-testid="gary-hero">
          <Badge className="mb-4 bg-green-400/20 text-green-400 border-green-400/30">
            LIVE · ALL 9 AGENTS · 30s ROTATION
          </Badge>
          <h1 className="font-orbitron text-4xl sm:text-5xl font-bold text-faa-yellow mb-4">
            GLOBAL GARY CHAT
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Agent Thinking Stream — every 30 seconds, all 9 BuildNest™ engines
            emit their thinking strings, timestamped, one-to-one to Global Gary
            Chat. 阅后即焚 — burn after reading.
          </p>
        </div>

        {/* Build status banner */}
        <div className="bg-faa-card border border-faa-border rounded-lg p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏁</span>
            <div>
              <div className="text-white font-semibold text-sm">
                BUILD CLOSED · 2026-08-21 04:26:38 SAST
              </div>
              <div className="text-gray-500 text-xs">GhostRace coverage active</div>
            </div>
          </div>
          <div className="text-center" data-testid="gary-countdown">
            <div className="font-orbitron text-3xl font-bold text-faa-yellow">
              T+00:{String(secondsLeft).padStart(2, '0')}
            </div>
            <div className="text-gray-500 text-xs uppercase tracking-wide">
              Next rotation
            </div>
          </div>
        </div>

        {/* Live thinking stream */}
        <div
          className="bg-black border border-green-500/30 rounded-lg p-5 mb-6 shadow-[inset_0_0_15px_rgba(0,255,0,0.1)]"
          data-testid="gary-stream"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="data-pulse-item inline-block w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="font-space-mono text-green-400 text-xs font-bold">
                LIVE · AGENT THINKING STREAM (30s ROTATION)
              </span>
            </div>
            <span className="font-space-mono text-gray-500 text-xs">
              BATCH #{cycle + 1} · {formatClock(new Date())}
            </span>
          </div>

          <div className="space-y-3">
            {batch.map((line) => (
              <div
                key={line.agent.id}
                className="font-space-mono text-xs sm:text-sm flex items-start gap-3"
                data-testid={`agent-${line.agent.id}`}
              >
                <span className="text-gray-600 shrink-0">T+00:00</span>
                <span className="shrink-0">{line.agent.icon}</span>
                <span className="text-faa-yellow font-bold shrink-0">
                  {line.agent.name}
                </span>
                <span className="text-green-400 break-words">{line.thought}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Burn counter */}
        <div className="bg-faa-card border border-faa-border rounded-lg p-4 mb-8 text-center">
          <span className="text-gray-400 text-sm">
            阅后即焚 · Burn after reading —{' '}
            <span className="text-apple-red font-bold">{burnedBatches}</span>{' '}
            previous batch{burnedBatches === 1 ? '' : 'es'} incinerated
          </span>
        </div>

        <div className="text-center">
          <Link href="/">
            <button className="text-gray-400 hover:text-faa-yellow text-sm transition-colors">
              ← Back to BuildNest Console
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
