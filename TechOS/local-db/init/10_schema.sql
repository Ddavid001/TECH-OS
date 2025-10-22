-- Minimal public schema for local Postgres (no Supabase auth/RLS)

-- Institutions table
CREATE TABLE IF NOT EXISTS public.institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('school', 'university', 'institute')),
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_institutions_type ON public.institutions(type);
CREATE INDEX IF NOT EXISTS idx_institutions_coordinates ON public.institutions(latitude, longitude);

-- Job offers table (no RLS, plain FK)
CREATE TABLE IF NOT EXISTS public.job_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE,
  institution_name TEXT NOT NULL,
  institution_details TEXT,
  position_title TEXT NOT NULL,
  branch TEXT,
  requirements TEXT NOT NULL,
  tentative_salary TEXT,
  schedule TEXT,
  description TEXT,
  experience_level TEXT,
  education_level TEXT,
  benefits TEXT,
  application_deadline TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_job_offers_institution ON public.job_offers(institution_id);
CREATE INDEX IF NOT EXISTS idx_job_offers_active ON public.job_offers(is_active);
CREATE INDEX IF NOT EXISTS idx_job_offers_created ON public.job_offers(created_at DESC);

-- Job applications table (local simplified, no auth.users dependency)
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  job_offer_id UUID NOT NULL REFERENCES public.job_offers(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewing', 'accepted', 'rejected', 'withdrawn')),
  cover_letter TEXT,
  resume_url TEXT,
  portfolio_url TEXT,
  phone TEXT,
  email TEXT,
  additional_info JSONB DEFAULT '{}',
  submitted_at TIMESTAMPTZ DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON public.job_applications(user_id);



