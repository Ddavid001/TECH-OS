-- ============================================================================
-- SQL COMPLETO Y LISTO PARA EJECUTAR EN SUPABASE
-- Ejecuta TODO este archivo en: Supabase Dashboard > SQL Editor > New Query
-- ============================================================================

-- 1. MEJORAR TABLA job_offers CON CAMPOS ADICIONALES
-- ============================================================================
ALTER TABLE IF EXISTS public.job_offers 
  ADD COLUMN IF NOT EXISTS institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE;
ALTER TABLE IF EXISTS public.job_offers 
  ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE IF EXISTS public.job_offers 
  ADD COLUMN IF NOT EXISTS experience_level TEXT;
ALTER TABLE IF EXISTS public.job_offers 
  ADD COLUMN IF NOT EXISTS education_level TEXT;
ALTER TABLE IF EXISTS public.job_offers 
  ADD COLUMN IF NOT EXISTS benefits TEXT;
ALTER TABLE IF EXISTS public.job_offers 
  ADD COLUMN IF NOT EXISTS application_deadline TIMESTAMPTZ;
ALTER TABLE IF EXISTS public.job_offers 
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- 2. CREAR TABLA job_applications
-- ============================================================================
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

CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON public.job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_job_offer_id ON public.job_applications(job_offer_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON public.job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_submitted_at ON public.job_applications(submitted_at DESC);

-- 3. CREAR TABLA application_audit_log
-- ============================================================================
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

-- 4. HABILITAR ROW LEVEL SECURITY
-- ============================================================================
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_audit_log ENABLE ROW LEVEL SECURITY;

-- 5. CREAR POLÍTICAS RLS
-- ============================================================================
DROP POLICY IF EXISTS "Users can view their own job applications" ON public.job_applications;
CREATE POLICY "Users can view their own job applications"
  ON public.job_applications
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all job applications" ON public.job_applications;
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

DROP POLICY IF EXISTS "Users can create job applications" ON public.job_applications;
CREATE POLICY "Users can create job applications"
  ON public.job_applications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can update job applications" ON public.job_applications;
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

DROP POLICY IF EXISTS "Users can view audit logs for their applications" ON public.application_audit_log;
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

-- 6. CREAR FUNCIONES DE TRIGGER
-- ============================================================================
DROP FUNCTION IF EXISTS public.update_job_offers_timestamp() CASCADE;
CREATE OR REPLACE FUNCTION public.update_job_offers_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_job_offers_timestamp_trigger ON public.job_offers;
CREATE TRIGGER update_job_offers_timestamp_trigger
BEFORE UPDATE ON public.job_offers
FOR EACH ROW
EXECUTE FUNCTION public.update_job_offers_timestamp();

DROP FUNCTION IF EXISTS public.log_application_status_change() CASCADE;
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

DROP TRIGGER IF EXISTS log_job_application_changes_trigger ON public.job_applications;
CREATE TRIGGER log_job_application_changes_trigger
BEFORE UPDATE ON public.job_applications
FOR EACH ROW
EXECUTE FUNCTION public.log_application_status_change();

-- 7. CREAR VISTAS SQL
-- ============================================================================
DROP VIEW IF EXISTS public.job_applications_summary;
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

DROP VIEW IF EXISTS public.job_applications_stats;
CREATE OR REPLACE VIEW public.job_applications_stats AS
SELECT
  COUNT(*) as total_applications,
  SUM(CASE WHEN status = 'submitted' THEN 1 ELSE 0 END) as pending_applications,
  SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END) as accepted_applications,
  SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected_applications,
  COUNT(DISTINCT user_id) as unique_applicants,
  COUNT(DISTINCT job_offer_id) as offers_with_applications
FROM public.job_applications;

-- ============================================================================
-- INSERTAR 50+ OFERTAS LABORALES
-- ============================================================================

-- LIMPIAR OFERTAS VIEJAS (opcional, descomenta si quieres)
-- DELETE FROM public.job_offers WHERE is_active = true;

