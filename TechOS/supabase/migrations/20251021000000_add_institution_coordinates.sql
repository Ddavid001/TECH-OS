-- Add coordinates to institutions table
ALTER TABLE public.institutions 
ADD COLUMN address TEXT,
ADD COLUMN latitude DECIMAL(10, 8),
ADD COLUMN longitude DECIMAL(11, 8);

-- Create storage bucket for applications
INSERT INTO storage.buckets (id, name, public)
VALUES ('applications', 'applications', false);

-- Create applications table
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('teacher', 'institution')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  data JSONB NOT NULL DEFAULT '{}',
  documents TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on applications
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- RLS policies for applications
CREATE POLICY "Users can view their own applications"
ON public.applications
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own applications"
ON public.applications
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own applications"
ON public.applications
FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all applications"
ON public.applications
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
  )
);

CREATE POLICY "Admins can update all applications"
ON public.applications
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
  )
);

-- Storage policies for applications bucket
CREATE POLICY "Users can upload their application documents"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'applications' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their application documents"
ON storage.objects
FOR SELECT
USING (bucket_id = 'applications' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their application documents"
ON storage.objects
FOR DELETE
USING (bucket_id = 'applications' AND auth.uid() IS NOT NULL);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on applications
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
