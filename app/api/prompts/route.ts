import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const packType = searchParams.get("pack")

    const supabase = await createClient()

    let query = supabase.from("products").select("*").eq("is_active", true).order("created_at", { ascending: true })

    if (packType) {
      query = query.eq("pack_type", packType)
    }

    const { data: prompts, error } = await query

    if (error) {
      console.error("[v0] Error fetching prompts:", error)
      return NextResponse.json({ success: false, message: "Failed to fetch prompts", prompts: [] })
    }

    return NextResponse.json({ success: true, prompts: prompts || [] })
  } catch (error) {
    console.error("[v0] Prompts API error:", error)
    return NextResponse.json({ success: false, message: "Internal server error", prompts: [] })
  }
}
