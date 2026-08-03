-- Add zip_path column to products table for file storage integration
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS zip_path TEXT;

-- Add comment documenting the format
COMMENT ON COLUMN public.products.zip_path IS 'Path to ZIP file in Supabase Storage (bucket: prompt-packs). Format: packs/starter-pack.zip';

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_products_zip_path ON public.products(zip_path);
