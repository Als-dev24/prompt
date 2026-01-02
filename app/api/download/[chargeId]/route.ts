import { type NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

interface DownloadParams {
  params: Promise<{ chargeId: string }>
}

export async function GET(request: NextRequest, { params }: DownloadParams) {
  try {
    const { chargeId } = await params

    console.log("[DOWNLOAD] File requested for charge:", chargeId)

    const supabase = createAdminClient()

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("email, pack_type, payment_status, download_status")
      .eq("charge_id", chargeId)
      .single()

    if (orderError || !order) {
      console.error("[DOWNLOAD] Order not found:", orderError)
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    if (order.payment_status !== "paid") {
      console.error("[DOWNLOAD] Payment not completed for this order")
      return NextResponse.json({ error: "Payment not completed" }, { status: 403 })
    }

    const packType = order.pack_type || "starter"

    console.log("[DOWNLOAD] Pack type:", packType)

    const { data: product, error } = await supabase
      .from("products")
      .select("zip_path, name")
      .eq("pack_type", packType)
      .single()

    if (error || !product || !product.zip_path) {
      console.error("[DOWNLOAD] Product not found or no zip_path:", error)
      return NextResponse.json({ error: "Pack not found or not available for download" }, { status: 404 })
    }

    console.log("[DOWNLOAD] Found product:", product.name, "with zip:", product.zip_path)

    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from("prompt-packs")
      .createSignedUrl(product.zip_path, 3600)

    if (signedUrlError || !signedUrlData) {
      console.error("[DOWNLOAD] Error generating signed URL:", signedUrlError)
      return NextResponse.json(
        { error: "Failed to generate download link. Make sure the file exists in Storage." },
        { status: 500 },
      )
    }

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        download_status: true,
        downloaded_at: new Date().toISOString(),
      })
      .eq("charge_id", chargeId)

    if (updateError) {
      console.error("[DOWNLOAD] Error updating download status:", updateError)
      // Continue anyway, file should still download
    } else {
      console.log("[DOWNLOAD] Download status updated for charge:", chargeId)
    }

    console.log("[DOWNLOAD] Generated signed URL successfully")

    return NextResponse.redirect(signedUrlData.signedUrl)
  } catch (error) {
    console.error("[DOWNLOAD] Error:", error)
    return NextResponse.json({ error: "Download failed" }, { status: 500 })
  }
}
