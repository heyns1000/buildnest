import { Link } from 'wouter';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';

type AtlasStatus =
  | 'live'
  | 'draft'
  | 'planned'
  | 'reference'
  | 'archived'
  | 'merged'
  | 'open'
  | 'definition stage';

interface AtlasEntry {
  num: string;
  name: string;
  location: string;
  description: string;
  status: AtlasStatus;
}

interface AtlasSection {
  title: string;
  entries: AtlasEntry[];
}

const sections: AtlasSection[] = [
  {
    title: 'Sam Fox™ Brand System',
    entries: [
      {
        num: '01',
        name: 'Sam Fox™ Core CI Guide Master',
        location: 'banimal / docs/brand/ci-guide.html',
        description:
          'The single, exclusive master of the brand: verified palette, six-move fox-head construction, typography, and the compliance rules everything else here defers to. Originated in samfox, mirrored here as the canonical copy.',
        status: 'reference',
      },
      {
        num: '02',
        name: 'Banimal™ Connector icon & palette page',
        location: 'banimal / docs/brand/banimal-connector-icons.html',
        description:
          "The fox-head icon rendered across all nine verified palette colours, cross-linked with the CI Guide.",
        status: 'reference',
      },
      {
        num: '03',
        name: 'Heart of Her Hand',
        location: 'samfox / public/heart-of-her-hand/index.html',
        description:
          "The copyright-intake pack for Samantha Schoeman: cover, jurisdiction map, minutes of meeting, filing questionnaire. Personal — stays in samfox, not mirrored into the commerce repo.",
        status: 'live',
      },
      {
        num: '04',
        name: 'Snakes & Ladders board',
        location: 'samfox / public/heart-of-her-hand/snakes-and-ladders.html',
        description:
          "Standalone illustrated board in the verified palette, built before the letter's own board section.",
        status: 'reference',
      },
    ],
  },
  {
    title: 'Banimal™ Connector — the product',
    entries: [
      {
        num: '05',
        name: 'banimal-connector plugin',
        location: 'banimal / banimal-connector/.claude-plugin/plugin.json',
        description:
          'The Claude Code plugin carrying entry 06. Moved here from samfox so the product and its documentation live where the product runs.',
        status: 'live',
      },
      {
        num: '06',
        name: 'samfox-ci-guide skill',
        location: 'banimal / banimal-connector/skills/samfox-ci-guide/SKILL.md',
        description:
          "Entry 01's rules, ported into machine-readable instructions Claude checks brand work against.",
        status: 'live',
      },
      {
        num: '07',
        name: 'Banimal™ Ecosystem Connector — WordPress plugin',
        location: 'banimal / wordpress-plugin/banimal-ecosystem-connector',
        description:
          "v5.0.0. A real, shipped plugin already named Connector — a thin, signed WooCommerce↔Worker client with no direct third-party calls. Solves commerce sync, not brand alignment; entry 06 belongs here as a module, not as a second plugin.",
        status: 'live',
      },
      {
        num: '08',
        name: 'wp-bridge Worker route',
        location: 'banimal / src/worker/routes/wp-bridge.ts',
        description:
          "Zod-validated, signed ingestion for entry 07's events; maps WooCommerce order status onto a real state machine, idempotent via wp_bridge_events.",
        status: 'live',
      },
      {
        num: '09',
        name: 'GitHub omnidrop workflow',
        location: 'heyns1000 org-wide',
        description:
          "The sweep that aligns brand assets across the whole GitHub estate. Its real home is entry 19, not a fresh build.",
        status: 'planned',
      },
      {
        num: '10',
        name: 'Replit / cross-account sync',
        location: '~150 apps, multiple accounts',
        description:
          'Pull-based check-in from each app, fanning entry 06 out to Replit, Lovable, Bolt, Hercules, Accio.',
        status: 'planned',
      },
    ],
  },
  {
    title: 'Commerce infrastructure — heyns1000/banimal',
    entries: [
      {
        num: '11',
        name: 'Banimal™ commerce Worker',
        location: 'banimal / src/worker/index.ts',
        description:
          "Hono. Mounts licenses, Paystack payments, BobGo delivery/shipping, auth, notifications, analytics, coupons, email, giving, orders, and entry 08's wp-bridge.",
        status: 'live',
      },
      {
        num: '12',
        name: 'Banimal™ D1 tables',
        location: 'banimal / migrations',
        description:
          'brands · brand_systems · brand_tiers behind /api/brands, /api/systems, /api/tiers — plus wp_bridge_events and orders, added for entry 08.',
        status: 'live',
      },
      {
        num: '13',
        name: 'Apple Pay verification Workers',
        location: 'banimal-global-loop / workers/applepay, banimal-applepay-verify',
        description:
          'Two small standalone Workers handling Apple Pay merchant verification.',
        status: 'live',
      },
    ],
  },
  {
    title: 'Seedwave — multi-brand routing',
    entries: [
      {
        num: '14',
        name: 'seedwave-router Worker',
        location: 'banimal-global-loop / workers/seedwave-router/index.js',
        description:
          '213 lines. Already resolves {brand}.seedwave.faa.zone and {brand}.faa.zone by hostname, then routes by pathname — the gap most drafts assume is still open.',
        status: 'live',
      },
      {
        num: '15',
        name: 'banimal-router Worker',
        location: 'banimal-global-loop / workers/banimal-router/index.js',
        description:
          "475 lines, pathname-only. This is the router entry 14's brand context still needs to be wired into.",
        status: 'live',
      },
      {
        num: '16',
        name: 'seedwave-host-router.js',
        location: 'uploaded snapshot, not committed',
        description:
          "A cleaner, KV-backed, unit-tested reimplementation of entry 14's job. Worth reconciling with entry 14, not adopting blind.",
        status: 'draft',
      },
      {
        num: '17',
        name: 'ToyNest brand config',
        location: 'banimal-global-loop / configs/toynest.seedwave.json',
        description:
          'A real per-brand config file, of the shape entries 14–16 all expect.',
        status: 'live',
      },
    ],
  },
  {
    title: 'Governance',
    entries: [
      {
        num: '18',
        name: 'Ecosystem Governance Sentinel (ACCIO)',
        location: 'ecosystem-governance-sentinel',
        description:
          "Report-only drift-detection and approval-gated control plane for the whole GitHub estate. The real, already-scoped home for entry 09's omnidrop — default-deny, no mass dispatch until explicitly approved.",
        status: 'definition stage',
      },
    ],
  },
  {
    title: 'Repositories in reach',
    entries: [
      {
        num: '19',
        name: 'heyns1000/banimal',
        location: 'GitHub',
        description:
          'Now the canonical home of the Banimal™ Connector product and its documentation — entries 01–02, 05–08, 11–13.',
        status: 'live',
      },
      {
        num: '20',
        name: 'heyns1000/payment',
        location: 'GitHub',
        description:
          'Payment and pricing surface pages: global checkout, master license pricing, VaultMesh hub.',
        status: 'live',
      },
      {
        num: '21',
        name: 'heyns1000/zerowaste.seedwave.faa.zone',
        location: 'GitHub',
        description:
          'Block Box™ — the zero-waste EPS cornice packaging patent site.',
        status: 'live',
      },
      {
        num: '22',
        name: 'Fruitful-Global-Planet/banimal-global-loop',
        location: 'GitHub',
        description: 'The Workers backend — entries 13–17.',
        status: 'live',
      },
      {
        num: '23',
        name: 'Fruitful-Global-Planet/ecosystem-governance-sentinel',
        location: 'GitHub',
        description: 'Entry 18.',
        status: 'definition stage',
      },
      {
        num: '24',
        name: 'Fruitful-Global-Planet/fruitfulplanetchange',
        location: 'GitHub',
        description: 'A Lovable-built app on a Supabase backend.',
        status: 'live',
      },
      {
        num: '25',
        name: 'Fruitful-Global-Planet/samfox',
        location: 'GitHub',
        description:
          'Personal Sam Fox materials — entries 03–04. Brand-system originals now mirrored into entry 19.',
        status: 'live',
      },
    ],
  },
  {
    title: 'Open work',
    entries: [
      {
        num: '26',
        name: 'samfox PR #1',
        location: 'Fruitful-Global-Planet/samfox#1',
        description:
          'Heart of Her Hand pages plus the original Banimal™ Connector plugin commit.',
        status: 'merged',
      },
      {
        num: '27',
        name: 'banimal PR #16 — Connector docs & plugin',
        location: 'heyns1000/banimal',
        description:
          'This atlas, the CI Guide mirror, and the banimal-connector plugin, landing in the repo the product actually runs from.',
        status: 'merged',
      },
      {
        num: '28',
        name: 'banimal PR #17 — brand-guide endpoint',
        location: 'heyns1000/banimal',
        description:
          '/api/brand-guide, the 9-theme palette toggle, and live icon serving (entries 07–08).',
        status: 'merged',
      },
      {
        num: '29',
        name: 'banimal PR #18 — CI Guide alignment',
        location: 'heyns1000/banimal',
        description:
          "Diagram clear space, theme-aware icon/logo swap, the real Banimal™ logo, standardized footers. Merged without its final push landing — see entry 30.",
        status: 'merged',
      },
      {
        num: '30',
        name: 'banimal PR #19 — audit & correction',
        location: 'heyns1000/banimal',
        description:
          "Carries forward the fix that #18 didn't actually land, plus a cross-audit (a real overlap bug on this atlas's own hero, and a corrected palette in docs/connector-preview.html).",
        status: 'open',
      },
      {
        num: '31',
        name: '18-part "Perplexity Spaces" dump',
        location: 'reviewed, not adopted wholesale',
        description:
          "17 unbranded landing-page iterations plus one fake telemetry demo. Entry 16 is the only piece worth keeping from it.",
        status: 'archived',
      },
    ],
  },
];

