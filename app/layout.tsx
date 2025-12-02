import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "PromptDeal - Premium AI Prompts Marketplace | Buy with Crypto",
    template: "%s | PromptDeal",
  },
  description:
    "Buy premium AI prompts for marketing, content creation, SEO, and e-commerce. Secure cryptocurrency payments. Instant delivery. Lifetime access. 500+ battle-tested prompts from top marketers.",
  keywords: [
    "AI prompts",
    "ChatGPT prompts",
    "marketing prompts",
    "content creation",
    "crypto payments",
    "digital products",
    "SEO prompts",
    "social media prompts",
  ],
  authors: [{ name: "PromptDeal" }],
  creator: "PromptDeal",
  publisher: "PromptDeal",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://promptdeal.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "PromptDeal - Premium AI Prompts Marketplace",
    description: "Buy premium AI prompts with cryptocurrency. Instant delivery, lifetime access.",
    siteName: "PromptDeal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PromptDeal - Premium AI Prompts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptDeal - Premium AI Prompts",
    description: "Buy premium AI prompts with crypto. Instant delivery.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || "https://promptdeal.com"} />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
