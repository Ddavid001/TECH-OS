-- ==========================================
-- SCRIPT SQL COMPLETO PARA TECHOS
-- Incluye: Job Offers + Instituciones de Caracas con Coordenadas
-- ==========================================

-- 1. CREAR TABLA JOB_OFFERS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.job_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  institution_name TEXT NOT NULL,
  institution_details TEXT,
  position_title TEXT NOT NULL,
  branch TEXT,
  requirements TEXT NOT NULL,
  tentative_salary TEXT,
  is_active BOOLEAN DEFAULT true NOT NULL
);

ALTER TABLE public.job_offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to active offers" 
ON public.job_offers 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Allow authenticated read access to all offers" 
ON public.job_offers 
FOR SELECT 
TO authenticated
USING (true);

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

CREATE INDEX IF NOT EXISTS idx_job_offers_active ON public.job_offers(is_active);
CREATE INDEX IF NOT EXISTS idx_job_offers_created_at ON public.job_offers(created_at DESC);

-- 2. INSERTAR OFERTAS LABORALES
-- ==========================================
INSERT INTO public.job_offers (institution_name, position_title, branch, requirements, tentative_salary, institution_details, is_active) VALUES
  ('Colegio Ejemplo Caracas', 'Profesor de Matemáticas', 'Matemáticas', 'Licenciatura en Educación mención Matemáticas, mínimo 3 años de experiencia comprobable en educación secundaria. Dominio de metodologías activas de enseñanza.', '$1200', 'Institución reconocida con enfoque en ciencias exactas y tecnología. Más de 30 años formando estudiantes de excelencia.', true),
  ('Universidad Central Tech', 'Docente de Programación Web', 'Tecnología', 'Ingeniero en Sistemas o Computación, experiencia comprobable en React, Node.js y TypeScript. Se valorará experiencia en docencia universitaria.', 'A convenir', 'Universidad líder en formación tecnológica con laboratorios equipados con última tecnología.', true),
  ('Instituto Idiomas Modernos', 'Profesor de Inglés', 'Idiomas', 'Certificación C1/C2 en inglés (TOEFL, IELTS o equivalente), experiencia mínima de 2 años en docencia de idiomas. Conocimiento en metodología comunicativa.', '$1000', 'Instituto con más de 20 años de trayectoria en la enseñanza de idiomas extranjeros.', true),
  ('Colegio San Ignacio', 'Profesor de Ciencias Sociales', 'Ciencias Sociales', 'Licenciado en Historia, Geografía o Ciencias Sociales. Experiencia en educación básica y media. Capacidad para trabajar con metodologías innovadoras.', '$950 - $1100', 'Colegio privado con excelente reputación académica, enfocado en formación integral.', true),
  ('Academia de Música Beethoven', 'Profesor de Piano', 'Arte y Música', 'Título en música o conservatorio, especialización en piano. Experiencia dando clases a niños y adolescentes. Paciencia y vocación pedagógica.', '$800 - $1000', 'Academia especializada en formación musical con más de 15 años de experiencia.', true),
  ('Universidad Metropolitana', 'Docente de Química', 'Ciencias', 'Licenciado en Química o Bioquímica, preferiblemente con maestría. Experiencia en investigación y docencia universitaria.', '$1500', 'Universidad privada con laboratorios de última generación y enfoque en investigación científica.', true),
  ('Liceo Bolivariano Central', 'Profesor de Educación Física', 'Deportes', 'Licenciado en Educación Física y Deportes. Conocimientos en primeros auxilios. Experiencia trabajando con adolescentes.', '$900', 'Liceo público con amplias instalaciones deportivas y programa de desarrollo atlético.', true),
  ('Instituto Técnico Industrial', 'Instructor de Electricidad', 'Tecnología', 'Técnico Superior en Electricidad o Ingeniería Eléctrica. Experiencia práctica en instalaciones eléctricas industriales y residenciales.', '$1100', 'Instituto técnico con convenios con empresas para pasantías estudiantiles.', true),
  ('Colegio Integral', 'Psicopedagogo', 'Psicopedagogía', 'Licenciado en Psicopedagogía o Psicología Educativa. Experiencia en atención a estudiantes con necesidades especiales.', '$1000 - $1200', 'Colegio con departamento de orientación consolidado, enfoque en educación inclusiva.', true),
  ('Universidad Simón Rodríguez', 'Profesor de Marketing Digital', 'Negocios', 'Licenciado en Marketing, Comunicación o afines. Certificaciones en Google Ads, Meta Ads. Experiencia práctica en campañas digitales.', 'A convenir', 'Universidad con carreras de pregrado y postgrado en el área de negocios y tecnología.', true)
