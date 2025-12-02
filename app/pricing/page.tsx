import type { Metadata } from "next"
import PricingClient from "./PricingClient"

export const metadata: Metadata = {
  title: "Pricing - PromptDeal",
  description: "Premium AI prompts bundles for digital marketing. Pay with crypto, download instantly.",
}

export default function PricingPage() {
  return <PricingClient />
}
