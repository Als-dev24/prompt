import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { adminDb } from "@/lib/firebase/admin"

interface NowpaymentsIPNData {
  payment_id: string
  invoice_id: string
  payment_status: string
  pay_amount: string
  pay_currency: string
  order_id: string
  order_description: string
  purchase_id: string
  metadata: {
    packType?: string
    email?: string
    items?: string
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

  const secret = process.env.NOWPAYMENTS_IPN_SECRET

  if (!secret) {
    console.log("[v0] Warning: NOWPAYMENTS_IPN_SECRET not set, skipping verification")
    return true // Allow in development mode
  }

  const hash = crypto.createHash("sha512").update(body + secret).digest("hex")

  const isValid = hash === signature
  console.log("[v0] Webhook signature valid:", isValid)

  return isValid
}

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-nowpayments-sig")
    const body = await request.text()

    console.log("[v0] Nowpayments IPN received")

    if (!verifyWebhookSignature(signature, body)) {
      console.log("[v0] Invalid webhook signature")
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const ipnData: NowpaymentsIPNData = JSON.parse(body)

    console.log("[v0] Payment status:", ipnData.payment_status)

    if (ipnData.payment_status === "finished") {
      const paymentId = ipnData.payment_id
      const email = ipnData.metadata?.email || "unknown@example.com"
      const packType = ipnData.metadata?.packType || "cart"
      const itemsData = ipnData.metadata?.items ? JSON.parse(ipnData.metadata.items) : null

      console.log("[v0] Payment confirmed:", {
        paymentId,
        email,
        packType,
        amount: ipnData.pay_amount,
      })

      try {
        // Use Supabase instead of Firebase
        const { createClient } = await import("@supabase/supabase-js")
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || "",
          process.env.SUPABASE_SERVICE_ROLE_KEY || ""
        )

        const { error } = await supabase.from("orders").insert([
          {
            email,
            charge_id: paymentId,
            pack_type: packType,
            amount: parseFloat(ipnData.pay_amount),
            payment_status: "paid",
            download_status: false,
          },
        ])

        if (error) throw error
        console.log("[v0] Order created in Supabase successfully")
      } catch (error) {
        console.error("[v0] Error creating order:", error)
      }

      // Generate download link
      const downloadUrl = `${new URL(request.url).origin}/api/download/${paymentId}`

      // Send confirmation email
      await sendConfirmationEmail("", downloadUrl, email, itemsData)

      return NextResponse.json({
        received: true,
        status: "confirmed",
        paymentId,
        message: "Payment confirmed successfully",
      })
    }

    if (ipnData.payment_status === "failed" || ipnData.payment_status === "expired") {
      const paymentId = ipnData.payment_id
      const email = ipnData.metadata?.email || "unknown@example.com"

      console.log("[v0] Payment failed/expired:", { paymentId, email })

      try {
        const { createClient } = await import("@supabase/supabase-js")
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || "",
          process.env.SUPABASE_SERVICE_ROLE_KEY || ""
        )

        await supabase
          .from("orders")
          .update({ payment_status: "failed" })
          .eq("charge_id", paymentId)
      } catch (error) {
        console.error("[v0] Error updating failed order:", error)
      }

      return NextResponse.json({
        received: true,
        status: "failed",
        paymentId,
      })
    }

    console.log("[v0] Payment status:", ipnData.payment_status, "- no action needed")

    return NextResponse.json({
      received: true,
      message: "IPN logged",
    })
  } catch (error) {
    console.error("[v0] IPN processing error:", error)
    return NextResponse.json({ error: "IPN processing failed" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "PromptDeal Nowpayments IPN Webhook",
    endpoint: "/api/webhook",
    status: process.env.NOWPAYMENTS_IPN_SECRET ? "configured" : "not_configured",
    supportedEvents: ["finished", "failed", "expired"],
  })
}
