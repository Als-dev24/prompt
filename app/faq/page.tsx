import { Card, CardContent } from "@/components/ui/card"
import type { Metadata } from "next"
import { HelpCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "FAQ - Common Questions About AI Prompts | PromptDeal",
  description:
    "Find answers to common questions about AI prompts, crypto payments, commercial licenses, and support. Learn how to get started with PromptDeal.",
  keywords: ["AI prompts FAQ", "crypto payment questions", "prompt engineering help", "ChatGPT prompts support"],
  openGraph: {
    title: "Frequently Asked Questions - PromptDeal",
    description: "Get answers about AI prompts, payments, and licensing",
    url: "https://promptdeal.store/faq",
    type: "website",
  },
  alternates: {
    canonical: "https://promptdeal.store/faq",
  },
}

export default function FAQPage() {
  const faqs = [
    {
      question: "What are AI prompts?",
      answer:
        "AI prompts are optimized instructions designed to get the best results from AI tools like ChatGPT, Claude, and other language models. Our prompts are specifically crafted for digital marketing tasks.",
    },
    {
      question: "How do I use the prompts after purchase?",
      answer:
        "After completing your purchase with cryptocurrency, you'll receive instant access to download your prompts. You can copy and paste them directly into ChatGPT or any AI tool.",
    },
    {
      question: "What cryptocurrencies do you accept?",
      answer:
        "We accept Bitcoin (BTC), Ethereum (ETH), USDC, Solana (SOL), and other major cryptocurrencies through Coinbase Commerce. All payments are secure and instant.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Due to the digital nature of our products and instant delivery, all sales are final. However, if you experience any issues with your purchase, please contact our support team.",
    },
    {
      question: "Do you offer bulk discounts?",
      answer:
        "Yes! Our Professional and Enterprise packs offer significant savings compared to purchasing individual prompts. Check our Pricing page for current bundle deals.",
    },
    {
      question: "How often are new prompts added?",
      answer:
        "We add new prompts weekly based on the latest marketing trends and AI capabilities. All pack purchases include lifetime updates at no additional cost.",
    },
    {
      question: "Can I use these prompts for client work?",
      answer:
        "Once purchased, you have a commercial license to use the prompts for your own business or client projects. You cannot resell the prompts themselves.",
    },
    {
      question: "What AI tools work with these prompts?",
      answer:
        "Our prompts are optimized for ChatGPT but work excellently with Claude, Gemini, and other major language models. They're designed to be platform-agnostic.",
    },
    {
      question: "Do you provide support?",
      answer:
        "Yes! We offer email support for all customers. Enterprise pack customers receive priority support with faster response times.",
    },
    {
      question: "Are the prompts in English only?",
      answer:
        "Currently, all our prompts are in English. However, you can use them with AI tools to generate content in any language you need.",
    },
  ]

  return (
    <div className="min-h-screen">
      <section className="px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl mb-6">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground">Everything you need to know about PromptDeal</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-2 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
