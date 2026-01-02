import { type NextRequest, NextResponse } from "next/server"

interface CheckoutRequest {
  promptId?: string
  title: string
  price: number
  email: string
  redirectUrl: string
  packType?: string
  items?: Array<{
    id: string
    title: string
    price: number
    category: string
  }>
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json()
    const { promptId, title, price, email, redirectUrl, items, packType } = body

    console.log("[v0] Checkout request received:", { promptId, title, price, email, items, packType })

    const apiKey = process.env.COINBASE_COMMERCE_KEY

    if (!apiKey) {
      console.log("[v0] Warning: COINBASE_COMMERCE_KEY not set, using mock mode")

      const mockCheckoutId = `checkout_${promptId || "cart"}_${Date.now()}`
      return NextResponse.json({
        checkoutId: mockCheckoutId,
        success: true,
        mode: "mock",
        message: "Mock checkout created. Add COINBASE_COMMERCE_KEY to enable real payments.",
      })
    }

    console.log("[v0] Creating real Coinbase Commerce charge...")

    const response = await fetch("https://api.commerce.coinbase.com/charges", {
      method: "POST",
      headers: {
        "X-CC-Api-Key": apiKey,
        "Content-Type": "application/json",
        "X-CC-Version": "2018-03-22",
      },
      body: JSON.stringify({
        name: items ? "PromptDeal Cart Purchase" : title,
        description: items ? `Purchase of ${items.length} premium AI prompts` : `Premium AI Prompt: ${title}`,
        local_price: {
          amount: price.toFixed(2),
          currency: "USD",
        },
        pricing_type: "fixed_price",
        metadata: {
          promptId: promptId || "cart",
          packType: packType || null,
          email: email,
          items: items ? JSON.stringify(items) : undefined,
        },
        redirect_url: redirectUrl,
        cancel_url: new URL("/catalog", request.url).toString(),
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] Coinbase Commerce API error:", errorData)
      throw new Error(`Coinbase API error: ${errorData.error?.message || "Unknown error"}`)
    }

    const data = await response.json()
    console.log("[v0] Coinbase charge created:", data.data.id)

    return NextResponse.json({
      checkoutId: data.data.id,
      hostedUrl: data.data.hosted_url,
      success: true,
      mode: "production",
    })
  } catch (error) {
    console.error("[v0] Checkout error:", error)
    return NextResponse.json(
      {
        error: "Failed to create checkout",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
