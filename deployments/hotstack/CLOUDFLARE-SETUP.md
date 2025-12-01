# HotStack Cloudflare Configuration

## Automatic Deployment

### Method 1: Wrangler CLI (Recommended)

```bash
# Install Wrangler (if not already installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy to Cloudflare Pages
wrangler pages deploy . --project-name=hotstack --branch=main
```

**OR use the automated script:**

```bash
chmod +x cloudflare-deploy.sh
./cloudflare-deploy.sh
```

---

## Manual Cloudflare Pages Setup

### Step 1: Connect GitHub Repository

1. Go to: https://dash.cloudflare.com
2. Navigate to **Pages** → **Create a project**
3. Select **Connect to Git**
4. Choose repository: **heyns1000/hotstack**
5. Configure build settings:
   - **Production branch**: `main`
   - **Build command**: (leave empty - static HTML)
   - **Build output directory**: `/`
   - **Root directory**: `/`

### Step 2: Configure Custom Domain

1. In Cloudflare Pages dashboard, go to your **hotstack** project
2. Click **Custom domains** → **Set up a custom domain**
3. Enter: `hotstack.faa.zone`
4. Cloudflare will automatically configure DNS

**Manual DNS Configuration (if needed):**

Go to DNS settings for `faa.zone` domain:

```
Type: CNAME
Name: hotstack
Target: hotstack.pages.dev (or your Cloudflare Pages URL)
Proxy: ✅ Proxied (Orange cloud)
TTL: Auto
```

### Step 3: SSL/TLS Configuration

1. Go to **SSL/TLS** → **Overview**
2. Set encryption mode: **Full (strict)**
3. Enable **Always Use HTTPS**
4. Enable **Automatic HTTPS Rewrites**
5. Minimum TLS Version: **1.2**

### Step 4: Page Rules (Optional but Recommended)

Create page rules for `hotstack.faa.zone/*`:

1. **Cache Level**: Standard
2. **Browser Cache TTL**: 4 hours
3. **Always Online**: On
4. **Security Level**: Medium

---

## DNS Records for faa.zone

### Required DNS Records

```
# Main HotStack CNAME
Type: CNAME
Name: hotstack
Content: hotstack.pages.dev
Proxy: ✅ Proxied
TTL: Auto

# Root domain (if needed)
Type: A
Name: @
Content: 192.0.2.1 (Cloudflare IP)
Proxy: ✅ Proxied
TTL: Auto

# WWW redirect (optional)
Type: CNAME
Name: www.hotstack
Content: hotstack.faa.zone
Proxy: ✅ Proxied
TTL: Auto
```

---

## Performance Settings

### Caching Configuration

1. Go to **Caching** → **Configuration**
2. **Caching Level**: Standard
3. **Browser Cache TTL**: Respect Existing Headers
4. Enable **Always Online**

### Speed Optimizations

1. Go to **Speed** → **Optimization**
2. Enable **Auto Minify**: HTML, CSS, JavaScript
3. Enable **Brotli** compression
4. Enable **Rocket Loader** (optional - test first)
5. Enable **HTTP/2** and **HTTP/3**

---

## Security Settings

### Firewall Rules

Create firewall rule for DDoS protection:

```
Field: Hostname
Operator: equals
Value: hotstack.faa.zone
Action: Managed Challenge (for suspicious traffic)
```

### Security Headers

Headers are configured in `_headers` file:

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Security-Policy: [configured]
```

---

## Environment Variables (if needed)

For Cloudflare Workers integration:

```bash
# Set via Wrangler
wrangler secret put CLOUDFLARE_ACCOUNT_ID
wrangler secret put API_KEY
```

Or in Cloudflare Dashboard:
1. Go to **Pages** → **hotstack** → **Settings**
2. Click **Environment variables**
3. Add variables for Production

---

## Deployment Workflow

### Automatic Deployments

Every push to `main` branch triggers automatic deployment:

```
git push origin main
↓
GitHub webhook triggers Cloudflare Pages
↓
Cloudflare builds and deploys
↓
Live at hotstack.faa.zone (within 30 seconds)
```

### Manual Deployment

```bash
# Via Wrangler CLI
wrangler pages deploy . --project-name=hotstack

# Via GitHub
git push origin main --force
```

---

## Monitoring & Analytics

### Enable Analytics

1. Go to **Analytics & Logs** → **Web Analytics**
2. Enable for `hotstack.faa.zone`
3. Add analytics snippet (if needed)

### Performance Metrics

Monitor:
- Page load time
- Time to first byte (TTFB)
- Requests per second
- Bandwidth usage
- Cache hit ratio

---

## Troubleshooting

### Common Issues

**Issue**: 404 Not Found  
**Solution**: Ensure `index.html` is in root directory

**Issue**: CSS/JS not loading  
**Solution**: Check Content-Security-Policy in `_headers`

**Issue**: Custom domain not working  
**Solution**: Verify DNS CNAME points to `.pages.dev` domain

**Issue**: SSL errors  
**Solution**: Set SSL/TLS to "Full (strict)" mode

### Debug Commands

```bash
# Check DNS propagation
dig hotstack.faa.zone

# Check SSL certificate
curl -I https://hotstack.faa.zone

# Test deployment
curl https://hotstack.faa.zone
```

---

## Files Configured

✅ `wrangler.toml` - Wrangler configuration  
✅ `_headers` - Security and cache headers  
✅ `cloudflare-deploy.sh` - Automated deployment script  
✅ `CLOUDFLARE-SETUP.md` - This guide  

---

## Quick Deploy Checklist

- [ ] GitHub repository connected to Cloudflare Pages
- [ ] Custom domain `hotstack.faa.zone` configured
- [ ] DNS CNAME record created and proxied
- [ ] SSL/TLS set to Full (strict)
- [ ] Always Use HTTPS enabled
- [ ] Auto Minify enabled
- [ ] Analytics configured
- [ ] Test deployment successful

---

## Support Links

- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages
- **Wrangler CLI**: https://developers.cloudflare.com/workers/wrangler
- **DNS Configuration**: https://developers.cloudflare.com/dns
- **SSL/TLS Guide**: https://developers.cloudflare.com/ssl

---

**Last Updated**: 2025-11-27  
**Status**: ✅ Configuration Ready  
**Domain**: hotstack.faa.zone  
**Provider**: Cloudflare Pages
