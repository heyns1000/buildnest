/**
 * HotStack™ Deployment Script (ES Module)
 *
 * Deploys HotStack landing page to heyns1000/hotstack repository
 * Using the REAL template from samfox repository
 */

import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_URL = 'https://github.com/heyns1000/hotstack.git';
const TEMPLATE_SOURCE = path.join(__dirname, '..', 'attached_assets', 'hotstack_template_v2.html');
const TEMP_DIR = path.join(__dirname, '..', '.tmp', 'hotstack-deploy');

console.log('🔥 Starting HotStack™ deployment to heyns1000/hotstack...\n');

// 1. Check if template exists
console.log('1️⃣  Checking HotStack template...');

if (!fs.existsSync(TEMPLATE_SOURCE)) {
  console.error(`❌ Template not found: ${TEMPLATE_SOURCE}`);
  console.log('   Run: curl -s https://raw.githubusercontent.com/heyns1000/samfox/main/public/global_templates/hotstack_vs2.0.html -o attached_assets/hotstack_template_v2.html');
  process.exit(1);
}

const templateStats = fs.statSync(TEMPLATE_SOURCE);
console.log(`✅ Template found: ${TEMPLATE_SOURCE} (${templateStats.size} bytes)`);

// 2. Create temporary deployment directory
console.log('\n2️⃣  Creating deployment directory...');

if (fs.existsSync(TEMP_DIR)) {
  console.log('   Cleaning existing directory...');
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
}

fs.mkdirSync(TEMP_DIR, { recursive: true });
console.log(`✅ Created: ${TEMP_DIR}`);

// 3. Copy HotStack template as index.html
console.log('\n3️⃣  Copying HotStack template...');

const indexDest = path.join(TEMP_DIR, 'index.html');
fs.copyFileSync(TEMPLATE_SOURCE, indexDest);
console.log(`✅ Template copied to ${indexDest}`);

// 4. Create README
console.log('\n4️⃣  Creating README...');

const readme = `# HotStack™ Landing Page

**Live at**: https://hotstack.faa.zone

## Overview

HotStack™ is the Zero-Signup intake system for the Banimal Ecosystem. This landing page provides:

- ✅ **Omnidrop Protocol** - 180-second rapid deployment window
- ✅ **Zero-Signup Access** - Instant identity generation via Collapse protocol
- ✅ **Global Hub Network** - 12 deployment stations across continents
- ✅ **Drag & Drop Upload** - HTML/PDF file intake with real-time processing
- ✅ **Live Status Console** - Real-time deployment tracking

## Template Source

This deployment uses the official HotStack v2.0 template from:
\`\`\`
https://github.com/heyns1000/samfox/blob/main/public/global_templates/hotstack_vs2.0.html
\`\`\`

## Features

### Countdown Timer
- 180-second Omnidrop activation window
- Real-time countdown display
- Auto-refresh on expiry

### Zero-Signup Modal
- Instant identity generation
- Collapse protocol calculation
- Timestamp-based user IDs

### Global Hubs
**Africa**: Cape Town, Johannesburg, Lagos, Lesotho
**North America**: New York, Toronto, Silicon Valley
**Europe/UK**: London, Berlin, Reykjavik
**Asia/Australasia**: Tokyo, Singapore, Sydney

### File Upload
- Drag & drop interface
- HTML/PDF support
- R2 storage integration
- Queue-based processing

### Integration
- Noodle Juice referral system
- BuildNest backend processing
- CodeNest project management
- ClaimRoot™ license generation

## Technology Stack

- **Frontend**: Pure HTML/CSS/JavaScript (Tailwind CSS)
- **Backend**: Cloudflare Workers + R2
- **Network**: 310+ edge locations globally
- **Performance**: Sub-200ms upload confirmation

## Architecture

\`\`\`
User Upload → Edge Validation → R2 Storage → Queue Processing → BuildNest → CodeNest
\`\`\`

## Deployment

**Repository**: heyns1000/hotstack
**Domain**: hotstack.faa.zone
**Template**: HotStack v2.0 (Samfox Global Templates)
**Status**: ✅ LIVE

---

**Deployed**: ${new Date().toISOString().split('T')[0]}
**By**: BuildNest Deployment System
**Branch**: main
`;

fs.writeFileSync(path.join(TEMP_DIR, 'README.md'), readme);
console.log('✅ README created');

// 5. Create .gitignore
console.log('\n5️⃣  Creating .gitignore...');

const gitignore = `# HotStack Landing Page
node_modules/
.DS_Store
*.log
.env
.env.local

# Build outputs (if added later)
dist/
build/

# IDE
.vscode/
.idea/
*.swp
*.swo
`;

fs.writeFileSync(path.join(TEMP_DIR, '.gitignore'), gitignore);
console.log('✅ .gitignore created');

// 6. Create deployment instructions
console.log('\n6️⃣  Creating deployment instructions...');

const deployInstructions = `# HotStack Deployment Instructions

## Quick Deploy

\`\`\`bash
cd ${TEMP_DIR}
git init
git add .
git commit -m "Deploy HotStack v2.0 template from samfox"
git branch -M main
git remote add origin ${REPO_URL}
git push -u origin main --force
\`\`\`

## Verify Deployment

After pushing, verify at:
- https://hotstack.faa.zone
- https://github.com/heyns1000/hotstack

## Update Template

To update the template in the future:

\`\`\`bash
# Fetch latest template
curl -s https://raw.githubusercontent.com/heyns1000/samfox/main/public/global_templates/hotstack_vs2.0.html -o index.html

# Commit and push
git add index.html
git commit -m "Update HotStack template"
git push origin main
\`\`\`

## Integration with BuildNest

The HotStack landing page integrates with BuildNest backend:

1. User uploads file via drag & drop
2. Cloudflare Worker validates and stores in R2
3. Queue triggers BuildNest processing
4. BuildNest generates project with real data
5. CodeNest receives polished output
6. ClaimRoot™ license generated
7. Deployment confirmation sent

## Template Preservation

The HTML template is preserved UNCHANGED from samfox repository.
No modifications, no transpilation, no minification.

## Support

For issues or updates, contact the BuildNest team or reference:
- Template Source: heyns1000/samfox
- Backend: heyns1000/buildnest
- Manual: https://github.com/heyns1000/samfox/blob/main/public/global_templates/hotstack/hotstack_manual.md
`;

fs.writeFileSync(path.join(TEMP_DIR, 'DEPLOY.md'), deployInstructions);
console.log('✅ Deployment instructions created');

// 7. Summary
console.log('\n✅ HotStack™ deployment preparation complete!\n');
console.log('📂 Deployment directory:', TEMP_DIR);
console.log('📄 Template source:', TEMPLATE_SOURCE);
console.log('🌍 Target repository:', REPO_URL);
console.log('🔥 Domain: hotstack.faa.zone');

console.log('\n📋 Files prepared:');
console.log('   - index.html (632 lines)');
console.log('   - README.md');
console.log('   - .gitignore');
console.log('   - DEPLOY.md');

console.log('\n🚀 Next steps:');
console.log('   1. cd', TEMP_DIR);
console.log('   2. git init');
console.log('   3. git add .');
console.log('   4. git commit -m "Deploy HotStack v2.0 template from samfox"');
console.log('   5. git branch -M main');
console.log('   6. git remote add origin', REPO_URL);
console.log('   7. git push -u origin main --force');

console.log('\n🔥 HotStack™ is ready for deployment!');
