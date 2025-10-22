# 📋 GUÍA VISUAL: CÓMO EJECUTAR EL SQL EN SUPABASE

## 🎯 **LO QUE VES AHORA EN EL MAPA**

```
┌─────────────────────────────────────────────────┐
│ Mapa de Instituciones                           │
├─────────────────────────────────────────────────┤
│ 🔍 Buscar...                 Filtros            │
│ Resultados: 0 de 0                              │
├─────────────────────────────────────────────────┤
│                                                 │
│  📍 No se encontraron instituciones             │
│     Debes ejecutar el SQL en Supabase           │
│     [Abrir Supabase]                            │
│                                                 │
├─────────────────────────────────────────────────┤
│              🗺️ MAPA VACÍO                      │
│                                                 │
│  ┌───────────────────────────────────────┐      │
│  │ ⚠️ Sin instituciones en el mapa       │      │
│  │                                       │      │
│  │ Para ver instituciones, debes         │      │
│  │ ejecutar el SQL en Supabase           │      │
│  │                                       │      │
│  │ 📝 Pasos rápidos:                     │      │
│  │ 1. Abre Supabase Dashboard            │      │
│  │ 2. Ve a SQL Editor                    │      │
│  │ 3. Copia SQL_RAPIDO_INSTITUCIONES.sql │      │
│  │ 4. Ejecuta (Run)                      │      │
│  │ 5. Refresca esta página               │      │
│  │                                       │      │
│  │ [Abrir Supabase]  [Recargar]         │      │
│  └───────────────────────────────────────┘      │
└─────────────────────────────────────────────────┘
```

---

## ✅ **PASO 1: ABRIR SUPABASE**

1. Abre tu navegador
2. Ve a: `https://supabase.com/dashboard`
3. Inicia sesión si es necesario
4. Selecciona tu proyecto "TechOS"

---

## ✅ **PASO 2: ABRIR SQL EDITOR**

En el menú lateral izquierdo:
```
┌──────────────────┐
│ 📊 Table Editor  │
│ 🔧 Database      │
│ 📝 SQL Editor    │ ← Click aquí
│ 🔐 Auth          │
│ 📁 Storage       │
└──────────────────┘
```

---

## ✅ **PASO 3: NUEVO QUERY**

1. Click en "+ New query"
2. Se abrirá un editor de texto vacío

---

## ✅ **PASO 4: COPIAR EL SQL**

Abre el archivo `SQL_RAPIDO_INSTITUCIONES.sql` (está en la carpeta TechOS)

**O copia este código completo:**

```sql
-- CREAR TABLA
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

-- INSERTAR DATOS
INSERT INTO public.institutions (name, type, latitude, longitude) VALUES
('Universidad Central de Venezuela', 'university', 10.489722, -66.889167),
('Universidad Simón Bolívar', 'university', 10.408611, -66.886111),
('Universidad Católica Andrés Bello', 'university', 10.503056, -66.936944),
('Universidad Metropolitana', 'university', 10.497222, -66.826389),
('Universidad Santa María', 'university', 10.502778, -66.876944),
('Colegio Emil Friedman', 'school', 10.476667, -66.869444),
('Colegio San Ignacio', 'school', 10.494722, -66.865278),
('IUPOLC', 'institute', 10.488056, -66.877500);
```

---

## ✅ **PASO 5: PEGAR Y EJECUTAR**

1. **Pega el código** en el editor SQL de Supabase
2. **Click en "RUN"** (o presiona `Ctrl + Enter`)
3. Espera el mensaje de éxito:
   ```
   ✅ Success
   Rows added: 8
   ```

---

## ✅ **PASO 6: VERIFICAR LOS DATOS**

En Supabase, ve a **Table Editor** y selecciona la tabla `institutions`

Deberías ver:
```
┌──────────────────────────────────────┬─────────────┬──────────┬────────────┐
│ name                                 │ type        │ latitude │ longitude  │
├──────────────────────────────────────┼─────────────┼──────────┼────────────┤
│ Universidad Central de Venezuela     │ university  │ 10.48972 │ -66.889167 │
│ Universidad Simón Bolívar            │ university  │ 10.40861 │ -66.886111 │
│ Universidad Católica Andrés Bello    │ university  │ 10.50305 │ -66.936944 │
│ Universidad Metropolitana            │ university  │ 10.49722 │ -66.826389 │
│ Universidad Santa María              │ university  │ 10.50277 │ -66.876944 │
│ Colegio Emil Friedman                │ school      │ 10.47666 │ -66.869444 │
│ Colegio San Ignacio                  │ school      │ 10.49472 │ -66.865278 │
│ IUPOLC                               │ institute   │ 10.48805 │ -66.877500 │
└──────────────────────────────────────┴─────────────┴──────────┴────────────┘
8 filas
```

