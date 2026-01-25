import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // On skip la verification de signature pour test Postman
    // (en production, il faut vérifier X-CC-Webhook-Signature)
    const body = await request.text()

    let webhookData
    try {
      webhookData = JSON.parse(body)
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
    }

    const { event } = webhookData
    const { type, data } = event

    console.log("[TEST] Webhook event type:", type)
    console.log("[TEST] Event data:", data)

    // Simulate order insert / email sending
    if (type === "charge:confirmed") {
      console.log("[TEST] Payment confirmed for:", data.metadata?.email)
      return NextResponse.json({
        received: true,
        event: type,
        chargeId: data.id,
        message: "Payment confirmed successfully (test mode)",
      })
    }

    if (type === "charge:failed") {
      return NextResponse.json({
        received: true,
        event: type,
        chargeId: data.id,
        message: "Payment failed (test mode)",
      })
    }

    if (type === "charge:pending") {
      return NextResponse.json({
        received: true,
        event: type,
        chargeId: data.id,
        message: "Payment pending (test mode)",
      })
    }

    return NextResponse.json({ received: true, message: "Event logged (test mode)" })
  } catch (error) {
    console.error("[TEST] Webhook processing error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "PromptDeal Coinbase Commerce Webhook (test mode)",
    endpoint: "/api/coinbase-webhook",
    supportedEvents: ["charge:confirmed", "charge:failed", "charge:pending"],
  })
}
