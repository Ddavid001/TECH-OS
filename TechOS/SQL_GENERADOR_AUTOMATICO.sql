-- ==========================================
-- GENERADOR AUTOMÁTICO DE OFERTAS Y POSTULACIONES
-- TechOS - Sistema Completo
-- ==========================================

-- 1. CREAR TABLA JOB_OFFERS (Si no existe)
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

-- Políticas RLS
CREATE POLICY IF NOT EXISTS "Allow public read access to active offers" 
ON public.job_offers FOR SELECT 
USING (is_active = true);

CREATE POLICY IF NOT EXISTS "Allow authenticated read access to all offers" 
ON public.job_offers FOR SELECT TO authenticated
USING (true);

CREATE POLICY IF NOT EXISTS "Allow admin full access" 
ON public.job_offers FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_job_offers_active ON public.job_offers(is_active);
CREATE INDEX IF NOT EXISTS idx_job_offers_created_at ON public.job_offers(created_at DESC);

-- ==========================================
-- 2. GENERAR 50 OFERTAS LABORALES AUTOMÁTICAS
-- ==========================================

-- Limpiar ofertas anteriores (opcional)
-- DELETE FROM public.job_offers;

-- Insertar ofertas variadas
INSERT INTO public.job_offers (institution_name, position_title, branch, requirements, tentative_salary, institution_details, is_active) 
VALUES
  -- MATEMÁTICAS Y CIENCIAS
  ('Colegio San Agustín', 'Profesor de Matemáticas Avanzadas', 'Matemáticas', 'Licenciatura en Matemáticas o Educación mención Matemáticas. Mínimo 3 años de experiencia. Dominio de cálculo diferencial e integral.', '$1500 - $1800', 'Institución católica con más de 60 años de trayectoria. Enfoque en ciencias exactas.', true),
  ('Instituto Tecnológico Caracas', 'Docente de Física Computacional', 'Física', 'Ingeniero Físico o Licenciado en Física. Experiencia en modelado computacional. Python o MATLAB.', '$1600', 'Centro de excelencia en física aplicada con laboratorios de última generación.', true),
  ('Colegio Emil Friedman', 'Profesor de Química Orgánica', 'Química', 'Licenciado en Química. Experiencia en bachillerato. Conocimientos de laboratorio y seguridad.', '$1400 - $1700', 'Colegio alemán con énfasis en ciencias naturales y método científico.', true),
  ('Liceo Andrés Bello', 'Docente de Biología', 'Biología', 'Biólogo o Licenciado en Educación mención Biología. Experiencia en ecología y genética.', '$1200', 'Liceo público de prestigio con programa de ciencias naturales.', true),
  ('Colegio Integral El Ávila', 'Profesor de Estadística', 'Matemáticas', 'Estadístico, Matemático o Actuario. Experiencia en análisis de datos. Excel avanzado.', '$1300 - $1500', 'Institución con enfoque en formación integral y pensamiento crítico.', true),
  
  -- TECNOLOGÍA E INFORMÁTICA
  ('Universidad Metropolitana', 'Docente de Programación Web Full Stack', 'Tecnología', 'Ingeniero en Sistemas. Experiencia en React, Node.js, TypeScript, PostgreSQL. Mínimo 5 años desarrollando.', '$2000 - $2500', 'Universidad privada líder en tecnología con centros de investigación.', true),
  ('Instituto IUTEPAL', 'Profesor de Bases de Datos', 'Tecnología', 'Ingeniero en Computación o Sistemas. SQL, NoSQL, diseño de BD. Certificaciones deseables.', '$1700', 'Instituto universitario especializado en tecnología de la información.', true),
  ('Colegio Los Arcos', 'Docente de Robótica Educativa', 'Tecnología', 'Ingeniero Electrónico o Mecatrónico. Experiencia con Arduino, Lego Mindstorms. Pedagogía innovadora.', '$1400', 'Colegio con programa STEAM y enfoque en innovación educativa.', true),
  ('Academia Code School', 'Instructor de Python y Data Science', 'Tecnología', 'Data Scientist o desarrollador Python senior. Machine Learning, Pandas, NumPy. Portfolio requerido.', '$1800 - $2200', 'Academia especializada en programación y ciencia de datos.', true),
  ('Centro de Formación Digital', 'Profesor de Ciberseguridad', 'Tecnología', 'Ingeniero en Sistemas con especialización en seguridad. Certificaciones CEH, CISSP valoradas.', '$2000', 'Centro de formación técnica con convenios empresariales.', true),
  
  -- IDIOMAS
  ('British Council Caracas', 'Profesor de Inglés Certificado', 'Idiomas', 'Certificación CELTA o DELTA. C2 en inglés (Cambridge o equivalente). Experiencia en preparación de exámenes.', '$1500', 'Institución británica con 50+ años en Venezuela. Metodología comunicativa.', true),
  ('Alianza Francesa', 'Docente de Francés', 'Idiomas', 'Nativo francés o C2 certificado (DALF). Experiencia en DELF/DALF. Metodología activa.', '$1400', 'Centro cultural con certificación oficial del gobierno francés.', true),
  ('Instituto Confucio UCV', 'Profesor de Mandarín', 'Idiomas', 'Nativo chino o HSK 6. Experiencia enseñando a hispanohablantes. Conocimiento de cultura china.', '$1600', 'Instituto oficial del gobierno chino para enseñanza de mandarín.', true),
  ('Centro Cultural Italove', 'Docente de Italiano', 'Idiomas', 'Italiano nativo o C2 certificado. Experiencia en cursos intensivos. Conocimiento de cultura italiana.', '$1300', 'Centro de promoción de lengua y cultura italiana.', true),
  ('Goethe Institut', 'Profesor de Alemán', 'Idiomas', 'Alemán nativo o C2 (Goethe-Zertifikat). Experiencia en preparación TestDaF. Metodología comunicativa.', '$1500 - $1700', 'Instituto alemán oficial para la enseñanza del idioma.', true),
  
  -- CIENCIAS SOCIALES Y HUMANIDADES
  ('Colegio San Ignacio de Loyola', 'Profesor de Historia Universal', 'Historia', 'Licenciado en Historia o Educación mención Ciencias Sociales. Enfoque crítico y analítico.', '$1200 - $1400', 'Colegio jesuita con tradición en formación humanística.', true),
  ('Liceo Fermín Toro', 'Docente de Geografía Económica', 'Geografía', 'Geógrafo o Licenciado en Educación. Conocimientos en SIG. Enfoque en desarrollo sostenible.', '$1100', 'Liceo con programa de ciencias sociales y conciencia ambiental.', true),
  ('Universidad Católica Andrés Bello', 'Profesor de Filosofía', 'Filosofía', 'Licenciado en Filosofía. Maestría deseable. Experiencia en filosofía contemporánea y ética.', '$1600 - $1900', 'Universidad jesuita con programa de filosofía reconocido.', true),
  ('Colegio Claret', 'Docente de Educación Cívica', 'Ciencias Sociales', 'Licenciado en Educación o Ciencias Políticas. Conocimiento de Constitución y democracia.', '$1100', 'Colegio religioso con énfasis en formación ciudadana.', true),
  ('Instituto de Altos Estudios', 'Profesor de Sociología', 'Sociología', 'Sociólogo con maestría. Experiencia en investigación social. Metodología cualitativa y cuantitativa.', '$1500', 'Instituto de investigación social con posgrados.', true),
  
  -- ARTES Y MÚSICA
  ('Conservatorio Vicente Emilio Sojo', 'Profesor de Piano Clásico', 'Música', 'Pianista profesional con título de conservatorio. Experiencia en pedagogía musical. Repertorio clásico amplio.', '$1200 - $1600', 'Conservatorio de música con 70+ años formando músicos profesionales.', true),
  ('Sistema Nacional de Orquestas', 'Docente de Violín', 'Música', 'Violinista profesional. Experiencia con niños y jóvenes. Método Suzuki o Abreu deseable.', '$1300', 'Programa social de educación musical de renombre mundial.', true),
  ('Escuela de Artes Visuales Cristóbal Rojas', 'Profesor de Pintura', 'Arte', 'Artista plástico con trayectoria. Licenciatura en Artes. Dominio de técnicas pictóricas.', '$1100', 'Escuela de artes con 130+ años de historia.', true),
  ('Academia de Danza Caracas', 'Instructor de Ballet Clásico', 'Danza', 'Bailarín profesional con formación clásica. Experiencia pedagógica. Conocimiento de metodología RAD o Vaganova.', '$1000 - $1400', 'Academia con método clásico y presentaciones regulares.', true),
  ('Centro de Arte La Estancia', 'Docente de Teatro', 'Teatro', 'Actor o director teatral. Experiencia en talleres. Conocimiento de Stanislavski y técnicas contemporáneas.', '$1200', 'Centro cultural con sala de teatro y programa formativo.', true),
  
  -- EDUCACIÓN FÍSICA Y DEPORTES
  ('Club Deportivo Los Samanes', 'Entrenador de Natación', 'Deportes', 'Entrenador certificado. Primeros auxilios y salvamento acuático. Experiencia con niños y adolescentes.', '$1300 - $1500', 'Club con piscina olímpica y equipo competitivo.', true),
  ('Liceo Militar Gran Mariscal de Ayacucho', 'Profesor de Educación Física', 'Deportes', 'Licenciado en Educación Física. Experiencia en disciplina y formación militar. Primeros auxilios.', '$1400', 'Liceo militar con énfasis en disciplina y deporte.', true),
  ('Academia de Fútbol Caracas FC', 'Entrenador de Fútbol Juvenil', 'Deportes', 'Licencia CONMEBOL o UEFA. Experiencia en formación de jóvenes. Conocimiento de metodología de juego.', '$1500 - $2000', 'Academia del club profesional con divisiones menores.', true),
  ('Gimnasio Vertical', 'Instructor de Educación Física Adaptada', 'Deportes', 'Licenciado en Educación Física. Especialización en actividad física adaptada. Empatía y vocación.', '$1200', 'Centro de actividad física para personas con diversidad funcional.', true),
  
  -- EDUCACIÓN ESPECIAL Y PSICOPEDAGOGÍA
  ('Centro de Atención Integral La Esperanza', 'Terapeuta del Lenguaje', 'Educación Especial', 'Licenciado en Terapia del Lenguaje. Experiencia con niños con TEA. Métodos ABA, PECS.', '$1400 - $1600', 'Centro especializado en atención a niños con autismo.', true),
  ('Colegio Integral Arcoíris', 'Psicopedagogo', 'Psicopedagogía', 'Licenciado en Psicopedagogía. Experiencia en evaluación y planes de apoyo. Enfoque inclusivo.', '$1300', 'Colegio con departamento de orientación y enfoque inclusivo.', true),
  ('CENAMEC', 'Especialista en Dificultades de Aprendizaje', 'Educación Especial', 'Licenciado en Educación Especial mención Dificultades del Aprendizaje. Experiencia en intervención.', '$1200', 'Centro nacional de mejoramiento de la enseñanza de la ciencia.', true),
  ('Fundación Paso a Paso', 'Docente de Educación Especial', 'Educación Especial', 'Licenciado en Educación Especial. Experiencia con discapacidad intelectual. Vocación de servicio.', '$1100 - $1300', 'Fundación sin fines de lucro para personas con discapacidad.', true),
  
  -- PREESCOLAR Y PRIMARIA
  ('Colegio Los Campitos', 'Maestra de Preescolar', 'Educación Inicial', 'Licenciada en Educación Inicial. Experiencia con niños de 3-5 años. Metodología Montessori o Reggio Emilia.', '$1000 - $1200', 'Colegio con metodología activa y espacios adaptados a primera infancia.', true),
  ('Escuela Básica Simón Bolívar', 'Maestra de Primaria (1er a 3er grado)', 'Educación Primaria', 'Licenciada en Educación Primaria. Experiencia en lectoescritura y matemática básica. Paciencia.', '$1100', 'Escuela pública con programa de calidad educativa.', true),
  ('Colegio La Salle', 'Docente de Primaria (4to a 6to grado)', 'Educación Primaria', 'Licenciado en Educación Primaria. Experiencia en proyectos de investigación. Manejo de tecnología.', '$1200 - $1400', 'Colegio lasallista con tradición en educación integral.', true),
  ('Centro de Estimulación Temprana', 'Especialista en Primera Infancia', 'Educación Inicial', 'Licenciada en Educación Inicial o Psicología Infantil. Experiencia en estimulación 0-3 años.', '$1000', 'Centro especializado en desarrollo infantil temprano.', true),
  
  -- ADMINISTRACIÓN Y COORDINACIÓN
  ('Colegio Santiago de León de Caracas', 'Coordinador Académico de Bachillerato', 'Administración Educativa', 'Licenciado en Educación con maestría. Experiencia en gestión académica. Liderazgo y organización.', '$1800 - $2200', 'Colegio de alta exigencia académica con programa IB.', true),
  ('Instituto Escuela', 'Jefe de Departamento de Matemáticas', 'Coordinación', 'Licenciado en Matemáticas o Educación. Maestría deseable. Experiencia coordinando equipos docentes.', '$1600', 'Instituto con programa académico estructurado por departamentos.', true),
  ('Universidad Simón Bolívar', 'Coordinador de Laboratorios de Física', 'Administración', 'Ingeniero o Físico. Experiencia en gestión de laboratorios. Conocimiento de seguridad y mantenimiento.', '$1700 - $2000', 'Universidad pública de excelencia con laboratorios de investigación.', true),
  
  -- ORIENTACIÓN Y CONSEJERÍA
  ('Liceo Juan Pablo II', 'Orientador Vocacional', 'Orientación', 'Psicólogo o Licenciado en Orientación. Experiencia en pruebas vocacionales. Conocimiento del mercado laboral.', '$1300', 'Liceo católico con programa de orientación vocacional estructurado.', true),
  ('Colegio Moral y Luces', 'Consejero Estudiantil', 'Consejería', 'Psicólogo o Trabajador Social. Experiencia con adolescentes. Intervención en crisis. Escucha activa.', '$1200 - $1400', 'Colegio con departamento de bienestar estudiantil.', true),
  
  -- TECNOLOGÍA EDUCATIVA
  ('Centro de Innovación Educativa', 'Coordinador de Tecnología Educativa', 'Tecnología', 'Ingeniero o Educador con especialización en TIC. Google Educator o Apple Teacher certificado.', '$1500 - $1800', 'Centro de innovación con plataformas digitales avanzadas.', true),
  ('Colegio San Francisco de Asís', 'Especialista en Plataformas Virtuales', 'Tecnología', 'Experiencia en Moodle, Google Classroom, Canvas. Capacitación docente. Soporte técnico pedagógico.', '$1400', 'Colegio con programa de educación híbrida.', true),
  
  -- IDIOMAS ADICIONALES
  ('Centro Cultural Ruso', 'Profesor de Ruso', 'Idiomas', 'Nativo ruso o certificado TORFL. Experiencia enseñando a hispanohablantes. Conocimiento cultural.', '$1300 - $1500', 'Centro de difusión de lengua y cultura rusa.', true),
  ('Instituto Japonés Caracas', 'Docente de Japonés', 'Idiomas', 'Nativo japonés o JLPT N1. Experiencia en JLPT preparation. Metodología adaptada a occidentales.', '$1500', 'Instituto oficial para enseñanza de japonés y cultura.', true),
  
  -- EDUCACIÓN AMBIENTAL
  ('Colegio Verde Natura', 'Educador Ambiental', 'Ecología', 'Biólogo, Ambientalista o Educador. Experiencia en proyectos ecológicos. Pasión por la naturaleza.', '$1100 - $1300', 'Colegio con enfoque en sustentabilidad y educación ambiental.', true)
