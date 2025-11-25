#!/usr/bin/env node

/**
 * Deploy to heyns1000/hotstack repository
 *
 * This script handles the deployment of the HotStack components
 * to the dedicated hotstack repository following the Fractal Trinity architecture.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_URL = 'https://github.com/heyns1000/hotstack.git';
const BUILD_DIR = path.join(__dirname, '..', 'dist', 'hotstack');
const TEMP_DIR = path.join(__dirname, '..', '.tmp', 'hotstack-deploy');

console.log('🚀 HotStack Deployment Script');
console.log('================================\n');

// Check if build directory exists
if (!fs.existsSync(BUILD_DIR)) {
  console.error('❌ Build directory not found. Run "npm run build:hotstack" first.');
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

  // Copy build files to temp directory
  console.log('📋 Copying build files...');
  execSync(`cp -r ${BUILD_DIR}/* ${TEMP_DIR}/`);

  // Copy HotStack template as index.html
  const templatePath = path.join(__dirname, '..', 'attached_assets', 'hotstack_1756076943625.html');
  if (fs.existsSync(templatePath)) {
    console.log('📄 Copying HotStack template...');
    fs.copyFileSync(templatePath, path.join(TEMP_DIR, 'index.html'));
  }

  // Create README for the hotstack repository
  const readme = `# HotStack - Omnidrop Deployment System

## Overview

**HotStack™** is the "First Man on Mars" component of the FAA.zone™ MONSTER OMNI™ System.

### Role in Fractal Trinity Architecture

- **Role**: First Man on Mars / HIL (Human Interface Layer)
- **Protocol**: Zero-Signup, Omnidrop, Collapse
- **Purpose**: User interface, intake, and autonomous trigger generation

## Features

- 🚀 **Rapid Deployment**: Sites go live in under 180 seconds via Omnidrop Signal
- 📦 **Integrated Ecosystem**: Auto DNS Hook + Curated Template Packs
- 🧠 **Intelligent Foundation**: Powered by ScrollStack™, VaultDNS™, and MeshNest™
- 💰 **Treaty-Linked Economy**: Royalty-Linked License from Fruitful Global's Treaty Grid
- 🔒 **ClaimRoot™ Verified**: Secure, traceable site ownership

## Deployment

This repository is automatically deployed from [buildnest](https://github.com/heyns1000/buildnest) using the Fractal Trinity integration system.

### Omnidrop Protocol

The Omnidrop protocol enables rapid deployment with a 3-minute intake window:

1. **Drag & Drop**: Upload HTML/PDF files
2. **Scanning**: Automated file structure analysis
3. **DNS Hook**: Vault DNS activation
4. **MeshNest™**: Integration with the mesh network
5. **ClaimRoot™**: Ownership verification
6. **Live Deployment**: Site activation

## Integration

HotStack integrates with:

- **BuildNest**: Core processing and scroll signing
- **CodeNest**: Project management and API gateway
- **VaultMesh**: Security protocols and pulse synchronization

## Global Template Conformity

This deployment follows the global template standard defined at:
https://samfox.faa.zone/global_templates/hotstack_vs2.0.html

## License

Part of the FAA.zone™ MONSTER OMNI™ System
© Fruitful Global - ScrollSynced | Vault-Verified
`;

  fs.writeFileSync(path.join(TEMP_DIR, 'README.md'), readme);

  // Create .gitignore
  const gitignore = `node_modules/
.DS_Store
*.log
.env
.env.local
dist/
.tmp/
`;
  fs.writeFileSync(path.join(TEMP_DIR, '.gitignore'), gitignore);

  // Git operations
  console.log('📝 Committing changes...');
  execSync(`git -C ${TEMP_DIR} add .`);

  try {
    execSync(`git -C ${TEMP_DIR} commit -m "Deploy HotStack from BuildNest - $(date)"`, { stdio: 'pipe' });
    console.log('✅ Changes committed');
  } catch (error) {
    console.log('ℹ️  No changes to commit');
  }

  // Push to repository
  console.log('🚢 Pushing to repository...');
  console.log('⚠️  Note: You may need to configure git credentials or use SSH');
  console.log('ℹ️  Run manually: cd .tmp/hotstack-deploy && git push -u origin main');

  // Uncomment the following line when ready to push automatically
  // execSync(`git -C ${TEMP_DIR} push -u origin main`);

  console.log('\n✅ HotStack deployment prepared successfully!');
  console.log(`📁 Deployment files are in: ${TEMP_DIR}`);
  console.log(`🌐 Target repository: ${REPO_URL}`);
  console.log('\n🔧 Next steps:');
  console.log('   1. Review the files in the deployment directory');
  console.log('   2. Push to repository: cd .tmp/hotstack-deploy && git push -u origin main');
  console.log('   3. Configure your hosting platform (Vercel, Netlify, etc.)');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
