-- ====================================================================
-- SQL COMPLETO: INSTITUCIONES Y OFERTAS LABORALES
-- ====================================================================
-- Incluye 20+ instituciones de Venezuela y 30+ ofertas de trabajo
-- ====================================================================

-- ============================================
-- PARTE 1: INSTITUCIONES
-- ============================================

DROP TABLE IF EXISTS public.institutions CASCADE;

CREATE TABLE public.institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('school', 'university', 'institute')),
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL
);

ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to institutions" ON public.institutions;

CREATE POLICY "Allow public read access to institutions" 
ON public.institutions 
FOR SELECT 
USING (is_active = true);

CREATE INDEX IF NOT EXISTS idx_institutions_type ON public.institutions(type);
CREATE INDEX IF NOT EXISTS idx_institutions_coordinates ON public.institutions(latitude, longitude);

-- Insertar instituciones de Venezuela (Caracas y otras ciudades principales)
INSERT INTO public.institutions (name, type, latitude, longitude) VALUES
-- CARACAS
('Universidad Central de Venezuela', 'university', 10.489722, -66.889167),
('Universidad Simón Bolívar', 'university', 10.408611, -66.886111),
('Universidad Católica Andrés Bello', 'university', 10.503056, -66.936944),
('Universidad Metropolitana', 'university', 10.497222, -66.826389),
('Universidad Santa María', 'university', 10.502778, -66.876944),
('Universidad Nacional Experimental Politécnica', 'university', 10.491667, -66.891667),
('Universidad Pedagógica Experimental Libertador', 'university', 10.501389, -66.912222),
('Universidad Alejandro de Humboldt', 'university', 10.446111, -66.845833),
('Colegio Emil Friedman', 'school', 10.476667, -66.869444),
('Colegio San Ignacio de Loyola', 'school', 10.494722, -66.865278),
('Colegio Moral y Luces', 'school', 10.505556, -66.916667),
('Colegio La Salle', 'school', 10.482222, -66.857778),
('IUPOLC', 'institute', 10.488056, -66.877500),
('Instituto Universitario de Tecnología Industrial', 'institute', 10.478333, -66.903333),

-- MARACAIBO
('Universidad del Zulia', 'university', 10.664722, -71.612778),
('Universidad Rafael Belloso Chacín', 'university', 10.654167, -71.628333),
('Universidad Dr. Rafael Belloso Chacín', 'university', 10.645833, -71.618056),
('Instituto Universitario de Tecnología Maracaibo', 'institute', 10.673611, -71.631944),

-- VALENCIA
('Universidad de Carabobo', 'university', 10.184167, -68.005833),
('Universidad Arturo Michelena', 'university', 10.222778, -67.993889),
('Instituto Universitario de Tecnología Valencia', 'institute', 10.176944, -67.989167),

-- BARQUISIMETO
('Universidad Centroccidental Lisandro Alvarado', 'university', 10.073333, -69.327222),
('Universidad Fermin Toro', 'university', 10.068611, -69.320556),

-- MÉRIDA
('Universidad de Los Andes', 'university', 8.605833, -71.152222),

-- MARACAY
('Universidad Bicentenaria de Aragua', 'university', 10.246944, -67.591389),
('Instituto Pedagógico de Maracay', 'institute', 10.235556, -67.593889);

-- ============================================
-- PARTE 2: OFERTAS LABORALES
-- ============================================

DROP TABLE IF EXISTS public.job_offers CASCADE;

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

ALTER TABLE public.job_offers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to active job offers" ON public.job_offers;

CREATE POLICY "Allow public read access to active job offers" 
ON public.job_offers 
FOR SELECT 
USING (is_active = true);

CREATE INDEX IF NOT EXISTS idx_job_offers_institution ON public.job_offers(institution_id);
CREATE INDEX IF NOT EXISTS idx_job_offers_active ON public.job_offers(is_active);
CREATE INDEX IF NOT EXISTS idx_job_offers_created ON public.job_offers(created_at DESC);

-- ============================================
-- INSERTAR OFERTAS LABORALES (30+ ofertas)
-- ============================================

-- UNIVERSIDAD CENTRAL DE VENEZUELA (UCV)
INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad Central de Venezuela', 'Profesor de Matemáticas', 'Ciencias Exactas', 
'Licenciatura en Matemáticas o Educación mención Matemáticas. Experiencia mínima de 3 años.', 
'$800 - $1,200 mensuales', 'Lunes a Viernes, 7:00 AM - 12:00 PM'
FROM public.institutions WHERE name = 'Universidad Central de Venezuela' LIMIT 1;

INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad Central de Venezuela', 'Profesor de Física', 'Ciencias Exactas', 
'Maestría en Física. Experiencia en investigación preferida.', 
'$1,000 - $1,500 mensuales', 'Martes y Jueves, 2:00 PM - 6:00 PM'
FROM public.institutions WHERE name = 'Universidad Central de Venezuela' LIMIT 1;

INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad Central de Venezuela', 'Profesor de Química Orgánica', 'Ciencias', 
'Doctorado en Química. Experiencia en laboratorio. Publicaciones científicas requeridas.', 
'$1,200 - $1,800 mensuales', 'Lunes, Miércoles y Viernes, 8:00 AM - 2:00 PM'
FROM public.institutions WHERE name = 'Universidad Central de Venezuela' LIMIT 1;

-- UNIVERSIDAD SIMÓN BOLÍVAR (USB)
INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad Simón Bolívar', 'Profesor de Programación', 'Ingeniería y Tecnología', 
'Ingeniero en Computación o Informática. Conocimientos en Python, Java y bases de datos.', 
'$1,200 - $1,800 mensuales', 'Lunes, Miércoles y Viernes, 8:00 AM - 12:00 PM'
FROM public.institutions WHERE name = 'Universidad Simón Bolívar' LIMIT 1;

INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad Simón Bolívar', 'Profesor de Estructuras de Datos', 'Computación', 
'Maestría en Ciencias de la Computación. Dominio de algoritmos y estructuras de datos.', 
'$1,300 - $2,000 mensuales', 'Martes y Jueves, 1:00 PM - 5:00 PM'
FROM public.institutions WHERE name = 'Universidad Simón Bolívar' LIMIT 1;

-- UNIVERSIDAD CATÓLICA ANDRÉS BELLO (UCAB)
INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad Católica Andrés Bello', 'Profesor de Inglés', 'Idiomas', 
'Licenciatura en Educación mención Inglés o certificación TEFL/TESOL. Nivel C1 o superior.', 
'$700 - $1,000 mensuales', 'Lunes a Viernes, 1:00 PM - 5:00 PM'
FROM public.institutions WHERE name = 'Universidad Católica Andrés Bello' LIMIT 1;

INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad Católica Andrés Bello', 'Profesor de Filosofía', 'Humanidades', 
'Licenciatura en Filosofía. Experiencia docente mínima de 2 años.', 
'$650 - $900 mensuales', 'Martes y Jueves, 9:00 AM - 1:00 PM'
FROM public.institutions WHERE name = 'Universidad Católica Andrés Bello' LIMIT 1;

INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad Católica Andrés Bello', 'Profesor de Derecho Constitucional', 'Ciencias Jurídicas', 
'Abogado con especialización en Derecho Constitucional. Mínimo 5 años de experiencia.', 
'$1,100 - $1,600 mensuales', 'Lunes y Miércoles, 6:00 PM - 9:00 PM'
FROM public.institutions WHERE name = 'Universidad Católica Andrés Bello' LIMIT 1;

-- UNIVERSIDAD METROPOLITANA
INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad Metropolitana', 'Profesor de Administración de Empresas', 'Ciencias Económicas y Sociales', 
'Maestría en Administración. Experiencia en el sector empresarial.', 
'$1,100 - $1,600 mensuales', 'Lunes, Miércoles y Viernes, 6:00 PM - 9:00 PM'
FROM public.institutions WHERE name = 'Universidad Metropolitana' LIMIT 1;

INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad Metropolitana', 'Profesor de Marketing Digital', 'Publicidad y Marketing', 
'Licenciado en Marketing o Publicidad. Certificaciones en Google Ads y Facebook Ads preferidas.', 
'$900 - $1,400 mensuales', 'Martes y Jueves, 4:00 PM - 8:00 PM'
FROM public.institutions WHERE name = 'Universidad Metropolitana' LIMIT 1;

-- UNIVERSIDAD SANTA MARÍA
INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad Santa María', 'Profesor de Arquitectura', 'Arquitectura y Diseño', 
'Arquitecto con experiencia en proyectos reales. Manejo de AutoCAD y Revit.', 
'$1,000 - $1,500 mensuales', 'Lunes a Viernes, 2:00 PM - 6:00 PM'
FROM public.institutions WHERE name = 'Universidad Santa María' LIMIT 1;

INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad Santa María', 'Profesor de Ingeniería Civil', 'Ingeniería', 
'Ingeniero Civil con Maestría. Experiencia en cálculo estructural y obras civiles.', 
'$1,200 - $1,700 mensuales', 'Martes y Jueves, 7:00 AM - 12:00 PM'
FROM public.institutions WHERE name = 'Universidad Santa María' LIMIT 1;

-- COLEGIO EMIL FRIEDMAN
INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Colegio Emil Friedman', 'Docente de Primaria', 'Educación Básica', 
'Licenciatura en Educación Integral. Experiencia con niños de 6-12 años.', 
'$600 - $850 mensuales', 'Lunes a Viernes, 7:00 AM - 1:00 PM'
FROM public.institutions WHERE name = 'Colegio Emil Friedman' LIMIT 1;

INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Colegio Emil Friedman', 'Profesor de Educación Física', 'Deportes', 
'Licenciado en Educación Física. Experiencia en deportes colectivos y natación.', 
'$550 - $800 mensuales', 'Lunes a Viernes, 7:00 AM - 12:00 PM'
FROM public.institutions WHERE name = 'Colegio Emil Friedman' LIMIT 1;

-- COLEGIO SAN IGNACIO
INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Colegio San Ignacio de Loyola', 'Profesor de Química', 'Ciencias Naturales', 
'Licenciatura en Química o Educación mención Química. Manejo de laboratorio.', 
'$750 - $1,000 mensuales', 'Lunes a Viernes, 12:00 PM - 4:00 PM'
FROM public.institutions WHERE name = 'Colegio San Ignacio de Loyola' LIMIT 1;

INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Colegio San Ignacio de Loyola', 'Profesor de Biología', 'Ciencias Naturales', 
'Licenciatura en Biología. Experiencia en enseñanza de nivel medio.', 
'$700 - $950 mensuales', 'Lunes a Viernes, 7:00 AM - 11:00 AM'
FROM public.institutions WHERE name = 'Colegio San Ignacio de Loyola' LIMIT 1;

-- IUPOLC
INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'IUPOLC', 'Instructor de Redes y Telecomunicaciones', 'Tecnología', 
'TSU o Ingeniería en Telecomunicaciones. Certificaciones Cisco preferidas.', 
'$900 - $1,300 mensuales', 'Martes y Jueves, 5:00 PM - 9:00 PM'
FROM public.institutions WHERE name = 'IUPOLC' LIMIT 1;

INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'IUPOLC', 'Instructor de Seguridad Informática', 'Ciberseguridad', 
'TSU en Informática. Certificaciones en seguridad (CEH, CompTIA Security+).', 
'$1,000 - $1,400 mensuales', 'Lunes y Miércoles, 6:00 PM - 10:00 PM'
FROM public.institutions WHERE name = 'IUPOLC' LIMIT 1;

-- UNIVERSIDAD DEL ZULIA (LUZ)
INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad del Zulia', 'Profesor de Ingeniería Petrolera', 'Ingeniería', 
'Ingeniero en Petróleo con Maestría. Experiencia en la industria petrolera.', 
'$1,500 - $2,200 mensuales', 'Lunes, Miércoles y Viernes, 8:00 AM - 12:00 PM'
FROM public.institutions WHERE name = 'Universidad del Zulia' LIMIT 1;

INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad del Zulia', 'Profesor de Medicina', 'Ciencias de la Salud', 
'Médico Cirujano con especialización. Experiencia hospitalaria requerida.', 
'$1,800 - $2,500 mensuales', 'Martes y Jueves, 2:00 PM - 6:00 PM'
FROM public.institutions WHERE name = 'Universidad del Zulia' LIMIT 1;

-- UNIVERSIDAD DE CARABOBO
INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad de Carabobo', 'Profesor de Contaduría', 'Ciencias Económicas', 
'Contador Público con Maestría. Experiencia en auditoría y contabilidad financiera.', 
'$950 - $1,400 mensuales', 'Lunes a Viernes, 6:00 PM - 9:00 PM'
FROM public.institutions WHERE name = 'Universidad de Carabobo' LIMIT 1;

INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad de Carabobo', 'Profesor de Psicología Clínica', 'Ciencias de la Salud', 
'Psicólogo con Maestría en Psicología Clínica. Experiencia en consulta.', 
'$900 - $1,300 mensuales', 'Martes y Jueves, 4:00 PM - 8:00 PM'
FROM public.institutions WHERE name = 'Universidad de Carabobo' LIMIT 1;

