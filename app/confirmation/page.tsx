"use client"

import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { trackPurchase, trackDownload } from "@/components/analytics"
import { Suspense } from "react"

const promptsData = {
  1: { title: "Social Media Content Machine", price: 4.99 },
  2: { title: "TikTok Viral Hook Generator", price: 3.99 },
  3: { title: "Instagram Caption Master", price: 4.49 },
  4: { title: "E-commerce Product Optimization", price: 6.99 },
  5: { title: "Email Sequence for Sales", price: 5.99 },
}

interface OrderData {
  chargeId: string
  promptId: string
  status: string
  downloadUrl: string
  expiresAt: string
  paidAt: string
  amount: string
}

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const promptId = searchParams.get("promptId")
  const packType = searchParams.get("pack") || "starter" // Get pack type from URL
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const prompt = promptId ? promptsData[promptId as keyof typeof promptsData] : null

  useEffect(() => {
    if (!prompt) {
      router.push("/catalog")
      return
    }

    // Simulate fetching order status from API
    const fetchOrderStatus = async () => {
      try {
        // In production: const response = await fetch(`/api/order/status?chargeId=${chargeId}`);
        const mockData: OrderData = {
          chargeId: `charge_${promptId}_${Date.now()}`,
          promptId,
          status: "confirmed",
          downloadUrl: `/api/download/charge_${promptId}_${Date.now()}?pack=${packType}`, // Include packType in download URL
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          paidAt: new Date().toISOString(),
          amount: prompt.price.toString(),
        }

        setOrderData(mockData)
        setIsLoading(false)

        if (prompt && packType) {
          trackPurchase(mockData.chargeId, Number.parseFloat(prompt.price.toString()), "USD")
        }
      } catch (err) {
        console.error("Failed to fetch order status:", err)
        setError("Failed to load order details")
        setIsLoading(false)
      }
    }

    const timer = setTimeout(() => {
      fetchOrderStatus()
    }, 1500)

    return () => clearTimeout(timer)
  }, [prompt, promptId, packType, router])

  const handleDownload = () => {
    if (packType) {
      trackDownload(packType)
    }
  }

  if (!prompt || isLoading) {
    return null
  }

  if (error || !orderData) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <Card className="border-red-500/50">
            <CardHeader>
              <CardTitle className="text-red-400">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{error || "Failed to process order"}</p>
              <Link href="/catalog">
                <Button variant="outline">Back to Catalog</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-block w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl text-green-400">✓</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Payment Confirmed!</h1>
          <p className="text-muted-foreground text-lg">Your prompt is ready to download</p>
          <p className="text-sm text-muted-foreground mt-4">Confirmation email sent</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-4 border-b border-border">
                  <div>
                    <p className="font-medium text-foreground">{prompt.title}</p>
                    <p className="text-sm text-muted-foreground">Order ID: {orderData.chargeId}</p>
                  </div>
                  <span className="text-xl font-bold text-primary">${orderData.amount}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="text-foreground">Cryptocurrency</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-green-400 font-semibold">Confirmed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paid At</span>
                    <span className="text-foreground text-xs">{new Date(orderData.paidAt).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Download Expires</span>
                    <span className="text-foreground text-xs">{new Date(orderData.expiresAt).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Download Card */}
            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle>Download Your Prompt</CardTitle>
                <CardDescription>
                  The file is ready for download. You have lifetime access to this prompt.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-card border border-dashed border-primary/30 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-2">📄</div>
                  <p className="font-medium text-foreground mb-1">{prompt.title}.txt</p>
                  <p className="text-xs text-muted-foreground">Text file • Ready to download</p>
                </div>
                <Button size="lg" className="w-full" asChild>
                  <a href={orderData.downloadUrl} download onClick={handleDownload}>
                    Download Now
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground text-center">A copy has also been sent to your email</p>
              </CardContent>
            </Card>

            {/* Email Confirmation */}
            <Card>
              <CardHeader>
                <CardTitle>Email Confirmation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  A confirmation email with your download link has been sent to your email address.
                </p>
                <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                  <p className="text-xs text-green-400">
                    Email includes: order details, download link (valid 7 days), and support contact
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/catalog">
                  <Button variant="outline" className="w-full text-sm bg-transparent">
                    Browse More Prompts
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full text-sm bg-transparent">
                    Back to Home
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-green-500/10 border-green-500/30">
              <CardContent className="pt-6 space-y-2 text-sm">
                <p className="flex items-start gap-2">
                  <span className="text-green-400 mt-1 font-bold">✓</span>
                  <span className="text-foreground">Secure crypto payment</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-400 mt-1 font-bold">✓</span>
                  <span className="text-foreground">Instant download</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-400 mt-1 font-bold">✓</span>
                  <span className="text-foreground">Lifetime access</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-400 mt-1 font-bold">✓</span>
                  <span className="text-foreground">7-day download link</span>
                </p>
              </CardContent>
            </Card>

            <Card className="text-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Support</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>Need help? Email us at support@promptdeal.com</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
            <p className="text-muted-foreground">Processing your payment...</p>
          </div>
        </main>
      }
    >
      <ConfirmationContent />
    </Suspense>
  )
}
