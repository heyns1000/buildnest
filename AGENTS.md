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

## Notes
- No external API keys required to boot. Cloudflare/Resend/SendGrid keys are optional (DNS/email features); routes handle their absence gracefully.
- Vite runs in middleware mode with `allowedHosts: true` (accepts all hosts).
- App listens on port 3000 via `PORT` env var.
- User-provided real documents live in `attached_assets/` (including `complete_faa_zone_console.html` and `monster_omni_core_engines_nodes_demo_1756078341054.html`) — they are real data, not mock.
