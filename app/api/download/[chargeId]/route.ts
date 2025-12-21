import { type NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

// Secure download endpoint with one-time use tokens
// In production, this would:
// 1. Verify the charge was paid
// 2. Check if the token is still valid
// 3. Serve the prompt file from storage

interface DownloadParams {
  params: Promise<{ chargeId: string }>
}

export async function GET(request: NextRequest, { params }: DownloadParams) {
  try {
    const { chargeId } = await params

    console.log("[DOWNLOAD] File requested for charge:", chargeId)

    const searchParams = request.nextUrl.searchParams
    const packType = searchParams.get("pack") || "starter"

    console.log("[DOWNLOAD] Pack type:", packType)

    const supabase = createAdminClient()

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
      .createSignedUrl(product.zip_path, 3600) // 3600 seconds = 60 minutes

    if (signedUrlError || !signedUrlData) {
      console.error("[DOWNLOAD] Error generating signed URL:", signedUrlError)
      return NextResponse.json(
        { error: "Failed to generate download link. Make sure the file exists in Storage." },
        { status: 500 },
      )
    }

    console.log("[DOWNLOAD] Generated signed URL successfully")

    return NextResponse.redirect(signedUrlData.signedUrl)
  } catch (error) {
    console.error("[DOWNLOAD] Error:", error)
    return NextResponse.json({ error: "Download failed" }, { status: 500 })
  }
}
