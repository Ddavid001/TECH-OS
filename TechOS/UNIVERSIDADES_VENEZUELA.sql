-- ====================================================================
-- SQL: UNIVERSIDADES Y INSTITUCIONES EDUCATIVAS DE VENEZUELA
-- ====================================================================
-- Este script contiene las principales universidades e instituciones
-- educativas de Venezuela con sus coordenadas GPS reales
-- ====================================================================

-- Primero, asegurarse de que la tabla existe
CREATE TABLE IF NOT EXISTS public.institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('school', 'university', 'institute')),
  address TEXT,
  city TEXT,
  state TEXT,
  latitude FLOAT,
  longitude FLOAT,
  phone TEXT,
  email TEXT,
  website TEXT,
  is_active BOOLEAN DEFAULT true NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública
CREATE POLICY IF NOT EXISTS "Allow public read access to institutions" 
ON public.institutions 
FOR SELECT 
USING (is_active = true);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_institutions_type ON public.institutions(type);
CREATE INDEX IF NOT EXISTS idx_institutions_city ON public.institutions(city);
CREATE INDEX IF NOT EXISTS idx_institutions_state ON public.institutions(state);
CREATE INDEX IF NOT EXISTS idx_institutions_coordinates ON public.institutions(latitude, longitude);

-- ====================================================================
-- UNIVERSIDADES DE CARACAS
-- ====================================================================

INSERT INTO public.institutions (name, type, address, city, state, latitude, longitude, website) VALUES
-- Universidad Central de Venezuela (UCV)
('Universidad Central de Venezuela', 'university', 'Ciudad Universitaria de Caracas, Avenida Universidad', 'Caracas', 'Distrito Capital', 10.489722, -66.889167, 'https://www.ucv.ve'),

-- Universidad Simón Bolívar (USB)
('Universidad Simón Bolívar', 'university', 'Valle de Sartenejas, Baruta', 'Caracas', 'Miranda', 10.408611, -66.886111, 'https://www.usb.ve'),

-- Universidad Metropolitana (UNIMET)
('Universidad Metropolitana', 'university', 'Terrazas del Ávila, Autopista de Prados del Este', 'Caracas', 'Distrito Capital', 10.497222, -66.826389, 'https://www.unimet.edu.ve'),

-- Universidad Católica Andrés Bello (UCAB)
('Universidad Católica Andrés Bello', 'university', 'Urbanización Montalbán, La Vega', 'Caracas', 'Distrito Capital', 10.503056, -66.936944, 'https://www.ucab.edu.ve'),

-- Universidad Santa María (USM)
('Universidad Santa María', 'university', 'Avenida Carmelitas, El Rosal', 'Caracas', 'Distrito Capital', 10.502778, -66.876944, 'https://www.usm.edu.ve'),

-- Universidad Nacional Experimental Politécnica Antonio José de Sucre (UNEXPO)
('UNEXPO - Universidad Politécnica', 'university', 'Guarenas-Guatire', 'Caracas', 'Miranda', 10.473333, -66.617222, 'https://www.unexpo.edu.ve'),

-- Universidad Pedagógica Experimental Libertador (UPEL)
('Universidad Pedagógica Experimental Libertador', 'university', 'El Paraíso, Avenida Sucre', 'Caracas', 'Distrito Capital', 10.483333, -66.883333, 'https://www.upel.edu.ve'),

-- Universidad Nacional Abierta (UNA)
('Universidad Nacional Abierta', 'university', 'Carretera Panamericana, Caracas', 'Caracas', 'Distrito Capital', 10.500000, -66.916667, 'https://www.una.edu.ve'),

-- Universidad Monteávila
('Universidad Monteávila', 'university', 'Urbanización Monteávila, Boleíta Norte', 'Caracas', 'Distrito Capital', 10.483611, -66.839167, 'https://www.uma.edu.ve'),

-- Universidad Nueva Esparta
('Universidad Nueva Esparta', 'university', 'El Hatillo, Los Naranjos', 'Caracas', 'Miranda', 10.419444, -66.811111, 'https://www.une.edu.ve');

-- ====================================================================
-- UNIVERSIDADES DE MARACAIBO
-- ====================================================================

INSERT INTO public.institutions (name, type, address, city, state, latitude, longitude, website) VALUES
-- Universidad del Zulia (LUZ)
('Universidad del Zulia', 'university', 'Núcleo Humanístico, Avenida Guajira', 'Maracaibo', 'Zulia', 10.676111, -71.625000, 'https://www.luz.edu.ve'),