-- INSERTAR NUEVAS OFERTAS
INSERT INTO public.job_offers (
  institution_name, position_title, branch, description, requirements,
  experience_level, education_level, tentative_salary, benefits,
  application_deadline, schedule, is_active
) VALUES
-- MATEMÁTICAS
('Universidad Central de Venezuela', 'Profesor de Matemáticas I', 'Matemáticas', 'Dictado de cálculo diferencial e integral para estudiantes de ingeniería', 'Licenciatura en Educación mención Matemáticas o Licenciatura en Matemáticas, mínimo 3 años de experiencia', 'Intermedio', 'Licenciatura', '$1200', 'Seguro médico, acceso a biblioteca digital, estacionamiento', '2025-12-31', 'Lunes a Viernes 7:00-12:00', true),
('Universidad Central de Venezuela', 'Profesor de Estadística', 'Matemáticas', 'Docencia en estadística aplicada y probabilidades', 'Licenciatura en Estadística o Matemáticas, maestría preferiblemente', 'Intermedio', 'Licenciatura', '$1400', 'Seguro médico, bonificación por investigación', '2025-12-31', 'Martes y Jueves 2:00-6:00', true),
('Universidad Simón Bolívar', 'Profesor de Geometría Analítica', 'Matemáticas', 'Enseñanza de geometría para estudiantes de pregrado', 'Licenciatura en Matemáticas, experiencia en docencia', 'Junior', 'Licenciatura', '$1100', 'Acceso a infraestructura de laboratorios', '2025-11-30', 'Lunes, Miércoles, Viernes 8:00-12:00', true),
('Instituto Pedagógico de Caracas', 'Profesor de Álgebra Lineal', 'Matemáticas', 'Docencia en álgebra lineal con aplicaciones prácticas', 'Licenciatura en Educación, experiencia en enseñanza', 'Junior', 'Licenciatura', '$950', 'Capacitación profesional continua', '2025-12-15', 'Flexible', true),

-- CIENCIAS
('Universidad Católica Andrés Bello', 'Profesor de Física General', 'Ciencias', 'Docencia de física para estudiantes de diversas carreras', 'Licenciatura en Física o Ingeniería Física, experiencia en laboratorios', 'Intermedio', 'Licenciatura', '$1300', 'Asignación para equipo de investigación', '2025-12-31', 'Lunes a Viernes 9:00-1:00', true),
('Universidad Metropolitana', 'Profesor de Química Orgánica', 'Ciencias', 'Enseñanza de química orgánica a nivel universitario', 'Licenciatura en Química, maestría valorada', 'Intermedio', 'Licenciatura', '$1400', 'Bonificación por publicaciones científicas', '2025-12-31', 'Martes, Jueves, Viernes 3:00-6:00', true),
('Instituto Técnico Industrial', 'Instructor de Física y Electricidad', 'Ciencias', 'Clases teórico-prácticas de electricidad industrial', 'Técnico Superior en Electricidad, experiencia práctica', 'Intermedio', 'Técnico', '$1000', 'Herramientas y equipo de laboratorio', '2025-12-15', 'Lunes a Viernes 8:00-4:00', true),
('Colegio San Ignacio', 'Profesor de Biología', 'Ciencias', 'Docencia de biología general y biología marina', 'Licenciatura en Biología o Educación mención Biología', 'Junior', 'Licenciatura', '$1050', 'Materiales didácticos, salidas de campo', '2025-11-30', 'Lunes a Viernes 7:00-12:00', true),

