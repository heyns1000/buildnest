# BuildNest Integration Guide

## Fractal Trinity Architecture Integration

This document describes the integration architecture for the FAA.zone™ MONSTER OMNI™ System, connecting BuildNest with HotStack and CodeNest repositories.

## Architecture Overview

The system follows the **Fractal Trinity Cosmology**, where three core components work in harmony:

```
┌─────────────────────────────────────────────────────────────┐
│                  FRACTAL TRINITY SYSTEM                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────┐        ┌────────────┐       ┌────────────┐ │
│  │  HotStack  │◄──────►│ BuildNest  │◄─────►│ CodeNest   │ │
│  │    (HIL)   │        │   (Core)   │       │ (Gateway)  │ │
│  └────────────┘        └────────────┘       └────────────┘ │
│       │                      │                     │        │
│       │                      │                     │        │
│       ▼                      ▼                     ▼        │
│  Omnidrop UI          VaultMesh Pulse        API Gateway    │
│  180s Window          9s Sync               Project Mgmt    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Component Roles

#### 1. HotStack (First Man on Mars / HIL)
- **Repository**: `heyns1000/hotstack`
- **Protocol**: Zero-Signup, Omnidrop, Collapse
- **Purpose**: User interface, intake, and autonomous trigger generation
- **Features**:
  - 180-second Omnidrop window
  - Drag & drop HTML/PDF upload
  - DNS hook activation
  - MeshNest™ integration
  - ClaimRoot™ verification

#### 2. BuildNest (Core of Planet / MONSTER OMNI™)
- **Repository**: `heyns1000/buildnest`
- **Protocol**: Gorilla Comb Logic, VaultMesh Pulse (9s)
- **Purpose**: Chaos processing, Scroll signing, and synchronization heartbeat
- **Features**:
  - Dual-service architecture (Node.js + Python)
  - VaultMesh pulse emission (9-second intervals)
  - Scroll signing and validation
  - Treaty synchronization
  - Master operational console

#### 3. CodeNest (Development Dashboard)
- **Repository**: `heyns1000/codenest`
- **Protocol**: Project Management & API Gateway
- **Purpose**: Project management, API keys, templates, and deployment interface
- **Features**:
  - Project creation and management
  - API key generation
  - Template library
  - Built-in code editor
  - Multi-company support (FAA, Fruitful, VaultMesh, Banimal)

#### 4. Fruitful (Corporate Landing / Brand Hub)
- **Repository**: `heyns1000/fruitful`
- **Protocol**: Fruitful Global Brand Experience
- **Purpose**: Main corporate landing page for Fruitful Global brand
- **Landing Page**: fruitful.faa.zone
- **HTML Source**: `attached_assets/index_1756076860974.html`
- **Preservation Policy**: HTML preserved UNCHANGED - no modifications
- **Features**:
  - Corporate branding and identity
  - Fruitful Innovations showcase
  - Multi-sector navigation
  - Global footer with treaty links
  - Responsive design with dark theme

**IMPORTANT**: The Fruitful landing page HTML is copied exactly as-is with NO transformations, modifications, minification, or processing. This ensures the original design, branding, and functionality remain intact.

## Integration Configuration

The integration is controlled by `.integration-config.json` in the BuildNest root directory. This file defines:

- Repository URLs and roles
- Build targets and output directories
- Protocol configurations
- API endpoints
- Health check URLs

## Deployment Workflow

### HotStack Deployment

```bash
# Build HotStack components
npm run build:hotstack

# Deploy to heyns1000/hotstack repository
npm run deploy:hotstack
```

The deployment script:
1. Builds the HotStack component with Vite
2. Copies the global template from `attached_assets/hotstack_1756076943625.html`
3. Creates a deployment directory in `.tmp/hotstack-deploy`
4. Initializes/clones the target repository
5. Commits and prepares for push to `heyns1000/hotstack`

### CodeNest Deployment

```bash
# Build CodeNest components
npm run build:codenest

# Deploy to heyns1000/codenest repository
npm run deploy:codenest
```

The deployment script:
1. Builds the CodeNest dashboard with Vite
2. Creates a deployment directory in `.tmp/codenest-deploy`
3. Initializes/clones the target repository
4. Commits and prepares for push to `heyns1000/codenest`

### Fruitful Deployment

```bash
# Build Fruitful landing page (copy HTML unchanged)
npm run build:fruitful

