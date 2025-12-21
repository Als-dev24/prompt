import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "PromptDeal - Boost Your Digital Marketing With AI-Powered Prompts",
  description:
    "Create better ads, content, SEO and conversions using optimized AI prompts. 250+ prompts optimized for ChatGPT. Marketing, Ads, SEO, E-commerce.",
}

export default function Home() {
  return <ClientPage />
}
