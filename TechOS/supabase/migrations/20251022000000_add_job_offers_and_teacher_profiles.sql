-- Create enums for job offers
CREATE TYPE public.job_type AS ENUM ('full_time', 'part_time', 'contract', 'temporary');
CREATE TYPE public.job_status AS ENUM ('active', 'closed', 'draft');
CREATE TYPE public.education_level AS ENUM ('bachelors', 'masters', 'phd', 'specialist');

-- Create teacher_profiles table to extend profiles with teaching-specific info
CREATE TABLE public.teacher_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  specialties TEXT[] DEFAULT '{}',
  education_level public.education_level,
  years_of_experience INTEGER DEFAULT 0,
  certifications TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{}',
  bio TEXT,
  cv_url TEXT,
  portfolio_url TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create job_offers table
CREATE TABLE public.job_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  responsibilities TEXT[] DEFAULT '{}',
  subject_area TEXT NOT NULL,
  job_type public.job_type NOT NULL DEFAULT 'full_time',
  status public.job_status NOT NULL DEFAULT 'active',
  salary_min DECIMAL(10, 2),
  salary_max DECIMAL(10, 2),
  location TEXT,
  benefits TEXT[] DEFAULT '{}',
  vacancies INTEGER DEFAULT 1,
  application_deadline DATE,
  start_date DATE,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  published_at TIMESTAMPTZ
);

-- Create job_applications table to track which teachers applied to which jobs
CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_offer_id UUID REFERENCES public.job_offers(id) ON DELETE CASCADE NOT NULL,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'shortlisted', 'rejected', 'accepted')),
  cover_letter TEXT,
  expected_salary DECIMAL(10, 2),
  availability_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(job_offer_id, teacher_id)
);

-- Enable Row Level Security
ALTER TABLE public.teacher_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for teacher_profiles
CREATE POLICY "Anyone can view teacher profiles"
  ON public.teacher_profiles FOR SELECT
  USING (true);

CREATE POLICY "Teachers can insert their own profile"
  ON public.teacher_profiles FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Teachers can update their own profile"
  ON public.teacher_profiles FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Teachers can delete their own profile"
  ON public.teacher_profiles FOR DELETE
  USING (user_id = auth.uid());

-- RLS Policies for job_offers
CREATE POLICY "Anyone can view active job offers"
  ON public.job_offers FOR SELECT
  USING (status = 'active' OR created_by = auth.uid());

CREATE POLICY "Institution admins can insert job offers"
  ON public.job_offers FOR INSERT
  WITH CHECK (
    institution_id = public.get_user_institution_id() AND 
    public.get_user_role() = 'admin'
  );

CREATE POLICY "Institution admins can update their job offers"
  ON public.job_offers FOR UPDATE
  USING (
    institution_id = public.get_user_institution_id() AND 
    public.get_user_role() = 'admin'
  );

CREATE POLICY "Institution admins can delete their job offers"
  ON public.job_offers FOR DELETE
  USING (
    institution_id = public.get_user_institution_id() AND 
    public.get_user_role() = 'admin'
  );

-- RLS Policies for job_applications
CREATE POLICY "Teachers can view their own applications"
  ON public.job_applications FOR SELECT
  USING (teacher_id = auth.uid());

CREATE POLICY "Institution admins can view applications to their job offers"
  ON public.job_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.job_offers jo
      WHERE jo.id = job_applications.job_offer_id
      AND jo.institution_id = public.get_user_institution_id()
      AND public.get_user_role() = 'admin'
    )
  );

CREATE POLICY "Teachers can insert their own applications"
  ON public.job_applications FOR INSERT
  WITH CHECK (teacher_id = auth.uid());

CREATE POLICY "Teachers can update their own applications"
  ON public.job_applications FOR UPDATE
  USING (teacher_id = auth.uid() AND status = 'pending');

CREATE POLICY "Institution admins can update applications to their job offers"
  ON public.job_applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.job_offers jo
      WHERE jo.id = job_applications.job_offer_id
      AND jo.institution_id = public.get_user_institution_id()
      AND public.get_user_role() = 'admin'
    )
  );

-- Triggers to update updated_at timestamps
CREATE TRIGGER update_teacher_profiles_updated_at
  BEFORE UPDATE ON public.teacher_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_offers_updated_at
  BEFORE UPDATE ON public.job_offers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_teacher_profiles_user_id ON public.teacher_profiles(user_id);
CREATE INDEX idx_teacher_profiles_specialties ON public.teacher_profiles USING GIN(specialties);
CREATE INDEX idx_job_offers_institution_id ON public.job_offers(institution_id);
CREATE INDEX idx_job_offers_status ON public.job_offers(status);
CREATE INDEX idx_job_offers_subject_area ON public.job_offers(subject_area);
CREATE INDEX idx_job_applications_job_offer_id ON public.job_applications(job_offer_id);
CREATE INDEX idx_job_applications_teacher_id ON public.job_applications(teacher_id);
CREATE INDEX idx_job_applications_status ON public.job_applications(status);