# Deploy to heyns1000/fruitful repository
npm run deploy:fruitful
```

The deployment script:
1. Copies the HTML file UNCHANGED from `attached_assets/index_1756076860974.html`
2. Creates a deployment directory in `.tmp/fruitful-deploy`
3. Initializes/clones the target repository
4. Commits and prepares for push to `heyns1000/fruitful`
5. **NO code transformation** - preserves original HTML exactly

### Full System Build

```bash
# Build all components (BuildNest, HotStack, CodeNest, Fruitful)
npm run build:all
```

## Protocol Synchronization

### VaultMesh Pulse (9-second intervals)

The BuildNest Python backend (`main.py`) emits a synchronization pulse every 9 seconds:

```python
async def emit_scroll_pulse():
    while True:
        pulse_data = {
            "timestamp": datetime.utcnow().isoformat(),
            "network_health": vault_mesh.network_health,
            "mars_condition": "PLANETARY_MOTION_AUTHORIZED"
        }
        await asyncio.sleep(9)  # 9-second interval
```

This pulse synchronizes:
- HotStack deployment status
- CodeNest project states
- VaultMesh network health
- ClaimRoot™ verifications

### Omnidrop Protocol (180-second window)

HotStack enforces a 3-minute rapid intake window:

```typescript
const [timeLeft, setTimeLeft] = useState(180); // 180 seconds

// When time expires, disable new omnidrop intakes
if (timeLeft <= 0) {
  alert('⏰ The instant Omnidrop window has closed');
  setIsActive(false);
}
```

## API Integration Points

### Scroll Operations
- `POST /api/scroll-validate` - Validate scroll integrity
- `GET /api/scroll-status` - Get current scroll status
- `GET /api/scroll-pulse` - VaultMesh pulse data

### Deployment Operations
- `POST /api/faa/intake/create` - Create new seedwave app
- `POST /api/seedling/intake` - VOORWAARD MARS intake ($50K funding gate)
- `POST /api/seedling-generate` - Generate seedling applications

### Protocol Operations
- `POST /api/register-app` - FruitfulPlanetChange intake
- `POST /api/validate-build` - LaundroAI validation
- `POST /api/wash-metadata` - OmniGrid metadata washing

## Cross-Repository Communication

### BuildNest → HotStack
1. User visits HotStack landing page
2. File upload triggers Omnidrop protocol
3. HotStack sends intake request to BuildNest API
4. BuildNest processes and signs the scroll
5. VaultMesh pulse confirms deployment
6. HotStack displays ClaimRoot™ verification

### BuildNest → CodeNest
1. User manages projects in CodeNest dashboard
2. Project creation sends request to BuildNest API
3. BuildNest generates API keys and ClaimRoot™ license
4. CodeNest receives deployment metrics via VaultMesh pulse
5. Real-time status updates through WebSocket connection

### CodeNest → HotStack
1. CodeNest provides template library
2. Templates are distributed to HotStack for Omnidrop
3. Deployment status syncs between both interfaces
4. Shared ClaimRoot™ verification across both dashboards

## Environment Configuration

### BuildNest (Core)
```env
DATABASE_URL=postgresql://buildnest:***@localhost:5432/buildnest
NODE_ENV=production
SESSION_SECRET=***
VAULT_MESH_SECRET=***
```

### HotStack (Frontend)
```env
VITE_API_URL=https://api.buildnest.faa.zone
VITE_HOTSTACK_DOMAIN=hotstack.faa.zone
```

### CodeNest (Dashboard)
```env
VITE_API_URL=https://api.buildnest.faa.zone
VITE_CODENEST_DOMAIN=codenest.faa.zone
```

## Global Template Conformity

HotStack follows the global template standard defined at:
```
https://samfox.faa.zone/global_templates/hotstack_vs2.0.html
```

The template ensures:
- Consistent branding across all deployments
- Fruitful Global color palette (Apple Blue, Apple Green, HotStack Yellow)
- Omnidrop canvas animation with gold particles
- 3-minute countdown timer
- Drag & drop file upload interface
- Modal notifications for deployment status

## Brand Ecosystem

The system manages **7,038+ brands** across **29 sectors**:

| Company | Logo | Description |
|---------|------|-------------|
| FAA.zone™ | 🌱 | Primary global entity |
| Fruitful Global | 🍎 | Innovation division |
| VaultMesh™ | 🔐 | Security protocols |
| Banimal™ | 🦍 | Creative platform |

## Infrastructure

### Sovereign Compute Model
- **Platform**: DigitalOcean
- **Orchestrator**: Coolify
- **Nodes**: 4 x s-2vcpu-4gb (NYC3 region)
- **Cost**: $60/month fixed
- **Annual Savings**: $16,740 vs PaaS lock-in

### Service Architecture
```
┌─────────────────────────────────────────┐
│          Load Balancer / Nginx          │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
┌───────────────┐   ┌───────────────┐
│   Node.js     │   │   Python      │
│   (Port 5000) │◄─►│  (Port 8000)  │
│   Express     │   │   FastAPI     │
└───────┬───────┘   └───────┬───────┘
        │                   │
        └─────────┬─────────┘
                  ▼
        ┌──────────────────┐
        │   PostgreSQL 16  │
        │   (Port 5432)    │
        └──────────────────┘
