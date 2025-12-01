#!/bin/bash
# HotStack Cloudflare Complete Setup Script
# This script handles authentication and deployment

set -e

echo "🔥 HotStack Cloudflare Setup & Deployment"
echo "=========================================="
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "📦 Installing Wrangler CLI..."
    npm install -g wrangler
    echo "✅ Wrangler installed"
else
    echo "✅ Wrangler already installed"
fi

echo ""
echo "🔐 Cloudflare Authentication"
echo "----------------------------"

# Check if CLOUDFLARE_API_TOKEN is set
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "⚠️  CLOUDFLARE_API_TOKEN not found in environment"
    echo ""
    echo "To deploy, you need a Cloudflare API Token with the following permissions:"
    echo "  • Account - Cloudflare Pages - Edit"
    echo "  • Zone - DNS - Edit"
    echo "  • Zone - Zone - Read"
    echo ""
    echo "📋 Steps to get your API Token:"
    echo "1. Go to: https://dash.cloudflare.com/profile/api-tokens"
    echo "2. Click 'Create Token'"
    echo "3. Use 'Edit Cloudflare Workers' template (or create custom)"
    echo "4. Add permissions listed above"
    echo "5. Copy the token"
    echo ""
    echo "Then run:"
    echo "  export CLOUDFLARE_API_TOKEN='your_token_here'"
    echo "  ./cloudflare-setup.sh"
    echo ""
    exit 1
fi

echo "✅ CLOUDFLARE_API_TOKEN found"

# Check if CLOUDFLARE_ACCOUNT_ID is set
if [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
    echo ""
    echo "📝 Getting Cloudflare Account ID..."
    # Try to get account ID from wrangler
    ACCOUNT_ID=$(wrangler whoami 2>/dev/null | grep -oP '(?<=Account ID: )[a-f0-9]+' | head -1 || echo "")

    if [ -z "$ACCOUNT_ID" ]; then
        echo "⚠️  Could not auto-detect Account ID"
        echo ""
        echo "To find your Account ID:"
        echo "1. Go to: https://dash.cloudflare.com/"
        echo "2. Select your account"
        echo "3. Copy Account ID from the right sidebar"
        echo ""
        echo "Then run:"
        echo "  export CLOUDFLARE_ACCOUNT_ID='your_account_id_here'"
        echo "  ./cloudflare-setup.sh"
        echo ""
        exit 1
    fi

    export CLOUDFLARE_ACCOUNT_ID="$ACCOUNT_ID"
    echo "✅ Account ID: $CLOUDFLARE_ACCOUNT_ID"
else
    echo "✅ CLOUDFLARE_ACCOUNT_ID found: $CLOUDFLARE_ACCOUNT_ID"
fi

echo ""
echo "🚀 Deploying to Cloudflare Pages..."
echo "-----------------------------------"

# Create or get Pages project
echo "📋 Setting up Cloudflare Pages project 'hotstack'..."
wrangler pages project create hotstack --production-branch=main || echo "Project may already exist"

# Deploy to Cloudflare Pages
echo "📤 Deploying files..."
wrangler pages deploy . \
    --project-name=hotstack \
    --branch=main \
    --commit-dirty=true

echo ""
echo "✅ Deployment Complete!"
echo "======================="
echo ""
echo "🌍 Your site is now live!"
echo ""
echo "📋 Next Steps:"
echo "1. Set up custom domain:"
echo "   wrangler pages domain add hotstack.faa.zone --project-name=hotstack"
echo ""
echo "2. Or configure in dashboard:"
echo "   https://dash.cloudflare.com/pages → hotstack → Custom domains"
echo ""
echo "3. Your site will be available at:"
echo "   • https://hotstack.pages.dev (Cloudflare subdomain)"
echo "   • https://hotstack.faa.zone (after domain setup)"
echo ""
echo "📊 Monitor your deployment:"
echo "   https://dash.cloudflare.com/pages"
echo ""
