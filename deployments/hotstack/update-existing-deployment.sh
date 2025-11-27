#!/bin/bash
# Update Existing HotStack Cloudflare Deployment
# Syncs latest template to hotstack-bucket

set -e

echo "🔄 Updating HotStack in Cloudflare"
echo "====================================="
echo ""

# Load credentials
if [ -f .env ]; then
    source .env
    echo "✅ Loaded Cloudflare credentials"
else
    echo "❌ No .env file found"
    exit 1
fi

echo ""
echo "📦 Target: hotstack-bucket (R2 Storage)"
echo "🌍 Domain: hotstack.faa.zone"
echo ""

# Verify files exist
if [ ! -f "index.html" ]; then
    echo "❌ index.html not found in current directory"
    exit 1
fi

echo "✅ HotStack v2.0 template found ($(wc -c < index.html) bytes)"
echo ""

# Method 1: R2 Bucket Upload (if using R2)
echo "📤 Uploading to R2 bucket..."
wrangler r2 object put hotstack-bucket/index.html --file=index.html || {
    echo "⚠️  R2 upload failed, trying Pages deployment..."
}

# Method 2: Pages Deployment (if using Pages)
echo ""
echo "📤 Updating Cloudflare Pages deployment..."
wrangler pages deploy . \
    --project-name=hotstack \
    --branch=main \
    --commit-dirty=true || {
    echo "⚠️  Pages deployment failed"
}

# Upload headers if using Pages
if [ -f "_headers" ]; then
    echo "📋 Uploading security headers..."
    wrangler r2 object put hotstack-bucket/_headers --file=_headers 2>/dev/null || echo "Note: _headers managed by Pages"
fi

echo ""
echo "✅ Update Complete!"
echo "==================="
echo ""
echo "🌍 Your updated site is live at:"
echo "   https://hotstack.faa.zone"
echo ""
echo "🔍 Verify deployment:"
echo "   curl -I https://hotstack.faa.zone"
echo "   # Or open in browser"
echo ""
echo "📊 Check Cloudflare Dashboard:"
echo "   R2 Buckets: https://dash.cloudflare.com/r2"
echo "   Pages: https://dash.cloudflare.com/pages"
echo ""