```

## Health Checks

### Node.js Service
```bash
curl http://localhost:5000/api/health-check
```

### Python Service
```bash
curl http://localhost:8000/health
```

### Database
```bash
pg_isready -U buildnest -d buildnest
```

## Gorilla Comb Logic

The **Gorilla Comb Logic** is BuildNest's internal protocol for handling chaotic inputs:

1. **Intake**: Accept disorganized file structures from multiple sources
2. **Trace**: Apply immutable VaultMesh Trace to all files
3. **Validate**: Ensure integrity before deployment
4. **Sign**: Cryptographic scroll signing with RSA 2048-bit
5. **Sync**: VaultMesh pulse propagation across all nodes

Example chaos input handling:
```
Input: Nested, duplicated HealthTrack files across 5 different directories
Process: Extract, deduplicate, validate, sign, deploy
Output: Single canonical deployment with ClaimRoot™ verification
```

## Treaty Synchronization

### TreatySync™ Protocol
- **Nodes**: 247 active treaty nodes
- **Licenses**: 1,834+ ClaimRoot™ licenses
- **Brands**: 7,038 managed brands
- **Sync Frequency**: 9-second VaultMesh pulse

Treaty operations:
```bash
POST /api/treaty-sync/intake
GET /api/treaty-execute
POST /api/claimroot-generate
```

## Deployment Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Database migrations completed (`npm run db:push`)
- [ ] All dependencies installed (`npm install`)
- [ ] TypeScript compilation successful (`npm run check`)

### HotStack Deployment
- [ ] Build HotStack components (`npm run build:hotstack`)
- [ ] Review deployment files in `.tmp/hotstack-deploy`
- [ ] Push to `heyns1000/hotstack` repository
- [ ] Configure hosting platform (Vercel/Netlify)
- [ ] Verify domain DNS: `hotstack.faa.zone`
- [ ] Test Omnidrop protocol (180-second window)
- [ ] Verify ClaimRoot™ generation

### CodeNest Deployment
- [ ] Build CodeNest components (`npm run build:codenest`)
- [ ] Review deployment files in `.tmp/codenest-deploy`
- [ ] Push to `heyns1000/codenest` repository
- [ ] Configure hosting platform
- [ ] Verify domain DNS: `codenest.faa.zone`
- [ ] Test project creation
- [ ] Verify API key generation
- [ ] Test template library access

### BuildNest Core
- [ ] Build production bundle (`npm run build`)
- [ ] Deploy to sovereign infrastructure (DigitalOcean)
- [ ] Configure Coolify orchestration
- [ ] Verify VaultMesh pulse emission (9s intervals)
- [ ] Test all API endpoints
- [ ] Verify database connectivity
- [ ] Monitor scroll signing operations

## Monitoring

### VaultMesh Status
```bash
GET /api/vaultmesh-status
```

Response:
```json
{
  "nodes_active": 89,
  "scrolls_active": 247,
  "network_health": "optimal",
  "last_pulse": "2025-11-25T12:34:56.789Z",
  "pulse_interval": 9
}
```

### System Health
```bash
GET /api/health-check
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-25T12:34:56.789Z",
  "services": {
    "node": "operational",
    "python": "operational",
    "database": "operational"
  }
}
```

## Troubleshooting

### Issue: Omnidrop window expired
**Solution**: Refresh HotStack page to restart 180-second timer

### Issue: VaultMesh pulse not emitting
**Solution**: Check Python backend logs, verify asyncio event loop

### Issue: Cross-repository deployment fails
**Solution**: Verify git credentials, ensure repositories exist on GitHub

### Issue: API endpoints not responding
**Solution**: Check service health, verify environment variables, restart services

### Issue: Database connection failed
**Solution**: Verify `DATABASE_URL`, check PostgreSQL service status

## Support

For issues and feature requests:
- Repository: https://github.com/heyns1000/buildnest
- Integration issues: Check `.integration-config.json`
- Protocol questions: Review `README.md` (LaTeX documentation)

## License

Part of the FAA.zone™ MONSTER OMNI™ System
© Fruitful Global - ScrollSynced | Vault-Verified

---

**Last Updated**: 2025-11-25
**Version**: 2.0.0
**Architecture**: Fractal Trinity Cosmology
