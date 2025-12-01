#!/usr/bin/env node

/**
 * Deploy to heyns1000/fruitful repository
 *
 * This script handles the deployment of the Fruitful Global landing page
 * to the dedicated fruitful repository. The HTML is preserved UNCHANGED.
 *
 * IMPORTANT: This script copies the HTML file exactly as-is with NO modifications.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_URL = 'https://github.com/heyns1000/fruitful.git';
const HTML_SOURCE = path.join(__dirname, '..', 'attached_assets', 'index_1756076860974.html');
const TEMP_DIR = path.join(__dirname, '..', '.tmp', 'fruitful-deploy');

console.log('🍎 Fruitful Global Landing Page Deployment');
console.log('==========================================\n');

// Check if HTML source file exists
if (!fs.existsSync(HTML_SOURCE)) {
  console.error('❌ Fruitful HTML source file not found:', HTML_SOURCE);
  process.exit(1);
}

try {
  // Clean up temp directory if it exists
  if (fs.existsSync(TEMP_DIR)) {
    console.log('🧹 Cleaning up previous deployment...');
    execSync(`rm -rf ${TEMP_DIR}`);
  }

  // Create temp directory
  fs.mkdirSync(TEMP_DIR, { recursive: true });

  // Clone or initialize repository
  console.log('📦 Preparing deployment repository...');
  try {
    // Try to clone the repository
    execSync(`git clone ${REPO_URL} ${TEMP_DIR}`, { stdio: 'pipe' });
    console.log('✅ Repository cloned successfully');
  } catch (error) {
    // If clone fails, initialize a new repository
    console.log('⚠️  Repository not found, initializing new repository...');
    execSync(`git init ${TEMP_DIR}`);
    execSync(`git -C ${TEMP_DIR} remote add origin ${REPO_URL}`);
  }

  // Copy HTML file UNCHANGED to deployment directory as index.html
  console.log('📄 Copying Fruitful landing page HTML (UNCHANGED)...');
  fs.copyFileSync(HTML_SOURCE, path.join(TEMP_DIR, 'index.html'));
  console.log('✅ HTML copied without modifications');

  // Create README for the fruitful repository
  const readme = `# Fruitful Global - Corporate Landing Page

## Overview

**Fruitful Global™** is the main corporate landing page for the Fruitful brand within the FAA.zone™ ecosystem.

### Role in FAA Ecosystem

- **URL**: fruitful.faa.zone
- **Role**: Corporate Landing / Brand Hub
- **Protocol**: Fruitful Global Brand Experience
- **Purpose**: Main corporate branding and identity showcase

## Features

- 🍎 **Corporate Branding**: Official Fruitful Global identity and messaging
- 🎨 **Fruitful Innovations**: Showcase of innovation and future-forward thinking
- 🌐 **Multi-Sector Navigation**: Links to all Fruitful sectors and products
- 🔗 **Treaty Links**: Global footer with FAA treaty system links
- 🎭 **Responsive Design**: Dark theme with modern, sleek interface

## HTML Source

This landing page HTML is preserved **UNCHANGED** from the original BuildNest source:
- **Source File**: \`attached_assets/index_1756076860974.html\`
- **Deployment**: Copied as-is with NO modifications
- **Build Process**: Static copy only - no transformation or compilation

## Deployment

This repository is automatically deployed from [buildnest](https://github.com/heyns1000/buildnest) using the Fractal Trinity integration system.

### Deployment Command
\`\`\`bash
npm run build:fruitful
npm run deploy:fruitful
\`\`\`

### Integration Points

- **BuildNest**: Source of HTML file (preserved unchanged)
- **HotStack**: Omnidrop deployment protocol
- **CodeNest**: Project management and monitoring

## Key Sections

The Fruitful landing page includes:

1. **Hero Section**: Fruitful Innovations tagline and vision
2. **Sector Navigation**: Multi-sector links and navigation
3. **Corporate Identity**: Fruitful Global branding elements
4. **Dark Theme**: Modern, sleek dark mode design
5. **Global Footer**: Treaty system links and corporate information

## Preservation Policy

**IMPORTANT**: The HTML file for fruitful.faa.zone is preserved UNCHANGED.

- ✅ No code transformation
- ✅ No minification
- ✅ No modification of styles or scripts
- ✅ Exact copy of original HTML
- ✅ All features and functionality preserved

This ensures the original design, branding, and functionality remain intact.

## Technologies

- HTML5
- Tailwind CSS (via CDN)
- Font Awesome icons
- Inter font family
- Leaflet (OpenStreetMap integration)
- Chart.js

## Brand Colors

- **Primary**: Vibrant Green (#22c55e)
- **Secondary**: Blue (#3b82f6)
- **Background**: Deep charcoal (#0d1117)
- **Fruitful Logo**: White (#ffffff)

## Integration with FAA Ecosystem

Fruitful Global is part of the larger FAA.zone™ MONSTER OMNI™ System:

- **FAA.zone™** 🌱 - Primary global entity
- **Fruitful Global** 🍎 - Innovation division (this site)
- **VaultMesh™** 🔐 - Security protocols
- **Banimal™** 🦍 - Creative platform

## Treaty System

The page includes links to:
- Fruitful™ Treaty System™
- Global footer with treaty information
- FAA ecosystem integration

## License

Part of the FAA.zone™ MONSTER OMNI™ System
© Fruitful Global - ScrollSynced | Vault-Verified

## Contact

For issues with the Fruitful landing page:
- **Source Repository**: https://github.com/heyns1000/buildnest
- **Integration**: Check \`.integration-config.json\`
- **HTML Source**: \`attached_assets/index_1756076860974.html\`
`;

  fs.writeFileSync(path.join(TEMP_DIR, 'README.md'), readme);

  // Create .gitignore
  const gitignore = `node_modules/
.DS_Store
*.log
.env
.env.local
.tmp/
`;
  fs.writeFileSync(path.join(TEMP_DIR, '.gitignore'), gitignore);

  // Git operations
  console.log('📝 Committing changes...');
  execSync(`git -C ${TEMP_DIR} add .`);

  try {
    execSync(`git -C ${TEMP_DIR} commit -m "Deploy Fruitful Global landing page (HTML unchanged) - $(date)"`, { stdio: 'pipe' });
    console.log('✅ Changes committed');
  } catch (error) {
    console.log('ℹ️  No changes to commit');
  }

  // Push to repository
  console.log('🚢 Pushing to repository...');
  console.log('⚠️  Note: You may need to configure git credentials or use SSH');
  console.log('ℹ️  Run manually: cd .tmp/fruitful-deploy && git push -u origin main');

  // Uncomment the following line when ready to push automatically
  // execSync(`git -C ${TEMP_DIR} push -u origin main`);

  console.log('\n✅ Fruitful Global landing page deployment prepared successfully!');
  console.log(`📁 Deployment files are in: ${TEMP_DIR}`);
  console.log(`🌐 Target repository: ${REPO_URL}`);
  console.log(`🍎 Landing page: fruitful.faa.zone`);
  console.log('\n✨ Key Feature: HTML preserved UNCHANGED from original source');
  console.log('\n🔧 Next steps:');
  console.log('   1. Review the files in the deployment directory');
  console.log('   2. Push to repository: cd .tmp/fruitful-deploy && git push -u origin main');
  console.log('   3. Configure your hosting platform (Vercel, Netlify, etc.)');
  console.log('   4. Point fruitful.faa.zone to the deployment');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
