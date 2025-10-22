-- ====================================================================
-- SQL FINAL QUE FUNCIONA - COPIAR Y PEGAR EN SUPABASE
-- ====================================================================
-- Este SQL funciona sin importar si la tabla existe o no
-- ====================================================================

-- 1. ELIMINAR TABLA SI EXISTE (empezar desde cero)
DROP TABLE IF EXISTS public.institutions CASCADE;

-- 2. CREAR TABLA NUEVA CON ESTRUCTURA CORRECTA
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

-- 4. CREAR POLÍTICA DE LECTURA PÚBLICA
CREATE POLICY "Allow public read access to institutions" 
ON public.institutions 
FOR SELECT 
USING (is_active = true);

-- 5. CREAR ÍNDICES
CREATE INDEX idx_institutions_type ON public.institutions(type);
CREATE INDEX idx_institutions_coordinates ON public.institutions(latitude, longitude);

-- 6. INSERTAR 8 INSTITUCIONES DE CARACAS
INSERT INTO public.institutions (name, type, latitude, longitude) VALUES
('Universidad Central de Venezuela', 'university', 10.489722, -66.889167),
('Universidad Simón Bolívar', 'university', 10.408611, -66.886111),
('Universidad Católica Andrés Bello', 'university', 10.503056, -66.936944),
('Universidad Metropolitana', 'university', 10.497222, -66.826389),
('Universidad Santa María', 'university', 10.502778, -66.876944),
('Colegio Emil Friedman', 'school', 10.476667, -66.869444),
('Colegio San Ignacio de Loyola', 'school', 10.494722, -66.865278),
('IUPOLC', 'institute', 10.488056, -66.877500);

-- 7. VERIFICAR RESULTADOS
SELECT type, COUNT(*) as total FROM public.institutions GROUP BY type ORDER BY type;

-- 8. VER TODAS LAS INSTITUCIONES
SELECT id, name, type, latitude, longitude FROM public.institutions ORDER BY name;