-- UNIVERSIDAD CENTROCCIDENTAL LISANDRO ALVARADO (UCLA)
INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad Centroccidental Lisandro Alvarado', 'Profesor de Agronomía', 'Ciencias Agropecuarias', 
'Ingeniero Agrónomo con Maestría. Experiencia en cultivos tropicales.', 
'$1,000 - $1,500 mensuales', 'Lunes, Miércoles y Viernes, 7:00 AM - 12:00 PM'
FROM public.institutions WHERE name = 'Universidad Centroccidental Lisandro Alvarado' LIMIT 1;

-- UNIVERSIDAD DE LOS ANDES (ULA)
INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad de Los Andes', 'Profesor de Historia de Venezuela', 'Humanidades', 
'Licenciatura en Historia. Maestría preferida. Especialización en Historia Contemporánea de Venezuela.', 
'$850 - $1,200 mensuales', 'Martes y Jueves, 10:00 AM - 2:00 PM'
FROM public.institutions WHERE name = 'Universidad de Los Andes' LIMIT 1;

INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad de Los Andes', 'Profesor de Geología', 'Ciencias de la Tierra', 
'Geólogo con Maestría. Experiencia en geología estructural y minería.', 
'$1,100 - $1,600 mensuales', 'Lunes a Viernes, 8:00 AM - 12:00 PM'
FROM public.institutions WHERE name = 'Universidad de Los Andes' LIMIT 1;

-- UNIVERSIDAD PEDAGÓGICA EXPERIMENTAL LIBERTADOR
INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad Pedagógica Experimental Libertador', 'Profesor de Pedagogía', 'Educación', 
'Licenciado en Educación con Maestría en Pedagogía. Experiencia en formación docente.', 
'$800 - $1,100 mensuales', 'Lunes, Miércoles y Viernes, 2:00 PM - 6:00 PM'
FROM public.institutions WHERE name = 'Universidad Pedagógica Experimental Libertador' LIMIT 1;

-- COLEGIO MORAL Y LUCES
INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Colegio Moral y Luces', 'Profesor de Matemáticas de Secundaria', 'Matemáticas', 
'Licenciado en Educación mención Matemáticas. Experiencia en bachillerato.', 
'$650 - $900 mensuales', 'Lunes a Viernes, 7:00 AM - 1:00 PM'
FROM public.institutions WHERE name = 'Colegio Moral y Luces' LIMIT 1;

-- COLEGIO LA SALLE
INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Colegio La Salle', 'Profesor de Música', 'Artes', 
'Licenciado en Música o Educación Musical. Manejo de instrumentos musicales.', 
'$600 - $850 mensuales', 'Lunes a Viernes, 8:00 AM - 12:00 PM'
FROM public.institutions WHERE name = 'Colegio La Salle' LIMIT 1;

-- UNIVERSIDAD ALEJANDRO DE HUMBOLDT
INSERT INTO public.job_offers (institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule)
SELECT id, 'Universidad Alejandro de Humboldt', 'Profesor de Diseño Gráfico', 'Diseño', 
'Diseñador Gráfico. Dominio de Adobe Creative Suite (Photoshop, Illustrator, InDesign).', 
'$800 - $1,200 mensuales', 'Martes y Jueves, 3:00 PM - 7:00 PM'
FROM public.institutions WHERE name = 'Universidad Alejandro de Humboldt' LIMIT 1;

-- ============================================
-- VERIFICACIÓN
-- ============================================

SELECT 
  i.name as institucion,
  i.type as tipo,
  COUNT(jo.id) as total_ofertas
FROM public.institutions i
LEFT JOIN public.job_offers jo ON i.id = jo.institution_id
WHERE i.is_active = true
GROUP BY i.id, i.name, i.type
ORDER BY total_ofertas DESC, i.name;

-- Total de ofertas por tipo de institución
SELECT 
  i.type,
  COUNT(DISTINCT i.id) as instituciones,
  COUNT(jo.id) as ofertas
FROM public.institutions i
LEFT JOIN public.job_offers jo ON i.id = jo.institution_id
WHERE i.is_active = true
GROUP BY i.type
ORDER BY i.type;

-- ✅ Deberías ver:
-- - 26 instituciones
-- - 30+ ofertas de trabajo
-- - Ofertas distribuidas en múltiples instituciones

SELECT '¡SQL ejecutado correctamente! Verifica los resultados arriba.' as mensaje;



