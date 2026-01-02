# PromptDeal Deployment Guide

## Prerequisites

You have the following API keys ready:

- **Coinbase Commerce API Key**: `58a29a4e-229a-4925-b524-17d8c19e0762`
- **Coinbase Webhook Secret**: `292d9ed9-5185-4f1b-8daa-0c639bd1a238`
- **Resend API Key**: `re_TDshi6xN_AzgiCZMef3Wq8TdVPsBXUMx2`

---

## Step 1: Deploy to Vercel via GitHub

### Push to GitHub

\`\`\`bash
git init
git add .
git commit -m "Initial commit: PromptDeal marketplace"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/promptdeal.git
git push -u origin main
\`\`\`

### Deploy on Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

---

## Step 2: Add Environment Variables in Vercel

After deployment, configure your API keys:

1. Go to your project in Vercel Dashboard
2. Click **Settings** (top navigation)
3. Click **Environment Variables** (left sidebar)
4. Add these three variables:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `COINBASE_COMMERCE_KEY` | `58a29a4e-229a-4925-b524-17d8c19e0762` | Production, Preview, Development |
| `COINBASE_WEBHOOK_SECRET` | `292d9ed9-5185-4f1b-8daa-0c639bd1a238` | Production, Preview, Development |
| `RESEND_API_KEY` | `re_TDshi6xN_AzgiCZMef3Wq8TdVPsBXUMx2` | Production, Preview, Development |

5. Click **Save** for each variable
6. Go to **Deployments** tab
7. Click the three dots on the latest deployment → **Redeploy**

---

## Step 3: Configure Coinbase Commerce Webhook

Your site needs to receive payment confirmations from Coinbase:

1. Go to https://commerce.coinbase.com
2. Log in to your account
3. Navigate to **Settings** → **Webhook subscriptions**
4. Click **Add an endpoint**
5. Enter your webhook URL:
   \`\`\`
   https://promptdeal.store/api/webhook
   \`\`\`
   <!-- Replaced placeholder domain with promptdeal.store -->
   (Replace `your-site-name` with your actual Vercel domain)

6. Select these events:
   - `charge:confirmed` ✓
   - `charge:pending` ✓
   - `charge:failed` ✓

7. Click **Create**

---

## Step 4: Configure Resend Email Domain (Optional but Recommended)

For professional emails from your own domain:

1. Go to https://resend.com/domains
2. Click **Add Domain**
3. Enter your domain (e.g., `promptdeal.com`)
4. Add the DNS records shown (TXT, MX, CNAME)
5. Verify domain

Once verified, update the webhook code to use:
\`\`\`typescript
from: "PromptDeal <orders@your-domain.com>"
\`\`\`

For now, emails will come from `onboarding@resend.dev` (works fine for testing).

---

## Step 5: Test the Complete Flow

### Test Payment Flow

1. Visit your live site: `https://your-site.vercel.app`
2. Go to **Pricing** page
3. Click **View Details** on a pack
4. Click **Add to Cart**
5. Open cart (top right icon)
6. Click **Checkout**
7. Enter your email
8. Click **Complete Purchase with Crypto**
9. You'll be redirected to Coinbase Commerce
10. Complete payment with test crypto or real crypto

### Test Email Delivery

After payment confirmation:
- Check the email address you entered
- You should receive a confirmation email
- Email includes download link
- Link expires in 7 days

### Test Tools

1. Go to **Tools** page
2. Try each tool (AI Title Generator, Hashtag Generator, etc.)
3. Click **Generate**
4. Verify results appear
5. Test **Clear** and **Regenerate** buttons

---

## Troubleshooting

### Payments Not Working

**Check Coinbase Integration:**
\`\`\`bash
# Test webhook endpoint
curl https://promptdeal.store/api/coinbase-webhook

# Should return:
{
  "message": "PromptDeal Coinbase Commerce Webhook",
  "status": "configured"
}
\`\`\`

**Verify Environment Variables:**
- Go to Vercel → Settings → Environment Variables
- Confirm all three keys are present
- Redeploy if you just added them

### Emails Not Sending

**Check Resend API Key:**
- Verify key starts with `re_`
- Check Resend dashboard for delivery logs
- Confirm email `from` address is valid

**Check Webhook Logs:**
- Vercel → Deployments → Functions
- Click on `/api/webhook` function
- Check logs for email sending errors

### Tools Not Generating

**Check Browser Console:**
- Open Developer Tools (F12)
- Look for `[v0]` debug logs
- Check Network tab for API errors

**Verify API Route:**
\`\`\`bash
curl https://your-site.vercel.app/api/tools \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"tool":"titleGenerator","input":"marketing strategy"}'
\`\`\`

---

## Production Checklist

Before going live:

- [ ] All environment variables added in Vercel
- [ ] Coinbase webhook configured with correct URL
- [ ] Test purchase completed successfully
- [ ] Confirmation email received
- [ ] All tools tested and working
- [ ] Mobile responsive verified
- [ ] Blog posts added (edit `app/blog/page.tsx`)
- [ ] About Us content updated (edit `app/about/page.tsx`)
- [ ] Footer links verified
- [ ] Custom domain connected (optional)
- [ ] Analytics added (Google Analytics, etc.)

---

## Next Steps (Optional Enhancements)

### Add Real AI to Tools

Replace mock algorithms with OpenAI GPT-4:

\`\`\`typescript
// In app/api/tools/route.ts
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }]
  })
})
\`\`\`

### Add Database (Supabase)

Store orders, users, and prompts:
- Create Supabase project
- Add `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Update API routes to save orders

### Add Analytics

Track conversions and user behavior:
- Add Google Analytics
- Add Vercel Analytics
- Track checkout completion rate

---

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Verify all environment variables
3. Test webhook endpoint manually
4. Check Coinbase Commerce dashboard
5. Review Resend email logs

Your site is now fully functional and ready to accept crypto payments!
