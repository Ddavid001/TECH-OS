-- ====================================================================
-- 🚀 SQL RÁPIDO - INSTITUCIONES DE CARACAS
-- ====================================================================
-- Copia y pega TODO este código en Supabase SQL Editor
-- ====================================================================

-- 1. ELIMINAR TABLA SI EXISTE (empezar desde cero)
DROP TABLE IF EXISTS public.institutions CASCADE;

-- 2. CREAR TABLA
CREATE TABLE public.institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('school', 'university', 'institute')),
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL
);

-- 3. HABILITAR RLS
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;

-- 4. ELIMINAR POLÍTICA SI EXISTE
DROP POLICY IF EXISTS "Allow public read access to institutions" ON public.institutions;

-- 5. CREAR POLÍTICA DE LECTURA PÚBLICA
CREATE POLICY "Allow public read access to institutions" 
ON public.institutions 
FOR SELECT 
USING (is_active = true);

-- 6. CREAR ÍNDICES
CREATE INDEX IF NOT EXISTS idx_institutions_type ON public.institutions(type);
CREATE INDEX IF NOT EXISTS idx_institutions_coordinates ON public.institutions(latitude, longitude);

-- 7. INSERTAR 8 INSTITUCIONES DE CARACAS
INSERT INTO public.institutions (name, type, latitude, longitude) VALUES
('Universidad Central de Venezuela', 'university', 10.489722, -66.889167),
('Universidad Simón Bolívar', 'university', 10.408611, -66.886111),
('Universidad Católica Andrés Bello', 'university', 10.503056, -66.936944),
('Universidad Metropolitana', 'university', 10.497222, -66.826389),
('Universidad Santa María', 'university', 10.502778, -66.876944),
('Colegio Emil Friedman', 'school', 10.476667, -66.869444),
('Colegio San Ignacio de Loyola', 'school', 10.494722, -66.865278),
('IUPOLC', 'institute', 10.488056, -66.877500);

-- 8. VERIFICAR RESULTADOS
SELECT 
  type, 
  COUNT(*) as total 
FROM public.institutions 
GROUP BY type 
ORDER BY type;

-- ✅ Deberías ver:
-- institute    | 1
-- school       | 2
-- university   | 5

-- 9. VER TODAS LAS INSTITUCIONES
SELECT 
  id, 
  name, 
  type, 
  latitude, 
  longitude 
FROM public.institutions 
ORDER BY name;

-- ✅ Si ves 8 filas, ¡éxito! Refresca el mapa.