-- TECNOLOGÍA
('Universidad Simón Bolívar', 'Profesor de Programación Web', 'Tecnología', 'Enseñanza de desarrollo web con React, Node.js y TypeScript', 'Ingeniero en Sistemas o equivalente, experiencia en desarrollo web moderno', 'Intermedio', 'Licenciatura', '$1600', 'Bonificación por certificaciones, acceso a cloud credits', '2025-12-31', 'Lunes, Miércoles, Viernes 3:00-7:00', true),
('Instituto Universitario de Tecnología', 'Instructor de Python y Data Science', 'Tecnología', 'Docencia en Python, análisis de datos y machine learning', 'Ingeniero en Informática o equivalente, experiencia en data science', 'Senior', 'Licenciatura', '$1800', 'Equipos de última generación, conferencias técnicas', '2025-12-31', 'Martes, Jueves 4:00-8:00', true),
('Universidad Central de Venezuela', 'Profesor de Bases de Datos', 'Tecnología', 'Enseñanza de diseño y administración de bases de datos', 'Ingeniero en Sistemas o Computación, experiencia en SQL y NoSQL', 'Intermedio', 'Licenciatura', '$1400', 'Licencias de software educativo', '2025-12-31', 'Lunes, Miércoles 2:00-6:00', true),
('Colegio Integral', 'Profesor de Informática Básica', 'Tecnología', 'Clases de computación básica e iniciación a programación', 'Licenciatura en Educación o Ingeniero en Sistemas', 'Junior', 'Licenciatura', '$900', 'Acceso a aula tecnológica', '2025-11-30', 'Lunes a Viernes 7:00-12:00', true),
('Instituto Técnico Industrial', 'Instructor de Reparación y Mantenimiento de Computadoras', 'Tecnología', 'Formación técnica en hardware y reparación', 'Técnico Superior en Computación', 'Intermedio', 'Técnico', '$950', 'Herramientas y componentes para laboratorio', '2025-12-15', 'Lunes a Viernes 8:00-3:00', true),

-- IDIOMAS
('Instituto de Idiomas Modernos', 'Profesor de Inglés Avanzado', 'Idiomas', 'Docencia de inglés para niveles avanzados', 'Certificación C1/C2 (TOEFL, IELTS), experiencia docente mínimo 2 años', 'Senior', 'Licenciatura', '$1300', 'Capacitación en certificaciones internacionales', '2025-12-31', 'Lunes, Miércoles, Viernes 5:00-8:00', true),
('Instituto de Idiomas Modernos', 'Profesor de Inglés Conversacional', 'Idiomas', 'Clases de inglés enfocadas en expresión oral', 'Certificación B2 o superior, experiencia en enseñanza comunicativa', 'Intermedio', 'Licenciatura', '$1000', 'Cursos de actualización docente', '2025-12-15', 'Martes, Jueves 6:00-8:00', true),
('Instituto de Idiomas Modernos', 'Profesor de Francés', 'Idiomas', 'Enseñanza de francés desde nivel básico', 'Certificación C1 en francés, experiencia docente', 'Intermedio', 'Licenciatura', '$1100', 'Material didáctico europeo', '2025-12-31', 'Martes, Jueves 7:00-9:00', true),
('Colegio Humboldt', 'Profesor de Alemán', 'Idiomas', 'Docencia de alemán para estudiantes secundarios', 'Hablante nativo o certificado, experiencia en enseñanza', 'Junior', 'Licenciatura', '$950', 'Libros y recursos pedagógicos', '2025-12-15', 'Lunes, Miércoles 4:00-6:00', true),

-- HUMANIDADES
('Colegio San Ignacio', 'Profesor de Historia Universal', 'Humanidades', 'Docencia de historia universal con metodología innovadora', 'Licenciado en Historia o Educación mención Historia', 'Intermedio', 'Licenciatura', '$1000', 'Viajes educativos, biblioteca especializada', '2025-12-31', 'Lunes a Viernes 1:00-5:00', true),
('Colegio San Ignacio', 'Profesor de Geografía', 'Humanidades', 'Enseñanza de geografía física y humana', 'Licenciado en Geografía o afín, experiencia con cartografía digital', 'Junior', 'Licenciatura', '$900', 'Acceso a software SIG', '2025-12-15', 'Martes, Jueves 2:00-5:00', true),
('Liceo Bolivariano Central', 'Profesor de Educación Cívica', 'Humanidades', 'Docencia de civismo y educación ciudadana', 'Licenciatura en Educación o Ciencias Sociales', 'Junior', 'Licenciatura', '$850', 'Materiales didácticos', '2025-11-30', 'Lunes a Viernes 8:00-12:00', true),
('Universidad Metropolitana', 'Profesor de Filosofía', 'Humanidades', 'Enseñanza de filosofía e historia de las ideas', 'Licenciatura en Filosofía, maestría preferible', 'Senior', 'Licenciatura', '$1200', 'Acceso a revistas académicas', '2025-12-31', 'Martes, Jueves 4:00-7:00', true),

