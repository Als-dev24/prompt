# PromptDeal - AI Prompt Marketplace

A modern marketplace for premium AI prompts focused on digital marketing. Built with Next.js 16, React 19, and Tailwind CSS. Accepts cryptocurrency payments via Coinbase Commerce.

## Features

- 3 Digital Marketing Prompt Packs (Starter, Professional, Enterprise)
- Supabase Integration for data storage and authentication
- Supabase Storage for secure prompt pack delivery
- Shopping Cart System with localStorage persistence
- Cryptocurrency Payment Integration (Coinbase Commerce)
- Newsletter subscription with email capture
- Free marketing tools (AI-powered generators)
- Responsive Design with modern UI/UX
- SEO Optimized with sitemap and structured data
- Google Analytics 4 conversion tracking
- Email Notifications (Resend API)
- Blog and About Us pages

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Payments**: Coinbase Commerce API
- **Email**: Resend API
- **Analytics**: Google Analytics 4
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm (recommended) or npm
- Supabase account
- Coinbase Commerce account
- Resend account (optional for emails)
- Google Analytics 4 property (optional for tracking)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/promptdeal.git
cd promptdeal
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Create a `.env.local` file in the root directory:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Coinbase Commerce
COINBASE_COMMERCE_KEY=your_coinbase_api_key
COINBASE_WEBHOOK_SECRET=your_coinbase_webhook_secret

# Email (optional)
RESEND_API_KEY=your_resend_api_key

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://promptdeal.store
```

4. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

### Supabase Tables

The app uses the following Supabase tables:

1. **products** - Stores prompt pack information
   - Columns: id, name, description, category, price, pack_type, zip_path, is_active, created_at, updated_at

2. **newsletter_subscribers** - Stores email subscriptions
   - Columns: id, email, subscribed_at, source, created_at

### Supabase Storage

Create a bucket named `prompt-packs` for storing ZIP files:
- Bucket: `prompt-packs` (private)
- Files: `starter.zip`, `professional.zip`, `enterprise.zip`

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables in Settings
6. Deploy

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

### Environment Variables

Add these in Vercel Dashboard (Settings → Environment Variables):

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `COINBASE_COMMERCE_KEY` - Your Coinbase Commerce API key
- `COINBASE_WEBHOOK_SECRET` - Your Coinbase webhook secret
- `NEXT_PUBLIC_SITE_URL` - Your domain (e.g., https://promptdeal.store)

**Optional:**
- `RESEND_API_KEY` - Your Resend API key for emails
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 measurement ID
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` - Google Search Console verification

### Webhook Configuration

After deployment, configure the webhook URL in Coinbase Commerce:

```
https://your-domain.vercel.app/api/webhook
```

## SEO Configuration

### Google Analytics 4 Setup

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (starts with G-)
3. Add to environment variables: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. Track conversions automatically (purchases, add to cart, newsletter signups)

See `docs/SEO_SETUP.md` for detailed setup instructions.

### Google Search Console Setup

1. Verify ownership at [search.google.com/search-console](https://search.google.com/search-console)
2. Get verification code
3. Add to environment variables: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
4. Submit sitemap: `https://your-domain.com/sitemap.xml`

### Automated SEO Features

- **Sitemap**: Auto-generated at `/sitemap.xml`
- **Robots.txt**: Located at `/public/robots.txt`
- **Structured Data**: JSON-LD schema for WebSite
- **Open Graph**: Social sharing meta tags
- **Canonical URLs**: On all pages
- **Meta Tags**: Optimized titles and descriptions

## Project Structure

```
promptdeal/
├── app/
│   ├── about/          # About Us page
│   ├── api/            # API routes
│   │   ├── checkout/   # Coinbase checkout
│   │   ├── webhook/    # Payment webhooks
│   │   ├── newsletter/ # Newsletter signup
│   │   └── download/   # Secure file downloads
│   ├── blog/           # Blog page
│   ├── checkout/       # Checkout page
│   ├── confirmation/   # Order confirmation
│   ├── pricing/        # Pricing packs page
│   ├── tools/          # Free marketing tools
│   ├── free-prompts/   # Free prompts download
│   ├── faq/            # FAQ page
│   ├── privacy/        # Privacy policy
│   ├── layout.tsx      # Root layout with metadata
│   ├── sitemap.ts      # Auto-generated sitemap
│   ├── manifest.ts     # PWA manifest
│   └── page.tsx        # Homepage
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── analytics.tsx   # GA4 tracking
│   ├── navigation.tsx  # Main navigation
│   ├── footer.tsx      # Footer component
│   ├── cart-drawer.tsx # Shopping cart
│   └── newsletter-form.tsx # Newsletter signup
├── lib/
│   ├── cart-context.tsx # Cart state management
│   ├── supabase/       # Supabase clients
│   │   ├── client.ts   # Browser client
│   │   ├── server.ts   # Server client
│   │   └── admin.ts    # Admin client
│   └── utils.ts        # Utility functions
├── docs/
│   └── SEO_SETUP.md    # SEO configuration guide
└── public/
    ├── robots.txt      # Search engine directives
    └── ...             # Static assets
```

## Features Breakdown

### Shopping Cart
- Add/remove items
- Adjust quantities
- Persistent storage (localStorage)
- Real-time total calculation

### Payment Flow
1. User adds packs to cart
2. Proceeds to checkout
3. Redirects to Coinbase Commerce
4. Webhook confirms payment
5. Generates secure download link (Supabase Storage signed URL)
6. Email sent with download link

### Pack Details
- **Starter Pack**: $29 - 10 essential marketing prompts
- **Professional Pack**: $79 - 25 advanced marketing prompts
- **Enterprise Pack**: $199 - 50+ comprehensive prompts

### Analytics & Tracking
- Page views and user sessions
- Conversion tracking (purchases)
- Add to cart events
- Newsletter signups
- File downloads
- Custom event tracking

## Scripts

```bash
# Development
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Type check
pnpm type-check
```

## Performance & SEO

- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO, Best Practices)
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **SEO**: Auto-generated sitemap, structured data, meta tags
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Analytics**: GA4 with conversion tracking

## Support

For issues or questions:
- Open an issue on GitHub
- Contact: support@promptdeal.com
- Documentation: See `/docs` folder

## License

This project is private and proprietary.

---

Built with ❤️ using Next.js, Supabase, and Vercel
