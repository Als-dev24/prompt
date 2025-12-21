import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Zap, Shield, Clock, Users } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us - AI Prompts Marketplace | PromptDeal",
  description:
    "Learn about PromptDeal's mission to provide professional-grade AI prompts for marketers. Crypto payments, instant delivery, lifetime access. Founded by marketing experts.",
  keywords: ["about promptdeal", "AI prompts company", "crypto payments digital products", "marketing AI tools"],
  openGraph: {
    title: "About PromptDeal - AI Marketing Prompts",
    description: "Professional AI prompts for marketers. Pay with crypto, own forever.",
    url: "https://promptdeal.store/about",
    type: "website",
  },
  alternates: {
    canonical: "https://promptdeal.store/about",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Empowering Marketers with AI Innovation
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              PromptDeal was founded on a simple belief: every marketer deserves access to professional-grade AI prompts
              without breaking the bank or dealing with subscriptions.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              In 2024, as AI tools became essential for digital marketing, we noticed a problem. Marketers were spending
              hours crafting the perfect prompts, only to get mediocre results. Premium prompt libraries existed, but
              they came with monthly subscriptions, restrictive licenses, and complicated payment systems.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We decided to do things differently. PromptDeal was born from the idea that professional AI prompts should
              be accessible, affordable, and owned by you forever. No subscriptions. No hidden fees. Just pay once with
              crypto and download instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="border border-border rounded-2xl p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Results</h3>
              <p className="text-muted-foreground">
                Our prompts are battle-tested by marketing professionals and deliver consistent, high-quality outputs
                from day one.
              </p>
            </div>

            <div className="border border-border rounded-2xl p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Crypto-First</h3>
              <p className="text-muted-foreground">
                We accept Bitcoin, Ethereum, USDC, and more. Fast, secure, and anonymous transactions via Coinbase
                Commerce.
              </p>
            </div>

            <div className="border border-border rounded-2xl p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lifetime Access</h3>
              <p className="text-muted-foreground">
                Buy once, own forever. All prompts include commercial use rights and lifetime updates at no extra cost.
              </p>
            </div>

            <div className="border border-border rounded-2xl p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Driven</h3>
              <p className="text-muted-foreground">
                Our prompts are constantly refined based on feedback from thousands of marketers worldwide.
              </p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Marketing?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of marketers who are saving time and creating better content with our premium AI prompt
              packs.
            </p>
            <Link href="/pricing">
              <Button size="lg" className="text-lg px-8">
                View Pricing Packs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