ON CONFLICT DO NOTHING;

-- 3. AGREGAR COORDENADAS A TABLA INSTITUTIONS (Si existe)
-- ==========================================
-- Si la tabla institutions ya existe, agregar columnas de coordenadas
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'institutions') THEN
    -- Agregar columnas si no existen
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'institutions' AND column_name = 'address') THEN
      ALTER TABLE public.institutions ADD COLUMN address TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'institutions' AND column_name = 'latitude') THEN
      ALTER TABLE public.institutions ADD COLUMN latitude DECIMAL(10, 8);
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'institutions' AND column_name = 'longitude') THEN
      ALTER TABLE public.institutions ADD COLUMN longitude DECIMAL(11, 8);
    END IF;
  END IF;
END $$;

-- 4. ACTUALIZAR INSTITUCIONES EXISTENTES CON COORDENADAS DE CARACAS
-- ==========================================
-- IMPORTANTE: Este bloque actualizará instituciones SOLO si existen con estos nombres
-- Si no existen, este bloque no hará nada (no dará error)

UPDATE public.institutions 
SET 
  address = 'Av. Boyacá, La Florida, Caracas',
  latitude = 10.4965,
  longitude = -66.8527
WHERE name ILIKE '%universidad central%' OR name ILIKE '%UCV%';

UPDATE public.institutions 
SET 
  address = 'Av. Universidad, Los Chaguaramos, Caracas',
  latitude = 10.4897,
  longitude = -66.8915
WHERE name ILIKE '%universidad metropolitana%' OR name ILIKE '%unimet%';

UPDATE public.institutions 
SET 
  address = 'Av. Casanova, Sabana Grande, Caracas',
  latitude = 10.4995,
  longitude = -66.8837
WHERE name ILIKE '%colegio%caracas%';

UPDATE public.institutions 
SET 
  address = 'Av. Principal de Bello Monte, Caracas',
  latitude = 10.4925,
  longitude = -66.8542
WHERE name ILIKE '%instituto%idiomas%';

UPDATE public.institutions 
SET 
  address = 'Av. Francisco de Miranda, El Rosal, Caracas',
  latitude = 10.5015,
  longitude = -66.8445
WHERE name ILIKE '%colegio san ignacio%' OR name ILIKE '%san ignacio%';

UPDATE public.institutions 
SET 
  address = 'Calle Real de Sabana Grande, Caracas',
  latitude = 10.5003,
  longitude = -66.8801
WHERE name ILIKE '%academia%musica%' OR name ILIKE '%beethoven%';

UPDATE public.institutions 
SET 
  address = 'Av. Libertador, Los Caobos, Caracas',
  latitude = 10.4985,
  longitude = -66.9035
WHERE name ILIKE '%liceo bolivariano%';

UPDATE public.institutions 
SET 
  address = 'Av. Sucre, Catia, Caracas',
  latitude = 10.4792,
  longitude = -66.9312
WHERE name ILIKE '%instituto tecnico%' OR name ILIKE '%industrial%';

UPDATE public.institutions 
SET 
  address = 'Av. Principal de Las Mercedes, Caracas',
  latitude = 10.4923,
  longitude = -66.8321
WHERE name ILIKE '%colegio integral%';

UPDATE public.institutions 
SET 
  address = 'Av. Rómulo Gallegos, Los Dos Caminos, Caracas',
  latitude = 10.4987,
  longitude = -66.8213
WHERE name ILIKE '%universidad simon rodriguez%' OR name ILIKE '%simón rodríguez%';

-- 5. CREAR ÍNDICES PARA BÚSQUEDAS GEOGRÁFICAS
-- ==========================================
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'institutions') THEN
    CREATE INDEX IF NOT EXISTS idx_institutions_coordinates ON public.institutions(latitude, longitude) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;
  END IF;
END $$;

-- 6. VERIFICAR DATOS INSERTADOS
-- ==========================================
SELECT COUNT(*) as total_job_offers FROM public.job_offers;

DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'institutions') THEN
    RAISE NOTICE 'Instituciones con coordenadas: %', (SELECT COUNT(*) FROM public.institutions WHERE latitude IS NOT NULL);
  END IF;
END $$;

-- ==========================================
-- FIN DEL SCRIPT
-- ==========================================



