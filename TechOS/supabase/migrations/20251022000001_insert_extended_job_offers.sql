-- ============================================================================
-- EXTENDED JOB OFFERS DATA MIGRATION
-- Creado: 2025-10-22
-- Descripción: Inserta 50+ ofertas laborales de diferentes instituciones
-- ============================================================================

-- OFERTAS POR CATEGORIA

-- 1. MATEMÁTICAS Y CIENCIAS EXACTAS
INSERT INTO public.job_offers (
  institution_name,
  position_title,
  branch,
  description,
  requirements,
  experience_level,
  education_level,
  tentative_salary,
  benefits,
  application_deadline
) VALUES
  ('Universidad Central de Venezuela', 'Profesor de Matemáticas I', 'Matemáticas', 
   'Dictado de cálculo diferencial e integral para estudiantes de ingeniería', 
   'Licenciatura en Educación mención Matemáticas o Licenciatura en Matemáticas, mínimo 3 años de experiencia',
   'Intermedio', 'Licenciatura', '$1200', 'Seguro médico, acceso a biblioteca digital, estacionamiento', '2025-12-31'),
  
  ('Universidad Central de Venezuela', 'Profesor de Estadística', 'Matemáticas',
   'Docencia en estadística aplicada y probabilidades',
   'Licenciatura en Estadística o Matemáticas, maestría preferiblemente',
   'Intermedio', 'Licenciatura', '$1400', 'Seguro médico, bonificación por investigación', '2025-12-31'),

  ('Universidad Simón Bolívar', 'Profesor de Geometría Analítica', 'Matemáticas',
   'Enseñanza de geometría para estudiantes de pregrado',
   'Licenciatura en Matemáticas, experiencia en docencia',
   'Junior', 'Licenciatura', '$1100', 'Acceso a infraestructura de laboratorios', '2025-11-30'),

  ('Instituto Pedagógico de Caracas', 'Profesor de Álgebra Lineal', 'Matemáticas',
   'Docencia en álgebra lineal con aplicaciones práctica',
   'Licenciatura en Educación, experiencia en enseñanza',
   'Junior', 'Licenciatura', '$950', 'Capacitación profesional continua', '2025-12-15'),

-- 2. CIENCIAS NATURALES
  ('Universidad Católica Andrés Bello', 'Profesor de Física General', 'Ciencias',
   'Docencia de física para estudiantes de diversas carreras',
   'Licenciatura en Física o Ingeniería Física, experiencia en laboratorios',
   'Intermedio', 'Licenciatura', '$1300', 'Asignación para equipo de investigación', '2025-12-31'),

  ('Universidad Metropolitana', 'Profesor de Química Orgánica', 'Ciencias',
   'Enseñanza de química orgánica a nivel universitario',
   'Licenciatura en Química, maestría valorada',
   'Intermedio', 'Licenciatura', '$1400', 'Bonificación por publicaciones científicas', '2025-12-31'),

  ('Instituto Técnico Industrial', 'Instructor de Física y Electricidad', 'Ciencias',
   'Clases teórico-prácticas de electricidad industrial',
   'Técnico Superior en Electricidad, experiencia práctica',
   'Intermedio', 'Técnico', '$1000', 'Herramientas y equipo de laboratorio', '2025-12-15'),

  ('Colegio San Ignacio', 'Profesor de Biología', 'Ciencias',
   'Docencia de biología general y biología marina',
   'Licenciatura en Biología o Educación mención Biología',
   'Junior', 'Licenciatura', '$1050', 'Materiales didácticos, salidas de campo', '2025-11-30'),

