"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check } from "lucide-react"
import Link from "next/link"

const popularPrompts = [
  {
    id: 1,
    title: "Viral Social Media Content Pack",
    description: "30 days of engaging posts that drive engagement",
    tags: ["#SocialMedia", "#Viral", "#Engagement"],
    category: "Social Media",
    prompt:
      "Create a 30-day social media content calendar with engaging posts designed to maximize engagement and reach on Instagram, Facebook, and Twitter.",
  },
  {
    id: 2,
    title: "SEO Blog Post Optimizer",
    description: "Rank on page 1 of Google with proven templates",
    tags: ["#SEO", "#Blogging", "#Google"],
    category: "SEO",
    prompt:
      "Write a comprehensive SEO-optimized blog post about [TOPIC] that targets the keyword [KEYWORD] and follows Google's E-E-A-T guidelines.",
  },
  {
    id: 3,
    title: "Facebook Ads Masterclass",
    description: "Scale your ad spend profitably with these prompts",
    tags: ["#Ads", "#Facebook", "#ROI"],
    category: "Ads",
    prompt:
      "Create 5 high-converting Facebook ad variations for [PRODUCT/SERVICE] targeting [AUDIENCE] with different hooks and calls-to-action.",
  },
  {
    id: 4,
    title: "E-commerce Product Descriptions",
    description: "Convert browsers into buyers with compelling copy",
    tags: ["#Ecommerce", "#Sales", "#Conversion"],
    category: "E-commerce",
    prompt:
      "Write a compelling product description for [PRODUCT] that highlights benefits, creates urgency, and addresses customer pain points to increase conversions.",
  },
  {
    id: 5,
    title: "Email Marketing Sequences",
    description: "Automated email campaigns that sell",
    tags: ["#Email", "#Automation", "#Marketing"],
    category: "Marketing",
    prompt:
      "Create a 7-email welcome sequence for [BUSINESS] that builds rapport, provides value, and converts subscribers into customers.",
  },
  {
    id: 6,
    title: "LinkedIn Lead Generation",
    description: "Build authority and generate B2B leads",
    tags: ["#LinkedIn", "#B2B", "#Leads"],
    category: "Social Media",
    prompt:
      "Generate 10 LinkedIn posts that position me as a thought leader in [INDUSTRY] and attract B2B leads through value-driven content.",
  },
]

export function PopularPromptsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Popular")
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const filteredPrompts = popularPrompts.filter((prompt) => {
    const matchesCategory =
      selectedCategory === "Popular" || selectedCategory === "New" || prompt.category === selectedCategory
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleCopy = async (prompt: (typeof popularPrompts)[0]) => {
    try {
      await navigator.clipboard.writeText(prompt.prompt)
      setCopiedId(prompt.id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const categories = ["Popular", "New", "SEO", "Marketing", "Ads", "Social Media", "E-commerce"]

  return (
    <section className="px-4 py-16 sm:py-20 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Popular Prompts</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover our most used and loved prompts
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search prompts..."
                className="pl-12 h-14 rounded-xl text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "outline" : "ghost"}
                className={`rounded-full ${selectedCategory === category ? "bg-transparent" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <Card
              key={prompt.id}
              className="border-2 hover:border-primary transition-all duration-300 card-hover rounded-2xl"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="px-3 py-1 bg-secondary/10 text-secondary rounded-full">
                    <span className="text-xs font-medium">{prompt.category}</span>
                  </div>
                </div>
                <CardTitle className="text-xl">{prompt.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{prompt.description}</p>
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs text-primary font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-xl bg-transparent"
                    onClick={() => handleCopy(prompt)}
                  >
                    {copiedId === prompt.id ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copied
                      </>
                    ) : (
                      "Copy"
                    )}
                  </Button>
                  <Link href={`/pricing`} className="flex-1">
                    <Button size="sm" className="w-full rounded-xl">
                      View More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
