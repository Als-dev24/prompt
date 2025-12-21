import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

interface ChargeData {
  id: string
  code: string
  name: string
  description: string
  hosted_url: string
  pricing: {
    local: { amount: string; currency: string }
    bitcoin?: { amount: string }
    ethereum?: { amount: string }
    usdc?: { amount: string }
  }
  metadata?: {
    promptId?: string
    items?: string
  }
  timeline: Array<{
    status: string
    time: string
  }>
}

interface WebhookEvent {
  id: string
  scheduled_for: string
  event: {
    type: string
    data: ChargeData
    created_at: string
  }
}

async function sendConfirmationEmail(promptId: string, downloadUrl: string, email: string, items?: any[]) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.log("[v0] Warning: RESEND_API_KEY not set, skipping email")
    return { success: false, message: "Email API key not configured" }
  }

  try {
    console.log("[v0] Sending confirmation email to:", email)

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "PromptDeal <orders@promptdeal.com>",
        to: email,
        subject: "Your PromptDeal Purchase Confirmed! 🎉",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7c3aed;">Thank you for your purchase!</h2>
            <p>Your premium AI prompt${items ? "s are" : " is"} ready to download.</p>
            ${
              items
                ? `
              <h3>Your Items:</h3>
              <ul>
                ${items.map((item) => `<li>${item.title} - $${item.price}</li>`).join("")}
              </ul>
            `
                : ""
            }
            <div style="margin: 30px 0;">
              <a href="${downloadUrl}" 
                 style="background: #7c3aed; color: white; padding: 15px 30px; 
                        text-decoration: none; border-radius: 8px; display: inline-block;">
                Download Your Prompt${items ? "s" : ""}
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">This link will expire in 7 days.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px;">
              PromptDeal - Premium AI Prompts for Marketing & Content Creation
            </p>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] Resend API error:", errorData)
      return { success: false, message: "Failed to send email" }
    }

    const data = await response.json()
    console.log("[v0] Email sent successfully:", data.id)

    return { success: true, emailId: data.id }
  } catch (error) {
    console.error("[v0] Email sending error:", error)
    return { success: false, message: "Email error" }
  }
}

function verifyWebhookSignature(signature: string | null, body: string): boolean {
  if (!signature) {
    console.log("[v0] No signature provided")
    return false
  }

  const secret = process.env.COINBASE_WEBHOOK_SECRET

  if (!secret) {
    console.log("[v0] Warning: COINBASE_WEBHOOK_SECRET not set, skipping verification")
    return true // Allow in development mode
  }

  const hash = crypto.createHmac("sha256", secret).update(body).digest("hex")

  const isValid = hash === signature
  console.log("[v0] Webhook signature valid:", isValid)

  return isValid
}

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("X-CC-Webhook-Signature")
    const body = await request.text()

    console.log("[v0] Webhook received")

    if (!verifyWebhookSignature(signature, body)) {
      console.log("[v0] Invalid webhook signature")
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const webhookData: WebhookEvent = JSON.parse(body)
    const event = webhookData.event

    console.log("[v0] Webhook event type:", event.type)

    if (event.type === "charge:confirmed") {
      const { id: chargeId, metadata, pricing, name } = event.data
      const promptId = metadata?.promptId
      const itemsData = metadata?.items ? JSON.parse(metadata.items) : null

      console.log("[v0] Payment confirmed:", {
        chargeId,
        promptId,
        amount: pricing.local.amount,
        currency: pricing.local.currency,
      })

      // Generate download link
      const downloadUrl = `${new URL(request.url).origin}/api/download/${chargeId}`

      // TODO: Get actual customer email from your database
      const customerEmail = "customer@example.com" // Replace with real email from order

      // Send confirmation email
      await sendConfirmationEmail(promptId || "cart", downloadUrl, customerEmail, itemsData)

      return NextResponse.json({
        received: true,
        event: "charge:confirmed",
        chargeId,
        message: "Payment confirmed successfully",
      })
    }

    if (event.type === "charge:failed") {
      const { id: chargeId, metadata } = event.data

      console.log("[v0] Payment failed:", { chargeId })

      // TODO: Update order status in database and notify customer

      return NextResponse.json({
        received: true,
        event: "charge:failed",
        chargeId,
      })
    }

    if (event.type === "charge:pending") {
      const { id: chargeId } = event.data

      console.log("[v0] Payment pending:", { chargeId })

      return NextResponse.json({
        received: true,
        event: "charge:pending",
        chargeId,
      })
    }

    console.log("[v0] Unhandled event type:", event.type)

    return NextResponse.json({
      received: true,
      message: "Event logged",
    })
  } catch (error) {
    console.error("[v0] Webhook processing error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "PromptDeal Coinbase Commerce Webhook",
    endpoint: "/api/webhook",
    status: process.env.COINBASE_WEBHOOK_SECRET ? "configured" : "not_configured",
    supportedEvents: ["charge:confirmed", "charge:failed", "charge:pending"],
  })
}
