# 🎯 PASOS FINALES PARA VER EL MAPA FUNCIONANDO

## ⚠️ IMPORTANTE: Sigue estos pasos EN ORDEN

---

## PASO 1: Crear archivo .env ✅ (Ya lo tienes)

El archivo `.env` ya debe existir en `TechOS/` con:

```env
VITE_SUPABASE_URL=https://jpqltnyuexzkzkdksifp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwcWx0bnl1ZXh6a3prZGtzaWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NzE1NjEsImV4cCI6MjA3NjU0NzU2MX0.C4Dn2fiYGypNTT_Y13fPbIT7nUP_zwOwpQ30LS1UcCM
```

Si NO lo tienes, créalo manualmente.

---

## PASO 2: Ejecutar SQL en Supabase 📊

### 2.1. Abre Supabase Dashboard
Ve a: https://supabase.com/dashboard/project/jpqltnyuexzkzkdksifp

### 2.2. Abre SQL Editor
- Click en "SQL Editor" en el menú izquierdo
- Click en "+ New query"

### 2.3. Copia el SQL
Abre el archivo: **`SQL_FINAL_FUNCIONA.sql`** (está en la carpeta `TechOS/`)

### 2.4. Pega y Ejecuta
1. Copia TODO el contenido del archivo
2. Pégalo en el editor de SQL en Supabase
3. Click en **"Run"** (botón verde)
4. Espera a que termine (debería decir "Success")

### 2.5. Verifica
Deberías ver al final:
```
✅ 8 rows inserted
✅ Tabla "institutions" creada
✅ Policies aplicadas
```

---

## PASO 3: Iniciar el Servidor 🚀

### 3.1. Detén cualquier servidor anterior
Si ya tienes un servidor corriendo, deténlo con: **Ctrl + C**

### 3.2. Navega a la carpeta TechOS
```bash
cd TechOS
```

### 3.3. Inicia el servidor
```bash
npm run dev
```

### 3.4. Verifica
Deberías ver algo como:
```
VITE v5.4.19  ready in XXX ms
➜  Local:   http://localhost:8083/
```

---

## PASO 4: Abrir el Mapa 🗺️

### 4.1. Abre tu navegador
Ve a: `http://localhost:XXXX/map` (usa el puerto que te muestra la terminal)

Ejemplo: `http://localhost:8083/map`

### 4.2. Espera a que cargue
Deberías ver:
1. ⏳ Loading spinner (2-3 segundos)
2. 🗺️ Mapa de Caracas con 8 marcadores
3. 🔵 Marcadores azules (escuelas), morados (universidades), verdes (institutos)

### 4.3. Prompt de ubicación
Aparecerá un card preguntando: **"¿Permitir ubicación?"**

Opciones:
- **Ubicación precisa** → Usa tu GPS (más exacto)
- **Ubicación aproximada** → Usa tu IP (funciona siempre)
- **Cerrar** → Solo muestra el mapa

---

## PASO 5: Probar Funciones 🎮

### 5.1. Geolocalización
- Click en "Ubicación precisa" o "Ubicación aproximada"
- Deberías ver un marcador rojo "Tu ubicación"
- El mapa se centra en ti

### 5.2. Búsqueda
- Escribe "Central" en la barra de búsqueda
- Deberías ver sugerencias automáticas
- Click en una → el mapa se centra ahí

### 5.3. Filtros
- Abre el dropdown "Tipo de Institución"
- Selecciona "Universidades"
- Solo se muestran universidades (moradas)

### 5.4. Detalles
- Click en un marcador del mapa
- Aparece popup con nombre y botón "Cómo llegar"
- Click en "Cómo llegar" → abre Google Maps

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Problema 1: "No se encontraron instituciones"
**Causa**: No ejecutaste el SQL en Supabase  
**Solución**: Ve al PASO 2 y ejecuta `SQL_FINAL_FUNCIONA.sql`

### Problema 2: Mapa en blanco
**Causa**: Falta el archivo `.env`  
**Solución**: Ve al PASO 1 y crea el archivo `.env`

### Problema 3: Error en consola
**Causa**: Variables de entorno no cargadas  
**Solución**:
1. Detén el servidor (Ctrl + C)
2. Reinicia: `npm run dev`
3. Refresca el navegador (F5)

### Problema 4: No aparece mi ubicación
**Causa**: GPS denegado  
**Solución**: Usa "Ubicación aproximada (IP)" en el prompt

---

## ✅ RESULTADO ESPERADO

Deberías ver:

```
┌──────────────────────────────────────┐
│  TECH OS - Navegación               │
└──────────────────────────────────────┘

┌──────────────┬───────────────────────┐
│  Sidebar     │   Mapa Interactivo    │
│              │                       │
│ [Búsqueda]   │     🗺️ Caracas       │
│ [Filtros]    │                       │
│              │   🔴 Tu ubicación     │
│ Lista:       │   🔵 Escuela 1        │
│ - UCV        │   🟣 Universidad 1    │
│ - USB        │   🟢 Instituto 1      │
│ - UCAB       │                       │
│ ...          │                       │
└──────────────┴───────────────────────┘
```

---

## 🎉 ¡LISTO!

Ahora deberías tener:
- ✅ Mapa funcionando
- ✅ 8 instituciones de Caracas
- ✅ Geolocalización por GPS o IP
- ✅ Búsqueda en tiempo real
- ✅ Filtros funcionando
- ✅ Integración con Google Maps

---

## 📝 PRÓXIMOS PASOS (Opcional)

Si quieres agregar más instituciones:
1. Abre `UNIVERSIDADES_VENEZUELA.sql`
2. Copia el contenido
3. Pégalo en Supabase SQL Editor
4. Run
5. ¡Listo! Ahora tendrás 50+ universidades de toda Venezuela

---

**¿Necesitas ayuda?** Abre la consola del navegador (F12) y revisa los logs.