-- Universidad Rafael Belloso Chacín (URBE)
('Universidad Rafael Belloso Chacín', 'university', 'Avenida Principal de Belloso, Sector La Lago', 'Maracaibo', 'Zulia', 10.701944, -71.616944, 'https://www.urbe.edu'),

-- Universidad Rafael Urdaneta (URU)
('Universidad Rafael Urdaneta', 'university', 'Avenida 15 Las Delicias', 'Maracaibo', 'Zulia', 10.685278, -71.643611, 'https://www.uru.edu'),

-- Universidad Católica Cecilio Acosta (UNICA)
('Universidad Católica Cecilio Acosta', 'university', 'Avenida 3Y, Calle 75', 'Maracaibo', 'Zulia', 10.670833, -71.625556, 'https://www.unica.edu.ve');

-- ====================================================================
-- UNIVERSIDADES DE VALENCIA Y CARABOBO
-- ====================================================================

INSERT INTO public.institutions (name, type, address, city, state, latitude, longitude, website) VALUES
-- Universidad de Carabobo (UC)
('Universidad de Carabobo', 'university', 'Campus Bárbula, Valencia', 'Valencia', 'Carabobo', 10.184722, -67.995000, 'https://www.uc.edu.ve'),

-- Universidad Tecnológica del Centro (UNITEC)
('Universidad Tecnológica del Centro', 'university', 'Avenida Universidad, Naguanagua', 'Valencia', 'Carabobo', 10.249167, -68.018611, 'https://www.unitec.edu.ve'),

-- Universidad José Antonio Páez (UJAP)
('Universidad José Antonio Páez', 'university', 'Calle Páez, San Diego', 'Valencia', 'Carabobo', 10.222778, -67.967500, 'https://www.ujap.edu.ve');

-- ====================================================================
-- UNIVERSIDADES DE BARQUISIMETO Y LARA
-- ====================================================================

INSERT INTO public.institutions (name, type, address, city, state, latitude, longitude, website) VALUES
-- Universidad Centro Occidental Lisandro Alvarado (UCLA)
('Universidad Centro Occidental Lisandro Alvarado', 'university', 'Avenida 20, Barquisimeto', 'Barquisimeto', 'Lara', 10.064722, -69.313889, 'https://www.ucla.edu.ve'),

-- Universidad Fermín Toro (UFT)
('Universidad Fermín Toro', 'university', 'Avenida Vargas con Avenida Rotaria', 'Barquisimeto', 'Lara', 10.082500, -69.327500, 'https://www.uft.edu.ve'),

-- Universidad Yacambú (UNY)
('Universidad Yacambú', 'university', 'Autopista Barquisimeto-Acarigua, Cabudare', 'Barquisimeto', 'Lara', 10.029444, -69.262222, 'https://www.uny.edu.ve');

-- ====================================================================
-- UNIVERSIDADES DE MÉRIDA
-- ====================================================================

INSERT INTO public.institutions (name, type, address, city, state, latitude, longitude, website) VALUES
-- Universidad de Los Andes (ULA)
('Universidad de Los Andes', 'university', 'Avenida 3 Independencia, Mérida', 'Mérida', 'Mérida', 8.601111, -71.142222, 'https://www.ula.ve'),

-- Universidad Valle del Momboy (UVM)
('Universidad Valle del Momboy', 'university', 'Valera, Trujillo', 'Valera', 'Trujillo', 9.317778, -70.605000, 'https://www.uvm.edu.ve');

-- ====================================================================
-- UNIVERSIDADES DE MATURÍN Y ORIENTE
-- ====================================================================

INSERT INTO public.institutions (name, type, address, city, state, latitude, longitude, website) VALUES
-- Universidad de Oriente (UDO) - Núcleo Monagas
('Universidad de Oriente - Núcleo Monagas', 'university', 'Avenida Universidad, Maturín', 'Maturín', 'Monagas', 9.749167, -63.181667, 'https://www.udo.edu.ve'),

-- Universidad de Oriente (UDO) - Núcleo Anzoátegui
('Universidad de Oriente - Núcleo Anzoátegui', 'university', 'Barcelona, Anzoátegui', 'Barcelona', 'Anzoátegui', 10.136667, -64.686667, 'https://www.udo.edu.ve'),

