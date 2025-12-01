# HotStack™ Deployment Guide

## Overview

This guide explains how to deploy the **REAL** HotStack v2.0 template from the samfox repository to the hotstack.faa.zone domain.

## Template Source

**Official Template**: https://github.com/heyns1000/samfox/blob/main/public/global_templates/hotstack_vs2.0.html

**Local Copy**: `attached_assets/hotstack_template_v2.html`

**Deployment Ready**: `deployments/hotstack/`

---

## Quick Deployment

### Option 1: Automated Script (Recommended)

```bash
# From buildnest root directory
npm run deploy:hotstack
```

This will:
1. Prepare the deployment directory in `.tmp/hotstack-deploy/`
2. Copy the template as `index.html`
3. Create README, DEPLOY.md, and .gitignore
4. Provide instructions for git push

### Option 2: Manual Deployment

```bash
# Navigate to deployment directory
cd deployments/hotstack

# Initialize git repository
git init
git add .
git commit -m "Deploy HotStack v2.0 template from samfox"
git branch -M main

# Add remote
git remote add origin https://github.com/heyns1000/hotstack.git

# Push to repository
git push -u origin main --force
```

---

## Template Features

### ✅ Countdown Timer
- 180-second Omnidrop activation window
- Real-time countdown display with monospace font
- Auto-refresh on expiry
- Gold (#fbbf24) theme with glow effects

### ✅ Zero-Signup Modal
- Collapse protocol calculation
- Timestamp-based identity generation
- Instant user ID creation
- No registration required

### ✅ Global Hub Network
**12 Deployment Stations Worldwide**:

- **Africa**: Cape Town 🇿🇦, Johannesburg 🇿🇦, Lagos 🇳🇬, Lesotho 🇱🇸
- **North America**: New York 🇺🇸, Toronto 🇨🇦, Silicon Valley 🇺🇸
- **Europe/UK**: London 🇬🇧, Berlin 🇩🇪, Reykjavik 🇮🇸
- **Asia/Australasia**: Tokyo 🇯🇵, Singapore 🇸🇬, Sydney 🇦🇺

### ✅ Drag & Drop Upload
- HTML/PDF file support
- Visual drop zone with hover effects
- Real-time file processing
- Status console logging

### ✅ Particle Animation
- Animated background particles
- Gold-themed visual effects
- Smooth 6-second float animation
- Dynamic rotation and opacity

### ✅ Noodle Juice Integration
- Referral system display
- Ecosystem integration
- Badge and link tracking

### ✅ Status Console
- Live deployment logging
- Real-time status updates
- Scrollable event display
- System activity tracking

---

## Architecture

### File Structure

```
hotstack/
├── index.html          # Main landing page (632 lines)
├── README.md          # Repository documentation
├── DEPLOY.md          # Deployment instructions
└── .gitignore         # Git ignore rules
```

### Technology Stack

**Frontend**:
- Pure HTML/CSS/JavaScript
- Tailwind CSS (CDN)
- Google Fonts (Inter, Courier New)
- No build process required

**Backend Integration**:
- Cloudflare Workers
- R2 Object Storage
- Message Queues
- BuildNest Processing

### Performance

- **Sub-200ms** upload confirmation globally
- **310+ edge locations** via Cloudflare
- **Zero build time** (pure HTML)
- **Instant deployment**

---

## Integration with BuildNest

### Deployment Flow

```
User Upload (HotStack Landing Page)
    ↓
Cloudflare Worker Validation
    ↓
R2 Storage
    ↓
Message Queue
    ↓
BuildNest Processing
    ↓
Real Data Fetching
    ↓
AI Polishing
    ↓
ClaimRoot™ License Generation
    ↓
CodeNest Deployment
    ↓
Email Notification
```

### API Endpoints Used

- `/api/data/omnidrop-context` - Fetch real data
- `/api/data/polish-user-request` - Polish user uploads
- `/api/licenses/generate` - Generate ClaimRoot™ license
- `/api/infrastructure/provision-domain` - Create DNS records
- `/api/infrastructure/send-deployment-email` - Send notifications

---

## Updating the Template

### Fetch Latest Version

```bash
# From buildnest root
curl -s https://raw.githubusercontent.com/heyns1000/samfox/main/public/global_templates/hotstack_vs2.0.html \
  -o attached_assets/hotstack_template_v2.html

# Verify download
wc -l attached_assets/hotstack_template_v2.html
# Should show: 632 lines
```

### Build and Deploy

```bash
# Build HotStack
npm run build:hotstack

# This creates: dist/hotstack/index.html

# Prepare deployment
npm run deploy:hotstack

# Then follow git push instructions
```

---

## Verification

### After Deployment

1. **Visit**: https://hotstack.faa.zone
2. **Check Features**:
   - Countdown timer is running
   - Particle animations visible
   - Drag & drop zone functional
   - Modal opens on button click
   - Global hubs displayed correctly
   - Status console shows events

3. **Test Upload**:
   - Drag HTML or PDF file
   - Verify drop zone highlights
   - Check status console for activity
   - Confirm file processing

---

## Troubleshooting

### Template Not Found

```bash
# Re-download template
curl -s https://raw.githubusercontent.com/heyns1000/samfox/main/public/global_templates/hotstack_vs2.0.html \
  -o attached_assets/hotstack_template_v2.html
```

### Git Push Fails

```bash
# Ensure you have push access to heyns1000/hotstack
# Or contact repository admin

# Alternative: Create a pull request
git remote add origin https://github.com/heyns1000/hotstack.git
git push -u origin main
```

### Build Errors

```bash
# Clean and rebuild
rm -rf dist/hotstack
npm run build:hotstack
```

---

## Template Preservation

**IMPORTANT**: The HotStack template is preserved **UNCHANGED** from the samfox repository.

- ✅ No code modifications
- ✅ No transpilation
- ✅ No minification
- ✅ No bundling
- ✅ Exact copy of source

This ensures:
- Scroll functionality works correctly
- Visual design remains intact
- JavaScript logic preserved
- Performance optimized
- Maintenance simplified

---

## Reference Documentation

### Official Sources

- **Template**: https://github.com/heyns1000/samfox/blob/main/public/global_templates/hotstack_vs2.0.html
- **Manual**: https://github.com/heyns1000/samfox/blob/main/public/global_templates/hotstack/hotstack_manual.md
- **Repository**: https://github.com/heyns1000/hotstack
- **Domain**: https://hotstack.faa.zone

### BuildNest Integration

- **Backend**: heyns1000/buildnest
- **CodeNest**: heyns1000/codenest
- **Licenses**: heyns1000/claimroot + heyns1000/LicenseVault
- **Infrastructure**: Real DNS, Email, SSL via Cloudflare

---

## Support

For deployment issues:
1. Check template source is up to date
2. Verify git push permissions
3. Review DEPLOY.md in deployment directory
4. Contact BuildNest team

---

**Last Updated**: 2025-11-27
**Template Version**: HotStack v2.0
**Status**: ✅ READY FOR DEPLOYMENT
