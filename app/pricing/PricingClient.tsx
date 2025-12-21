"use client"

import { useState, useEffect } from "react"
import { Check, X, Info, Loader2 } from "lucide-react"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const packs = [
  {
    id: "starter-pack",
    name: "Starter",
    price: 29,
    packType: "starter",
    description: "Perfect for freelancers and small businesses",
    promptCount: 10,
    detailedDescription:
      "Kickstart your digital marketing journey with 10 carefully curated AI prompts designed for freelancers and small businesses. Get instant access to proven templates that generate engaging social media content, compelling email campaigns, and SEO-optimized copy.",
    whatYouGet: [
      "10 Premium AI Prompts",
      "Social Media Content Templates",
      "Email Marketing Sequences",
      "SEO Optimization Prompts",
      "Product Description Generators",
      "Brand Voice Development",
    ],
    features: ["10 prompts", "Instant Download", "Lifetime Access", "Commercial Use", "Email Support"],
    popular: false,
  },
  {
    id: "professional-pack",
    name: "Pro",
    price: 79,
    packType: "professional",
    description: "Best for marketing agencies and teams",
    promptCount: 25,
    detailedDescription:
      "Scale your marketing operations with 25+ professional-grade AI prompts covering every aspect of digital marketing. Perfect for agencies managing multiple clients and marketing teams executing complex campaigns.",
    whatYouGet: [
      "25+ Premium AI Prompts",
      "Advanced Social Media Strategies",
      "Complete Email Automation",
      "Advanced SEO & Content Marketing",
      "Google Ads & Facebook Ads Generators",
      "Landing Page Templates",
      "Monthly Content Updates",
    ],
    features: [
      "25+ prompts",
      "Monthly Updates",
      "Exclusive Tools",
      "Priority Support",
      "Lifetime Access",
      "Commercial Use",
      "API Access",
    ],
    popular: true,
  },
  {
    id: "enterprise-pack",
    name: "Business",
    price: 199,
    packType: "enterprise",
    description: "For large teams and enterprises",
    promptCount: 50,
    detailedDescription:
      "The complete AI marketing arsenal for enterprises and large teams. 50+ prompts covering every marketing channel, strategy, and use case. Build comprehensive multi-channel campaigns with data-driven insights.",
    whatYouGet: [
      "50+ Premium AI Prompts",
      "Multi-Channel Campaign Prompts",
      "Brand Strategy & Positioning",
      "Customer Journey Development",
      "Data Analysis & Market Research",
      "Conversion Rate Optimization",
      "Competitor Analysis Tools",
      "API Access for Integrations",
    ],
    features: [
      "50+ Prompts",
      "Weekly Updates",
      "Commercial License",
      "API Access",
      "Priority Support",
      "Exclusive Prompts",
      "Team Collaboration",
      "Advanced Analytics",
    ],
    popular: false,
  },
]

interface Prompt {
  id: string
  name: string
  description: string
  category: string
  prompt_content: string
  price: number
  pack_type: string
}

