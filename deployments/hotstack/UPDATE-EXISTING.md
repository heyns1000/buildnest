# 🔄 Update Existing HotStack Deployment

Since **hotstack-bucket** is already live on Cloudflare, use these methods to update it.

## Quick Update (Choose One)

### Method 1: Automated Script (Recommended)
```bash
cd /home/user/buildnest/deployments/hotstack
source .env
./update-existing-deployment.sh
```

### Method 2: Wrangler R2 Direct Upload
```bash
source .env

# Upload main template
wrangler r2 object put hotstack-bucket/index.html --file=index.html

# Upload headers (optional)
wrangler r2 object put hotstack-bucket/_headers --file=_headers

# Verify
wrangler r2 object get hotstack-bucket/index.html
```

### Method 3: Cloudflare Pages Update
```bash
source .env

# Deploy to existing Pages project
wrangler pages deploy . --project-name=hotstack --branch=main

# Check deployment
wrangler pages deployment list --project-name=hotstack
```

### Method 4: Dashboard Upload (Manual)
1. Go to https://dash.cloudflare.com/r2
2. Select `hotstack-bucket`
3. Upload `index.html` (drag & drop)
4. Upload `_headers` (optional)
5. Verify at https://hotstack.faa.zone

---

## 🔍 Verify Current Deployment

```bash
# Check what's currently deployed
curl -I https://hotstack.faa.zone

# Should show:
# HTTP/2 200
# content-type: text/html
# x-frame-options: SAMEORIGIN
```

---

## 📋 What Gets Updated

✅ **index.html** - HotStack v2.0 template (29,721 bytes)
✅ **_headers** - Security headers (CSP, X-Frame-Options)
✅ **wrangler.toml** - Cloudflare configuration

---

## 🏗️ Current Architecture

```
hotstack.faa.zone
        ↓
Cloudflare DNS (faa.zone)
        ↓
hotstack-bucket (R2 Storage)
   OR
Cloudflare Pages (hotstack project)
        ↓
index.html (HotStack v2.0)
```

---

## 🔧 Troubleshooting

### "Bucket not found"
Check bucket name:
```bash
wrangler r2 bucket list
```

If bucket has different name, update commands:
```bash
wrangler r2 object put YOUR-BUCKET-NAME/index.html --file=index.html
```

### "Unauthorized"
Verify credentials:
```bash
./verify-cloudflare-tokens.sh
```

### "Network error"
- Run from local machine (not sandboxed environment)
- Check firewall/proxy settings

---

## 📊 Check Deployment Status

### R2 Bucket
```bash
# List objects in bucket
wrangler r2 object list hotstack-bucket

# Get specific file
wrangler r2 object get hotstack-bucket/index.html
```

### Pages Project
```bash
# List deployments
wrangler pages deployment list --project-name=hotstack

# View latest
wrangler pages deployment tail --project-name=hotstack
```

### Live Site
```bash
# Fetch current version
curl https://hotstack.faa.zone | head -20

# Should show HotStack v2.0 template
```

---

## 🚀 Sync Script Options

### Option A: Full Update
```bash
./update-existing-deployment.sh
```
Updates both R2 and Pages (tries all methods)

### Option B: Bucket Only
```bash
./sync-to-bucket.sh
```
Updates R2 bucket specifically

### Option C: Pages Only
```bash
wrangler pages deploy . --project-name=hotstack
```

---

## 🔐 Configuration

Your existing setup:
- **Bucket**: `hotstack-bucket`
- **Domain**: `hotstack.faa.zone`
- **DNS**: Managed by Cloudflare
- **SSL**: Automatic (Cloudflare)
- **CDN**: Cloudflare edge network

All-in-one platform ✅

---

## 📝 After Update

1. Clear cache (if needed):
   - Cloudflare Dashboard → Caching → Purge Everything
   - Or: `curl https://hotstack.faa.zone?cachebust=$(date +%s)`

2. Test functionality:
   - Scroll functionality working ✅
   - Countdown timer running ✅
   - Modal popups working ✅
   - Drag & drop active ✅

3. Monitor:
   - https://dash.cloudflare.com/analytics
   - Check traffic, errors, performance

---

**Quick Command Reference:**

```bash
# Load credentials
source .env

# Update deployment
./update-existing-deployment.sh

# Verify
curl -I https://hotstack.faa.zone

# Done! 🎉
```