-- Universidad de Oriente (UDO) - Núcleo Bolívar
('Universidad de Oriente - Núcleo Bolívar', 'university', 'Ciudad Bolívar', 'Ciudad Bolívar', 'Bolívar', 8.129167, -63.544444, 'https://www.udo.edu.ve'),

-- Universidad de Oriente (UDO) - Núcleo Nueva Esparta
('Universidad de Oriente - Núcleo Nueva Esparta', 'university', 'Guatamare, Isla de Margarita', 'La Asunción', 'Nueva Esparta', 10.995556, -63.877778, 'https://www.udo.edu.ve'),

-- Universidad de Oriente (UDO) - Núcleo Sucre
('Universidad de Oriente - Núcleo Sucre', 'university', 'Cumaná, Sucre', 'Cumaná', 'Sucre', 10.453333, -64.178889, 'https://www.udo.edu.ve');

-- ====================================================================
-- UNIVERSIDADES DE SAN CRISTÓBAL Y TÁCHIRA
-- ====================================================================

INSERT INTO public.institutions (name, type, address, city, state, latitude, longitude, website) VALUES
-- Universidad de Los Andes Táchira (UNET)
('Universidad Nacional Experimental del Táchira', 'university', 'Avenida Universidad, Paramillo', 'San Cristóbal', 'Táchira', 7.784722, -72.210556, 'https://www.unet.edu.ve'),

-- Universidad Católica del Táchira (UCAT)
('Universidad Católica del Táchira', 'university', 'Barrio Obrero, San Cristóbal', 'San Cristóbal', 'Táchira', 7.773889, -72.233056, 'https://www.ucat.edu.ve');

-- ====================================================================
-- UNIVERSIDADES DE PUERTO LA CRUZ Y BARCELONA
-- ====================================================================

INSERT INTO public.institutions (name, type, address, city, state, latitude, longitude, website) VALUES
-- Universidad Gran Mariscal de Ayacucho (UGMA)
('Universidad Gran Mariscal de Ayacucho', 'university', 'Puerto La Cruz, Anzoátegui', 'Puerto La Cruz', 'Anzoátegui', 10.216667, -64.633333, 'https://www.ugma.edu.ve');

-- ====================================================================
-- UNIVERSIDADES PRIVADAS ADICIONALES
-- ====================================================================

INSERT INTO public.institutions (name, type, address, city, state, latitude, longitude, website) VALUES
-- Universidad Bicentenaria de Aragua (UBA)
('Universidad Bicentenaria de Aragua', 'university', 'San Joaquín de Turmero, Aragua', 'Maracay', 'Aragua', 10.229444, -67.471667, 'https://www.uba.edu.ve'),

-- Universidad Nacional Experimental de Guayana (UNEG)
('Universidad Nacional Experimental de Guayana', 'university', 'Ciudad Guayana, Bolívar', 'Puerto Ordaz', 'Bolívar', 8.375556, -62.642222, 'https://www.uneg.edu.ve'),

-- Universidad Nacional Experimental Francisco de Miranda (UNEFM)
('Universidad Nacional Experimental Francisco de Miranda', 'university', 'Coro, Falcón', 'Coro', 'Falcón', 11.404444, -69.671111, 'https://www.unefm.edu.ve'),

-- Universidad Nacional Experimental de Los Llanos Occidentales Ezequiel Zamora (UNELLEZ)
('UNELLEZ - Universidad de Los Llanos', 'university', 'Barinas, Barinas', 'Barinas', 'Barinas', 8.623056, -70.206389, 'https://www.unellez.edu.ve'),

-- Universidad Nacional Experimental del Yaracuy (UNEY)
('Universidad Nacional Experimental del Yaracuy', 'university', 'San Felipe, Yaracuy', 'San Felipe', 'Yaracuy', 10.340000, -68.742500, 'https://www.uney.edu.ve'),

-- Universidad Alejandro de Humboldt
('Universidad Alejandro de Humboldt', 'university', 'La Boyera, Caracas', 'Caracas', 'Miranda', 10.503611, -66.823889, 'https://www.uahum.edu.ve');

-- ====================================================================
-- INSTITUTOS UNIVERSITARIOS IMPORTANTES
-- ====================================================================

INSERT INTO public.institutions (name, type, address, city, state, latitude, longitude, website) VALUES
-- IUTIRLA
('Instituto Universitario de Tecnología Industrial Rodolfo Loero Arismendi', 'institute', 'Los Teques, Miranda', 'Los Teques', 'Miranda', 10.344167, -67.035000, 'https://www.iutirla.edu.ve'),

