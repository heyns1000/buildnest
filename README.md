<!-- FRUITFUL™ BANNER -->
<p align="center">
  <img src="https://raw.githubusercontent.com/heyns1000/codenest/claude/lucid-rubin-h1k269/docs/assets/fruitful-banner.png" width="100%" alt="Fruitful™ — BuildNest MONSTER OMNI™ Engine" />
</p>

# BuildNest™ — MONSTER OMNI™ Engine

**The Raw Material Manufacturer | Sovereign Compute Dispatch Engine**  
FRUITFUL SHOPS (PTY) LTD | Reg: 2021/121654/07 | VAT: 4400302974  
© 2021–2026 All Rights Reserved | Incorporator: SCHOEMAN HEYNS  
`GC7:FSP2021121654:4400302974:VM9s:BL1501:GHOST7CHAIN:FAA13713`

Licence: [Fruitful Shops Proprietary License v1.1](./LICENSE)

---

## What BuildNest Is — In Plain Language

> **BuildNest is the factory.** It manufactures the raw material.
> Everything it produces gets dispatched and cloned into CodeNest™,
> the ecosystem monorepo, where it is indexed, heatmapped, synced,
> and distributed to 400+ frontend applications worldwide.

BuildNest stands alone as the **MONSTER OMNI™ engine** — a self-contained,
chaos-processing, dual-service build platform. It does not depend on CodeNest
to function. CodeNest depends on BuildNest as its primary manufacturing input.

---

## The Fractal Trinity — Where BuildNest Sits

```
┌─────────────────────────────────────────────────────────────┐
│              FRACTAL TRINITY COSMOLOGY                      │
│                                                             │
│  HotStack™          LicenseVault™        BuildNest™         │
│  ─────────────      ──────────────       ──────────────     │
│  First Man          Earth /              Core of Planet /   │
│  on Mars / HIL      Global Catalog       MONSTER OMNI™      │
│                                                             │
│  Zero-Signup        TreatySync™:         Gorilla Comb       │
│  Omnidrop           13,713 brands        Logic +            │
│  Collapse           & contracts          VaultMesh Pulse    │
│  Trigger            managed here         (9-second beat)    │
│                                                             │
│         ↓                ↓                    ↓             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           CodeNest™ — Ecosystem Monorepo             │   │
│  │   Intake Heatmap → Sync → Distribute → 400+ Apps    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## MONSTER OMNI™ System Architecture

BuildNest runs as a **dual-service sovereign stack** — Node/Express handles the
application factory and client assets; Python/FastAPI manages the Scroll identity,
cryptographic signing, and VaultMesh synchronisation heartbeat.

### Dual-Service Stack

| Service | Runtime | Port | Role |
|---------|---------|------|------|
| `buildnest-node` | Node 20 / Express | 5000 | Application factory, client assets, REST API |
| `buildnest-python` | Python 3.11 / FastAPI | 8000 | Scroll signing, VaultMesh pulse, TreatySync |
| `buildnest-db` | PostgreSQL 16 | 5432 | Persistent scroll ledger, brand registry |

### VaultMesh Pulse — 9-Second Heartbeat

```python
async def emit_scroll_pulse():
    """Emit scroll pulse every 9 seconds for VaultMesh synchronisation"""
    while True:
        pulse_data = {
            "timestamp": datetime.utcnow().isoformat(),
            "network_health": vault_mesh.network_health,
            "mars_condition": "PLANETARY_MOTION_AUTHORIZED"
        }
        logger.info(f"🧬 Scroll pulse emitted: {pulse_data}")
        await asyncio.sleep(9)  # 9-second VaultMesh interval
```

### Gorilla Comb Logic — Chaos to Order

BuildNest's core intake protocol accepts **completely disorganised input** —
duplicated files, nested chaos folders, conflicting versions — and applies the
immutable VaultMesh Trace watermark to all artefacts before dispatch:

```
Chaotic Input (any structure)  →  Gorilla Comb Logic  →  Watermarked Output
    /Project/v1/file.ts                                     GC7:FSP...FAA13713
    /Project/copy/file.ts                                   Signed Scroll
    /Backup/Project/file.ts                                 Ready for dispatch
