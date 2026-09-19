# Base44 Development Environment

## Overview
Replit-style Express + Vite + React monorepo. The Express server serves both the API and the Vite dev server (middleware mode) on a single port.

## Architecture
- **Backend**: Express (`server/index.ts`) run via `tsx` (TypeScript execution)
- **Frontend**: React + Vite — client served through Express middleware in dev mode
- **Database**: PostgreSQL with Drizzle ORM (`shared/schema.ts`)
- **Schema push**: `drizzle-kit push` (no migration files; schema in `shared/schema.ts`)

## Key Modification
`server/db.ts` was changed from `@neondatabase/serverless` + `drizzle-orm/neon-serverless` to standard `pg` + `drizzle-orm/node-postgres`. The Neon driver requires a WebSocket proxy and cannot connect to a local PostgreSQL instance. `pg` and `@types/pg` were added to `package.json`.

## Running
```bash
docker compose -f docker-compose.base44.yml up -d
```

## Verifying
- `docker compose -f docker-compose.base44.yml ps` — both services running
- `curl localhost:3000` — serves the React app
- `curl localhost:3000/api/scroll-status` — returns JSON status

## Python Scroll Backend (port 8000)
- FastAPI app in `main.py`, run via `uvicorn main:app --port 8000 --reload` (the `if __name__ == "__main__"` block's port 3000 is NOT used — port 3000 belongs to the Node app).
- Deps installed at container start via pip: fastapi, uvicorn, aiohttp, dnspython, pyjwt, cryptography, pydantic, python-multipart. Do NOT `pip install` the pyproject itself — it lists `asyncio>=4.0.0`, which does not exist on PyPI.
- Every 9 seconds the background pulse activates an agent that fires the next BuildNest™ engine (round-robin over `BUILDNEST_ENGINES`: Corethink™, TruthWeight™, EchoSynth™, AutoSigil™, PulseIndex™, OmniTrace™, LiftHalo™, MirrorLoop™, FireRatio™).
- `/api/scroll/agents/stream` is an SSE endpoint pushing pulse data to all connected agents every 0.08 seconds.
- Key endpoints: `/health`, `/api/treaty-sync/intake`, `/api/claimroot/generate`, `/api/vaultmesh/status`, `/api/scroll/pulse`, `/api/queen-bee/*`.

## QS Command Center Webhook Bridge

- `POST /api/webhooks/qs-command-center` (`server/qs-command-center-routes.ts`) — Heyns1000 QS Command Center inbound bridge. Handles `tail_finding.trigger` and `boq.line_sync`, responds with Atom-level immutable confirmation (status `INLINE`, locked state `v111`).
- Auth: `X-API-KEY` checked against `HSOMNI9000_API_KEY`; optional HMAC via `X-QS-Signature: sha256=<hmac of raw body>` verified against `QS_WEBHOOK_SECRET`. When the vars are unset the route accepts with a warning (dev mode) — same graceful-absence convention as the other routes.
- Outbound telemetry: `sendQSTelemetry(event, data)` in `server/qs-telemetry.ts` POSTs to `QS_COMMAND_CENTER_ENDPOINT` (fire-and-forget).
- Secrets are delivered via `/run/base44/app.env` (wired into the app service's `env_file`).
- Tests: `npm test` (runs `tsx --test tests/qs-command-center.test.ts`) — integration tests that spin up the real route on an ephemeral port.

## Notes
- No external API keys required to boot. Cloudflare/Resend/SendGrid keys are optional (DNS/email features); routes handle their absence gracefully.
- Vite runs in middleware mode with `allowedHosts: true` (accepts all hosts).
- App listens on port 3000 via `PORT` env var.
- User-provided real documents live in `attached_assets/` (including `complete_faa_zone_console.html` and `monster_omni_core_engines_nodes_demo_1756078341054.html`) — they are real data, not mock.
