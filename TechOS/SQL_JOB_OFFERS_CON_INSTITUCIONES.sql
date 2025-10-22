-- ====================================================================
-- SQL PARA OFERTAS LABORALES CON RELACIÓN A INSTITUCIONES
-- ====================================================================
-- Actualiza la tabla job_offers para relacionarla con institutions
-- y añade datos de demostración
-- ====================================================================

-- 1. ELIMINAR TABLA SI EXISTE (empezar desde cero)
DROP TABLE IF EXISTS public.job_offers CASCADE;

-- 2. CREAR TABLA JOB_OFFERS CON institution_id
CREATE TABLE public.job_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE,
  institution_name TEXT NOT NULL,
  institution_details TEXT,
  position_title TEXT NOT NULL,
  branch TEXT,
  requirements TEXT NOT NULL,
  tentative_salary TEXT,
  schedule TEXT,
  is_active BOOLEAN DEFAULT true NOT NULL
);

-- 3. HABILITAR RLS
ALTER TABLE public.job_offers ENABLE ROW LEVEL SECURITY;

-- 4. ELIMINAR POLÍTICA SI EXISTE
DROP POLICY IF EXISTS "Allow public read access to active job offers" ON public.job_offers;

-- 5. CREAR POLÍTICA DE LECTURA PÚBLICA
CREATE POLICY "Allow public read access to active job offers" 
ON public.job_offers 
FOR SELECT 
USING (is_active = true);

-- 6. CREAR ÍNDICES
CREATE INDEX IF NOT EXISTS idx_job_offers_institution ON public.job_offers(institution_id);
CREATE INDEX IF NOT EXISTS idx_job_offers_active ON public.job_offers(is_active);
CREATE INDEX IF NOT EXISTS idx_job_offers_created ON public.job_offers(created_at DESC);

-- ====================================================================
-- 7. INSERTAR OFERTAS DE DEMOSTRACIÓN
-- ====================================================================

-- Primero, obtener los IDs de las instituciones (asumiendo que ya existen)
-- Si no tienes instituciones, primero ejecuta SQL_RAPIDO_INSTITUCIONES.sql

-- Universidad Central de Venezuela
INSERT INTO public.job_offers (
  institution_id,
  institution_name,
  position_title,
  branch,
  requirements,
  tentative_salary,
  schedule
)
SELECT 
  id,
  'Universidad Central de Venezuela',
  'Profesor de Matemáticas',
  'Ciencias Exactas',
  'Licenciatura en Matemáticas o Educación mención Matemáticas. Experiencia mínima de 3 años.',
  '$800 - $1,200 mensuales',
  'Lunes a Viernes, 7:00 AM - 12:00 PM'
FROM public.institutions 
WHERE name = 'Universidad Central de Venezuela'
LIMIT 1;

INSERT INTO public.job_offers (
  institution_id,
  institution_name,
  position_title,
  branch,
  requirements,
  tentative_salary,
  schedule
)
SELECT 
  id,
  'Universidad Central de Venezuela',
  'Profesor de Física',
  'Ciencias Exactas',
  'Maestría en Física. Experiencia en investigación preferida.',
  '$1,000 - $1,500 mensuales',
  'Martes y Jueves, 2:00 PM - 6:00 PM'
FROM public.institutions 
WHERE name = 'Universidad Central de Venezuela'
LIMIT 1;

-- Universidad Simón Bolívar
INSERT INTO public.job_offers (
  institution_id,
  institution_name,
  position_title,
  branch,
  requirements,
  tentative_salary,
  schedule
)
SELECT 
  id,
  'Universidad Simón Bolívar',
  'Profesor de Programación',
  'Ingeniería y Tecnología',
  'Ingeniero en Computación o Informática. Conocimientos en Python, Java y bases de datos.',
  '$1,200 - $1,800 mensuales',
  'Lunes, Miércoles y Viernes, 8:00 AM - 12:00 PM'
FROM public.institutions 
WHERE name = 'Universidad Simón Bolívar'
LIMIT 1;

-- Universidad Católica Andrés Bello
INSERT INTO public.job_offers (
  institution_id,
  institution_name,
  position_title,
  branch,
  requirements,
  tentative_salary,
  schedule
)
SELECT 
  id,
  'Universidad Católica Andrés Bello',
  'Profesor de Inglés',
  'Idiomas',
  'Licenciatura en Educación mención Inglés o certificación TEFL/TESOL. Nivel C1 o superior.',
  '$700 - $1,000 mensuales',
  'Lunes a Viernes, 1:00 PM - 5:00 PM'
FROM public.institutions 
WHERE name = 'Universidad Católica Andrés Bello'
LIMIT 1;

