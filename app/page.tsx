import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"
import { ArrowRight, Sparkles, Zap, Shield, Target } from "lucide-react"

export const metadata: Metadata = {
  title: "PromptDeal - Premium AI Prompts for Digital Marketing",
  description: "Discover battle-tested AI prompt packs for digital marketing. Pay with crypto, download instantly.",
  openGraph: {
    title: "PromptDeal - Premium AI Prompts",
    description: "Battle-tested AI prompts for digital marketers. Pay with crypto.",
    type: "website",
  },
}

const featuredPrompts = [
  {
    id: 1,
    title: "Social Media Content Machine",
    category: "Social Media",
    price: 4.99,
    description: "Generate 30 days of viral content ideas",
    sales: "1.2k+ sold",
  },
  {
    id: 2,
    title: "E-commerce Product Optimization",
    category: "E-commerce",
    price: 6.99,
    description: "Convert more visitors with proven copy",
    sales: "890+ sold",
  },
  {
    id: 3,
    title: "SEO Blog Post Framework",
    category: "SEO",
    price: 5.99,
    description: "Write blog posts that rank on Google",
    sales: "2.1k+ sold",
  },
]

const features = [
  {
    icon: Sparkles,
    title: "Battle-Tested",
    description: "Every prompt has been tested by real marketers",
  },
  {
    icon: Zap,
    title: "Instant Access",
    description: "Download immediately after purchase",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Pay with Bitcoin, Ethereum, or USDC",
  },
  {
    icon: Target,
    title: "Marketing Focused",
    description: "Specifically designed for digital marketing",
  },
]

export default function Home() {
  return (
    <>
      <section className="relative px-4 py-20 sm:py-28 lg:py-36 sm:px-6 lg:px-8 gradient-hero">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full text-sm text-secondary-foreground mb-8">
            <Sparkles className="w-4 h-4" />
            <span>150+ Premium Digital Marketing AI Prompts</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
            AI Prompt Packs for <span className="text-primary">Digital Marketing</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto text-balance">
            Battle-tested prompt packs for social media, email marketing, SEO, and paid ads. Built by marketers, for
            marketers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/pricing">
              <Button size="lg" className="w-full sm:w-auto min-w-[200px] text-base">
                View Pricing Packs
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[200px] text-base bg-transparent">
                Read the Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-foreground mb-2">150+</p>
              <p className="text-base text-muted-foreground">Marketing Prompts</p>
            </div>
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-foreground mb-2">5k+</p>
              <p className="text-base text-muted-foreground">Happy Marketers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-foreground mb-2">4.9/5</p>
              <p className="text-base text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Featured Prompts</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our most popular prompts, trusted by thousands of marketers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredPrompts.map((prompt) => (
              <Link key={prompt.id} href={`/prompt/${prompt.id}`} className="group">
                <Card className="h-full border-2 hover:border-primary hover:shadow-lg transition-all duration-200">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="px-3 py-1 bg-secondary rounded-full">
                        <span className="text-xs font-medium text-secondary-foreground">{prompt.category}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{prompt.sales}</span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{prompt.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{prompt.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-2xl font-bold text-primary">${prompt.price}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/catalog">
              <Button size="lg" variant="outline">
                View All Prompts
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to level up your marketing?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of marketers using PromptDeal to create better campaigns faster
          </p>
          <Link href="/pricing">
            <Button size="lg" className="text-base min-w-[200px]">
              View Pricing Packs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>

          <div className="mt-12 pt-12 border-t">
            <p className="text-sm text-muted-foreground mb-4">Accepted Cryptocurrencies</p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              <span className="text-sm font-medium text-foreground">Bitcoin (BTC)</span>
              <span className="text-sm font-medium text-foreground">Ethereum (ETH)</span>
              <span className="text-sm font-medium text-foreground">USDC</span>
              <span className="text-sm font-medium text-foreground">Dogecoin</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
