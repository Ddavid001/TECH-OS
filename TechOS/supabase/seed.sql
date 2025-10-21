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
