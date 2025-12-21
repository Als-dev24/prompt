"use client"

import Script from "next/script"
import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export function AnalyticsScripts() {
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    window.gtag?.("config", GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }, [pathname, searchParams])

  return null
}

export function Analytics() {
  return (
    <>
      <AnalyticsScripts />
      <PageViewTracker />
    </>
  )
}

// Conversion tracking functions
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams)
  }
}

export const trackPurchase = (transactionId: string, value: number, currency = "USD") => {
  trackEvent("purchase", {
    transaction_id: transactionId,
    value,
    currency,
    items: [
      {
        item_name: "Prompt Pack",
        price: value,
      },
    ],
  })
}

export const trackAddToCart = (itemName: string, price: number) => {
  trackEvent("add_to_cart", {
    currency: "USD",
    value: price,
    items: [
      {
        item_name: itemName,
        price,
      },
    ],
  })
}

export const trackBeginCheckout = (value: number) => {
  trackEvent("begin_checkout", {
    currency: "USD",
    value,
  })
}

export const trackNewsletterSignup = () => {
  trackEvent("newsletter_signup", {
    method: "email",
  })
}

export const trackDownload = (packType: string) => {
  trackEvent("file_download", {
    file_name: `${packType}_pack.zip`,
    link_text: packType,
  })
}
