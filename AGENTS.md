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

## Notes
- No external API keys required to boot. Cloudflare/Resend/SendGrid keys are optional (DNS/email features); routes handle their absence gracefully.
- Vite runs in middleware mode with `allowedHosts: true` (accepts all hosts).
- App listens on port 3000 via `PORT` env var.
