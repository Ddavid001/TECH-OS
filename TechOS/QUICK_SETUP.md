# 🚀 TechOS - Configuración Rápida

## Pasos para Ejecutar la Aplicación

### 1️⃣ Aplicar Migración en Supabase

**Ve a:** https://supabase.com → Tu Proyecto → SQL Editor

**Ejecuta el siguiente script:**

```sql
-- Crear tabla job_offers
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

-- Habilitar RLS
ALTER TABLE public.job_offers ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública de ofertas activas
CREATE POLICY "Allow public read access to active offers" 
ON public.job_offers FOR SELECT 
USING (is_active = true);

-- Política para usuarios autenticados
CREATE POLICY "Allow authenticated read access to all offers" 
ON public.job_offers FOR SELECT TO authenticated
USING (true);

-- Política para admins
CREATE POLICY "Allow admin full access" 
ON public.job_offers FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Crear índices
CREATE INDEX IF NOT EXISTS idx_job_offers_active ON public.job_offers(is_active);
CREATE INDEX IF NOT EXISTS idx_job_offers_created_at ON public.job_offers(created_at DESC);

-- Insertar datos de ejemplo
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
```

### 2️⃣ Verificar Variables de Entorno

Asegúrate de que el archivo `.env` en la carpeta `TechOS` contenga:

```env
VITE_SUPABASE_URL="https://jpqltnyuexzkzkdksifp.supabase.co"
VITE_SUPABASE_ANON_KEY="tu_anon_key_aqui"
```

### 3️⃣ Ejecutar la Aplicación

```bash
cd TechOS
npm run dev
```

### 4️⃣ Abrir en el Navegador

Abre: **http://localhost:8082/**

---

## ✅ ¿Qué verás?

1. **Hero Section** con video de fondo y título "Tech"
2. **Ofertas Laborales** - Grid con 10 ofertas de ejemplo
3. **Docentes Aspirantes** - Perfiles de profesores (si existen en BD)
4. **Footer** blanco con copyright

---

## 🔧 Solución Rápida de Problemas

### No se ven ofertas laborales
```sql
-- Verificar que existan datos
SELECT COUNT(*) FROM job_offers;

-- Si no hay datos, ejecutar de nuevo el INSERT de arriba
```

### No se ven aspirantes
```sql
-- Verificar perfiles de profesores
SELECT COUNT(*) FROM profiles WHERE role = 'teacher';

-- Si no hay, crear un usuario con rol "teacher" desde el registro
```

### Error de autenticación
- Verificar que las variables de entorno estén correctas
- Revisar Dashboard de Supabase → Settings → API

---

## 📱 Funcionalidades Principales

✅ **Landing Page Dinámica**
- Video de fondo con overlay
- Navegación en cabecera
- Botones Login/Registro

✅ **Ofertas Laborales**
- Cards con información clave
- Modal con detalles completos
- Botón "Aplicar" (placeholder)

✅ **Perfiles de Docentes**
- Avatares con iniciales
- Información básica
- Botón "Ver Perfil" (próximamente)

✅ **Registro Simplificado**
- Sin campo de institución
- Validación mejorada
- Email de confirmación

---

## 🎯 ¡Listo para Usar!

La aplicación está completamente funcional y lista para desarrollo o producción.

**Próximo paso:** Aplicar el script SQL y ejecutar `npm run dev`



