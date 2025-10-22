# 🔧 SOLUCIÓN: EL MAPA NO MUESTRA INSTITUCIONES

## 🚨 **PROBLEMA IDENTIFICADO**

El mapa no muestra instituciones porque:
1. ❌ La tabla `institutions` **NO EXISTE** en Supabase
2. ❌ O la tabla existe pero **SIN DATOS**
3. ❌ O la tabla tiene columnas diferentes

## ✅ **SOLUCIÓN RÁPIDA (3 PASOS)**

### **PASO 1: Verificar si la tabla existe**

1. Ir a Supabase Dashboard: `https://supabase.com/dashboard`
2. Abrir **Table Editor**
3. Buscar la tabla `institutions`

**Si NO existe → Continuar con PASO 2**
**Si existe pero está vacía → Ir a PASO 3**

---

### **PASO 2: Crear la tabla `institutions`**

1. Ir a **SQL Editor** en Supabase
2. Copiar y pegar este SQL completo:

```sql
-- ====================================================================
-- CREAR TABLA INSTITUTIONS (SOLO SI NO EXISTE)
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('school', 'university', 'institute')),
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;

-- Política de lectura pública
CREATE POLICY IF NOT EXISTS "Allow public read access to institutions" 
ON public.institutions 
FOR SELECT 
USING (is_active = true);

-- Índices
CREATE INDEX IF NOT EXISTS idx_institutions_type ON public.institutions(type);
CREATE INDEX IF NOT EXISTS idx_institutions_coordinates ON public.institutions(latitude, longitude);
```

3. Click en **RUN** (o `Ctrl + Enter`)
4. Verificar que aparezca "Success"

---

### **PASO 3: Insertar datos de prueba**

1. En **SQL Editor**, copiar y pegar:

```sql
-- ====================================================================
-- INSERTAR 10 INSTITUCIONES DE CARACAS (DATOS DE PRUEBA)
-- ====================================================================

INSERT INTO public.institutions (name, type, latitude, longitude) VALUES
('Universidad Central de Venezuela', 'university', 10.489722, -66.889167),
('Universidad Simón Bolívar', 'university', 10.408611, -66.886111),
('Universidad Católica Andrés Bello', 'university', 10.503056, -66.936944),
('Universidad Metropolitana', 'university', 10.497222, -66.826389),
('Universidad Santa María', 'university', 10.502778, -66.876944),
('Universidad Monteávila', 'university', 10.483611, -66.839167),
('Colegio Emil Friedman', 'school', 10.476667, -66.869444),
('Colegio San Ignacio de Loyola', 'school', 10.494722, -66.865278),
('IUPOLC', 'institute', 10.488056, -66.877500),
('Universidad Nueva Esparta', 'university', 10.419444, -66.811111);
```

2. Click en **RUN**
3. Verificar que aparezca "Success: Rows added"

---

### **PASO 4: Verificar en la aplicación**

1. Abrir el navegador en: `http://localhost:8081/map`
2. Abrir **Consola del Navegador** (F12)
3. Buscar estos mensajes:

```
🔄 Cargando instituciones desde Supabase...
✅ Instituciones cargadas: 10
📍 Datos: [Array con instituciones]
🗺️ Marcadores para el mapa: 10
```

4. Verificar que:
   - ✅ Se muestran **10 marcadores** en el mapa
   - ✅ El contador dice "10 de 10" instituciones
   - ✅ La lista lateral muestra las 10 instituciones
   - ✅ Los filtros funcionan en tiempo real

---

## 🔍 **DIAGNÓSTICO EN LA CONSOLA**

Abre la consola del navegador (F12) y busca:

### **✅ Si ves esto = TODO FUNCIONA:**
```
🔄 Cargando instituciones desde Supabase...
✅ Instituciones cargadas: 10
📍 Datos: (10) [{…}, {…}, ...]
🗺️ Marcadores para el mapa: 10
```

### **❌ Si ves esto = TABLA NO EXISTE:**
```
🔄 Cargando instituciones desde Supabase...
❌ Error de Supabase: {message: "relation 'institutions' does not exist"}
```
**Solución:** Ejecutar PASO 2

### **⚠️ Si ves esto = TABLA VACÍA:**
```
🔄 Cargando instituciones desde Supabase...
✅ Instituciones cargadas: 0
📍 Datos: []
🗺️ Marcadores para el mapa: 0
```
**Solución:** Ejecutar PASO 3

