# 🔧 GUÍA PASO A PASO - ARREGLANDO EL ERROR DE "MODO DEMOSTRACIÓN"

## ❌ El Problema

Estás viendo: **"Modo Demostración - Mostrando ofertas de ejemplo"**

## ✅ La Solución (3 PASOS)

---

## PASO 1: EJECUTAR SQL EN SUPABASE ⏱️ (3 MINUTOS)

### 1.1 Abre Supabase Dashboard
- Ve a https://app.supabase.com
- Selecciona tu proyecto TechOS
- Click en "SQL Editor" (izquierda)

### 1.2 Crear Nueva Query
- Click en "New Query" (arriba a la derecha)
- Se abrirá un editor SQL vacío

### 1.3 Copiar el SQL COMPLETO
```
📁 Abre el archivo: SQL_COMPLETO_LISTO_PARA_EJECUTAR.sql
📋 Cópialo COMPLETO (Ctrl+A → Ctrl+C)
```

### 1.4 Pegar en Supabase
- Pega TODO en el editor SQL (Ctrl+V)
- Click en botón **"Run"** (arriba a la derecha) ▶️

### 1.5 Esperar
- Espera a que termine (verás mensajes de confirmación)
- Al final deberías ver:
  ```
  ✅ Total de ofertas insertadas: 45
  ✅ Tabla job_applications: 0 (normal, es nueva)
  ✅ Tabla application_audit_log: 0 (normal, es nueva)
  ```

---

## PASO 2: CREAR BUCKET EN STORAGE (1 MINUTO)

### 2.1 Ve a Storage
- En Supabase Dashboard
- Click en "Storage" (izquierda)

### 2.2 Crear Bucket
- Click en "New bucket"
- Nombre: `applications` (exactamente así)
- **Desactiva** "Make it public" (déjalo privado)
- Click "Create bucket"

---

## PASO 3: EJECUTAR PROYECTO (1 MINUTO)

### 3.1 En tu terminal
```bash
cd C:\Users\cwill\Downloads\TechSO\TechOS
npm run dev
```

### 3.2 Abre en navegador
```
http://localhost:5173/ofertas
```

### 3.3 ¡Verás 45+ OFERTAS REALES! 🎉

---

## ✅ VERIFICACIÓN

Después de ejecutar, deberías ver:

```
✅ 45+ ofertas de trabajo reales
✅ Con búsqueda y filtros funcionales
✅ Botón "Aplicar" funcional
✅ Sin mensaje de "Modo Demostración"
```

---

## 🔍 SI AÚN NO FUNCIONA

### Verificar Variables de Entorno

Abre el archivo `.env.local` y asegúrate de tener:

```env
VITE_SUPABASE_URL=https://tu-url.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima
```

**¿Dónde obtenerlas?**
1. Supabase Dashboard
2. Click en "Settings" (abajo izquierda)
3. Click en "API"
4. Copia:
   - Project URL → VITE_SUPABASE_URL
   - Anon Public Key → VITE_SUPABASE_ANON_KEY

### Reiniciar Proyecto

Después de actualizar `.env.local`:

```bash
# Detén el proyecto (Ctrl+C)
# Reinicia:
npm run dev
```

---

## 📊 QUÉ TABLAS SE CREAN

El SQL crea automáticamente:

```sql
✅ job_offers (MEJORADA)
   └─ Con 45+ ofertas de trabajo

✅ job_applications (NUEVA)
   └─ Para guardar postulaciones

✅ application_audit_log (NUEVA)
   └─ Historial de cambios

✅ 2 Vistas SQL
   └─ job_applications_summary
   └─ job_applications_stats
```

---

## 🎯 RESULTADO ESPERADO

### En `/ofertas` verás:

```
📌 45+ Ofertas de Trabajo
├── Matemáticas (4)
├── Ciencias (4)
├── Tecnología (5)
├── Idiomas (4)
├── Humanidades (4)
└── ... más categorías

🔍 Búsqueda por:
├── Nombre del puesto
├── Institución
└── Rama/Categoría

📱 Cada tarjeta muestra:
├── Puesto
├── Institución
├── Rama
├── Horario
├── Salario
├── Nivel requerido
├── Beneficios
└── Botones: Aplicar | Ver en Mapa
```

---

## 💡 TIPS

### Si queríe limpiar datos viejos:
En el SQL, descomenta esta línea:
```sql
-- DELETE FROM public.job_offers WHERE is_active = true;
```

### Ver logs de errores:
1. Abre DevTools (F12)
2. Tab "Console"
3. Busca mensajes de error

### Verificar BD en tiempo real:
1. Supabase Dashboard
2. Click en "Table Editor"
3. Selecciona tabla `job_offers`
4. Deberías ver 45+ filas

---

## ❓ PREGUNTAS FRECUENTES

**P: ¿Cuánto demora el SQL?**
R: Normalmente 5-10 segundos

**P: ¿Veo un error de RLS?**
R: Es normal si es la primera vez. Las políticas de seguridad se aplican automáticamente.

**P: ¿Las ofertas no aparecen en mi navegador?**
R: 
1. Verifica que no hay errores en Console (F12)
2. Recarga la página (F5)
3. Verifica que las ofertas existen en Supabase (Table Editor)

**P: ¿Qué significa "is_active = true"?**
R: Solo se cargan ofertas activas. Las inactivas se ignoran.

---

## 🚀 SIGUIENTES PASOS

Después de que funcione:

1. ✅ Login en `/ofertas`
2. ✅ Click "Aplicar" en una oferta
3. ✅ Completa formulario
4. ✅ Va a `/mis-postulaciones`
5. ✅ Ve tu aplicación registrada
6. ✅ Admin en `/admin/dashboard` gestiona

---

## 📞 RESUMEN RÁPIDO

```
1️⃣ Copia archivo SQL
2️⃣ Pega en Supabase
3️⃣ Click RUN
4️⃣ Crea bucket "applications"
5️⃣ npm run dev
6️⃣ Abre /ofertas
7️⃣ ¡HECHO! 🎉
```

---

**¡Éxito! Cualquier problema, revisa console (F12)** 💪
