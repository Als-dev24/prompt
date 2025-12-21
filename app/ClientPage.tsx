"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
  Star,
  Check,
  Search,
  Hash,
  Lightbulb,
  PenTool,
  BarChart,
  MessageSquare,
} from "lucide-react"
import { PopularPromptsSection } from "@/components/popular-prompts-section"
import { NewsletterForm } from "@/components/newsletter-form"

const categories = [
  { icon: Search, title: "SEO", description: "Rank higher on search engines", color: "text-blue-500" },
  { icon: MessageSquare, title: "Social Media", description: "Viral content strategies", color: "text-purple-500" },
  { icon: Target, title: "Ads", description: "High-converting ad copy", color: "text-green-500" },
  { icon: PenTool, title: "Copywriting", description: "Persuasive messaging", color: "text-orange-500" },
  { icon: TrendingUp, title: "E-commerce", description: "Product descriptions", color: "text-pink-500" },
  { icon: BarChart, title: "Analytics", description: "Data-driven insights", color: "text-cyan-500" },
]

const tools = [
  { icon: Lightbulb, title: "AI Title Generator", description: "Create catchy headlines" },
  { icon: Hash, title: "Hashtag Generator", description: "Trending hashtags instantly" },
  { icon: Search, title: "SEO Keyword Tool", description: "Find profitable keywords" },
  { icon: Sparkles, title: "Content Ideas Generator", description: "Never run out of ideas" },
  { icon: PenTool, title: "Ad Copy Creator", description: "High-converting ads" },
  { icon: TrendingUp, title: "Trend Analyzer", description: "Stay ahead of trends" },
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
  {
    name: "David Kim",
    role: "SEO Specialist",
    image: "/professional-man-glasses.jpg",
    rating: 5,
    text: "Finally, SEO prompts that actually understand how Google works. Highly recommend.",
  },
  {
    name: "Lisa Thompson",
    role: "Freelance Copywriter",
    image: "/professional-woman-creative.png",
    rating: 5,
    text: "Cut my writing time in half while improving quality. These prompts are a copywriter's dream.",
  },
  {
    name: "James Wilson",
    role: "Agency Owner",
    image: "/professional-man-suit.png",
    rating: 5,
    text: "We use these prompts for all our clients. The ROI is incredible and they keep getting updated.",
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
      <section className="relative px-4 py-16 sm:py-24 lg:py-32 sm:px-6 lg:px-8 gradient-hero overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div className="text-left space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Boost Your Digital Marketing With{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AI-Powered Prompts
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                Create better ads, content, SEO and conversions using optimized prompts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto min-w-[220px] text-base rounded-xl h-14"
                  onClick={scrollToNewsletter}
                >
                  Download 50 Free Prompts
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto min-w-[200px] text-base rounded-xl h-14 bg-transparent"
                  >
                    Browse Store
                  </Button>
                </Link>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground font-medium">250+ Prompts</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground font-medium">Optimized for ChatGPT</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-foreground font-medium">Marketing – Ads – SEO – E-commerce</span>
                </div>
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <img
                  src="/3d-robot-ai-marketing-dashboard-holographic.jpg"
                  alt="AI Marketing Dashboard"
                  className="w-full h-full object-contain animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Prompt Categories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our expertly crafted prompt categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-primary transition-all duration-300 cursor-pointer card-hover rounded-2xl"
                >
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl mb-4">
                      <Icon className={`w-8 h-8 ${category.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{category.title}</h3>
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <PopularPromptsSection />

      <section className="px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Free Marketing Tools</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful AI tools to boost your marketing efforts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-primary transition-all duration-300 cursor-pointer card-hover rounded-2xl"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{tool.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                        <Link href="/tools">
                          <Button size="sm" variant="ghost" className="rounded-xl">
                            Try Tool <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/tools">
              <Button size="lg" variant="outline" className="rounded-xl bg-transparent">
                View All Tools
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="newsletter-section" className="px-4 py-16 sm:py-20 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 rounded-3xl overflow-hidden">
            <CardContent className="p-8 sm:p-12 text-center">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Receive 50 Free Marketing Prompts Every Week
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 10,000+ marketers getting exclusive prompts, tips, and strategies delivered to their inbox.
              </p>
              <NewsletterForm />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Loved by Marketers Worldwide
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">See what our customers are saying</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed">{testimonial.text}</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
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

      {/* CTA section */}
      <section className="px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to 10x Your Marketing Results?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of marketers using PromptDeal to create better campaigns faster
          </p>
          <Link href="/pricing">
            <Button size="lg" className="text-base min-w-[220px] h-14 rounded-xl">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>

          <div className="mt-12 pt-12 border-t">
            <p className="text-sm text-muted-foreground mb-4">Accepted Cryptocurrencies</p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              <span className="text-sm font-medium text-foreground">Bitcoin (BTC)</span>
              <span className="text-sm font-medium text-foreground">Ethereum (ETH)</span>
              <span className="text-sm font-medium text-foreground">USDC</span>
              <span className="text-sm font-medium text-foreground">Solana (SOL)</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