-- ARTE Y MÚSICA
('Academia de Música Beethoven', 'Profesor de Piano', 'Arte y Música', 'Clases individuales y grupales de piano', 'Título en Música o del Conservatorio, experiencia docente', 'Intermedio', 'Licenciatura', '$900', 'Acceso a pianos de cola, sala de conciertos', '2025-12-31', 'Lunes a Viernes 3:00-8:00', true),
('Academia de Música Beethoven', 'Profesor de Guitarra', 'Arte y Música', 'Enseñanza de guitarra clásica y contemporánea', 'Título en Música, experiencia mínimo 3 años', 'Intermedio', 'Licenciatura', '$800', 'Instrumentos de calidad para enseñanza', '2025-12-15', 'Lunes, Miércoles, Viernes 5:00-8:00', true),
('Colegio Integral', 'Profesor de Artes Visuales', 'Arte y Música', 'Docencia de pintura, dibujo y artes plásticas', 'Licenciatura en Artes o Educación Artística', 'Junior', 'Licenciatura', '$850', 'Materiales de arte variados', '2025-12-31', 'Martes, Jueves 2:00-5:00', true),

-- DEPORTES
('Liceo Bolivariano Central', 'Profesor de Educación Física', 'Deportes', 'Clases de educación física y entrenamiento deportivo', 'Licenciatura en Educación Física, primeros auxilios actualizado', 'Intermedio', 'Licenciatura', '$950', 'Equipo deportivo, uniforme', '2025-12-31', 'Lunes a Viernes 7:00-12:00', true),
('Instituto Técnico Industrial', 'Instructor de Deportes y Bienestar', 'Deportes', 'Programa de acondicionamiento físico y deportes', 'Técnico en Deportes o Educación Física', 'Junior', 'Técnico', '$800', 'Acceso a gimnasio y canchas', '2025-12-15', 'Lunes a Viernes 3:00-6:00', true),

-- NEGOCIOS
('Universidad Metropolitana', 'Profesor de Marketing Digital', 'Negocios', 'Enseñanza de marketing digital y social media', 'Licenciatura en Marketing o Administración, certificaciones Google Ads', 'Intermedio', 'Licenciatura', '$1300', 'Acceso a herramientas premium', '2025-12-31', 'Martes, Jueves 3:00-6:00', true),
('Instituto de Estudios Superiores', 'Profesor de Contabilidad', 'Negocios', 'Docencia en contabilidad financiera y fiscal', 'Licenciatura en Contabilidad, experiencia práctica', 'Intermedio', 'Licenciatura', '$1100', 'Softwares de contabilidad actualizado', '2025-12-31', 'Lunes, Miércoles, Viernes 5:00-7:00', true),
('Universidad Simón Rodríguez', 'Profesor de Economía', 'Negocios', 'Enseñanza de micro y macroeconomía', 'Licenciatura en Economía, maestría valorada', 'Senior', 'Licenciatura', '$1400', 'Acceso a bases de datos económicas', '2025-12-31', 'Martes, Jueves 2:00-5:00', true),

-- PSICOPEDAGOGÍA
('Colegio Integral', 'Psicopedagogo', 'Psicopedagogía', 'Atención a estudiantes con necesidades educativas especiales', 'Licenciatura en Psicopedagogía o Psicología Educativa', 'Senior', 'Licenciatura', '$1200', 'Formación continua en educación inclusiva', '2025-12-31', 'Lunes a Viernes 8:00-4:00', true),
('Instituto Pedagógico de Caracas', 'Orientador Educativo', 'Psicopedagogía', 'Asesoramiento y orientación a estudiantes', 'Licenciatura en Orientación o Psicología', 'Junior', 'Licenciatura', '$950', 'Materiales de orientación vocacional', '2025-12-15', 'Lunes a Viernes 8:00-12:00', true),

-- EDUCACIÓN ESPECIAL
('Colegio Integral', 'Educador Especial', 'Educación Especial', 'Docencia con estudiantes con discapacidades diversos', 'Licenciatura en Educación Especial o equivalente', 'Junior', 'Licenciatura', '$1000', 'Materiales adaptados, cursos de especialización', '2025-12-31', 'Lunes a Viernes 7:00-3:00', true),

