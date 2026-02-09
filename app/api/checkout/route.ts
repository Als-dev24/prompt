import { type NextRequest, NextResponse } from "next/server"

interface CheckoutRequest {
  promptId?: string
  title: string
  price: number
  email: string
  redirectUrl: string
  packType?: string
  test?: boolean // ✅ TEST FLAG
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
    const {
      promptId,
      title,
      price,
      email,
      redirectUrl,
      items,
      packType,
      test
    } = body

    console.log("[CHECKOUT] Request received:", body)

    /* ===========================
       ✅ TEST MODE (localhost)
    ============================ */
    if (test === true) {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { error: "Test mode disabled in production" },
          { status: 403 }
        )
      }

      const mockCheckoutId = `test_checkout_${Date.now()}`

      console.log("[CHECKOUT] TEST MODE enabled")

      return NextResponse.json({
        success: true,
        mode: "test",
        checkoutId: mockCheckoutId,
        hostedUrl: `http://localhost:3000/test-success?checkoutId=${mockCheckoutId}`,
        message: "Test checkout created (no real payment)."
      })
    }

    /* ===========================
       🔐 REAL COINBASE CHECKOUT
    ============================ */

    const apiKey = process.env.COINBASE_COMMERCE_KEY

    if (!apiKey) {
      console.log("[CHECKOUT] Coinbase key missing → mock mode")

      const mockCheckoutId = `checkout_${promptId || "cart"}_${Date.now()}`
      return NextResponse.json({
        checkoutId: mockCheckoutId,
        success: true,
        mode: "mock",
        message: "Mock checkout created. Add COINBASE_COMMERCE_KEY to enable real payments."
      })
    }

    console.log("[CHECKOUT] Creating Coinbase charge...")

    const response = await fetch("https://api.commerce.coinbase.com/charges", {
      method: "POST",
      headers: {
        "X-CC-Api-Key": apiKey,
        "Content-Type": "application/json",
        "X-CC-Version": "2018-03-22"
      },
      body: JSON.stringify({
        name: items ? "PromptDeal Cart Purchase" : title,
        description: items
          ? `Purchase of ${items.length} premium AI prompts`
          : `Premium AI Prompt: ${title}`,
        local_price: {
          amount: price.toFixed(2),
          currency: "USD"
        },
        pricing_type: "fixed_price",
        metadata: {
          promptId: promptId || "cart",
          packType: packType || null,
          email,
          items: items ? JSON.stringify(items) : undefined
        },
        redirect_url: redirectUrl,
        cancel_url: new URL("/catalog", request.url).toString()
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[CHECKOUT] Coinbase API error:", errorData)
      throw new Error(errorData?.error?.message || "Coinbase API error")
    }

    const data = await response.json()

    return NextResponse.json({
      checkoutId: data.data.id,
      hostedUrl: data.data.hosted_url,
      success: true,
      mode: "production"
    })
  } catch (error) {
    console.error("[CHECKOUT] Error:", error)
    return NextResponse.json(
      {
        error: "Failed to create checkout",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