ON CONFLICT DO NOTHING;

-- ==========================================
-- 3. FUNCIÓN PARA GENERAR MÁS OFERTAS AUTOMÁTICAMENTE
-- ==========================================

CREATE OR REPLACE FUNCTION generate_random_job_offers(cantidad INT)
RETURNS void AS $$
DECLARE
  instituciones TEXT[] := ARRAY[
    'Colegio Ejemplo Norte', 'Instituto Educativo Central', 'Liceo Bolivariano',
    'Universidad Nacional', 'Centro de Formación', 'Academia Profesional',
    'Colegio Internacional', 'Instituto Técnico', 'Escuela Superior'
  ];
  
  posiciones TEXT[] := ARRAY[
    'Profesor de Matemáticas', 'Docente de Inglés', 'Instructor de Programación',
    'Profesor de Historia', 'Docente de Química', 'Instructor de Arte',
    'Profesor de Música', 'Docente de Deportes', 'Instructor de Robótica'
  ];
  
  ramas TEXT[] := ARRAY[
    'Matemáticas', 'Idiomas', 'Tecnología', 'Historia', 'Ciencias',
    'Arte', 'Música', 'Deportes', 'Ingeniería'
  ];
  
  i INT;
BEGIN
  FOR i IN 1..cantidad LOOP
    INSERT INTO public.job_offers (
      institution_name,
      position_title,
      branch,
      requirements,
      tentative_salary,
      institution_details,
      is_active
    ) VALUES (
      instituciones[1 + floor(random() * array_length(instituciones, 1))::int],
      posiciones[1 + floor(random() * array_length(posiciones, 1))::int],
      ramas[1 + floor(random() * array_length(ramas, 1))::int],
      'Licenciatura en el área requerida. Mínimo 2 años de experiencia. Dedicación y vocación pedagógica.',
      '$' || (800 + floor(random() * 1200)::int)::text || ' - $' || (1200 + floor(random() * 1000)::int)::text,
      'Institución educativa de prestigio con excelente ambiente laboral.',
      true
    );
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Para usar la función y generar 20 ofertas más:
-- SELECT generate_random_job_offers(20);

-- ==========================================
-- 4. VERIFICACIÓN FINAL
-- ==========================================

-- Contar ofertas creadas
SELECT COUNT(*) as total_ofertas FROM public.job_offers WHERE is_active = true;

-- Ver las últimas 10 ofertas
SELECT position_title, institution_name, tentative_salary, branch 
FROM public.job_offers 
WHERE is_active = true 
ORDER BY created_at DESC 
LIMIT 10;

-- ==========================================
-- FIN DEL SCRIPT
-- ==========================================

/*
INSTRUCCIONES DE USO:

1. Ejecutar TODO este script en Supabase SQL Editor
2. Esto creará:
   - Tabla job_offers con políticas RLS
   - 45+ ofertas laborales variadas y realistas
   - Función para generar más ofertas automáticamente

3. Para generar más ofertas aleatorias:
   SELECT generate_random_job_offers(10);
   
4. Para verificar:
   SELECT * FROM job_offers WHERE is_active = true;

5. Las ofertas aparecerán automáticamente en:
   - Modal "Ver Ofertas Laborales" (landing page)
   - Menú superior "Ofertas"
   - Página /job-offers
*/


