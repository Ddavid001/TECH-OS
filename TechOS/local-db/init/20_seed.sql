-- Seed institutions (subset to keep it lightweight)
INSERT INTO public.institutions (name, type, address, latitude, longitude) VALUES
('Universidad Central de Venezuela', 'university', 'Ciudad Universitaria, Caracas', 10.489722, -66.889167),
('Universidad Simón Bolívar', 'university', 'Sartenejas, Baruta, Caracas', 10.408611, -66.886111),
('Universidad Católica Andrés Bello', 'university', 'Montalbán, Caracas', 10.503056, -66.936944),
('Universidad Metropolitana', 'university', 'Terrazas del Ávila, Caracas', 10.497222, -66.826389),
('Colegio San Ignacio de Loyola', 'school', 'La Castellana, Caracas', 10.494722, -66.865278)
ON CONFLICT DO NOTHING;

-- Seed job offers (linked to institutions by name)
WITH inst AS (
  SELECT id, name FROM public.institutions
)
INSERT INTO public.job_offers (
  institution_id, institution_name, position_title, branch, requirements, tentative_salary, schedule, description
) VALUES
((SELECT id FROM inst WHERE name='Universidad Central de Venezuela'), 'Universidad Central de Venezuela', 'Profesor de Matemáticas', 'Ciencias Exactas', 'Licenciatura en Matemáticas. 3+ años experiencia.', '$800 - $1,200', 'Lun-Vie 7:00-12:00', 'Docente para álgebra y cálculo.'),
((SELECT id FROM inst WHERE name='Universidad Simón Bolívar'), 'Universidad Simón Bolívar', 'Profesor de Programación', 'Ingeniería y Tecnología', 'Ingeniero en Computación. Python/Java.', '$1,200 - $1,800', 'Lun-Mié-Vie 8:00-12:00', 'Introducción a Programación.'),
((SELECT id FROM inst WHERE name='Universidad Católica Andrés Bello'), 'Universidad Católica Andrés Bello', 'Profesor de Inglés', 'Idiomas', 'Lic. Educación mención Inglés o TEFL/TESOL.', '$700 - $1,000', 'Lun-Vie 13:00-17:00', 'Inglés intermedio-avanzado.'),
((SELECT id FROM inst WHERE name='Universidad Metropolitana'), 'Universidad Metropolitana', 'Profesor de Marketing Digital', 'Publicidad y Marketing', 'Certificaciones Google/Facebook Ads.', '$900 - $1,400', 'Mar-Jue 16:00-20:00', 'Estrategias de marketing digital.'),
((SELECT id FROM inst WHERE name='Colegio San Ignacio de Loyola'), 'Colegio San Ignacio de Loyola', 'Profesor de Química', 'Ciencias Naturales', 'Lic. en Química. Manejo de laboratorio.', '$750 - $1,000', 'Lun-Vie 12:00-16:00', 'Química general y orgánica.')
ON CONFLICT DO NOTHING;



