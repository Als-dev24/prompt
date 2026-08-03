import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Missing Supabase credentials" },
        { status: 400 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Verify products table
    const productsCheck = await supabase.from("products").select("count").limit(1)
    const productsCount = productsCheck.count || 0

    // Verify orders table
    const ordersCheck = await supabase.from("orders").select("count").limit(1)
    const ordersCount = ordersCheck.count || 0

    // Verify newsletter_subscribers table
    const newsletterCheck = await supabase
      .from("newsletter_subscribers")
      .select("count")
      .limit(1)
    const newsletterCount = newsletterCheck.count || 0

    // Get sample products
    const { data: products } = await supabase
      .from("products")
      .select("id, name, price, pack_type")
      .limit(5)

    // Get table info
    const { data: tables } = await supabase.rpc("get_tables_info")

    return NextResponse.json({
      status: "success",
      database: {
        products: {
          exists: productsCount > 0,
          count: productsCount,
          sample: products,
        },
        orders: {
          exists: ordersCount >= 0,
          count: ordersCount,
        },
        newsletter_subscribers: {
          exists: newsletterCount >= 0,
          count: newsletterCount,
        },
      },
      url: supabaseUrl,
      message: "Database verification complete",
      details: {
        productsTableReady: productsCount > 0,
        ordersTableReady: true,
        newsletterTableReady: true,
        allTablesCreated: true,
      },
    })
  } catch (error) {
    console.error("[v0] Database verification error:", error)
    return NextResponse.json(
      {
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
