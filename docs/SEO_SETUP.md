# SEO & Analytics Setup Guide

This guide will help you configure SEO and analytics for PromptDeal.

## Required Environment Variables

Add these to your Vercel project or `.env.local`:

\`\`\`bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console Verification
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code

# Site URL (for canonical URLs and sitemaps)
NEXT_PUBLIC_SITE_URL=https://promptdeal.store
\`\`\`

## Google Analytics 4 Setup

### 1. Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon)
3. Create new property: **PromptDeal**
4. Set up Data Stream:
   - Platform: **Web**
   - Website URL: `https://promptdeal.store`
   - Stream name: **PromptDeal Production**
5. Copy your **Measurement ID** (starts with G-)
6. Add to environment variables: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`

### 2. Configure Conversion Events

In GA4, set up these conversion events:

- **purchase** - Tracks completed purchases
  - Value: Transaction amount
  - Currency: USD
  - Transaction ID: Charge ID

- **add_to_cart** - Tracks items added to cart
  - Item name: Pack name
  - Price: Pack price

- **begin_checkout** - Tracks checkout starts
  - Value: Cart total

- **newsletter_signup** - Tracks newsletter signups
  - Method: email

- **file_download** - Tracks prompt pack downloads
  - File name: Pack type

### 3. Enable Enhanced Measurement

1. Go to Admin > Data Streams > Your stream
2. Click **Enhanced measurement**
3. Enable:
   - Page views ✅
   - Scrolls ✅
   - Outbound clicks ✅
   - Site search ✅
   - Video engagement ✅
   - File downloads ✅

## Google Search Console Setup

### 1. Verify Domain Ownership

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://promptdeal.store`
3. Choose verification method: **HTML tag**
4. Copy verification code
5. Add to environment variables: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_code`
6. Deploy to Vercel
7. Click **Verify** in Search Console

### 2. Submit Sitemap

1. In Search Console, go to **Sitemaps**
2. Add new sitemap URL: `https://promptdeal.store/sitemap.xml`
3. Click **Submit**
4. Wait 24-48 hours for Google to crawl

### 3. Request Indexing (Optional)

For immediate indexing:
1. Go to **URL Inspection**
2. Enter each important URL:
   - `https://promptdeal.store`
   - `https://promptdeal.store/pricing`
   - `https://promptdeal.store/tools`
   - `https://promptdeal.store/blog`
3. Click **Request Indexing**

## Sitemap Configuration

The sitemap is auto-generated at `/sitemap.xml`:

**Priority levels:**
- Homepage: 1.0
- Pricing: 0.9
- Tools/Free Prompts: 0.8
- Blog: 0.7
- About/FAQ: 0.6-0.5
- Legal pages: 0.3

**Update frequency:**
- Homepage/Pricing: Daily
- Tools/Blog: Weekly
- Static pages: Monthly

## Robots.txt

Located at `/public/robots.txt`:

\`\`\`txt
User-agent: *
Allow: /

# Block admin and API routes
Disallow: /api/
Disallow: /admin/

Sitemap: https://promptdeal.store/sitemap.xml
\`\`\`

## Open Graph Images

Create these images for social sharing:

1. **Homepage OG Image** (`/public/og-image.png`)
   - Size: 1200x630px
   - Content: Logo + tagline + key features
   - Format: PNG or JPG

2. **Per-page OG Images** (optional)
   - Pricing page
   - Tools page
   - Blog posts

## Structured Data (JSON-LD)

Already implemented in `app/layout.tsx`:

- **WebSite** schema with search action
- Canonical URLs on all pages
- OpenGraph meta tags
- Twitter Card meta tags

## Monitoring & Maintenance

### Weekly Checks:
- Review GA4 dashboard for traffic trends
- Check conversion funnel completion rates
- Monitor bounce rates by page

### Monthly Tasks:
- Review Search Console performance
- Check for crawl errors
- Update meta descriptions if CTR is low
- Analyze top keywords and optimize content

### Quarterly Reviews:
- Audit all meta titles and descriptions
- Review and update sitemap priorities
- Check for broken links
- Update blog content with fresh data

## Performance Metrics to Track

### Google Analytics:
- Sessions and users
- Conversion rate (purchases / sessions)
- Add to cart rate
- Newsletter signup rate
- Average session duration
- Bounce rate by page
- Traffic sources (organic, direct, referral)

### Google Search Console:
- Total impressions
- Average CTR (target: >3%)
- Average position (target: <10)
- Click-through rate by query
- Pages with indexing issues

## Common Issues & Solutions

### Issue: Sitemap not found
**Solution:** Ensure `app/sitemap.ts` is deployed and accessible at `/sitemap.xml`

### Issue: GA4 not tracking
**Solution:** Check that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set and starts with "G-"

### Issue: Pages not indexed
**Solution:** 
1. Check robots.txt isn't blocking pages
2. Verify sitemap includes the pages
3. Request indexing in Search Console
4. Wait 1-2 weeks for natural crawling

### Issue: Low CTR in search results
**Solution:**
1. Improve meta titles (add numbers, power words)
2. Write compelling meta descriptions
3. Add schema markup for rich snippets
4. Check competitors' titles and differentiate

## Next Steps After Setup

1. **Week 1-2:** Monitor indexing in Search Console
2. **Week 3-4:** Analyze initial traffic patterns in GA4
3. **Month 2:** Set up custom reports and conversion goals
4. **Month 3:** Begin A/B testing meta descriptions
5. **Ongoing:** Create blog content targeting long-tail keywords

## Support

For questions or issues:
- Email: support@promptdeal.com
- Check GA4 documentation: https://support.google.com/analytics
- Check Search Console help: https://support.google.com/webmasters
