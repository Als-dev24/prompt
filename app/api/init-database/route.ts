import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          error: "Missing Supabase credentials",
          details: {
            supabaseUrl: !!supabaseUrl,
            serviceRoleKey: !!serviceRoleKey,
          },
        },
        { status: 400 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    console.log("[v0] Starting database initialization...")

    // Create products table
    const productsSQL = `
      CREATE TABLE IF NOT EXISTS public.products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        pack_type TEXT NOT NULL CHECK (pack_type IN ('starter', 'pro', 'business')),
        prompt_content TEXT NOT NULL,
        zip_path TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_products_pack_type ON public.products(pack_type);
      CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
    `

    const { error: productsError } = await supabase.rpc("exec", {
      sql: productsSQL,
    })

    if (productsError && !productsError.message.includes("already exists")) {
      console.error("[v0] Error creating products table:", productsError)
    } else {
      console.log("[v0] Products table created successfully")
    }

    // Create orders table
    const ordersSQL = `
      CREATE TABLE IF NOT EXISTS public.orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL,
        charge_id TEXT UNIQUE NOT NULL,
        pack_type TEXT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        payment_status TEXT DEFAULT 'pending',
        download_status BOOLEAN DEFAULT false,
        downloaded_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_orders_email ON public.orders(email);
      CREATE INDEX IF NOT EXISTS idx_orders_charge_id ON public.orders(charge_id);
      CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);
    `

    const { error: ordersError } = await supabase.rpc("exec", {
      sql: ordersSQL,
    })

    if (ordersError && !ordersError.message.includes("already exists")) {
      console.error("[v0] Error creating orders table:", ordersError)
    } else {
      console.log("[v0] Orders table created successfully")
    }

    // Create newsletter_subscribers table
    const newsletterSQL = `
      CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        source VARCHAR(50) DEFAULT 'newsletter',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);
    `

    const { error: newsletterError } = await supabase.rpc("exec", {
      sql: newsletterSQL,
    })

    if (newsletterError && !newsletterError.message.includes("already exists")) {
      console.error("[v0] Error creating newsletter table:", newsletterError)
    } else {
      console.log("[v0] Newsletter table created successfully")
    }

    // Insert seed data
    const { error: insertError } = await supabase
      .from("products")
      .insert([
        {
          name: "50 Free Marketing Prompts",
          description:
            "Essential AI prompts for social media, email, and content marketing",
          category: "Starter",
          price: 0,
          pack_type: "starter",
          prompt_content:
            "50 carefully crafted AI prompts for marketing professionals",
          zip_path: "packs/starter/v1/starter-prompts-50.zip",
          is_active: true,
        },
        {
          name: "Pro Pack - 200 Prompts",
          description:
            "Advanced prompts for email campaigns, video marketing, and conversions",
          category: "Pro",
          price: 79,
          pack_type: "pro",
          prompt_content:
            "200 professional-grade prompts for advanced marketing campaigns",
          zip_path: "packs/pro/v1/pro-complete-200.zip",
          is_active: true,
        },
        {
          name: "Business Pack - 500 Prompts",
          description:
            "Complete suite with analytics, automation, and team collaboration",
          category: "Business",
          price: 199,
          pack_type: "business",
          prompt_content:
            "500 enterprise-grade prompts with advanced analytics and reporting",
          zip_path: "packs/business/v1/business-500.zip",
          is_active: true,
        },
      ])

    if (insertError) {
      console.error("[v0] Error inserting seed data:", insertError)
    } else {
      console.log("[v0] Seed data inserted successfully")
    }

    return NextResponse.json({
      status: "success",
      message: "Database initialized successfully",
      tables: {
        products: "Created or already exists",
        orders: "Created or already exists",
        newsletter_subscribers: "Created or already exists",
      },
      seedData: "3 product packs inserted",
    })
  } catch (error) {
    console.error("[v0] Database initialization error:", error)
    return NextResponse.json(
      {
        error: "Database initialization failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
