#!/bin/bash
# Direct Upload to hotstack-bucket using Cloudflare API
# Alternative method if wrangler has issues

set -e

echo "🔥 Syncing HotStack to Cloudflare Bucket"
echo "=========================================="

# Load credentials
if [ -f .env ]; then
    source .env
else
    echo "❌ Missing .env file"
    exit 1
fi

# Validate credentials
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ CLOUDFLARE_API_TOKEN not set"
    exit 1
fi

if [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
    echo "❌ CLOUDFLARE_ACCOUNT_ID not set"
    exit 1
fi

echo "✅ Credentials loaded"
echo "📦 Bucket: hotstack-bucket"
echo "📁 File: index.html"
echo ""

# Check if index.html exists
if [ ! -f "index.html" ]; then
    echo "❌ index.html not found"
    exit 1
fi

FILE_SIZE=$(wc -c < index.html)
echo "✅ Template found: $FILE_SIZE bytes"
echo ""

# Method 1: Wrangler R2 Upload
echo "🚀 Method 1: Uploading via Wrangler..."
wrangler r2 object put hotstack-bucket/index.html --file=index.html && {
    echo "✅ Upload successful!"
    echo ""
    echo "🌍 Live at: https://hotstack.faa.zone"
    exit 0
}

echo ""
echo "⚠️  Wrangler failed, trying direct API upload..."
echo ""

# Method 2: Direct API Upload (requires presigned URL or direct access)
echo "📋 For manual upload:"
echo "1. Go to: https://dash.cloudflare.com/r2"
echo "2. Select 'hotstack-bucket'"
echo "3. Upload 'index.html' from: $(pwd)/index.html"
echo "4. Upload '_headers' from: $(pwd)/_headers"
echo ""

# Method 3: Pages Deployment (if bucket is connected to Pages)
echo "🚀 Method 2: Deploying via Cloudflare Pages..."
wrangler pages deploy . --project-name=hotstack --branch=main && {
    echo "✅ Pages deployment successful!"
    echo "🌍 Live at: https://hotstack.faa.zone"
    exit 0
}

echo ""
echo "📋 Manual Steps Required:"
echo "1. Visit Cloudflare Dashboard"
echo "2. Navigate to R2 or Pages"
echo "3. Update hotstack-bucket with latest index.html"
echo ""
