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
    let body: CheckoutRequest
    try {
      body = await request.json()
    } catch (parseError) {
      console.error("[v0] JSON parse error:", parseError)
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      )
    }

    const { promptId, title, price, email, redirectUrl, items, packType } = body

    console.log("[v0] Checkout request received:", { promptId, title, price, email, items, packType })

    if (!email || !price) {
      return NextResponse.json(
        { error: "Missing required fields: email, price" },
        { status: 400 }
      )
    }

    const apiKey = process.env.NOWPAYMENTS_API_KEY

    if (!apiKey) {
      console.log("[v0] Warning: NOWPAYMENTS_API_KEY not set, using mock mode")

      const mockCheckoutId = `nowpay_${promptId || "cart"}_${Date.now()}`
      return NextResponse.json({
        checkoutId: mockCheckoutId,
        success: true,
        mode: "mock",
        message: "Mock checkout created. Add NOWPAYMENTS_API_KEY to enable real payments.",
      })
    }

    console.log("[v0] Creating real Nowpayments payment...")

    const response = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount: parseFloat(price.toFixed(2)),
        price_currency: "usd",
        order_id: promptId || `order_${Date.now()}`,
        order_description: items ? `Purchase of ${items.length} premium AI prompts` : `Premium AI Prompt: ${title}`,
        ipn_callback_url: new URL("/api/webhook", request.url).toString(),
        success_url: new URL("/confirmation", request.url).toString(),
        cancel_url: new URL("/checkout", request.url).toString(),
        metadata: {
          packType: packType || "cart",
          email: email,
          items: items ? JSON.stringify(items) : undefined,
        },
      }),
    })

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch {
        const errorText = await response.text()
        console.error("[v0] Coinbase API error (non-JSON response):", errorText)
        throw new Error(`Coinbase API error: HTTP ${response.status}`)
      }
      console.error("[v0] Coinbase Commerce API error:", errorData)
      throw new Error(`Coinbase API error: ${errorData.error?.message || "Unknown error"}`)
    }

    let data
    try {
      data = await response.json()
    } catch {
      const errorText = await response.text()
      console.error("[v0] Invalid JSON response from Nowpayments:", errorText)
      throw new Error("Invalid response from Nowpayments")
    }

    console.log("[v0] Nowpayments invoice created:", data.id)

    return NextResponse.json({
      checkoutId: data.id,
      paymentLink: data.invoice_url,
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
