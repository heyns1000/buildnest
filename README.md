<img src=".github/assets/fruitful-banner.png" width="100%" alt="Fruitful™" />

# BuildNest™

**By FRUITFUL SHOPS (PTY) LTD**

---

We built BuildNest because the world’s best ideas were dying in folders.

A developer in Pretoria with 67 apps, 13 713 brand concepts, and a Google Drive full of chaos had no tool that could hold all of it — process it, sign it, and ship it without burning $18 000 a year on serverless fees. So we built the engine ourselves.

BuildNest is that engine. It is not a platform. It is not a service. It is a **sovereign compute manufacturer** — a dual-service build machine that takes raw, disorganised creative input and outputs cryptographically signed, watermarked artefacts ready for global distribution. We call this the **MONSTER OMNI™ system**.

---

## What We Do

BuildNest accepts chaos and returns order.

A folder of duplicated files, conflicting versions, nested directories with no structure — all of it goes in. **Gorilla Comb Logic™** processes it. Every output file carries the immutable **VaultMesh GhostTrace™ watermark** (`GC7:FSP2021121654:4400302974:VM9s:BL1501:GHOST7CHAIN:FAA13713`). Every 9 seconds, the **VaultMesh Pulse™** beats. The Scroll is signed. The artefact is dispatched.

From here it goes to **CodeNest™** — our ecosystem monorepo — where it is indexed, heatmapped, and distributed to over 400 frontend applications: Replit, Shopify, WordPress, Lovable, Wix, Hercules, and more.

---

## The Stack

BuildNest runs as two services side by side, always:

| Service | What It Does |
|---------|-------------|
| **Node / Express** | Application factory, client assets, REST API |
| **Python / FastAPI** | Scroll identity, cryptographic signing, VaultMesh pulse |
| **PostgreSQL 16** | Persistent scroll ledger and brand registry |

All three live on a **4-node DigitalOcean sovereign cluster** orchestrated by Coolify. No Vercel. No Render. No egress fees. Fixed cost: **~$1 260 per year**. That is a saving of **$16 740 annually** against the PaaS alternative.

---

## The Scroll

Every build produces a **Scroll** — a signed build artefact with a cryptographic identity:

```python
class ScrollMetadata(BaseModel):
    scroll_id: str
    treaty_position: int
    claim_root_license: str
    funding_amount: float       # minimum $50 000
    scroll_signature: str       # RSA 2048-bit
    vault_mesh_sync: bool       # confirmed on 9-second pulse
    planetary_motion_authorized: bool
```

Scrolls are anchored via **GhostTrace™ 7-chain cryptographic proof**. Tamper with any file, and the chain breaks. The Pulse catches it within 9 seconds.

---

## Where BuildNest Lives

BuildNest is a **standalone engine**. It runs without any other system. But it is also the manufacturing core inside **CodeNest™** (`heyns1000/codenest`) — the FAA™ ecosystem monorepo.

```
BuildNest™ (standalone)      →  dispatch  →  CodeNest™ (monorepo hub)
Manufactures raw material                    Intake · Heatmap · Sync · Distribute
                                                        ↓
                                             fruitfulapp.base44.app
                                                        ↓
                                              400+ apps worldwide
```

---

## Get Started

```bash
git clone https://github.com/heyns1000/buildnest.git
cd buildnest
cp .env.example .env          # set DB_PASSWORD, SESSION_SECRET, VAULT_MESH_SECRET
docker compose up --build
```

Node API at `http://localhost:5000` · Python API at `http://localhost:8000`

For local development without Docker:

```bash
npm install && npm run dev
# in a second terminal:
pip install -r requirements.txt && uvicorn main:app --reload --port 8000
```

---

## Banimal Loop™

Every payment transaction processed through the BuildNest ecosystem carries the **Banimal Loop™ 15.01% wildlife care allocation**. This is not optional. It is enforced at the API level. Removing or reducing it constitutes breach of the governing licence.

---

## Licence

[Fruitful Shops Proprietary License v1.1](./LICENSE) — All rights reserved.  
FRUITFUL SHOPS (PTY) LTD | Reg: 2021/121654/07 | VAT: 4400302974  
Gauteng High Court, Pretoria | legal@fruitful.faa.zone

`GC7:FSP2021121654:4400302974:VM9s:BL1501:GHOST7CHAIN:FAA13713`
