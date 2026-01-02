import type { Metadata } from "next"
import RefundPolicyClientPage from "./refund-policy-client-page"

export const metadata: Metadata = {
  title: "Refund Policy | PromptDeal",
  description: "PromptDeal refund policy for digital products. All sales are final on digital prompts.",
}

export default function RefundPolicyPage() {
  return <RefundPolicyClientPage />
}
