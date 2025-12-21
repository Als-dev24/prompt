import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email, source: "newsletter" }])
      .select()

    if (error) {
      // If email already exists, ignore the error
      if (error.code === "23505") {
        return NextResponse.json({ success: true, message: "Already subscribed" })
      }
      console.error("[v0] Supabase insert error:", error)
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] Newsletter API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
