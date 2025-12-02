# PromptDeal - AI Prompt Marketplace

A modern marketplace for premium AI prompts focused on digital marketing. Built with Next.js 16, React 19, and Tailwind CSS. Accepts cryptocurrency payments via Coinbase Commerce.

## Features

- 3 Digital Marketing Prompt Packs (Starter, Professional, Enterprise)
- Shopping Cart System with localStorage persistence
- Cryptocurrency Payment Integration (Coinbase Commerce)
- Responsive Design with modern UI/UX
- SEO Optimized
- Email Notifications (Resend API)
- Blog and About Us pages

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Payments**: Coinbase Commerce API
- **Email**: Resend API
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm (recommended) or npm
- Coinbase Commerce account
- Resend account (optional for emails)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-username/promptdeal.git
cd promptdeal
\`\`\`

2. Install dependencies:
\`\`\`bash
pnpm install
# or
npm install
\`\`\`

3. Create a `.env.local` file in the root directory:
\`\`\`env
COINBASE_COMMERCE_KEY=your_coinbase_api_key
COINBASE_WEBHOOK_SECRET=your_coinbase_webhook_secret
RESEND_API_KEY=your_resend_api_key
\`\`\`

4. Run the development server:
\`\`\`bash
pnpm dev
# or
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables in Settings
6. Deploy

### Option 2: Deploy via Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
\`\`\`

### Environment Variables

Add these in Vercel Dashboard (Settings → Environment Variables):

- `COINBASE_COMMERCE_KEY` - Your Coinbase Commerce API key
- `COINBASE_WEBHOOK_SECRET` - Your Coinbase webhook secret
- `RESEND_API_KEY` - Your Resend API key (optional)

### Webhook Configuration

After deployment, configure the webhook URL in Coinbase Commerce:

\`\`\`
https://your-domain.vercel.app/api/webhook
\`\`\`

## Project Structure

\`\`\`
promptdeal/
├── app/
│   ├── about/          # About Us page
│   ├── api/            # API routes (checkout, webhook, etc.)
│   ├── blog/           # Blog page
│   ├── checkout/       # Checkout page
│   ├── confirmation/   # Order confirmation
│   ├── pricing/        # Pricing packs page
│   ├── layout.tsx      # Root layout with metadata
│   └── page.tsx        # Homepage
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── navigation.tsx  # Main navigation
│   ├── footer.tsx      # Footer component
│   └── cart-drawer.tsx # Shopping cart
├── lib/
│   ├── cart-context.tsx # Cart state management
│   └── utils.ts        # Utility functions
└── public/             # Static assets
\`\`\`

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
5. Email sent with download link

### Pack Details
- Starter Pack: $29 (50 prompts)
- Professional Pack: $79 (150 prompts)
- Enterprise Pack: $199 (300+ prompts)

## Scripts

\`\`\`bash
# Development
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
\`\`\`

## Support

For issues or questions:
- Open an issue on GitHub
- Contact: support@promptdeal.com

## License

This project is private and proprietary.

---

Built with ❤️ using Next.js and Vercel
