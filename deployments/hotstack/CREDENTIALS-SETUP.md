# 🔐 Cloudflare Credentials Setup

## ⚠️ Important Notes

Your **CLOUDFLARE_ACCOUNT_ID** may need verification:
- Current value: `im-kmXeSumBUfGkB0jzFkwxe4nV0HVxIL3jRG7-R`
- Expected format: 32-character hexadecimal string (e.g., `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)
- This doesn't match the typical Cloudflare Account ID format

## ✅ Verify Your Tokens (Run Locally)

```bash
cd /home/user/buildnest/deployments/hotstack

# Option 1: Quick verification script
./verify-cloudflare-tokens.sh

# Option 2: Manual verification
curl -X GET "https://api.cloudflare.com/client/v4/user" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

**If the token works**, you'll see:
```json
{
  "success": true,
  "result": {
    "id": "your_actual_account_id",
    "email": "your@email.com"
  }
}
```

## 🔑 Get Correct Account ID

### Method 1: From API Response
The verification script above will show your correct Account ID.

### Method 2: From Dashboard
1. Go to: https://dash.cloudflare.com/
2. Select your account
3. Look in the **right sidebar** for "Account ID"
4. Copy the 32-character ID

### Method 3: From Wrangler
```bash
source .env
wrangler whoami
```

## 📝 Update .env File

After verifying, update `.env` with the correct Account ID:

```bash
export CLOUDFLARE_API_TOKEN="hXTwY8-Bjf1nD9VRL-KBPzzPpOPpt4WcsOnE8T8K"
export CLOUDFLARE_ACCOUNT_ID="your_correct_32_char_account_id"
```

## 🚀 Deploy After Verification

```bash
# Load credentials
source .env

# Deploy to Cloudflare Pages
./cloudflare-setup.sh
```

## 🔍 Troubleshooting

### "Invalid API Token"
- Check token has these permissions:
  - Account → Cloudflare Pages → Edit
  - Zone → DNS → Edit
  - Zone → Zone → Read
- Generate new token: https://dash.cloudflare.com/profile/api-tokens

### "Invalid Account ID"
- Run verification script to get correct ID
- Update .env file with correct value
- Cloudflare Account IDs are always 32-character hexadecimal strings

### "Network Error"
- Ensure you're running from your local machine (not sandboxed environment)
- Check firewall/proxy settings
- Try: `curl https://api.cloudflare.com/client/v4/user`

## 📋 Credentials Loaded

Your `.env` file contains:
- ✅ CLOUDFLARE_API_TOKEN
- ⚠️  CLOUDFLARE_ACCOUNT_ID (verify format)
- ✅ SENDGRID_API_KEY
- ✅ OPENAI_API_KEY
- ✅ XAI_API_KEY

## 🔒 Security

- `.env` is in `.gitignore` - credentials won't be committed
- Never share your API tokens publicly
- Rotate tokens if exposed
- Use Cloudflare's token permissions to limit scope

---

**Next Step:** Run `./verify-cloudflare-tokens.sh` to test your credentials!
