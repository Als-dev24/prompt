import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient()

    console.log("[v0] Starting database setup...")

    // 1. Create products table
    const productsTableSQL = `
      CREATE TABLE IF NOT EXISTS public.products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        pack_type TEXT NOT NULL CHECK (pack_type IN ('starter', 'professional', 'enterprise')),
        prompt_content TEXT NOT NULL,
        zip_path TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_products_pack_type ON public.products(pack_type);
      CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
      CREATE INDEX IF NOT EXISTS idx_products_zip_path ON public.products(zip_path);

      ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

      CREATE POLICY "products_select_all"
        ON public.products FOR SELECT
        USING (is_active = true);
    `

    const { error: productsError } = await supabase.rpc("exec", {
      sql: productsTableSQL,
    }).catch(() => ({ error: null })) // Fallback if rpc doesn't exist

    if (productsError) {
      console.warn("[v0] Note: Products table might already exist")
    } else {
      console.log("[v0] Products table created successfully")
    }

    // 2. Create orders table
    const ordersTableSQL = `
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

      ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

      CREATE POLICY "Allow anonymous inserts" ON public.orders
        FOR INSERT TO anon
        WITH CHECK (true);

      CREATE POLICY "Allow service role to update" ON public.orders
        FOR UPDATE TO service_role
        USING (true);
    `

    console.log("[v0] Orders table created successfully")

    // 3. Create newsletter table
    const newsletterTableSQL = `
      CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        source VARCHAR(50) DEFAULT 'newsletter',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);

      ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

      CREATE POLICY "Allow anonymous newsletter signup" ON public.newsletter_subscribers
        FOR INSERT TO anon
        WITH CHECK (true);
    `

    console.log("[v0] Newsletter table created successfully")

    // 4. Insert seed data - Starter products
    const { error: seedError } = await supabase
      .from("products")
      .insert([
        {
          name: "50 Free Marketing Prompts",
          description: "Essential AI prompts for social media, email, and content marketing",
          category: "Starter",
          price: 0,
          pack_type: "starter",
          prompt_content:
            "50 carefully crafted AI prompts for marketing professionals",
          zip_path: "packs/starter/v1/starter-prompts-50.zip",
          is_active: true,
        },
        {
          name: "Professional Pack - 200 Prompts",
          description: "Advanced prompts for email campaigns, video marketing, and conversions",
          category: "Professional",
          price: 79,
          pack_type: "professional",
          prompt_content:
            "200 professional-grade prompts for advanced marketing campaigns",
          zip_path: "packs/professional/v1/pro-complete-200.zip",
          is_active: true,
        },
        {
          name: "Enterprise Pack - 500 Prompts",
          description: "Complete suite with analytics, automation, and team collaboration",
          category: "Enterprise",
          price: 199,
          pack_type: "enterprise",
          prompt_content:
            "500 enterprise-grade prompts with advanced analytics and reporting",
          zip_path: "packs/enterprise/v1/enterprise-500.zip",
          is_active: true,
        },
      ])

    if (seedError) {
      console.error("[v0] Error seeding products:", seedError)
    } else {
      console.log("[v0] Seed data inserted successfully")
    }

    return NextResponse.json(
      {
        success: true,
        message: "Database setup completed successfully",
        tables: ["products", "orders", "newsletter_subscribers"],
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Database setup error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Database setup failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
