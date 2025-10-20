-- Insert sample institutions
INSERT INTO public.institutions (id, name, type) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Universidad Nacional', 'university'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Instituto Tecnológico', 'institute'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Colegio San José', 'school'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Universidad Privada', 'university'),
  ('550e8400-e29b-41d4-a716-446655440005', 'Escuela Primaria Central', 'school')
ON CONFLICT (id) DO NOTHING;

-- Insert sample admin user (you'll need to create this user in Supabase Auth first)
-- Replace 'your-admin-user-id' with the actual user ID from Supabase Auth
-- INSERT INTO public.profiles (id, first_name, last_name, role, institution_id, email) VALUES
--   ('your-admin-user-id', 'Admin', 'User', 'admin', '550e8400-e29b-41d4-a716-446655440001', 'admin@example.com')
-- ON CONFLICT (id) DO NOTHING;