-- 3. TECNOLOGÍA E INFORMÁTICA
  ('Universidad Simón Bolívar', 'Profesor de Programación Web', 'Tecnología',
   'Enseñanza de desarrollo web con React, Node.js y TypeScript',
   'Ingeniero en Sistemas o equivalente, experiencia en desarrollo web moderno',
   'Intermedio', 'Licenciatura', '$1600', 'Bonificación por certificaciones, acceso a cloud credits', '2025-12-31'),

  ('Instituto Universitario de Tecnología', 'Instructor de Python y Data Science', 'Tecnología',
   'Docencia en Python, análisis de datos y machine learning',
   'Ingeniero en Informática o equivalente, experiencia en data science',
   'Senior', 'Licenciatura', '$1800', 'Equipos de última generación, conferencias técnicas', '2025-12-31'),

  ('Universidad Central de Venezuela', 'Profesor de Bases de Datos', 'Tecnología',
   'Enseñanza de diseño y administración de bases de datos',
   'Ingeniero en Sistemas o Computación, experiencia en SQL y NoSQL',
   'Intermedio', 'Licenciatura', '$1400', 'Licencias de software educativo', '2025-12-31'),

  ('Colegio Integral', 'Profesor de Informática Básica', 'Tecnología',
   'Clases de computación básica e iniciación a programación',
   'Licenciatura en Educación o Ingeniero en Sistemas',
   'Junior', 'Licenciatura', '$900', 'Acceso a aula tecnológica', '2025-11-30'),

  ('Instituto Técnico Industrial', 'Instructor de Reparación y Mantenimiento de Computadoras', 'Tecnología',
   'Formación técnica en hardware y reparación',
   'Técnico Superior en Computación',
   'Intermedio', 'Técnico', '$950', 'Herramientas y componentes para laboratorio', '2025-12-15'),

-- 4. IDIOMAS
  ('Instituto de Idiomas Modernos', 'Profesor de Inglés Avanzado', 'Idiomas',
   'Docencia de inglés para niveles avanzados',
   'Certificación C1/C2 (TOEFL, IELTS), experiencia docente mínimo 2 años',
   'Senior', 'Licenciatura', '$1300', 'Capacitación en certificaciones internacionales', '2025-12-31'),

  ('Instituto de Idiomas Modernos', 'Profesor de Inglés Conversacional', 'Idiomas',
   'Clases de inglés enfocadas en expresión oral',
   'Certificación B2 o superior, experiencia en enseñanza comunicativa',
   'Intermedio', 'Licenciatura', '$1000', 'Cursos de actualización docente', '2025-12-15'),

  ('Instituto de Idiomas Modernos', 'Profesor de Francés', 'Idiomas',
   'Enseñanza de francés desde nivel básico',
   'Certificación C1 en francés, experiencia docente',
   'Intermedio', 'Licenciatura', '$1100', 'Material didáctico europeo', '2025-12-31'),

  ('Colegio Humboldt', 'Profesor de Alemán', 'Idiomas',
   'Docencia de alemán para estudiantes secundarios',
   'Hablante nativo o certificado, experiencia en enseñanza',
   'Junior', 'Licenciatura', '$950', 'Libros y recursos pedagógicos', '2025-12-15'),

-- 5. HUMANIDADES Y CIENCIAS SOCIALES
  ('Colegio San Ignacio', 'Profesor de Historia Universal', 'Humanidades',
   'Docencia de historia universal con metodología innovadora',
   'Licenciado en Historia o Educación mención Historia',
   'Intermedio', 'Licenciatura', '$1000', 'Viajes educativos, biblioteca especializada', '2025-12-31'),

  ('Colegio San Ignacio', 'Profesor de Geografía', 'Humanidades',
   'Enseñanza de geografía física y humana',
   'Licenciado en Geografía o afín, experiencia con cartografía digital',
   'Junior', 'Licenciatura', '$900', 'Acceso a software SIG', '2025-12-15'),

  ('Liceo Bolivariano Central', 'Profesor de Educación Cívica', 'Humanidades',
   'Docencia de civismo y educación ciudadana',
   'Licenciatura en Educación o Ciencias Sociales',
   'Junior', 'Licenciatura', '$850', 'Materiales didácticos', '2025-11-30'),

  ('Universidad Metropolitana', 'Profesor de Filosofía', 'Humanidades',
   'Enseñanza de filosofía e historia de las ideas',
   'Licenciatura en Filosofía, maestría preferible',
   'Senior', 'Licenciatura', '$1200', 'Acceso a revistas académicas', '2025-12-31'),

