"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { trackBeginCheckout } from "@/components/analytics"
import Link from "next/link"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [agreedToRefundPolicy, setAgreedToRefundPolicy] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push("/pricing")
    }
    if (mounted && items.length > 0) {
      trackBeginCheckout(total)
    }
  }, [mounted, items.length, router, total])

  if (!mounted || items.length === 0) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading checkout...</p>
        </div>
      </main>
    )
  }

  const cryptoOptions = [
    { id: "btc", name: "Bitcoin", symbol: "₿", icon: "BTC", color: "bg-orange-500" },
    { id: "eth", name: "Ethereum", symbol: "Ξ", icon: "ETH", color: "bg-purple-500" },
    { id: "sol", name: "Solana", symbol: "◎", icon: "SOL", color: "bg-green-500" },
    { id: "usdc", name: "USDC", symbol: "$", icon: "USDC", color: "bg-blue-500" },
  ]

  const handleCreateCheckout = async () => {
    if (!email) {
      setError("Please enter your email address")
      return
    }

    if (!selectedCrypto) {
      setError("Please select a payment method")
      return
    }

    if (!agreedToRefundPolicy) {
      setError("Please agree to the Refund Policy to continue")
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log("[v0] Creating checkout session for cart...")

      const packType = items[0]?.packType

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Cart Purchase",
          price: total,
          email,
          crypto: selectedCrypto,
          packType, // Pass packType to checkout API
          redirectUrl: `${window.location.origin}/confirmation?mode=cart${packType ? `&pack=${packType}` : ""}`,
          items: items.map((item) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            category: item.category,
            packType: item.packType,
          })),
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || "Failed to create checkout")
      }

      if (data.mode === "production" && data.hostedUrl) {
        console.log("[v0] Redirecting to Coinbase Commerce...")
        window.location.href = data.hostedUrl
        return
      }

      console.log("[v0] Mock checkout - simulating payment")
      setTimeout(() => {
        clearCart()
        router.push(`/confirmation?checkoutId=${data.checkoutId}&mode=mock${packType ? `&pack=${packType}` : ""}`)
      }, 2000)
    } catch (err) {
      console.error("[v0] Checkout error:", err)
      setError(err instanceof Error ? err.message : "Failed to create checkout")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <button onClick={() => router.back()} className="text-primary hover:underline text-sm mb-8">
          ← Back to Cart
        </button>

        <h1 className="text-4xl font-bold text-foreground mb-12">Secure Crypto Checkout</h1>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Payment method */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-2xl border-2">
              <CardHeader>
                <CardTitle>Your Email</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  We'll send your prompts to this email after payment confirmation
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-2">
              <CardHeader>
                <CardTitle>Choose Your Crypto Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cryptoOptions.map((crypto) => (
                  <div
                    key={crypto.id}
                    onClick={() => setSelectedCrypto(crypto.id)}
                    className={`crypto-card cursor-pointer rounded-2xl p-6 transition-all ${
                      selectedCrypto === crypto.id ? "selected" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${crypto.color}/20 rounded-xl flex items-center justify-center`}>
                        <span className="text-2xl">{crypto.symbol}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg">{crypto.name}</p>
                        <p className="text-sm text-muted-foreground">{crypto.icon}</p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedCrypto === crypto.id ? "border-primary bg-primary" : "border-border"
                        }`}
                      >
                        {selectedCrypto === crypto.id && <div className="w-3 h-3 bg-white rounded-full" />}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Refund policy disclaimer card */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
              <h3 className="font-semibold text-amber-400 mb-2">⚠️ Important Notice</h3>
              <p className="text-sm text-muted-foreground mb-4">
                All sales are final. Digital products are non-refundable once delivered or downloaded. Cryptocurrency
                payments are irreversible.
              </p>
              <Link href="/refund-policy" className="text-sm text-primary hover:underline">
                Read our full Refund Policy →
              </Link>
            </div>

            {/* Refund policy checkbox */}
            <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
              <input
                type="checkbox"
                id="refund-policy"
                checked={agreedToRefundPolicy}
                onChange={(e) => setAgreedToRefundPolicy(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-border accent-primary cursor-pointer"
              />
              <label htmlFor="refund-policy" className="flex-1 text-sm text-muted-foreground cursor-pointer">
                I have read and agree to the{" "}
                <Link href="/refund-policy" className="text-primary hover:underline">
                  Refund Policy
                </Link>{" "}
                and understand that all sales are final
              </label>
            </div>
          </div>

          {/* Right: Order summary */}
          <div>
            <Card className="sticky top-20 rounded-2xl border-2">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.title}</span>
                      <span className="font-semibold">${item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-3xl font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full h-14 rounded-xl text-base"
                  onClick={handleCreateCheckout}
                  disabled={loading || !email || !selectedCrypto || !agreedToRefundPolicy}
                >
                  {loading ? "Processing..." : "Complete Purchase"}
                </Button>

                {/* Crypto disclaimer */}
                <div className="pt-4 border-t border-border space-y-3">
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                    <p className="text-xs text-amber-400 font-medium mb-1">Crypto Payment Notice</p>
                    <p className="text-xs text-muted-foreground">
                      Cryptocurrency transactions are irreversible. Please verify all details before payment.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Instant delivery after confirmation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Secure payment via Coinbase</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
