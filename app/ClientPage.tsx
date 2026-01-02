"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles, Lock, Zap, Code, Star, Check, Shield, Unlock } from "lucide-react"
import { PopularPromptsSection } from "@/components/popular-prompts-section"
import { NewsletterForm } from "@/components/newsletter-form"

const formulas = [
  { icon: Code, title: "Copy", description: "Copy the powerful prompt formula", color: "text-cyan-400" },
  { icon: Lock, title: "Paste", description: "Paste into your AI assistant", color: "text-purple-400" },
  { icon: Zap, title: "Activate", description: "Trigger the AI magic", color: "text-amber-400" },
  { icon: Sparkles, title: "Result", description: "Get premium quality output", color: "text-blue-400" },
]

const formulas_features = [
  { icon: Shield, title: "Secure Crypto Payment", description: "Coinbase Commerce - Instant delivery after payment" },
  { icon: Unlock, title: "Unlock Formulas", description: "Activate powerful AI commands instantly" },
  { icon: Zap, title: "Battle-Tested", description: "Used by 10,000+ marketing professionals" },
  { icon: Star, title: "Lifetime Access", description: "Download your prompts once, use forever" },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    image: "/professional-woman-diverse.png",
    rating: 5,
    text: "These prompts 10x'd our content output. We're ranking for keywords we never thought possible.",
  },
  {
    name: "Michael Chen",
    role: "E-commerce Owner",
    image: "/professional-man.jpg",
    rating: 5,
    text: "Increased our conversion rate by 40% using the product description prompts. Worth every penny.",
  },
  {
    name: "Emma Rodriguez",
    role: "Social Media Manager",
    image: "/professional-woman-smiling.png",
    rating: 5,
    text: "My engagement went through the roof. The viral content prompts are game-changing.",
  },
]

export default function Home() {
  const scrollToNewsletter = () => {
    const newsletterSection = document.getElementById("newsletter-section")
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  return (
    <>
      {/* Hero - Secret Formula Reveal */}
      <section className="relative px-4 py-20 sm:py-32 lg:py-48 sm:px-6 lg:px-8 gradient-hero overflow-hidden min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text content */}
            <div className="text-left space-y-10 lg:pr-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full">
                  <Lock className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent">EXCLUSIVE • CRYPTO ONLY • INSTANT DELIVERY</span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent leading-tight tracking-tighter">
                  Unlock The Digital Formula
                </h1>

                <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                  Powerful AI prompts crafted by elite marketers. Activate them instantly. Transform your marketing
                  forever.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/pricing">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto min-w-[240px] text-base rounded-lg h-14 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 transition-all"
                  >
                    Access Formulas
                    <Unlock className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto min-w-[240px] text-base rounded-lg h-14 border-primary/30 hover:border-primary hover:bg-primary/5 bg-transparent"
                  onClick={scrollToNewsletter}
                >
                  Get 50 Free Prompts
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-2 pt-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Trust Indicators</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-foreground">500+ Battle-Tested Prompts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-foreground">Instant Crypto Payment • Same-Day Delivery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-foreground">Lifetime Access • No Subscriptions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Visual representation of formula */}
            <div className="relative hidden lg:block">
              <div className="formula-code">
                <div className="text-sm leading-relaxed space-y-1">
                  <div>
                    <span className="text-secondary">{"// Unlock the formula"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{"const prompt = {"}</span>
                  </div>
                  <div className="pl-4">
                    <div>
                      <span className="text-accent">role:</span> <span className="text-primary">"elite marketer"</span>
                      <span className="text-muted-foreground">,</span>
                    </div>
                    <div>
                      <span className="text-accent">task:</span>{" "}
                      <span className="text-primary">"create high-impact content"</span>
                      <span className="text-muted-foreground">,</span>
                    </div>
                    <div>
                      <span className="text-accent">result:</span>{" "}
                      <span className="text-primary">"10x conversion"</span>
                      <span className="text-muted-foreground">,</span>
                    </div>
                    <div>
                      <span className="text-accent">format:</span> <span className="text-primary">"battle-tested"</span>
                      <span className="text-muted-foreground">,</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{"}"}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-secondary">{"// Activate:"}</span>
                  </div>
                  <div>
                    <span className="text-accent">activate</span>
                    <span className="text-muted-foreground">(prompt)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Copy Paste Activate */}
      <section className="px-4 py-20 sm:py-24 sm:px-6 lg:px-8 bg-card/50 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6">
              The Ritual: Copy → Paste → Activate → Result
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple 4-step process to harness the power of AI formulas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {formulas.map((formula, index) => {
              const Icon = formula.icon
              return (
                <div key={index} className="relative">
                  <div className="formula-card h-full p-8 flex flex-col items-center text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
                      <Icon className={`w-8 h-8 ${formula.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Step {index + 1}</h3>
                    <p className="text-lg font-semibold text-foreground">{formula.title}</p>
                    <p className="text-muted-foreground text-sm">{formula.description}</p>
                  </div>
                  {index < formulas.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 items-center justify-center w-6 h-6 bg-background border border-border rounded-full z-10">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-20 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6">Why Choose PromptDeal?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to master AI-powered marketing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formulas_features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="formula-card border-border hover:border-primary/50">
                  <CardContent className="p-8">
                    <div className="flex gap-6">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex-shrink-0">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular Prompts */}
      <PopularPromptsSection />

      {/* Newsletter CTA */}
      <section
        id="newsletter-section"
        className="px-4 py-20 sm:py-24 sm:px-6 lg:px-8 bg-card/50 border-t border-b border-border"
      >
        <div className="max-w-4xl mx-auto">
          <Card className="formula-card border-primary/20">
            <CardContent className="p-12 sm:p-16 text-center space-y-8">
              <div className="space-y-4">
                <Unlock className="w-16 h-16 text-accent mx-auto" />
                <h2 className="text-3xl sm:text-4xl font-black text-foreground">Download 50 Free Marketing Prompts</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Unlock instant access to our starter formula pack. No credit card required. Crypto or email.
                </p>
              </div>
              <NewsletterForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6">
              Trusted by Elite Marketers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how our formulas are transforming marketing teams worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="formula-card border-border/50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground mb-8 leading-relaxed text-lg">{testimonial.text}</p>
                  <div className="flex items-center gap-4 pt-6 border-t border-border/30">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border border-border"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 sm:py-32 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
            Ready to Unlock Your Formula?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join 10,000+ marketing professionals using PromptDeal formulas to dominate their market
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/pricing">
              <Button
                size="lg"
                className="text-base min-w-[240px] h-14 rounded-lg bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50"
              >
                Access All Formulas
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-base min-w-[240px] h-14 rounded-lg border-primary/30 bg-transparent"
              onClick={scrollToNewsletter}
            >
              Start Free
            </Button>
          </div>

          <div className="pt-8 border-t border-border/30">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Secure Crypto Payments
            </p>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
              <div className="crypto-badge">
                <span className="font-mono">₿</span>
                Bitcoin
              </div>
              <div className="crypto-badge">
                <span className="font-mono">◆</span>
                Ethereum
              </div>
              <div className="crypto-badge">
                <span className="font-mono">◈</span>
                USDC
              </div>
              <div className="crypto-badge">
                <span className="font-mono">◎</span>
                Solana
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
