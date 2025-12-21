import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Blog - AI Prompts, Tutorials & Marketing Guides | PromptDeal",
  description:
    "Expert guides on AI prompt engineering, ChatGPT prompts, marketing automation, and AI content creation. Learn from professionals and boost your results.",
  keywords: [
    "AI prompts blog",
    "prompt engineering tutorials",
    "ChatGPT marketing",
    "AI content creation",
    "marketing automation guides",
  ],
  openGraph: {
    title: "PromptDeal Blog - AI Marketing Insights",
    description: "Expert guides and tutorials on AI prompts and marketing automation",
    url: "https://promptdeal.store/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://promptdeal.store/blog",
  },
}

export default function BlogPage() {
  const posts = [
    {
      id: "1",
      title: "10 ChatGPT Prompts That Will Transform Your Marketing Strategy",
      excerpt:
        "Discover powerful prompts that help you create compelling marketing campaigns, social media content, and email sequences that convert.",
      category: "Marketing",
      date: "2024-01-15",
      readTime: "5 min read",
      image: "/marketing-strategy-brainstorm.png",
    },
    {
      id: "2",
      title: "The Complete Guide to Prompt Engineering for Beginners",
      excerpt:
        "Learn the fundamentals of crafting effective AI prompts. From basic structure to advanced techniques that get better results.",
      category: "Tutorials",
      date: "2024-01-12",
      readTime: "8 min read",
      image: "/prompt-engineering-guide.jpg",
    },
    {
      id: "3",
      title: "How to Use AI Prompts to Generate Viral Social Media Content",
      excerpt:
        "Step-by-step guide to creating engaging posts, reels, and stories that resonate with your audience using AI-powered prompts.",
      category: "Social Media",
      date: "2024-01-10",
      readTime: "6 min read",
      image: "/social-media-content.png",
    },
    {
      id: "4",
      title: "Why Crypto Payments Are the Future of Digital Product Sales",
      excerpt:
        "Explore the benefits of accepting cryptocurrency for digital products: lower fees, instant payments, and global accessibility.",
      category: "Crypto",
      date: "2024-01-08",
      readTime: "4 min read",
      image: "/cryptocurrency-payments.jpg",
    },
    {
      id: "5",
      title: "5 Midjourney Prompts for Creating Stunning Brand Visuals",
      excerpt:
        "Master the art of visual AI with these proven Midjourney prompts that help you create professional-quality brand assets.",
      category: "Design",
      date: "2024-01-05",
      readTime: "7 min read",
      image: "/midjourney-brand-design.jpg",
    },
    {
      id: "6",
      title: "Maximizing ROI with AI: Real Success Stories from Our Users",
      excerpt:
        "See how businesses and creators are using premium AI prompts to save time, increase productivity, and grow their revenue.",
      category: "Case Studies",
      date: "2024-01-03",
      readTime: "10 min read",
      image: "/business-success-ai.jpg",
    },
  ]

  const categories = ["All", "Marketing", "Tutorials", "Social Media", "Crypto", "Design", "Case Studies"]

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 px-4 gradient-hero">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">PromptDeal</span>{" "}
            Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Guides, tutorials, and insights on AI prompts, prompt engineering, and getting the most out of AI tools.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 -mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <Button key={category} variant="outline" size="sm" className="rounded-full bg-transparent">
                {category}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="border-2 border-border rounded-3xl overflow-hidden hover:border-primary transition-all duration-300 card-hover bg-card"
              >
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold mb-3 hover:text-primary transition text-balance">{post.title}</h2>
                  <p className="text-muted-foreground mb-4 text-sm text-pretty leading-relaxed">{post.excerpt}</p>

                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                  >
                    Read Article <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="rounded-xl bg-transparent">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="py-20 px-4 bg-muted/30 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get Weekly AI Prompt Tips</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter for exclusive prompts, tutorials, and strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="flex-1 h-14 rounded-xl text-base" />
            <Button size="lg" className="h-14 rounded-xl px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
