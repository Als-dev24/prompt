"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [checkoutId, setCheckoutId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (items.length === 0) {
    router.push("/catalog")
    return null
  }

  const handleCreateCheckout = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log("[v0] Creating checkout session for cart...")

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Cart Purchase",
          price: total,
          redirectUrl: `${window.location.origin}/confirmation?mode=cart`,
          items: items.map((item) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            category: item.category,
          })),
        }),
      })

      const data = await response.json()

      console.log("[v0] Checkout response:", data)

      if (!data.success) {
        throw new Error(data.message || "Failed to create checkout")
      }

      setCheckoutId(data.checkoutId)

      if (data.mode === "production" && data.hostedUrl) {
        console.log("[v0] Redirecting to Coinbase Commerce checkout page...")
        window.location.href = data.hostedUrl
        return
      }

      console.log("[v0] Mock checkout mode - simulating payment flow")
      setTimeout(() => {
        clearCart()
        router.push(`/confirmation?checkoutId=${data.checkoutId}&mode=mock`)
      }, 2000)
    } catch (err) {
      console.error("[v0] Checkout error:", err)
      setError(err instanceof Error ? err.message : "Failed to create checkout session")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <button onClick={() => router.back()} className="text-primary hover:underline text-sm mb-8">
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-foreground mb-8">Secure Checkout</h1>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-4 border-b border-border">
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <span className="font-semibold text-foreground">${item.price}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-4">
                  <span className="text-foreground font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>We accept Bitcoin, Ethereum, USDC, and Dogecoin via Coinbase Commerce</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-orange-500/20 flex items-center justify-center text-lg">₿</div>
                    <div>
                      <p className="font-medium text-foreground">Bitcoin</p>
                      <p className="text-xs text-muted-foreground">Fastest settlement</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-purple-500/20 flex items-center justify-center text-lg">Ξ</div>
                    <div>
                      <p className="font-medium text-foreground">Ethereum</p>
                      <p className="text-xs text-muted-foreground">Smart contracts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-blue-500/20 flex items-center justify-center text-lg">₩</div>
                    <div>
                      <p className="font-medium text-foreground">USDC</p>
                      <p className="text-xs text-muted-foreground">Stablecoin</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-sm text-green-400">✓ Instant delivery after payment confirmation</p>
                  <p className="text-sm text-green-400">✓ No account needed, download links sent to your email</p>
                  <p className="text-sm text-green-400">✓ Lifetime access to all prompts</p>
                </div>

                {checkoutId && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-sm text-blue-400">Checkout session created</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {loading ? "Redirecting to payment page..." : "Preparing your order..."}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Ready?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button size="lg" className="w-full" onClick={handleCreateCheckout} disabled={loading}>
                  {loading ? "Creating checkout..." : "Pay with Crypto"}
                </Button>
                <Button size="lg" variant="outline" className="w-full bg-transparent" onClick={() => router.back()}>
                  Cancel
                </Button>
                <div className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
                  <p>Powered by Coinbase Commerce</p>
                  <p className="mt-1">Your funds are secure</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