const totalEntries = sections.reduce((sum, s) => sum + s.entries.length, 0);

const getStatusColor = (status: AtlasStatus) => {
  switch (status) {
    case 'live':
      return 'bg-green-400/20 text-green-400 border-green-400/30';
    case 'draft':
      return 'bg-red-400/20 text-red-400 border-red-400/30';
    case 'planned':
      return 'bg-teal-400/20 text-teal-400 border-teal-400/30';
    case 'reference':
      return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
    case 'archived':
      return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
    case 'merged':
      return 'bg-blue-400/20 text-blue-400 border-blue-400/30';
    case 'open':
      return 'bg-purple-400/20 text-purple-400 border-purple-400/30';
    case 'definition stage':
      return 'bg-orange-400/20 text-orange-400 border-orange-400/30';
    default:
      return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
  }
};

const legend: AtlasStatus[] = [
  'live',
  'draft',
  'planned',
  'reference',
  'archived',
];

const legendLabels: Record<string, string> = {
  live: 'Live — running in a real repo',
  draft: 'Draft — file exists, not committed',
  planned: 'Planned — not built yet',
  reference: 'Reference — a document, not a service',
  archived: 'Archived — set aside, kept for record',
};

export default function SeedwaveAtlas() {
  return (
    <div className="animated-grid-bg min-h-screen" data-testid="seedwave-atlas">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="text-center mb-8" data-testid="atlas-hero">
          <Badge className="mb-4 bg-blue-400/20 text-blue-400 border-blue-400/30">
            🦊 SAM FOX™ / BANIMAL™ CONNECTOR
          </Badge>
          <h1 className="font-orbitron text-4xl sm:text-5xl font-bold text-faa-yellow mb-4">
            THE SEEDWAVE ATLAS
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Verified against 7 live repositories · rev 2026-08-30 · {totalEntries}{' '}
            entries across seven sections, page-numbered in reading order.
          </p>
        </div>

        {/* Preface */}
        <div className="bg-faa-card border border-faa-border rounded-lg p-6 mb-6">
          <h2 className="font-orbitron text-lg font-bold text-faa-yellow mb-3">
            Preface
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            Before this, "the Banimal™ Connector" meant four different things
            depending on which conversation you caught — a freight dashboard, a
            WordPress plugin, a GitHub sweep, a device network. None of those
            were wrong. They were just unindexed.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            This atlas exists to stop re-describing the ecosystem from memory.
            Every entry past this page was checked against an actual repository,
            an actual committed file, or an actual open pull request — not
            recalled, not assumed. Where something is a plan and not yet a
            fact, it's marked <em>planned</em>, not quietly promoted to real.
          </p>
        </div>

        {/* Status legend */}
        <div className="bg-faa-card border border-faa-border rounded-lg p-5 mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {legend.map((status) => (
              <Badge
                key={status}
                className={`text-xs ${getStatusColor(status)}`}
              >
                {legendLabels[status]}
              </Badge>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8 mb-8" data-testid="atlas-sections">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-orbitron text-xl font-bold text-white mb-4 border-b border-faa-border pb-2">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.entries.map((entry) => (
                  <div
                    key={entry.num}
                    className="card-hover bg-faa-card border border-faa-border rounded-lg p-4"
                    data-testid={`atlas-entry-${entry.num}`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-start gap-3">
                        <span className="font-orbitron text-faa-yellow font-bold text-sm shrink-0 pt-0.5">
                          {entry.num}
                        </span>
                        <div>
                          <h3 className="text-white font-semibold text-sm">
                            {entry.name}
                          </h3>
                          <p className="font-space-mono text-gray-500 text-xs mt-0.5">
                            {entry.location}
                          </p>
                        </div>
                      </div>
                      <Badge className={`text-xs shrink-0 ${getStatusColor(entry.status)}`}>
                        {entry.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed pl-8">
                      {entry.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
