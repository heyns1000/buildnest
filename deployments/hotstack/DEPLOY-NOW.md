# 🚀 Deploy HotStack to Cloudflare Pages RIGHT NOW

## Quick Start (2 Minutes)

### Step 1: Get Cloudflare Credentials

1. **API Token**: https://dash.cloudflare.com/profile/api-tokens
   - Click "Create Token"
   - Use "Edit Cloudflare Workers" template
   - Copy the token

2. **Account ID**: https://dash.cloudflare.com/
   - Look in right sidebar
   - Copy Account ID

### Step 2: Deploy

```bash
# Set your credentials
export CLOUDFLARE_API_TOKEN="your_token_here"
export CLOUDFLARE_ACCOUNT_ID="your_account_id_here"

# Navigate to deployment directory
cd deployments/hotstack

# Deploy!
./cloudflare-setup.sh
```

That's it! Your site will be live at `hotstack.pages.dev` and can be configured for `hotstack.faa.zone`.

---

## Alternative: Use .env File

```bash
# 1. Copy example env file
cp .env.example .env

# 2. Edit .env and add your credentials
nano .env

# 3. Load credentials and deploy
source .env && ./cloudflare-setup.sh
```

---

## Alternative: GitHub Integration (No CLI Needed)

1. Go to https://dash.cloudflare.com/pages
2. Click "Create a project" → "Connect to Git"
3. Select repository: `heyns1000/hotstack`
4. Configure:
   - **Production branch**: `main`
   - **Build command**: (leave empty)
   - **Build output directory**: `/`
5. Click "Save and Deploy"
6. Add custom domain: `hotstack.faa.zone`

✅ Automatic deployments on every git push!

---

## Verify Deployment

```bash
# Check if site is live
curl -I https://hotstack.pages.dev

# Or visit in browser
open https://hotstack.pages.dev
```

---

## Custom Domain Setup

After deployment, add custom domain:

```bash
wrangler pages domain add hotstack.faa.zone --project-name=hotstack
```

Or in Cloudflare Dashboard:
1. Go to Pages → hotstack → Custom domains
2. Add: `hotstack.faa.zone`
3. Cloudflare auto-configures DNS

---

## Files Included

✅ `index.html` - HotStack v2.0 template (100% unchanged)
✅ `wrangler.toml` - Cloudflare Pages configuration
✅ `_headers` - Security headers (CSP, X-Frame-Options, etc.)
✅ `cloudflare-setup.sh` - Automated deployment script
✅ `.env.example` - Credentials template

---

## Troubleshooting

**Authentication Error?**
- Verify API token has correct permissions
- Check account ID is correct
- Try: `wrangler whoami` to test auth

**Deployment Failed?**
- Ensure you're in `/deployments/hotstack` directory
- Check all files are present: `ls -la`
- View logs: `~/.config/.wrangler/logs/`

**Domain Not Working?**
- DNS propagation can take up to 5 minutes
- Check: `dig hotstack.faa.zone`
- Verify CNAME points to `.pages.dev` domain

---

**Need Help?**
- Cloudflare Pages Docs: https://developers.cloudflare.com/pages
- Wrangler Docs: https://developers.cloudflare.com/workers/wrangler