### **❌ Si ves esto = ERROR DE PERMISOS:**
```
❌ Error de Supabase: {message: "new row violates row-level security policy"}
```
**Solución:** Verificar que ejecutaste la política RLS en PASO 2

---

## 📊 **VERIFICAR DATOS EN SUPABASE**

Después de ejecutar el SQL, verifica:

1. Ir a **Table Editor** en Supabase
2. Seleccionar tabla `institutions`
3. Deberías ver **10 filas** con:
   - Nombres de universidades venezolanas
   - Tipos: university, school, institute
   - Coordenadas de Caracas (lat/long)

---

## 🎯 **FUNCIONALIDADES QUE DEBEN FUNCIONAR**

Una vez que tengas datos:

### **1. Mapa muestra marcadores**
- ✅ Marcadores morados (universidades)
- ✅ Marcadores azules (escuelas)
- ✅ Marcadores verdes (institutos)

### **2. Búsqueda en tiempo real**
- Escribe "Universidad Central"
- ✅ Aparece dropdown con sugerencias
- Click en sugerencia
- ✅ Mapa se centra y hace zoom

### **3. Filtros instantáneos**
- Selecciona "Universidades"
- ✅ Lista se filtra inmediatamente
- ✅ Contador: "7 de 10"
- ✅ Solo marcadores morados en el mapa

### **4. Prompt de permisos**
- ✅ Aparece sobre el mapa después de 1 segundo
- ✅ Posición central superior
- Click en "Permitir ubicación"
- ✅ Navegador pide permiso
- ✅ Aparece marcador rojo "U"

---

## 📂 **ARCHIVOS SQL DISPONIBLES**

Ya tienes estos archivos creados:

1. **`SQL_RAPIDO_INSTITUCIONES.sql`**
   - 10 instituciones de Caracas
   - Para pruebas rápidas
   - **USAR ESTE PRIMERO**

2. **`UNIVERSIDADES_VENEZUELA.sql`**
   - 55+ instituciones de toda Venezuela
   - 18 estados cubiertos
   - Para base de datos completa
   - **USAR DESPUÉS**

---

## 🚀 **ORDEN RECOMENDADO**

1. ✅ Ejecutar **`SQL_RAPIDO_INSTITUCIONES.sql`**
2. ✅ Verificar que el mapa funciona (10 instituciones)
3. ✅ Probar búsqueda y filtros
4. ✅ Ejecutar **`UNIVERSIDADES_VENEZUELA.sql`** (55+ instituciones)
5. ✅ Ver todas las universidades de Venezuela

---

## ⚡ **SOLUCIÓN MÁS RÁPIDA (COPIAR Y PEGAR)**

Abre Supabase SQL Editor y pega este SQL completo:

```sql
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

ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Allow public read access to institutions" 
ON public.institutions FOR SELECT USING (is_active = true);

CREATE INDEX IF NOT EXISTS idx_institutions_type ON public.institutions(type);

-- 2. Insertar datos
INSERT INTO public.institutions (name, type, latitude, longitude) VALUES
('Universidad Central de Venezuela', 'university', 10.489722, -66.889167),
('Universidad Simón Bolívar', 'university', 10.408611, -66.886111),
('Universidad Católica Andrés Bello', 'university', 10.503056, -66.936944),
('Universidad Metropolitana', 'university', 10.497222, -66.826389),
('Universidad Santa María', 'university', 10.502778, -66.876944),
('Colegio Emil Friedman', 'school', 10.476667, -66.869444),
('Colegio San Ignacio', 'school', 10.494722, -66.865278),
('IUPOLC', 'institute', 10.488056, -66.877500);

-- 3. Verificar
SELECT COUNT(*) as total, type FROM public.institutions GROUP BY type;
```

**¡Listo! Ahora refresca el mapa:** `http://localhost:8081/map`

---

## 🎉 **RESULTADO ESPERADO**

Después de aplicar el SQL, deberías ver:

```
┌─────────────────────────────────────┐
│ Mapa de Instituciones               │
├─────────────────────────────────────┤
│ 🔍 Buscar...                        │
│ Filtros: Todas                      │
│ Resultados: 8 de 8                  │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 🎓 Universidad Central          │ │
│ │ [Universidad]                   │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 🎓 Universidad Simón Bolívar    │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
     🗺️ MAPA CON MARCADORES
```

---

**¿Sigue sin funcionar?**
1. Verifica la consola del navegador (F12)
2. Copia los errores que aparezcan
3. Revisa que el `.env` tenga las credenciales correctas de Supabase


