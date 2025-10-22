# 🗺️ MAPA INTERACTIVO CON API DE GEOLOCALIZACIÓN

## ✅ FUNCIONALIDADES IMPLEMENTADAS

### 1. **Geolocalización Automática por IP**
- ✅ Detecta automáticamente tu país y ciudad usando API gratuita (ip-api.com)
- ✅ Centra el mapa en tu ubicación aproximada
- ✅ Muestra tu ciudad y país en el toast notification
- ✅ No requiere permisos del navegador

### 2. **Geolocalización Precisa (GPS)**
- ✅ Solicita permiso para usar GPS del dispositivo
- ✅ Obtiene coordenadas precisas (latitud/longitud)
- ✅ Centra el mapa en tu ubicación exacta
- ✅ Muestra marcador rojo "Tu ubicación"

### 3. **Fallback Inteligente**
- ✅ Si el GPS no está disponible → usa API de IP
- ✅ Si se niega el permiso → usa API de IP
- ✅ Si hay timeout → usa API de IP
- ✅ Siempre funciona, sin importar las restricciones

### 4. **Prompt de Ubicación Mejorado**
- ✅ 3 opciones para el usuario:
  - **Ubicación precisa** (GPS)
  - **Ubicación aproximada** (API de IP)
  - **Cerrar** (usar vista por defecto)
- ✅ Se superpone al mapa (z-index 1000)
- ✅ Animación de entrada suave
- ✅ Diseño moderno con iconos animados

### 5. **Mapa con Leaflet**
- ✅ Mapa completamente integrado en la página
- ✅ Marcadores personalizados por tipo:
  - 🔵 Escuelas (azul)
  - 🟣 Universidades (morado)
  - 🟢 Institutos (verde)
- ✅ Marcador de usuario (rojo)
- ✅ Zoom y scroll funcionando
- ✅ Popups interactivos

### 6. **Sistema de Búsqueda y Filtros**
- ✅ Búsqueda en tiempo real
- ✅ Autocompletado con sugerencias
- ✅ Filtros por tipo de institución
- ✅ Contador de resultados
- ✅ Botón "Limpiar filtros"

### 7. **Lista de Instituciones**
- ✅ Sidebar con scroll independiente
- ✅ Cards clickeables
- ✅ Highlight de institución seleccionada
- ✅ Botón "Cómo llegar" en cada card
- ✅ Badges de tipo con iconos

### 8. **Integración con Google Maps**
- ✅ Botón "Cómo llegar" abre Google Maps
- ✅ Incluye origen (tu ubicación) si está disponible
- ✅ Abre en nueva pestaña

---

## 🚀 CÓMO USAR

### 1. **Primera Carga**
1. La página se abre
2. Aparece prompt: "¿Permitir ubicación?"
3. Elige una opción:
   - **Ubicación precisa** → GPS
   - **Ubicación aproximada** → IP
   - **Cerrar** → mapa por defecto

### 2. **Buscar Instituciones**
1. Escribe en la barra de búsqueda
2. Aparecen sugerencias automáticas
3. Click en una sugerencia
4. El mapa se centra en esa institución

### 3. **Filtrar por Tipo**
1. Abre el dropdown "Tipo de Institución"
2. Selecciona: Todas, Escuelas, Universidades o Institutos
3. La lista y el mapa se actualizan en tiempo real

### 4. **Ver Detalles**
1. Click en un marcador del mapa
2. O click en una card de la lista
3. Aparece modal en la parte inferior con detalles
4. Botón "Cómo llegar" → abre Google Maps

### 5. **Obtener Direcciones**
1. Selecciona una institución
2. Click en "Cómo llegar"
3. Se abre Google Maps con:
   - Origen: Tu ubicación (si está disponible)
   - Destino: La institución

---

## 📋 API UTILIZADA

### IP Geolocation API (ip-api.com)
- **Endpoint**: `http://ip-api.com/json/`
- **Gratis**: ✅ Sin límite razonable
- **Datos**: País, ciudad, latitud, longitud
- **Precisión**: Ciudad (aprox. 10-50km)

**Ejemplo de respuesta:**
```json
{
  "status": "success",
  "country": "Venezuela",
  "countryCode": "VE",
  "city": "Caracas",
  "lat": 10.4806,
  "lon": -66.9036
}
```

---

## 🔧 CONFIGURACIÓN NECESARIA

### 1. **Archivo .env**
Asegúrate de tener el archivo `.env` en `TechOS/` con:
```env
VITE_SUPABASE_URL=https://jpqltnyuexzkzkdksifp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwcWx0bnl1ZXh6a3prZGtzaWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NzE1NjEsImV4cCI6MjA3NjU0NzU2MX0.C4Dn2fiYGypNTT_Y13fPbIT7nUP_zwOwpQ30LS1UcCM
```

### 2. **SQL en Supabase**
Ejecuta el archivo `SQL_FINAL_FUNCIONA.sql` en Supabase SQL Editor

### 3. **Iniciar el Servidor**
```bash
cd TechOS
npm run dev
```

### 4. **Abrir el Mapa**
Navega a: `http://localhost:XXXX/map`

---

## 🎨 CARACTERÍSTICAS VISUALES

- ✅ Diseño responsivo (mobile y desktop)
- ✅ Dark mode compatible
- ✅ Animaciones suaves
- ✅ Loading states
- ✅ Toast notifications
- ✅ Iconos personalizados
- ✅ Colores por tipo de institución
- ✅ Shadows y glassmorphism

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Problema: "No se encontraron instituciones"
**Solución**: Ejecuta `SQL_FINAL_FUNCIONA.sql` en Supabase

### Problema: No aparece mi ubicación
**Solución**: 
1. Permite GPS en el navegador
2. O usa "Ubicación aproximada (IP)"

### Problema: El mapa se ve en blanco
**Solución**:
1. Revisa la consola (F12)
2. Verifica que el `.env` existe
3. Reinicia el servidor

---

## 📊 RESUMEN TÉCNICO

| Característica | Tecnología |
|---|---|
| Mapa | Leaflet + React-Leaflet |
| Geolocalización GPS | Navigator.geolocation API |
| Geolocalización IP | ip-api.com |
| Backend | Supabase |
| UI Components | shadcn/ui |
| Iconos | Lucide React |
| Animaciones | Tailwind CSS |

---

🎉 **¡Todo listo! El mapa ahora funciona con geolocalización automática por API.**


