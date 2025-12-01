/**
 * ClaimRoot™ Deployment Script
 *
 * Deploys ClaimRoot license generation service to heyns1000/claimroot repository
 */

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const REPO_URL = 'https://github.com/heyns1000/claimroot.git';
const SOURCE_SERVICE = path.join(__dirname, '..', 'server', 'claimroot-service.ts');
const SOURCE_SEED_SCROLL = path.join(__dirname, '..', 'attached_assets', 'claimroot_seed_scroll_1756925266540.md');
const TEMP_DIR = path.join(__dirname, '..', '.tmp', 'claimroot-deploy');

console.log('📜 Starting ClaimRoot™ deployment...\n');

// 1. Check if source files exist
console.log('1️⃣  Checking source files...');

if (!fs.existsSync(SOURCE_SERVICE)) {
  console.error(`❌ Source service not found: ${SOURCE_SERVICE}`);
  process.exit(1);
}

console.log(`✅ Service file found: ${SOURCE_SERVICE}`);

if (fs.existsSync(SOURCE_SEED_SCROLL)) {
  console.log(`✅ Seed scroll found: ${SOURCE_SEED_SCROLL}`);
}

// 2. Create temporary deployment directory
console.log('\n2️⃣  Creating deployment directory...');

if (fs.existsSync(TEMP_DIR)) {
  console.log('   Cleaning existing directory...');
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
}

fs.mkdirSync(TEMP_DIR, { recursive: true });
console.log(`✅ Created: ${TEMP_DIR}`);

// 3. Copy ClaimRoot service
console.log('\n3️⃣  Copying ClaimRoot service...');

const serviceDest = path.join(TEMP_DIR, 'claimroot-service.ts');
fs.copyFileSync(SOURCE_SERVICE, serviceDest);
console.log(`✅ Service copied to ${serviceDest}`);

// 4. Copy seed scroll if exists
if (fs.existsSync(SOURCE_SEED_SCROLL)) {
  const seedScrollDest = path.join(TEMP_DIR, 'SEED_SCROLL.md');
  fs.copyFileSync(SOURCE_SEED_SCROLL, seedScrollDest);
  console.log(`✅ Seed scroll copied to ${seedScrollDest}`);
}

// 5. Create README with deployment info
console.log('\n4️⃣  Creating README...');

const readme = `# ClaimRoot™ License Generation Service

**Integrated with BuildNest** - Phase 2 Integration

## Overview

ClaimRoot™ is the license generation system for the FAA Treaty ecosystem. It provides:

- ✅ ClaimRoot™ license generation with unique IDs
- ✅ Treaty position assignment in Seedwave Treaty Log
- ✅ Scroll hash creation for permanent verification
- ✅ License trail tracking in VaultMesh ledger
- ✅ PDF license metadata generation
- ✅ Treaty binding and compliance verification

## Service File

- **\`claimroot-service.ts\`** - Main license generation service
- **\`SEED_SCROLL.md\`** - FAA Treaty System activation document

## API Endpoints

License generation is exposed through BuildNest API:

\`\`\`
POST /api/licenses/generate - Generate new ClaimRoot™ license
POST /api/licenses/verify - Verify license by scroll hash
GET /api/licenses/claimroot/statistics - Get license statistics
GET /api/licenses/treaty-log/:position - Get treaty log entry
GET /api/licenses/treaty-log - Get paginated treaty log
\`\`\`

## Integration with BuildNest

The ClaimRoot service is integrated into BuildNest's license management system:

1. **HotStack Deployment** → Triggers license generation
2. **License Created** → ClaimRoot™ license with scroll hash
3. **Treaty Log Entry** → Position assigned in Seedwave Treaty Log
4. **VaultMesh Sync** → License recorded in permanent ledger
5. **LicenseVault Storage** → Secure storage with audit trail

## Usage in BuildNest

\`\`\`typescript
import { claimRootService } from './claimroot-service';

// Generate a license
const license = await claimRootService.generateLicense({
  appId: 'app_12345',
  appName: 'My HotStack App',
  userId: 'user_67890',
  domain: 'myapp.faa.zone',
  issuedTo: 'user@example.com',
  sector: 'general',
  treatyType: 'STANDARD'
});

// Returns:
// - licenseId: Unique license identifier
// - scrollHash: Permanent verification hash
// - treatyPosition: Position in Seedwave Treaty Log
// - pdfUrl: URL to license PDF
// - And more...
\`\`\`

## Treaty System

ClaimRoot licenses are governed by the FAA Treaty System:

- **Not for ownership** - No equity or control granted
- **Not for shares** - Non-dilutive infrastructure funding
- **Scroll position** - Timestamped and immutable
- **VaultMesh ledger** - Permanently visible and verifiable

## Deployment Status

**Status**: ✅ Integrated with BuildNest (Phase 2)
**Repository**: heyns1000/claimroot
**Service**: server/claimroot-service.ts
**Mode**: REAL_LICENSE_GENERATION

---

**Integration Date**: ${new Date().toISOString().split('T')[0]}
**Deployed By**: BuildNest Deployment System
**VaultMesh**: Synchronized
`;

fs.writeFileSync(path.join(TEMP_DIR, 'README.md'), readme);
console.log('✅ README created');

// 6. Create package.json for TypeScript dependencies
console.log('\n5️⃣  Creating package.json...');

const packageJson = {
  name: 'claimroot',
  version: '2.0.0',
  description: 'ClaimRoot™ License Generation Service - FAA Treaty System',
  main: 'claimroot-service.ts',
  scripts: {
    build: 'tsc',
    start: 'node dist/claimroot-service.js'
  },
  repository: {
    type: 'git',
    url: REPO_URL
  },
  keywords: [
    'claimroot',
    'license',
    'treaty',
    'faa',
    'scrollstack',
    'vaultmesh'
  ],
  author: 'FAA.zone™ - Fruitful Global',
  license: 'PROPRIETARY'
};

fs.writeFileSync(
  path.join(TEMP_DIR, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);
console.log('✅ package.json created');

// 7. Summary
console.log('\n✅ ClaimRoot™ deployment preparation complete!\n');
console.log('📂 Deployment directory:', TEMP_DIR);
console.log('\n📋 Next steps:');
console.log('   1. cd', TEMP_DIR);
console.log('   2. git init');
console.log('   3. git remote add origin', REPO_URL);
console.log('   4. git add .');
console.log('   5. git commit -m "Add ClaimRoot™ license generation service"');
console.log('   6. git push -u origin main\n');

console.log('📜 ClaimRoot™ is ready for deployment to heyns1000/claimroot');