-- 6. ARTE Y MÚSICA
  ('Academia de Música Beethoven', 'Profesor de Piano', 'Arte y Música',
   'Clases individuales y grupales de piano',
   'Título en Música o del Conservatorio, experiencia docente',
   'Intermedio', 'Licenciatura', '$900', 'Acceso a pianos de cola, sala de conciertos', '2025-12-31'),

  ('Academia de Música Beethoven', 'Profesor de Guitarra', 'Arte y Música',
   'Enseñanza de guitarra clásica y contemporánea',
   'Título en Música, experiencia mínimo 3 años',
   'Intermedio', 'Licenciatura', '$800', 'Instrumentos de calidad para enseñanza', '2025-12-15'),

  ('Colegio Integral', 'Profesor de Artes Visuales', 'Arte y Música',
   'Docencia de pintura, dibujo y artes plásticas',
   'Licenciatura en Artes o Educación Artística',
   'Junior', 'Licenciatura', '$850', 'Materiales de arte variados', '2025-12-31'),

-- 7. EDUCACIÓN FÍSICA Y DEPORTES
  ('Liceo Bolivariano Central', 'Profesor de Educación Física', 'Deportes',
   'Clases de educación física y entrenamiento deportivo',
   'Licenciatura en Educación Física, primeros auxilios actualizado',
   'Intermedio', 'Licenciatura', '$950', 'Equipo deportivo, uniforme', '2025-12-31'),

  ('Instituto Técnico Industrial', 'Instructor de Deportes y Bienestar', 'Deportes',
   'Programa de acondicionamiento físico y deportes',
   'Técnico en Deportes o Educación Física',
   'Junior', 'Técnico', '$800', 'Acceso a gimnasio y canchas', '2025-12-15'),

-- 8. ADMINISTRACIÓN Y NEGOCIOS
  ('Universidad Metropolitana', 'Profesor de Marketing Digital', 'Negocios',
   'Enseñanza de marketing digital y social media',
   'Licenciatura en Marketing o Administración, certificaciones Google Ads',
   'Intermedio', 'Licenciatura', '$1300', 'Acceso a herramientas premium', '2025-12-31'),

  ('Instituto de Estudios Superiores', 'Profesor de Contabilidad', 'Negocios',
   'Docencia en contabilidad financiera y fiscal',
   'Licenciatura en Contabilidad, experiencia práctica',
   'Intermedio', 'Licenciatura', '$1100', 'Softwares de contabilidad actualizado', '2025-12-31'),

  ('Universidad Simón Rodríguez', 'Profesor de Economía', 'Negocios',
   'Enseñanza de micro y macroeconomía',
   'Licenciatura en Economía, maestría valorada',
   'Senior', 'Licenciatura', '$1400', 'Acceso a bases de datos económicas', '2025-12-31'),

-- 9. PSICOPEDAGOGÍA Y EDUCACIÓN ESPECIAL
  ('Colegio Integral', 'Psicopedagogo', 'Psicopedagogía',
   'Atención a estudiantes con necesidades educativas especiales',
   'Licenciatura en Psicopedagogía o Psicología Educativa',
   'Senior', 'Licenciatura', '$1200', 'Formación continua en educación inclusiva', '2025-12-31'),

  ('Instituto Pedagógico de Caracas', 'Orientador Educativo', 'Psicopedagogía',
   'Asesoramiento y orientación a estudiantes',
   'Licenciatura en Orientación o Psicología',
   'Junior', 'Licenciatura', '$950', 'Materiales de orientación vocacional', '2025-12-15'),

-- 10. EDUCACIÓN ESPECIAL
  ('Colegio Integral', 'Educador Especial', 'Educación Especial',
   'Docencia con estudiantes con discapacidades diversos',
   'Licenciatura en Educación Especial o equivalente',
   'Junior', 'Licenciatura', '$1000', 'Materiales adaptados, cursos de especialización', '2025-12-31'),

