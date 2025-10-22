-- ==========================================
-- SCRIPT COMPLETO PARA SUPABASE SQL EDITOR
-- Copiar y pegar todo en Supabase Dashboard > SQL Editor
-- ==========================================

-- 1. Crear tabla job_offers
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

-- 2. Habilitar Row Level Security
ALTER TABLE public.job_offers ENABLE ROW LEVEL SECURITY;

-- 3. Crear políticas RLS
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

-- 4. Crear índices
CREATE INDEX IF NOT EXISTS idx_job_offers_active ON public.job_offers(is_active);
CREATE INDEX IF NOT EXISTS idx_job_offers_created_at ON public.job_offers(created_at DESC);

-- 5. Insertar datos de ejemplo
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

-- Verificar que se crearon los datos
SELECT COUNT(*) as total_offers FROM public.job_offers;


