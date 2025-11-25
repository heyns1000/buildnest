#!/usr/bin/env node

/**
 * Deploy to heyns1000/codenest repository
 *
 * This script handles the deployment of the CodeNest components
 * to the dedicated codenest repository following the Fractal Trinity architecture.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_URL = 'https://github.com/heyns1000/codenest.git';
const BUILD_DIR = path.join(__dirname, '..', 'dist', 'codenest');
const TEMP_DIR = path.join(__dirname, '..', '.tmp', 'codenest-deploy');

console.log('🚀 CodeNest Deployment Script');
console.log('================================\n');

// Check if build directory exists
if (!fs.existsSync(BUILD_DIR)) {
  console.error('❌ Build directory not found. Run "npm run build:codenest" first.');
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

  // Create README for the codenest repository
  const readme = `# CodeNest - Development Dashboard & API Gateway

## Overview

**CodeNest™** is the development dashboard and API gateway component of the FAA.zone™ MONSTER OMNI™ System.

### Role in Fractal Trinity Architecture

- **Role**: Development Dashboard
- **Protocol**: Project Management & API Gateway
- **Purpose**: Project management, API keys, templates, and deployment interface

## Features

- 📊 **Project Management**: Create and manage web apps, APIs, and payment gateways
- 🔑 **API Key Generation**: Secure API key management for all services
- 📚 **Template Library**: Pre-built templates for rapid development
- 💻 **Code Editor**: Built-in editor with syntax highlighting
- 🏢 **Multi-Company Management**: Support for FAA, Fruitful, VaultMesh, and Banimal
- 📈 **Real-Time Metrics**: Live deployment statistics and monitoring

## Architecture

CodeNest serves as the gateway between users and the BuildNest core processing system:

\`\`\`
User → CodeNest → BuildNest → VaultMesh → Deployment
\`\`\`

## Integration Points

### With BuildNest
- Project creation and management
- Build triggering and monitoring
- API endpoint management

### With HotStack
- Omnidrop file intake
- Deployment status tracking
- Template distribution

### With VaultMesh
- Security protocols
- Pulse synchronization
- Treaty validation

## API Endpoints

The CodeNest dashboard provides access to:

- \`/api/projects\` - Project management
- \`/api/keys\` - API key generation
- \`/api/templates\` - Template library
- \`/api/deploy\` - Deployment triggers
- \`/api/metrics\` - Real-time statistics

## Companies

CodeNest supports multi-company operations:

1. **FAA.zone™** 🌱 - Primary global entity
2. **Fruitful Global** 🍎 - Innovation division
3. **VaultMesh™** 🔐 - Security protocols
4. **Banimal™** 🦍 - Creative platform

## Deployment

This repository is automatically deployed from [buildnest](https://github.com/heyns1000/buildnest) using the Fractal Trinity integration system.

### Build Process

1. Component extraction from BuildNest
2. Asset optimization
3. API route configuration
4. Deployment to sovereign infrastructure

## Technology Stack

- **Frontend**: React 18+ with TypeScript
- **UI Components**: Radix UI (shadcn/ui)
- **Styling**: Tailwind CSS
- **State Management**: TanStack React Query
- **Router**: Wouter
- **Build Tool**: Vite

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
    execSync(`git -C ${TEMP_DIR} commit -m "Deploy CodeNest from BuildNest - $(date)"`, { stdio: 'pipe' });
    console.log('✅ Changes committed');
  } catch (error) {
    console.log('ℹ️  No changes to commit');
  }

  // Push to repository
  console.log('🚢 Pushing to repository...');
  console.log('⚠️  Note: You may need to configure git credentials or use SSH');
  console.log('ℹ️  Run manually: cd .tmp/codenest-deploy && git push -u origin main');

  // Uncomment the following line when ready to push automatically
  // execSync(`git -C ${TEMP_DIR} push -u origin main`);

  console.log('\n✅ CodeNest deployment prepared successfully!');
  console.log(`📁 Deployment files are in: ${TEMP_DIR}`);
  console.log(`🌐 Target repository: ${REPO_URL}`);
  console.log('\n🔧 Next steps:');
  console.log('   1. Review the files in the deployment directory');
  console.log('   2. Push to repository: cd .tmp/codenest-deploy && git push -u origin main');
  console.log('   3. Configure your hosting platform (Vercel, Netlify, etc.)');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