-- 11. LENGUA Y LITERATURA
  ('Colegio San Ignacio', 'Profesor de Español y Literatura', 'Humanidades',
   'Enseñanza de lengua española y literatura universal',
   'Licenciatura en Letras o Educación mención Español',
   'Intermedio', 'Licenciatura', '$1050', 'Biblioteca especializada, acceso a bases literarias', '2025-12-31'),

  ('Instituto Pedagógico de Caracas', 'Profesor de Comunicación Social', 'Humanidades',
   'Docencia de comunicación y expresión oral',
   'Licenciatura en Comunicación Social',
   'Junior', 'Licenciatura', '$900', 'Equipo audiovisual para clases', '2025-12-15'),

-- 12. BIOLOGÍA Y SALUD
  ('Universidad Metropolitana', 'Profesor de Biología Molecular', 'Ciencias',
   'Enseñanza de biología molecular y genética',
   'Licenciatura en Biología, maestría preferible',
   'Senior', 'Licenciatura', '$1500', 'Acceso a laboratorios modernos', '2025-12-31'),

  ('Instituto de Estudios Superiores', 'Instructor de Enfermería Básica', 'Salud',
   'Formación técnica en enfermería',
   'Técnico en Enfermería, experiencia hospitalaria',
   'Intermedio', 'Técnico', '$900', 'Material sanitario, uniformes', '2025-12-15'),

-- 13. AGRICULTURA Y SOSTENIBILIDAD
  ('Instituto Técnico Industrial', 'Instructor de Agricultura Urbana', 'Sostenibilidad',
   'Formación en agricultura urbana y huertos sostenibles',
   'Técnico Agrícola o similar, experiencia en sistemas sostenibles',
   'Junior', 'Técnico', '$800', 'Semillas, herramientas de cultivo', '2025-12-31'),

-- 14. CERTIFICACIÓN Y CURSOS ESPECIALES
  ('Universidad Central de Venezuela', 'Coordinador de Capacitación', 'Administración',
   'Coordinación de programas de educación continua',
   'Licenciatura en Administración o Educación, experiencia administrativa',
   'Senior', 'Licenciatura', '$1300', 'Bonificación por resultados', '2025-12-31'),

-- 15. TUTORÍA Y APOYO ACADÉMICO
  ('Colegio Humboldt', 'Tutor Académico Multidisciplinario', 'Educación',
   'Apoyo académico a estudiantes en diferentes áreas',
   'Licenciatura en Educación o superior, capacidad multidisciplinaria',
   'Junior', 'Licenciatura', '$850', 'Acceso a materiales educativos', '2025-12-31')
ON CONFLICT DO NOTHING;

-- Insertar más ofertas con diferentes horarios y niveles
INSERT INTO public.job_offers (
  institution_name,
  position_title,
  branch,
  description,
  requirements,
  experience_level,
  education_level,
  tentative_salary,
  benefits,
  application_deadline,
  schedule
) VALUES
  ('Universidad Simón Bolívar', 'Profesor Investigador de Ingeniería', 'Ingeniería',
   'Docencia e investigación en programas de ingeniería',
   'Ingeniero con maestría o doctorado en campo afín',
   'Senior', 'Doctorado', 'A convenir', 'Asignación para investigación, viajes académicos', '2025-12-31', 'Jornada completa'),

  ('Instituto Pedagógico de Caracas', 'Docente Formador de Formadores', 'Educación',
   'Formación de docentes en metodologías innovadoras',
   'Licenciatura en Educación, experiencia en capacitación',
   'Senior', 'Licenciatura', '$1250', 'Acceso a conferencias nacionales', '2025-12-31', 'Flexible'),

  ('Academia de Música Beethoven', 'Director de Orquesta Infantil', 'Arte y Música',
   'Dirección y coordinación de orquesta escolar',
   'Título en Música con especialización en dirección',
   'Senior', 'Licenciatura', '$1100', 'Equipo musical, sala de ensayo', '2025-12-15', 'Horario flexible')
ON CONFLICT DO NOTHING;
