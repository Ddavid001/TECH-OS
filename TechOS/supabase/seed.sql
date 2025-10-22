-- Insert sample institutions with coordinates in Caracas
INSERT INTO public.institutions (id, name, type, address, latitude, longitude) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Universidad Central de Venezuela', 'university', 'Ciudad Universitaria, Caracas', 10.4906, -66.8906),
  ('550e8400-e29b-41d4-a716-446655440002', 'Universidad Simón Bolívar', 'university', 'Sartenejas, Baruta, Caracas', 10.4000, -66.8833),
  ('550e8400-e29b-41d4-a716-446655440003', 'Universidad Católica Andrés Bello', 'university', 'Montalbán, Caracas', 10.5000, -66.9000),
  ('550e8400-e29b-41d4-a716-446655440004', 'Instituto Universitario de Tecnología', 'institute', 'Chacao, Caracas', 10.4969, -66.8531),
  ('550e8400-e29b-41d4-a716-446655440005', 'Colegio San Ignacio de Loyola', 'school', 'La Castellana, Caracas', 10.4969, -66.8531),
  ('550e8400-e29b-41d4-a716-446655440006', 'Escuela Básica Nacional', 'school', 'El Rosal, Caracas', 10.4833, -66.8667),
  ('550e8400-e29b-41d4-a716-446655440007', 'Instituto Pedagógico de Caracas', 'institute', 'Parque del Este, Caracas', 10.4833, -66.8667),
  ('550e8400-e29b-41d4-a716-446655440008', 'Universidad Metropolitana', 'university', 'Terrazas del Ávila, Caracas', 10.5000, -66.9000),
  ('550e8400-e29b-41d4-a716-446655440009', 'Colegio Humboldt', 'school', 'La Castellana, Caracas', 10.4969, -66.8531),
  ('550e8400-e29b-41d4-a716-446655440010', 'Instituto de Estudios Superiores', 'institute', 'Chuao, Caracas', 10.4833, -66.8667)
ON CONFLICT (id) DO NOTHING;

-- Insert sample admin user (you'll need to create this user in Supabase Auth first)
-- Replace 'your-admin-user-id' with the actual user ID from Supabase Auth
-- INSERT INTO public.profiles (id, first_name, last_name, role, institution_id, email) VALUES
--   ('your-admin-user-id', 'Admin', 'User', 'admin', '550e8400-e29b-41d4-a716-446655440001', 'admin@example.com')
-- ON CONFLICT (id) DO NOTHING;

-- Insert sample job offers
INSERT INTO public.job_offers (institution_name, position_title, branch, requirements, tentative_salary, institution_details) VALUES
  ('Colegio Ejemplo Caracas', 'Profesor de Matemáticas', 'Matemáticas', 'Licenciatura en Educación mención Matemáticas, mínimo 3 años de experiencia comprobable en educación secundaria. Dominio de metodologías activas de enseñanza.', '$1200', 'Institución reconocida con enfoque en ciencias exactas y tecnología. Más de 30 años formando estudiantes de excelencia.'),
  ('Universidad Central Tech', 'Docente de Programación Web', 'Tecnología', 'Ingeniero en Sistemas o Computación, experiencia comprobable en React, Node.js y TypeScript. Se valorará experiencia en docencia universitaria.', 'A convenir', 'Universidad líder en formación tecnológica con laboratorios equipados con última tecnología.'),
  ('Instituto Idiomas Modernos', 'Profesor de Inglés', 'Idiomas', 'Certificación C1/C2 en inglés (TOEFL, IELTS o equivalente), experiencia mínima de 2 años en docencia de idiomas. Conocimiento en metodología comunicativa.', '$1000', 'Instituto con más de 20 años de trayectoria en la enseñanza de idiomas extranjeros.'),
  ('Colegio San Ignacio', 'Profesor de Ciencias Sociales', 'Ciencias Sociales', 'Licenciado en Historia, Geografía o Ciencias Sociales. Experiencia en educación básica y media. Capacidad para trabajar con metodologías innovadoras.', '$950 - $1100', 'Colegio privado con excelente reputación académica, enfocado en formación integral.'),
  ('Academia de Música Beethoven', 'Profesor de Piano', 'Arte y Música', 'Título en música o conservatorio, especialización en piano. Experiencia dando clases a niños y adolescentes. Paciencia y vocación pedagógica.', '$800 - $1000', 'Academia especializada en formación musical con más de 15 años de experiencia.'),
  ('Universidad Metropolitana', 'Docente de Química', 'Ciencias', 'Licenciado en Química o Bioquímica, preferiblemente con maestría. Experiencia en investigación y docencia universitaria.', '$1500', 'Universidad privada con laboratorios de última generación y enfoque en investigación científica.'),
  ('Liceo Bolivariano Central', 'Profesor de Educación Física', 'Deportes', 'Licenciado en Educación Física y Deportes. Conocimientos en primeros auxilios. Experiencia trabajando con adolescentes.', '$900', 'Liceo público con amplias instalaciones deportivas y programa de desarrollo atlético.'),
  ('Instituto Técnico Industrial', 'Instructor de Electricidad', 'Tecnología', 'Técnico Superior en Electricidad o Ingeniería Eléctrica. Experiencia práctica en instalaciones eléctricas industriales y residenciales.', '$1100', 'Instituto técnico con convenios con empresas para pasantías estudiantiles.'),
  ('Colegio Integral', 'Psicopedagogo', 'Psicopedagogía', 'Licenciado en Psicopedagogía o Psicología Educativa. Experiencia en atención a estudiantes con necesidades especiales.', '$1000 - $1200', 'Colegio con departamento de orientación consolidado, enfoque en educación inclusiva.'),
  ('Universidad Simón Rodríguez', 'Profesor de Marketing Digital', 'Negocios', 'Licenciado en Marketing, Comunicación o afines. Certificaciones en Google Ads, Meta Ads. Experiencia práctica en campañas digitales.', 'A convenir', 'Universidad con carreras de pregrado y postgrado en el área de negocios y tecnología.')
ON CONFLICT DO NOTHING;