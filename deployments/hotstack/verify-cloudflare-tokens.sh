#!/bin/bash
# Cloudflare Token Verification Script
# Run this locally to test which token works

echo "🔍 Cloudflare Token Verification"
echo "=================================="
echo ""

# Load credentials
if [ -f .env ]; then
    source .env
    echo "✅ Loaded credentials from .env"
else
    echo "⚠️  No .env file found. Please create one with your credentials."
    exit 1
fi

echo ""
echo "Testing tokens..."
echo ""

# Test Token 1
echo "📋 Testing CLOUDFLARE_API_TOKEN: ${CLOUDFLARE_API_TOKEN:0:20}..."
RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "https://api.cloudflare.com/client/v4/user" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Token VALID!"
    echo ""
    echo "📊 Account Information:"
    echo "$BODY" | jq -r '.result | "Email: \(.email)\nID: \(.id)\nUsername: \(.username)"' 2>/dev/null || echo "$BODY"

    # Get account ID
    ACCOUNT_ID=$(echo "$BODY" | jq -r '.result.id' 2>/dev/null)
    if [ ! -z "$ACCOUNT_ID" ] && [ "$ACCOUNT_ID" != "null" ]; then
        echo ""
        echo "🔑 Your Cloudflare Account ID: $ACCOUNT_ID"
        echo ""
        echo "⚠️  Note: Current CLOUDFLARE_ACCOUNT_ID in .env is: $CLOUDFLARE_ACCOUNT_ID"
        if [ "$ACCOUNT_ID" != "$CLOUDFLARE_ACCOUNT_ID" ]; then
            echo "❌ MISMATCH! Update your .env file with:"
            echo "   export CLOUDFLARE_ACCOUNT_ID=\"$ACCOUNT_ID\""
        else
            echo "✅ Account ID matches!"
        fi
    fi
else
    echo "❌ Token INVALID or ERROR"
    echo "HTTP Code: $HTTP_CODE"
    echo "Response: $BODY"
fi

echo ""
echo "=================================="
echo ""

# Test if wrangler works
if command -v wrangler &> /dev/null; then
    echo "🔐 Testing Wrangler authentication..."
    wrangler whoami
else
    echo "⚠️  Wrangler not installed. Run: npm install -g wrangler"
fi

echo ""
echo "📋 Next Steps:"
echo "1. If token is valid, run: ./cloudflare-setup.sh"
echo "2. Or connect GitHub repo to Cloudflare Pages dashboard"
echo "3. Your site will be live at: hotstack.faa.zone"
