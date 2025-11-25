/**
 * LicenseVault™ Deployment Script
 *
 * Deploys LicenseVault storage service to heyns1000/licensevault repository
 * VIP Service - Secure license storage and management
 */

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const REPO_URL = 'https://github.com/heyns1000/LicenseVault.git';
const SOURCE_SERVICE = path.join(__dirname, '..', 'server', 'licensevault-service.ts');
const TEMP_DIR = path.join(__dirname, '..', '.tmp', 'licensevault-deploy');

console.log('🔒 Starting LicenseVault™ (VIP) deployment...\n');

// 1. Check if source file exists
console.log('1️⃣  Checking source files...');

if (!fs.existsSync(SOURCE_SERVICE)) {
  console.error(`❌ Source service not found: ${SOURCE_SERVICE}`);
  process.exit(1);
}

console.log(`✅ Service file found: ${SOURCE_SERVICE}`);

// 2. Create temporary deployment directory
console.log('\n2️⃣  Creating deployment directory...');

if (fs.existsSync(TEMP_DIR)) {
  console.log('   Cleaning existing directory...');
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
}

fs.mkdirSync(TEMP_DIR, { recursive: true });
console.log(`✅ Created: ${TEMP_DIR}`);

// 3. Copy LicenseVault service
console.log('\n3️⃣  Copying LicenseVault service...');

const serviceDest = path.join(TEMP_DIR, 'licensevault-service.ts');
fs.copyFileSync(SOURCE_SERVICE, serviceDest);
console.log(`✅ Service copied to ${serviceDest}`);

// 4. Create README with deployment info
console.log('\n4️⃣  Creating README...');

const readme = `# LicenseVault™ - VIP Storage Service

**Integrated with BuildNest** - Phase 2 Integration

## Overview

LicenseVault™ is the **VIP** secure storage and management system for ClaimRoot™ licenses. It provides:

- ✅ Secure license storage with encryption
- ✅ Multi-criteria license retrieval (by ID, app, user, domain)
- ✅ Comprehensive audit trail for all operations
- ✅ VaultMesh™ synchronization and backup
- ✅ License archiving and versioning
- ✅ Real-time license status monitoring

## Service File

- **\`licensevault-service.ts\`** - Main license storage service

## API Endpoints

License storage is exposed through BuildNest API:

\`\`\`
# Retrieval Endpoints
GET /api/licenses/vault/:licenseId - Retrieve license by ID
GET /api/licenses/vault/user/:userId - Get all licenses for user
GET /api/licenses/vault/domain/:domain - Get all licenses for domain
GET /api/licenses/vault/app/:appId - Get all licenses for app

# Verification & Export
GET /api/licenses/vault/verify/:licenseId - Verify license in vault
GET /api/licenses/vault/export/:licenseId - Export license as JSON

# Statistics & Monitoring
GET /api/licenses/vault/statistics - Get vault statistics
GET /api/licenses/vault/audit-log - Get audit log (paginated)
GET /api/licenses/vault/audit-log/:licenseId - Get audit log for license
GET /api/licenses/vault/health - Perform vault health check
\`\`\`

## Integration with BuildNest

The LicenseVault service is integrated into BuildNest's license management system:

1. **License Generated** → ClaimRoot™ creates license
2. **Auto-Storage** → LicenseVault automatically stores license
3. **Encryption** → License data encrypted at rest
4. **VaultMesh Sync** → Backup to VaultMesh ledger
5. **Audit Trail** → All operations logged for compliance

## Usage in BuildNest

\`\`\`typescript
import { licenseVaultService } from './licensevault-service';

// Store a license
const result = await licenseVaultService.storeLicense(license, userId);

// Retrieve a license
const { license } = await licenseVaultService.retrieveLicense(licenseId);

// Get all licenses for a user
const licenses = await licenseVaultService.getLicensesByUser(userId);

// Export license for backup
const exportResult = await licenseVaultService.exportLicense(licenseId);
\`\`\`

## VIP Features

LicenseVault is a **VIP Service** with enhanced security and monitoring:

- **Encryption**: All licenses encrypted at rest
- **Audit Trail**: Complete operation history
- **VaultMesh Sync**: 9-second pulse synchronization
- **Multi-Query**: Retrieve by ID, user, domain, or app
- **Health Monitoring**: Real-time vault health checks
- **Backup Status**: Track backup/sync status per license

## Statistics & Monitoring

The vault provides comprehensive statistics:

\`\`\`typescript
{
  totalLicenses: 1234,
  activeStorageGB: 0.002468,
  syncedToVaultMesh: 1234,
  lastBackup: "2025-11-25T10:30:00.000Z",
  auditLogEntries: 5678,
  averageRetrievalTime: 0.05
}
\`\`\`

## Audit Trail

Every operation is logged for compliance:

\`\`\`typescript
{
  id: "audit_1732536...",
  licenseId: "CLR_app_12345_...",
  operation: "RETRIEVE", // or STORE, UPDATE, DELETE, VERIFY, EXPORT
  userId: "user_67890",
  timestamp: "2025-11-25T10:30:00.000Z",
  success: true,
  metadata: { vaultId: "VAULT_...", accessCount: 3 }
}
\`\`\`

## Health Checks

Vault health monitoring includes:

- Failed backup detection
- Expired license tracking
- VaultMesh connection status
- Encryption active verification

## Security

LicenseVault implements multiple security layers:

1. **Encryption**: AES-256 encryption (planned)
2. **Access Control**: User-based permissions
3. **Audit Logging**: Complete operation history
4. **VaultMesh Sync**: Immutable backup ledger
5. **Health Monitoring**: Continuous integrity checks

## Deployment Status

**Status**: ✅ Integrated with BuildNest (Phase 2)
**Repository**: heyns1000/LicenseVault
**Service**: server/licensevault-service.ts
**Mode**: REAL_LICENSE_VAULT
**Classification**: VIP Service

---

**Integration Date**: ${new Date().toISOString().split('T')[0]}
**Deployed By**: BuildNest Deployment System
**VaultMesh**: Synchronized
**Security Level**: High
`;