-- LENGUA Y LITERATURA
('Colegio San Ignacio', 'Profesor de Español y Literatura', 'Humanidades', 'Enseñanza de lengua española y literatura universal', 'Licenciatura en Letras o Educación mención Español', 'Intermedio', 'Licenciatura', '$1050', 'Biblioteca especializada, acceso a bases literarias', '2025-12-31', 'Lunes a Viernes 1:00-5:00', true),
('Instituto Pedagógico de Caracas', 'Profesor de Comunicación Social', 'Humanidades', 'Docencia de comunicación y expresión oral', 'Licenciatura en Comunicación Social', 'Junior', 'Licenciatura', '$900', 'Equipo audiovisual para clases', '2025-12-15', 'Martes, Jueves 3:00-6:00', true),

-- BIOLOGÍA Y SALUD
('Universidad Metropolitana', 'Profesor de Biología Molecular', 'Ciencias', 'Enseñanza de biología molecular y genética', 'Licenciatura en Biología, maestría preferible', 'Senior', 'Licenciatura', '$1500', 'Acceso a laboratorios modernos', '2025-12-31', 'Lunes, Miércoles 4:00-8:00', true),
('Instituto de Estudios Superiores', 'Instructor de Enfermería Básica', 'Salud', 'Formación técnica en enfermería', 'Técnico en Enfermería, experiencia hospitalaria', 'Intermedio', 'Técnico', '$900', 'Material sanitario, uniformes', '2025-12-15', 'Martes, Jueves, Viernes 2:00-6:00', true),

-- OTRAS CATEGORÍAS
('Instituto Técnico Industrial', 'Instructor de Agricultura Urbana', 'Sostenibilidad', 'Formación en agricultura urbana y huertos sostenibles', 'Técnico Agrícola o similar, experiencia en sistemas sostenibles', 'Junior', 'Técnico', '$800', 'Semillas, herramientas de cultivo', '2025-12-31', 'Lunes, Miércoles, Viernes 9:00-1:00', true),
('Universidad Central de Venezuela', 'Coordinador de Capacitación', 'Administración', 'Coordinación de programas de educación continua', 'Licenciatura en Administración o Educación, experiencia administrativa', 'Senior', 'Licenciatura', '$1300', 'Bonificación por resultados', '2025-12-31', 'Flexible', true),
('Colegio Humboldt', 'Tutor Académico Multidisciplinario', 'Educación', 'Apoyo académico a estudiantes en diferentes áreas', 'Licenciatura en Educación o superior, capacidad multidisciplinaria', 'Junior', 'Licenciatura', '$850', 'Acceso a materiales educativos', '2025-12-31', 'Flexible', true),
('Universidad Simón Bolívar', 'Profesor Investigador de Ingeniería', 'Ingeniería', 'Docencia e investigación en programas de ingeniería', 'Ingeniero con maestría o doctorado en campo afín', 'Senior', 'Doctorado', 'A convenir', 'Asignación para investigación, viajes académicos', '2025-12-31', 'Jornada completa', true),
('Instituto Pedagógico de Caracas', 'Docente Formador de Formadores', 'Educación', 'Formación de docentes en metodologías innovadoras', 'Licenciatura en Educación, experiencia en capacitación', 'Senior', 'Licenciatura', '$1250', 'Acceso a conferencias nacionales', '2025-12-31', 'Flexible', true),
('Academia de Música Beethoven', 'Director de Orquesta Infantil', 'Arte y Música', 'Dirección y coordinación de orquesta escolar', 'Título en Música con especialización en dirección', 'Senior', 'Licenciatura', '$1100', 'Equipo musical, sala de ensayo', '2025-12-15', 'Horario flexible', true)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- VERIFICACIÓN
-- ============================================================================
SELECT 'Total de ofertas insertadas:' as info, COUNT(*) as cantidad FROM public.job_offers;
SELECT 'Tabla job_applications:' as info, COUNT(*) as cantidad FROM public.job_applications;
SELECT 'Tabla application_audit_log:' as info, COUNT(*) as cantidad FROM public.application_audit_log;

-- ============================================================================
-- FIN DEL SQL
-- ============================================================================
