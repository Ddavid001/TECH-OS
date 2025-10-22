-- ====================================================================
-- 🚀 COPIAR TODO ESTE CÓDIGO Y PEGARLO EN SUPABASE SQL EDITOR
-- ====================================================================

-- 1. Crear tabla
CREATE TABLE IF NOT EXISTS public.institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('school', 'university', 'institute')),
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL
);

-- 2. Habilitar seguridad
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;

-- 3. Eliminar política antigua y crear nueva
DROP POLICY IF EXISTS "Allow public read access to institutions" ON public.institutions;

CREATE POLICY "Allow public read access to institutions" 
ON public.institutions 
FOR SELECT 
USING (is_active = true);

-- 4. Crear índices
CREATE INDEX IF NOT EXISTS idx_institutions_type ON public.institutions(type);

-- 5. Insertar 8 instituciones de Caracas
INSERT INTO public.institutions (name, type, latitude, longitude) VALUES
('Universidad Central de Venezuela', 'university', 10.489722, -66.889167),
('Universidad Simón Bolívar', 'university', 10.408611, -66.886111),
('Universidad Católica Andrés Bello', 'university', 10.503056, -66.936944),
('Universidad Metropolitana', 'university', 10.497222, -66.826389),
('Universidad Santa María', 'university', 10.502778, -66.876944),
('Colegio Emil Friedman', 'school', 10.476667, -66.869444),
('Colegio San Ignacio de Loyola', 'school', 10.494722, -66.865278),
('IUPOLC', 'institute', 10.488056, -66.877500)
ON CONFLICT DO NOTHING;

-- 6. Verificar
SELECT type, COUNT(*) as total FROM public.institutions GROUP BY type;


