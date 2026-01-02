-- Create orders table to track purchases and downloads
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

-- Create index on email for quick lookups
CREATE INDEX IF NOT EXISTS idx_orders_email ON public.orders(email);

-- Create index on charge_id for webhook lookups
CREATE INDEX IF NOT EXISTS idx_orders_charge_id ON public.orders(charge_id);

-- Create index on payment_status for admin queries
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for checkout flow)
CREATE POLICY "Allow anonymous inserts" ON public.orders
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow authenticated users to read their own orders
CREATE POLICY "Allow users to read own orders" ON public.orders
  FOR SELECT TO authenticated
  USING (email = current_user_email() OR auth.role() = 'service_role');

-- Allow service role to update orders (for webhooks)
CREATE POLICY "Allow service role to update" ON public.orders
  FOR UPDATE TO service_role
  USING (true);