```

---

## Sovereign Infrastructure (Fixed-Cost TCO)

| Model | Annual Cost | Notes |
|-------|-------------|-------|
| PaaS lock-in (Vercel/Render) | ~$18,000 | Serverless, egress fees, proprietary |
| **Sovereign Compute** | **~$1,260** | 4-Node DigitalOcean + Coolify orchestrator |
| **Annual Saving** | **$16,740** | Fixed TCO, zero egress (Cloudflare R2) |

**4-Node Sovereign Hub Cluster:**
- 1× Manager node (Coolify orchestrator)
- 3× Worker nodes (buildnest-node / buildnest-python / Postgres)
- Region: `nyc3` | Size: `s-2vcpu-4gb` | Image: `ubuntu-24-04-x64`

---

## Scroll Data Model

```python
class ScrollMetadata(BaseModel):
    scroll_id: str
    treaty_position: int
    claim_root_license: str
    funding_amount: float = Field(ge=50000)  # Minimum $50K requirement
    scroll_signature: Optional[str] = None
    vault_mesh_sync: bool = False
    planetary_motion_authorized: bool = False
```

Scrolls are signed with RSA 2048-bit keys, anchored via GhostTrace™ 7-chain
cryptographic proof, and emitted to the VaultMesh network every 9 seconds.

---

## Dispatch → CodeNest™

When a BuildNest build cycle completes, all watermarked artefacts are dispatched
to **CodeNest™** (`heyns1000/codenest`) — the ecosystem monorepo that acts as
the intake heatmap, sync engine, and distribution hub for 400+ frontend apps.

```
BuildNest™ (this repo)          CodeNest™ (heyns1000/codenest)
────────────────────            ────────────────────────────────
Manufactures raw material  →→→  Clones BuildNest output
Signs Scrolls                   Indexes into heatmap
Emits VaultMesh pulse           Syncs to Base44 API hub
Gorilla Comb watermarks         Distributes to 400+ apps
```

See the full sync architecture:  
[`docs/architecture/codenest-to-base44-sync.md`](https://github.com/heyns1000/codenest/blob/claude/lucid-rubin-h1k269/docs/architecture/codenest-to-base44-sync.md)

---

## Quick Start (Local Development)

```bash
# Clone standalone
git clone https://github.com/heyns1000/buildnest.git
cd buildnest

# Set environment
cp .env.example .env
# Edit: DB_PASSWORD, SESSION_SECRET, VAULT_MESH_SECRET

# Run dual-service stack
docker compose up --build

# Node API:   http://localhost:5000
# Python API: http://localhost:8000
# Health:     http://localhost:5000/health
```

```bash
# Development (no Docker)
npm install
npm run dev          # Node/Express on :5000
# In separate terminal:
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

---

## Scripts

| Script | Purpose |
|--------|--------|
| `npm run build` | Full production build (Vite + esbuild) |
| `npm run build:all` | Build all deployment targets (hotstack, codenest, fruitful) |
| `npm run deploy:hotstack` | Deploy HotStack™ target |
| `npm run deploy:codenest` | Build + deploy CodeNest™ target |
| `npm run deploy:claimroot` | Deploy ClaimRoot™ governance module |
| `npm run deploy:licensevault` | Deploy LicenseVault™ brand catalog |
| `npm run db:push` | Push Drizzle ORM schema to Postgres |

---

## Repository Status

| Item | Status |
|------|--------|
| Code secured on GitHub | ✅ `heyns1000/buildnest` |
| Cloned into CodeNest™ monorepo | ✅ `heyns1000/codenest` |
| Proprietary licence applied | ✅ v1.1 |
| VaultMesh watermark | ✅ `GC7:FSP2021121654:4400302974:VM9s:BL1501:GHOST7CHAIN:FAA13713` |
| Dual-service Docker stack | ✅ Node + Python + Postgres |
| Sovereign infrastructure plan | ✅ 4-Node DigitalOcean cluster |

---

**GORILLA COMB™ VAULTMESH LEVEL-7**  
FRUITFUL SHOPS (PTY) LTD | Reg: 2021/121654/07 | VAT: 4400302974  
© 2021–2026 All Rights Reserved  
`GC7:FSP2021121654:4400302974:VM9s:BL1501:GHOST7CHAIN:FAA13713`
