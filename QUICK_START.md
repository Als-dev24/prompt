# PromptDeal - Quick Start Guide

## Your API Keys (Ready to Use)

Copy these into Vercel Environment Variables:

```bash
COINBASE_COMMERCE_KEY=58a29a4e-229a-4925-b524-17d8c19e0762
COINBASE_WEBHOOK_SECRET=292d9ed9-5185-4f1b-8daa-0c639bd1a238
RESEND_API_KEY=re_TDshi6xN_AzgiCZMef3Wq8TdVPsBXUMx2
```

## Deploy in 3 Steps

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/promptdeal.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repo
4. Click "Deploy"

### 3. Add Environment Variables

In Vercel Dashboard:
- Settings → Environment Variables
- Add the 3 keys above
- Redeploy

## Post-Deployment

### Configure Coinbase Webhook

Go to https://commerce.coinbase.com/settings/webhooks and add:

```
https://your-site.vercel.app/api/webhook
```

Select events: `charge:confirmed`, `charge:pending`, `charge:failed`

### Test Your Site

1. Visit: `https://your-site.vercel.app`
2. Add a pack to cart
3. Checkout with crypto
4. Verify email received

## What Works Right Now

- Homepage with hero section
- Pricing page with 3 packs
- Shopping cart system
- Crypto checkout via Coinbase Commerce
- Automatic email confirmations
- 6 marketing tools (AI Title Generator, Hashtag Generator, etc.)
- Blog page
- About Us page
- Fully responsive design

## Site is Ready

Your site works in mock mode without API keys and fully functional with them. Deploy now and add the keys in Vercel to activate real payments.

For detailed troubleshooting, see `DEPLOYMENT_GUIDE.md`.
