import type { Metadata } from "next"
import PricingClient from "./PricingClient"

export const metadata: Metadata = {
  title: "Pricing & Plans - Premium AI Marketing Prompts | PromptDeal",
  description:
    "Choose your perfect AI prompt bundle. Starter ($9), Professional ($19), or Enterprise ($29) packs. Pay with crypto, instant delivery, lifetime access.",
  keywords: [
    "AI prompts pricing",
    "marketing prompts packages",
    "crypto payment prompts",
    "ChatGPT prompts bundle",
    "business prompts",
  ],
  openGraph: {
    title: "PromptDeal Pricing - AI Marketing Prompts",
    description: "Premium AI marketing prompt bundles starting at $9. Pay with crypto, instant delivery.",
    url: "https://promptdeal.store/pricing",
    type: "website",
  },
  alternates: {
    canonical: "https://promptdeal.store/pricing",
  },
}

export default function PricingPage() {
  return <PricingClient />
}
