-- Create products/prompts table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  pack_type TEXT NOT NULL CHECK (pack_type IN ('starter', 'professional', 'enterprise')),
  prompt_content TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_pack_type ON public.products(pack_type);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);

-- Enable RLS for security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public read access for products (anyone can see them)
CREATE POLICY "products_select_all"
  ON public.products FOR SELECT
  USING (is_active = true);