INSERT INTO public.job_offers (
  institution_id,
  institution_name,
  position_title,
  branch,
  requirements,
  tentative_salary,
  schedule
)
SELECT 
  id,
  'Universidad Católica Andrés Bello',
  'Profesor de Filosofía',
  'Humanidades',
  'Licenciatura en Filosofía. Experiencia docente mínima de 2 años.',
  '$650 - $900 mensuales',
  'Martes y Jueves, 9:00 AM - 1:00 PM'
FROM public.institutions 
WHERE name = 'Universidad Católica Andrés Bello'
LIMIT 1;

-- Universidad Metropolitana
INSERT INTO public.job_offers (
  institution_id,
  institution_name,
  position_title,
  branch,
  requirements,
  tentative_salary,
  schedule
)
SELECT 
  id,
  'Universidad Metropolitana',
  'Profesor de Administración de Empresas',
  'Ciencias Económicas y Sociales',
  'Maestría en Administración. Experiencia en el sector empresarial.',
  '$1,100 - $1,600 mensuales',
  'Lunes, Miércoles y Viernes, 6:00 PM - 9:00 PM'
FROM public.institutions 
WHERE name = 'Universidad Metropolitana'
LIMIT 1;

-- Colegio Emil Friedman
INSERT INTO public.job_offers (
  institution_id,
  institution_name,
  position_title,
  branch,
  requirements,
  tentative_salary,
  schedule
)
SELECT 
  id,
  'Colegio Emil Friedman',
  'Docente de Primaria',
  'Educación Básica',
  'Licenciatura en Educación Integral. Experiencia con niños de 6-12 años.',
  '$600 - $850 mensuales',
  'Lunes a Viernes, 7:00 AM - 1:00 PM'
FROM public.institutions 
WHERE name = 'Colegio Emil Friedman'
LIMIT 1;

-- Colegio San Ignacio de Loyola
INSERT INTO public.job_offers (
  institution_id,
  institution_name,
  position_title,
  branch,
  requirements,
  tentative_salary,
  schedule
)
SELECT 
  id,
  'Colegio San Ignacio de Loyola',
  'Profesor de Química',
  'Ciencias Naturales',
  'Licenciatura en Química o Educación mención Química. Manejo de laboratorio.',
  '$750 - $1,000 mensuales',
  'Lunes a Viernes, 12:00 PM - 4:00 PM'
FROM public.institutions 
WHERE name = 'Colegio San Ignacio de Loyola'
LIMIT 1;

-- IUPOLC
INSERT INTO public.job_offers (
  institution_id,
  institution_name,
  position_title,
  branch,
  requirements,
  tentative_salary,
  schedule
)
SELECT 
  id,
  'IUPOLC',
  'Instructor de Redes y Telecomunicaciones',
  'Tecnología',
  'TSU o Ingeniería en Telecomunicaciones. Certificaciones Cisco preferidas.',
  '$900 - $1,300 mensuales',
  'Martes y Jueves, 5:00 PM - 9:00 PM'
FROM public.institutions 
WHERE name = 'IUPOLC'
LIMIT 1;

-- ====================================================================
-- 8. VERIFICAR RESULTADOS
-- ====================================================================

SELECT 
  jo.institution_name,
  jo.position_title,
  jo.branch,
  jo.schedule,
  jo.tentative_salary,
  i.type as institution_type
FROM public.job_offers jo
LEFT JOIN public.institutions i ON jo.institution_id = i.id
WHERE jo.is_active = true
ORDER BY jo.institution_name, jo.position_title;

-- ✅ Deberías ver 9 ofertas de trabajo distribuidas en las 8 instituciones

-- ====================================================================
-- 9. ESTADÍSTICAS
-- ====================================================================

SELECT 
  jo.institution_name,
  COUNT(*) as total_ofertas
FROM public.job_offers jo
WHERE jo.is_active = true
GROUP BY jo.institution_name
ORDER BY total_ofertas DESC;

-- ====================================================================
-- NOTAS IMPORTANTES:
-- ====================================================================
-- 1. Este SQL requiere que la tabla 'institutions' ya exista
-- 2. Si no tienes instituciones, ejecuta primero SQL_RAPIDO_INSTITUCIONES.sql
-- 3. Las ofertas están relacionadas con institutions mediante institution_id
-- 4. Al eliminar una institución, sus ofertas también se eliminan (ON DELETE CASCADE)
-- 5. Todas las ofertas son públicas (is_active = true) y pueden verse sin autenticación

-- ====================================================================
-- ✅ LISTO! Ahora puedes:
-- 1. Abrir http://localhost:XXXX/ofertas - Ver todas las ofertas
-- 2. Click en mapa → institución → "Ofertas Docentes" - Ver ofertas filtradas
-- ====================================================================


