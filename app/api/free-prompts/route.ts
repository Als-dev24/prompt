import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const supabase = await createServerClient()

    // Store email in database for tracking
    const { error: insertError } = await supabase.from("newsletter_subscribers").insert([
      {
        email,
        subscribed_at: new Date().toISOString(),
        source: "free_prompts",
      },
    ])

    // Don't fail if insert fails (duplicate email is okay)
    if (insertError) {
      console.log("[v0] Email already exists or insert failed:", insertError)
    }

    return NextResponse.json({
      success: true,
      message: "Email registered successfully",
    })
  } catch (error) {
    console.error("[v0] Free prompts API error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