export default function PricingClient() {
  const [selectedPack, setSelectedPack] = useState<(typeof packs)[0] | null>(null)
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [loadingPrompts, setLoadingPrompts] = useState(false)

  useEffect(() => {
    if (selectedPack) {
      fetchPrompts(selectedPack.packType)
    }
  }, [selectedPack])

  const fetchPrompts = async (packType: string) => {
    setLoadingPrompts(true)
    try {
      const response = await fetch(`/api/prompts?pack=${packType}`)
      const data = await response.json()
      if (data.success) {
        setPrompts(data.prompts)
      }
    } catch (error) {
      console.error("[v0] Error fetching prompts:", error)
    } finally {
      setLoadingPrompts(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 px-4 gradient-hero">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI Marketing Pack
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty mb-8">
            Everything you need to dominate digital marketing with AI. One-time payment, lifetime access.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 -mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {packs.map((pack) => (
              <Card
                key={pack.id}
                className={`relative border-2 rounded-3xl overflow-hidden transition-all duration-300 ${
                  pack.popular
                    ? "border-primary shadow-2xl shadow-primary/20 scale-105 bg-gradient-to-b from-primary/5 to-transparent"
                    : "border-border hover:border-primary/50 card-hover"
                }`}
              >
                {pack.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <CardContent className={`p-8 ${pack.popular ? "pt-16" : "pt-8"}`}>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{pack.name}</h3>
                    <p className="text-muted-foreground text-sm mb-6">{pack.description}</p>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-5xl font-bold text-primary">${pack.price}</span>
                      <span className="text-muted-foreground">/one-time</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{pack.promptCount} prompts included</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pack.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-xl bg-transparent"
                      onClick={() => setSelectedPack(pack)}
                    >
                      <Info className="mr-2 h-4 w-4" />
                      Details
                    </Button>

                    <AddToCartButton
                      item={{
                        id: pack.id,
                        title: pack.name,
                        price: pack.price,
                        category: "Digital Marketing Pack",
                        packType: pack.packType,
                      }}
                      variant={pack.popular ? "default" : "outline"}
                      className="flex-1 rounded-xl"
                      size="sm"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payment security section */}
          <div className="mt-20 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Secure Crypto Payments Only</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              We accept Bitcoin, Ethereum, USDC, Solana and other cryptocurrencies via Coinbase Commerce. Fast, secure,
              and private transactions.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="crypto-card rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">₿</div>
                <p className="font-semibold">Bitcoin</p>
                <p className="text-xs text-muted-foreground">BTC</p>
              </div>
              <div className="crypto-card rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">Ξ</div>
                <p className="font-semibold">Ethereum</p>
                <p className="text-xs text-muted-foreground">ETH</p>
              </div>
              <div className="crypto-card rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">◎</div>
                <p className="font-semibold">Solana</p>
                <p className="text-xs text-muted-foreground">SOL</p>
              </div>
              <div className="crypto-card rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">$</div>
                <p className="font-semibold">USDC</p>
                <p className="text-xs text-muted-foreground">Stablecoin</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No Subscription</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Lifetime Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedPack && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border-2 border-border rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-background/95 backdrop-blur-xl border-b border-border p-6 flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">{selectedPack.name} Pack</h2>
                <p className="text-muted-foreground">{selectedPack.description}</p>
              </div>
              <button
                onClick={() => setSelectedPack(null)}
                className="p-2 hover:bg-muted rounded-xl transition"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              <div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-5xl font-bold text-primary">${selectedPack.price}</span>
                  <span className="text-muted-foreground">one-time payment</span>
                </div>
                <p className="text-foreground text-lg leading-relaxed">{selectedPack.detailedDescription}</p>
              </div>

              <div className="bg-muted/30 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-6">What's Included</h3>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {selectedPack.whatYouGet?.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">All Features</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedPack.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">Included Prompts ({prompts.length})</h3>
                {loadingPrompts ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : prompts.length > 0 ? (
                  <div className="space-y-4">
                    {prompts.map((prompt) => (
                      <div key={prompt.id} className="bg-muted/30 rounded-2xl p-5 hover:bg-muted/50 transition">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h4 className="font-semibold text-lg">{prompt.name}</h4>
                          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full whitespace-nowrap">
                            {prompt.category}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{prompt.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No prompts available yet. Please run the database scripts.
                  </p>
                )}
              </div>

              <div className="pt-4 flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 rounded-xl bg-transparent"
                  onClick={() => setSelectedPack(null)}
                >
                  Close
                </Button>
                <AddToCartButton
                  item={{
                    id: selectedPack.id,
                    title: selectedPack.name,
                    price: selectedPack.price,
                    category: "Digital Marketing Pack",
                    packType: selectedPack.packType,
                  }}
                  size="lg"
                  className="flex-1 rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