---

## ✅ **PASO 7: VOLVER AL MAPA**

1. Vuelve a tu navegador con TechOS
2. Ve a: `http://localhost:8081/map`
3. **Refresca la página** (F5)

---

## 🎉 **RESULTADO ESPERADO**

Después de refrescar, deberías ver:

```
┌─────────────────────────────────────────────────┐
│ Mapa de Instituciones                           │
├─────────────────────────────────────────────────┤
│ 🔍 Buscar...                 Filtros            │
│ Tipo: Todas                                     │
│ Resultados: 8 de 8         ✅                   │
├─────────────────────────────────────────────────┤
│ Instituciones Encontradas:                      │
│                                                 │
│ ┌─────────────────────────────────────┐         │
│ │ 🎓 Universidad Central de Venezuela │         │
│ │    [Universidad]                    │         │
│ │    [🚗 Cómo llegar]                │         │
│ └─────────────────────────────────────┘         │
│ ┌─────────────────────────────────────┐         │
│ │ 🎓 Universidad Simón Bolívar        │         │
│ │    [Universidad]                    │         │
│ └─────────────────────────────────────┘         │
│ ... (6 más)                                     │
├─────────────────────────────────────────────────┤
│              🗺️ MAPA CON MARCADORES             │
│                                                 │
│        🟣 🟣 🟣 🟣 🟣 🟣 ← Universidades       │
│           🔵 🔵 ← Escuelas                      │
│             🟢 ← Instituto                      │
│                                                 │
│  ┌─────────────────────────────┐                │
│  │ 📍 Permitir ubicación       │ ← Este aparece │
│  │ Para mostrarte...           │   después de   │
│  │ [Permitir] [Ahora no]       │   1 segundo    │
│  └─────────────────────────────┘                │
└─────────────────────────────────────────────────┘
```

---

## 🔍 **VERIFICAR EN LA CONSOLA DEL NAVEGADOR**

Abre la consola (F12) y deberías ver:

```
🔄 Cargando instituciones desde Supabase...
✅ Instituciones cargadas: 8
📍 Datos: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
🗺️ Marcadores para el mapa: 8
```

---

## ⚠️ **SI ALGO SALE MAL**

### **Error: "relation 'institutions' does not exist"**
**Solución:** Ejecuta solo la primera parte del SQL (CREATE TABLE)

### **Error: "new row violates row-level security policy"**
**Solución:** Verifica que ejecutaste la línea `CREATE POLICY`

### **Sigue sin aparecer nada**
**Solución:**
1. Abre la consola del navegador (F12)
2. Busca mensajes de error en rojo
3. Verifica que tu archivo `.env` tenga las credenciales correctas de Supabase:
   ```
   VITE_SUPABASE_URL=tu_url_aquí
   VITE_SUPABASE_ANON_KEY=tu_key_aquí
   ```

---

## 📊 **PRUEBAS QUE PUEDES HACER**

### **1. Búsqueda:**
- Escribe "Universidad" en la barra de búsqueda
- ✅ Debe aparecer dropdown con sugerencias
- ✅ Máximo 5 resultados
- Click en una → Mapa se centra

### **2. Filtros:**
- Click en "Tipo de Institución"
- Selecciona "Universidades"
- ✅ Lista se actualiza INMEDIATAMENTE
- ✅ Contador: "6 de 8"
- ✅ Solo marcadores morados en el mapa

### **3. Ubicación:**
- Espera 1 segundo
- ✅ Aparece prompt de permisos sobre el mapa
- Click en "Permitir ubicación"
- ✅ Navegador pide permiso
- ✅ Aparece marcador rojo "U" con tu ubicación

### **4. "Cómo llegar":**
- Click en cualquier institución de la lista
- Click en "Cómo llegar"
- ✅ Se abre Google Maps en nueva pestaña
- ✅ Muestra la ruta desde tu ubicación (si la permitiste)

---

## 🎯 **RESUMEN**

**¿Dónde ejecutar el SQL?**
→ `https://supabase.com/dashboard` → SQL Editor

**¿Qué SQL ejecutar?**
→ Todo el contenido de `SQL_RAPIDO_INSTITUCIONES.sql`

**¿Cómo saber si funcionó?**
→ Refresca `http://localhost:8081/map` y verás 8 instituciones

**¿Necesitas más instituciones?**
→ Después puedes ejecutar `UNIVERSIDADES_VENEZUELA.sql` (55+ instituciones)

---

**¡Listo! Ahora tendrás un mapa completo con instituciones de Venezuela!** 🎉



