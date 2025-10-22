-- Create job_offers table
CREATE TABLE IF NOT EXISTS public.job_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  institution_name TEXT NOT NULL,
  institution_details TEXT,
  position_title TEXT NOT NULL,
  branch TEXT, -- Ejemplo: 'Matemáticas', 'Ciencias Sociales', 'Idiomas'
  requirements TEXT NOT NULL,
  tentative_salary TEXT, -- Usar TEXT para flexibilidad (ej. "A convenir", "$1000 - $1500")
  is_active BOOLEAN DEFAULT true NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.job_offers ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to active job offers
CREATE POLICY "Allow public read access to active offers" 
ON public.job_offers 
FOR SELECT 
USING (is_active = true);

-- Create policy for authenticated users to read all offers
CREATE POLICY "Allow authenticated read access to all offers" 
ON public.job_offers 
FOR SELECT 
TO authenticated
USING (true);

-- Create policy for admin users to insert/update/delete
CREATE POLICY "Allow admin full access" 
ON public.job_offers 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Create index for faster queries
CREATE INDEX idx_job_offers_active ON public.job_offers(is_active);
CREATE INDEX idx_job_offers_created_at ON public.job_offers(created_at DESC);


