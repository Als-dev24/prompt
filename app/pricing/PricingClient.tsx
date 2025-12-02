"use client"

import { useState } from "react"
import { Check, X, Info } from "lucide-react"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Button } from "@/components/ui/button"

const packs = [
  {
    id: "starter-pack",
    name: "Starter Pack",
    price: 29,
    description: "Perfect for freelancers and small businesses",
    promptCount: 15,
    detailedDescription:
      "Kickstart your digital marketing journey with 15 carefully curated AI prompts designed for freelancers and small businesses. Get instant access to proven templates that generate engaging social media content, compelling email campaigns, and SEO-optimized copy.",
    whatYouGet: [
      "5 Social Media Content Prompts (Instagram, LinkedIn, Twitter)",
      "4 Email Marketing Templates (Welcome series, Promotions, Newsletters)",
      "3 SEO Content Optimization Prompts",
      "2 Product Description Generators",
      "1 Brand Voice Development Prompt",
    ],
    features: [
      "15 Premium AI Prompts",
      "Social Media Content Generation",
      "Email Marketing Templates",
      "Basic SEO Optimization",
      "Instant Download",
      "Pay with Crypto",
      "Lifetime Access",
      "Commercial Use Rights",
    ],
    popular: false,
  },
  {
    id: "professional-pack",
    name: "Professional Pack",
    price: 79,
    description: "Best for marketing agencies and teams",
    promptCount: 50,
    detailedDescription:
      "Scale your marketing operations with 50 professional-grade AI prompts covering every aspect of digital marketing. Perfect for agencies managing multiple clients and marketing teams executing complex campaigns.",
    whatYouGet: [
      "15 Advanced Social Media Strategy Prompts",
      "10 Email Automation & Funnel Prompts",
      "8 SEO & Content Marketing Prompts",
      "7 Google Ads & Facebook Ads Copy Generators",
      "5 Landing Page & Sales Copy Templates",
      "5 Bonus Video Script & YouTube Prompts",
    ],
    features: [
      "50 Premium AI Prompts",
      "Advanced Social Media Strategies",
      "Complete Email Automation",
      "Advanced SEO & Content",
      "Google Ads & Facebook Ads",
      "Landing Page Copy",
      "Instant Download",
      "Pay with Crypto",
      "Lifetime Access",
      "Commercial Use Rights",
      "Priority Support",
      "Monthly Updates",
    ],
    popular: true,
  },
  {
    id: "enterprise-pack",
    name: "Enterprise Pack",
    price: 199,
    description: "For large teams and enterprises",
    promptCount: 150,
    detailedDescription:
      "The complete AI marketing arsenal for enterprises and large teams. 150+ prompts covering every marketing channel, strategy, and use case. Build comprehensive multi-channel campaigns with data-driven insights.",
    whatYouGet: [
      "40 Multi-Channel Campaign Prompts",
      "25 Brand Strategy & Positioning Prompts",
      "20 Customer Journey & Persona Development",
      "20 Data Analysis & Market Research Prompts",
      "15 Conversion Rate Optimization Templates",
      "15 Competitor Analysis & SWOT Prompts",
      "15 Exclusive Advanced Strategy Prompts",
    ],
    features: [
      "150+ Premium AI Prompts",
      "Complete Marketing Suite",
      "Multi-Channel Campaigns",
      "Brand Strategy & Positioning",
      "Customer Journey Mapping",
      "Data-Driven Marketing",
      "Conversion Rate Optimization",
      "Competitor Analysis",
      "Instant Download",
      "Pay with Crypto",
      "Lifetime Access",
      "Commercial Use Rights",
      "Priority Support",
      "Weekly Updates",
      "Exclusive Prompts",
    ],
    popular: false,
  },
]

export default function PricingClient() {
  const [selectedPack, setSelectedPack] = useState<(typeof packs)[0] | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Digital Marketing AI Prompt Packs</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Everything you need to dominate digital marketing with AI. Choose your pack and start creating winning
              campaigns today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packs.map((pack) => (
              <div
                key={pack.id}
                className={`relative border rounded-2xl p-8 ${
                  pack.popular ? "border-primary shadow-lg shadow-primary/20 scale-105" : "border-border"
                }`}
              >
                {pack.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{pack.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{pack.description}</p>
                  <div className="text-4xl font-bold text-primary mb-2">${pack.price}</div>
                  <p className="text-sm text-muted-foreground">One-time payment · {pack.promptCount} prompts</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {pack.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-3">
                  <Button variant="ghost" className="flex-1" onClick={() => setSelectedPack(pack)}>
                    <Info className="mr-2 h-4 w-4" />
                    Details
                  </Button>

                  <AddToCartButton
                    item={{
                      id: pack.id,
                      title: pack.name,
                      price: pack.price,
                      category: "Digital Marketing Pack",
                    }}
                    variant={pack.popular ? "default" : "outline"}
                    className="flex-1"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-4">All Payments Secured by Crypto</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              We accept Bitcoin, Ethereum, USDC, and other major cryptocurrencies via Coinbase Commerce. Fast, secure,
              and anonymous transactions.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No Subscription</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedPack && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedPack.name}</h2>
                <p className="text-muted-foreground">{selectedPack.description}</p>
              </div>
              <button
                onClick={() => setSelectedPack(null)}
                className="p-2 hover:bg-muted rounded-lg transition"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-bold text-primary">${selectedPack.price}</span>
                  <span className="text-muted-foreground">One-time payment</span>
                </div>
                <p className="text-foreground leading-relaxed">{selectedPack.detailedDescription}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">What You Get</h3>
                <ul className="space-y-3">
                  {selectedPack.whatYouGet?.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">All Features</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedPack.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <AddToCartButton
                  item={{
                    id: selectedPack.id,
                    title: selectedPack.name,
                    price: selectedPack.price,
                    category: "Digital Marketing Pack",
                  }}
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
