#!/bin/bash
# HotStack Cloudflare Pages Deployment Script

echo "🔥 Deploying HotStack to Cloudflare Pages..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "📦 Installing Wrangler CLI..."
    npm install -g wrangler
fi

# Login to Cloudflare (if not already logged in)
echo "🔐 Checking Cloudflare authentication..."
wrangler whoami || wrangler login

# Deploy to Cloudflare Pages
echo "🚀 Deploying to Cloudflare Pages..."
wrangler pages deploy . --project-name=hotstack --branch=main

echo "✅ Deployment complete!"
echo "🌍 Your site will be available at: hotstack.faa.zone"
echo ""
echo "📋 Next steps:"
echo "1. Configure custom domain in Cloudflare Pages dashboard"
echo "2. Add CNAME record: hotstack.faa.zone → your-deployment.pages.dev"
echo "3. Enable SSL/TLS (automatic with Cloudflare)"
