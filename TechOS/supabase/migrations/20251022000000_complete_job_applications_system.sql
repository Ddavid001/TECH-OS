-- ============================================================================
-- COMPLETE JOB APPLICATIONS SYSTEM MIGRATION
-- Creado: 2025-10-22
-- Descripción: Sistema completo de aplicaciones de estudiantes a ofertas
-- ============================================================================

-- 1. MEJORAR TABLA DE JOB_OFFERS CON CAMPOS ADICIONALES
ALTER TABLE IF EXISTS public.job_offers ADD COLUMN IF NOT EXISTS
  institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE;

ALTER TABLE IF EXISTS public.job_offers ADD COLUMN IF NOT EXISTS
  description TEXT;

ALTER TABLE IF EXISTS public.job_offers ADD COLUMN IF NOT EXISTS
  experience_level TEXT;

ALTER TABLE IF EXISTS public.job_offers ADD COLUMN IF NOT EXISTS
  education_level TEXT;

ALTER TABLE IF EXISTS public.job_offers ADD COLUMN IF NOT EXISTS
  benefits TEXT;

ALTER TABLE IF EXISTS public.job_offers ADD COLUMN IF NOT EXISTS
  application_deadline TIMESTAMPTZ;

ALTER TABLE IF EXISTS public.job_offers ADD COLUMN IF NOT EXISTS
  updated_at TIMESTAMPTZ DEFAULT now();

-- 2. CREAR TABLA DE APLICACIONES A OFERTAS
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
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
  reviewed_by UUID REFERENCES auth.users(id),
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Crear índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON public.job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_job_offer_id ON public.job_applications(job_offer_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON public.job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_submitted_at ON public.job_applications(submitted_at DESC);

-- 3. CREAR TABLA DE AUDITORÍA DE APLICACIONES
CREATE TABLE IF NOT EXISTS public.application_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.job_applications(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  old_status TEXT,
  new_status TEXT,
  changed_by UUID REFERENCES auth.users(id),
  changed_at TIMESTAMPTZ DEFAULT now(),
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_application_audit_log_application_id 
  ON public.application_audit_log(application_id);
CREATE INDEX IF NOT EXISTS idx_application_audit_log_changed_at 
  ON public.application_audit_log(changed_at DESC);

-- 4. HABILITAR ROW LEVEL SECURITY EN JOB_APPLICATIONS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_audit_log ENABLE ROW LEVEL SECURITY;

-- 5. POLÍTICAS DE ROW LEVEL SECURITY PARA JOB_APPLICATIONS
-- Permitir que los usuarios vean sus propias aplicaciones
CREATE POLICY "Users can view their own job applications"
  ON public.job_applications
  FOR SELECT
  USING (auth.uid() = user_id);

-- Permitir que admins vean todas las aplicaciones
CREATE POLICY "Admins can view all job applications"
  ON public.job_applications
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Permitir que los usuarios creen aplicaciones
CREATE POLICY "Users can create job applications"
  ON public.job_applications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Permitir que admins actualicen aplicaciones
CREATE POLICY "Admins can update job applications"
  ON public.job_applications
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Permitir que los usuarios retiren sus aplicaciones
CREATE POLICY "Users can withdraw their applications"
  ON public.job_applications
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id AND status = 'withdrawn');

-- 6. POLÍTICAS PARA AUDITORÍA
CREATE POLICY "Users can view audit logs for their applications"
  ON public.application_audit_log
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.job_applications ja
      WHERE ja.id = application_id
      AND ja.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- 7. CREAR FUNCIÓN PARA ACTUALIZAR TIMESTAMP
CREATE OR REPLACE FUNCTION public.update_job_offers_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_job_offers_timestamp_trigger
BEFORE UPDATE ON public.job_offers
FOR EACH ROW
EXECUTE FUNCTION public.update_job_offers_timestamp();

-- 8. CREAR FUNCIÓN PARA REGISTRAR CAMBIOS EN APLICACIONES
CREATE OR REPLACE FUNCTION public.log_application_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF (OLD.status IS DISTINCT FROM NEW.status) THEN
    INSERT INTO public.application_audit_log (
      application_id,
      action,
      old_status,
      new_status,
      changed_by
    ) VALUES (
      NEW.id,
      'status_change',
      OLD.status,
      NEW.status,
      auth.uid()
    );
  END IF;
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER log_job_application_changes_trigger
BEFORE UPDATE ON public.job_applications
FOR EACH ROW
EXECUTE FUNCTION public.log_application_status_change();

-- 9. Crear vistas útiles
CREATE OR REPLACE VIEW public.job_applications_summary AS
SELECT
  ja.id,
  ja.user_id,
  p.first_name,
  p.last_name,
  p.email as user_email,
  jo.position_title,
  jo.institution_name,
  ja.status,
  ja.submitted_at,
  ja.reviewed_at,
  COUNT(*) OVER (PARTITION BY jo.id) as total_applications_for_offer,
  ROW_NUMBER() OVER (PARTITION BY ja.user_id ORDER BY ja.submitted_at DESC) as application_number
FROM public.job_applications ja
JOIN auth.users au ON ja.user_id = au.id
JOIN public.profiles p ON p.id = au.id
JOIN public.job_offers jo ON ja.job_offer_id = jo.id;

-- Estadísticas de aplicaciones
CREATE OR REPLACE VIEW public.job_applications_stats AS
SELECT
  COUNT(*) as total_applications,
  SUM(CASE WHEN status = 'submitted' THEN 1 ELSE 0 END) as pending_applications,
  SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END) as accepted_applications,
  SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected_applications,
  COUNT(DISTINCT user_id) as unique_applicants,
  COUNT(DISTINCT job_offer_id) as offers_with_applications
FROM public.job_applications;