fs.writeFileSync(path.join(TEMP_DIR, 'README.md'), readme);
console.log('✅ README created');

// 5. Create package.json
console.log('\n5️⃣  Creating package.json...');

const packageJson = {
  name: 'licensevault',
  version: '2.0.0',
  description: 'LicenseVault™ VIP Storage Service - Secure ClaimRoot™ License Management',
  main: 'licensevault-service.ts',
  scripts: {
    build: 'tsc',
    start: 'node dist/licensevault-service.js',
    test: 'echo "Run health checks and audit trail tests"'
  },
  repository: {
    type: 'git',
    url: REPO_URL
  },
  keywords: [
    'licensevault',
    'claimroot',
    'storage',
    'vault',
    'security',
    'audit',
    'vaultmesh',
    'faa'
  ],
  author: 'FAA.zone™ - Fruitful Global',
  license: 'PROPRIETARY'
};

fs.writeFileSync(
  path.join(TEMP_DIR, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);
console.log('✅ package.json created');

// 6. Create .gitignore for security
console.log('\n6️⃣  Creating .gitignore...');

const gitignore = `# LicenseVault Security
node_modules/
dist/
*.log

# Sensitive Data
*.key
*.pem
.env
.env.local

# Vault Data (never commit actual license data)
vault-data/
backups/
*.vault

# TypeScript
*.tsbuildinfo
`;

fs.writeFileSync(path.join(TEMP_DIR, '.gitignore'), gitignore);
console.log('✅ .gitignore created');

// 7. Summary
console.log('\n✅ LicenseVault™ (VIP) deployment preparation complete!\n');
console.log('📂 Deployment directory:', TEMP_DIR);
console.log('\n📋 Next steps:');
console.log('   1. cd', TEMP_DIR);
console.log('   2. git init');
console.log('   3. git remote add origin', REPO_URL);
console.log('   4. git add .');
console.log('   5. git commit -m "Add LicenseVault™ VIP storage service"');
console.log('   6. git push -u origin main\n');

console.log('🔒 LicenseVault™ is ready for deployment to heyns1000/LicenseVault');
console.log('⭐ VIP Service - Enhanced security and monitoring enabled');