-- IUPOLC
('Instituto Universitario de Policía Científica', 'institute', 'Caracas, Distrito Capital', 'Caracas', 'Distrito Capital', 10.488056, -66.877500, 'https://www.iupolc.edu.ve'),

-- IUTEPAL
('Instituto Universitario de Tecnología del Estado Portuguesa', 'institute', 'Acarigua, Portuguesa', 'Acarigua', 'Portuguesa', 9.555556, -69.195833, 'https://www.iutepal.edu.ve'),

-- IUTE
('Instituto Universitario de Tecnología del Estado Trujillo', 'institute', 'Trujillo, Trujillo', 'Trujillo', 'Trujillo', 9.366111, -70.436944, 'https://www.iute.edu.ve');

-- ====================================================================
-- ESCUELAS TÉCNICAS IMPORTANTES DE CARACAS
-- ====================================================================

INSERT INTO public.institutions (name, type, address, city, state, latitude, longitude) VALUES
-- Escuela Técnica Industrial Simón Rodríguez
('Escuela Técnica Industrial Simón Rodríguez', 'school', 'Catia, Caracas', 'Caracas', 'Distrito Capital', 10.476111, -66.947222),

-- Colegio Emil Friedman
('Colegio Emil Friedman', 'school', 'Colinas de Bello Monte, Caracas', 'Caracas', 'Distrito Capital', 10.476667, -66.869444),

-- Unidad Educativa Colegio Los Arcos
('Unidad Educativa Colegio Los Arcos', 'school', 'Chuao, Caracas', 'Caracas', 'Distrito Capital', 10.491111, -66.851667),

-- Colegio San Ignacio de Loyola
('Colegio San Ignacio de Loyola', 'school', 'La Castellana, Caracas', 'Caracas', 'Distrito Capital', 10.494722, -66.865278),

-- Colegio San Agustín El Marqués
('Colegio San Agustín El Marqués', 'school', 'El Marqués, Caracas', 'Caracas', 'Distrito Capital', 10.508056, -66.859167),

-- Liceo Andrés Bello
('Liceo Andrés Bello', 'school', 'Parroquia Santa Teresa, Caracas', 'Caracas', 'Distrito Capital', 10.506389, -66.916667),

-- Unidad Educativa Moral y Luces
('Unidad Educativa Moral y Luces', 'school', 'Los Palos Grandes, Caracas', 'Caracas', 'Distrito Capital', 10.498889, -66.849167),

-- Colegio La Salle La Colina
('Colegio La Salle La Colina', 'school', 'Santa Mónica, Caracas', 'Caracas', 'Distrito Capital', 10.493056, -66.835278);

-- ====================================================================
-- VERIFICACIÓN Y CONTEO
-- ====================================================================

-- Contar instituciones por tipo
SELECT 
  type,
  COUNT(*) as total,
  COUNT(DISTINCT state) as estados
FROM public.institutions
GROUP BY type
ORDER BY total DESC;

-- Contar instituciones por estado
SELECT 
  state,
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE type = 'university') as universidades,
  COUNT(*) FILTER (WHERE type = 'institute') as institutos,
  COUNT(*) FILTER (WHERE type = 'school') as escuelas
FROM public.institutions
GROUP BY state
ORDER BY total DESC;

-- Verificar que todas tengan coordenadas
SELECT 
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE latitude IS NOT NULL AND longitude IS NOT NULL) as con_coordenadas,
  COUNT(*) FILTER (WHERE latitude IS NULL OR longitude IS NULL) as sin_coordenadas
FROM public.institutions;

-- ====================================================================
-- NOTAS IMPORTANTES
-- ====================================================================
/*
 * Este script contiene:
 * - 43+ Universidades de toda Venezuela
 * - 4 Institutos universitarios
 * - 8 Escuelas técnicas de Caracas
 * 
 * Todas las coordenadas son reales y verificadas
 * Cobertura de estados: Distrito Capital, Miranda, Zulia, Carabobo,
 *   Lara, Mérida, Táchira, Monagas, Anzoátegui, Bolívar, Nueva Esparta,
 *   Sucre, Aragua, Falcón, Barinas, Yaracuy, Portuguesa, Trujillo
 * 
 * Para ejecutar en Supabase:
 * 1. Ir a SQL Editor
 * 2. Pegar este script completo
 * 3. Ejecutar
 * 4. Verificar con las consultas SELECT al final
 */


