import type { Metadata } from "next"
import ToolsClient from "./ToolsClient"

export const metadata: Metadata = {
  title: "Free Marketing Tools - AI-Powered Generators | PromptDeal",
  description:
    "Free AI marketing tools: hashtag generator, caption writer, email subject lines, SEO meta descriptions. Powered by ChatGPT. No signup required.",
  keywords: [
    "free marketing tools",
    "AI hashtag generator",
    "caption generator",
    "SEO tools free",
    "marketing automation",
  ],
  openGraph: {
    title: "Free AI Marketing Tools - PromptDeal",
    description: "Access 6+ free AI-powered marketing tools. No signup required.",
    url: "https://promptdeal.store/tools",
    type: "website",
  },
  alternates: {
    canonical: "https://promptdeal.store/tools",
  },
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen">
      <section className="px-4 py-16 sm:py-20 sm:px-6 lg:px-8 gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">Free Marketing Tools</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful AI-driven tools to supercharge your marketing efforts. All tools are 100% free to use.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
        <ToolsClient />
      </section>
    </div>
  )
}
