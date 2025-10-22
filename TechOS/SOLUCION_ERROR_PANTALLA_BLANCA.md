# 🔧 Solución: Error de Pantalla en Blanco

## ❌ Error Detectado

```
[plugin:vite:css] [postcss] ENOENT: no such file or directory, open
'C:\Users\cwill\Downloads\TechSO\TechOS\src\components\ApplicantsSection.tsx'
```

## 🔍 Causa del Problema

El error se debe a que Vite/PostCSS tiene en **caché** referencias a archivos antiguos que ya no existen:
- `ApplicantsSection.tsx` (eliminado, reemplazado por `ApplicantsModal.tsx`)
- `JobOffersSection.tsx` (eliminado, reemplazado por `JobOffersModal.tsx`)

## ✅ Solución Paso a Paso

### OPCIÓN 1: Limpiar Caché de Vite (RECOMENDADO)

1. **Detener el servidor** (Ctrl + C en la terminal)

2. **Ejecutar estos comandos en PowerShell:**

```powershell
cd TechOS

# Limpiar caché de Vite
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue

# Limpiar dist
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue

# Reiniciar servidor
npm run dev
```

### OPCIÓN 2: Reinstalar dependencias (Si la Opción 1 no funciona)

```powershell
cd TechOS

# Detener servidor (Ctrl + C)

# Eliminar node_modules y lock file
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstalar
npm install

# Iniciar servidor
npm run dev
```

### OPCIÓN 3: Reinicio completo del proyecto

```powershell
cd TechOS

# Limpiar todo
Remove-Item -Recurse -Force node_modules, dist, .vite -ErrorAction SilentlyContinue

# Reinstalar
npm clean-install

# Iniciar
npm run dev
```

## 📋 Verificación de Archivos

Confirma que estos archivos EXISTEN:
- ✅ `src/components/JobOffersModal.tsx`
- ✅ `src/components/ApplicantsModal.tsx`
- ✅ `src/pages/LandingPage.tsx`
- ✅ `.env` (en carpeta TechOS)

Confirma que estos archivos NO EXISTEN:
- ❌ `src/components/JobOffersSection.tsx` (debe estar eliminado)
- ❌ `src/components/ApplicantsSection.tsx` (debe estar eliminado)

## 🎯 Después de Limpiar la Caché

1. El servidor debería iniciar sin errores
2. Abrir: `http://localhost:8084` (o el puerto que muestre)
3. Deberías ver:
   - Landing page con video de fondo
   - Logo TechOS
   - Navegación superior
   - 3 botones principales
   - Footer

## 🐛 Si Aún Hay Problemas

### Error: "VITE_SUPABASE_URL is required"

**Solución:** Verifica que el archivo `.env` existe y contiene:

```env
VITE_SUPABASE_URL=https://jpqltnyuexzkzkdksifp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwcWx0bnl1ZXh6a3prZGtzaWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0NTA3NDAsImV4cCI6MjA0NTAyNjc0MH0.j7fOtmYdOLWqYVNQPQywH9hB9LkZJO_K8sKKhfWBxcc
```

### Error: Modales no se abren

**Solución:** Ejecutar el SQL en Supabase:
1. Ir a https://supabase.com
2. SQL Editor
3. Copiar contenido de `SQL_COMPLETO_CON_MAPA.sql`
4. Ejecutar

### Error: 404 en favicon

**Solución:** El logo está en `public/logo.png`, el favicon debería cargarse automáticamente.

## 📊 Estado Actual de Archivos

```
TechOS/
├── src/
│   ├── components/
│   │   ├── JobOffersModal.tsx ✅ (EXISTE)
│   │   ├── ApplicantsModal.tsx ✅ (EXISTE)
│   │   └── navigation/
│   │       └── MainNavigation.tsx ✅
│   └── pages/
│       └── LandingPage.tsx ✅
├── public/
│   └── logo.png ✅
├── .env ✅ (DEBE EXISTIR)
└── package.json ✅
```

## 🚀 Comando Rápido de Solución

Copia y pega esto en PowerShell (dentro de la carpeta TechSO):

```powershell
cd TechOS; Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue; npm run dev
```

Espera 10-15 segundos y el servidor debería iniciar correctamente.

## ✨ Después de la Solución

El servidor mostrará:

```
VITE v5.x.x ready in XXX ms

➜  Local:   http://localhost:8084/
➜  Network: http://192.168.x.x:8084/
```

Abre `http://localhost:8084` en tu navegador.

---

**Última actualización:** 21 de Octubre 2025
**Versión:** 2.1 - Solución de Caché



