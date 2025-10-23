# 🗺️ Guía Rápida - Mapa Visual Interactivo

## 🎯 Nueva Funcionalidad

¡Ahora el mapa se abre **dentro de la misma ventana** como #ofertas!

---

## 🚀 Cómo Probar

### **Opción 1: Desde el Dashboard del Director**

1. **Iniciar:**
   ```bash
   cd TechOS
   npm run dev
   ```

2. **Acceder:**
   - http://localhost:5173
   - Click "TechOS Demo"
   - Login como "Directora"

3. **Abrir mapa de instituciones:**
   - Busca "Mapa de Asistencia"
   - Click **"Ver Todas las Instituciones"**

4. **Ver mapa visual:**
   - En cualquier card, click **"Ver en Mapa"** 📍
   - ¡El mapa se abre en la misma ventana!

---

### **Opción 2: Desde el Modal de Detalles**

1. **Abrir detalles:**
   - En el grid, click **"Ver Detalles"** en cualquier card
   
2. **Ver mapa:**
   - En el modal de detalles, click **"Ver en Mapa Interactivo"**
   - El mapa se abre con esa institución pre-seleccionada

---

## 🎨 Qué Verás en el Mapa

### **Mapa Principal:**

```
┌──────────────────────────────────────────────────┐
│ 🗺️ Mapa Interactivo de Caracas                  │
│ Red educativa • Click en los marcadores          │
├──────────────────────────────────────────────────┤
│                                                  │
│        [Mapa con 8 instituciones]                │
│                                                  │
│   • Grid de fondo animado                        │
│   • Carreteras: Autopista Fajardo, etc.         │
│   • Ríos de Caracas                              │
│   • 8 marcadores interactivos:                   │
│     🏫 Colegio El Alba (pulsando)                │
│     🎓 Instituciones privadas                    │
│     🏛️ Instituciones públicas                    │
│                                                  │
│ [Leyenda: ● Tu Instituto ● Privados ● Públicos] │
└──────────────────────────────────────────────────┘
```

---

## 🎯 Interacciones

### **1. Hover sobre marcadores**

Al pasar el mouse:
- El marcador crece
- Aparece un anillo animado
- Sale un label con:
  ```
  ┌──────────────────────────┐
  │ Colegio Santiago de León │
  │ 👥 450 estudiantes       │
  └──────────────────────────┘
  ```

### **2. Click en un marcador**

Al hacer click:
- El marcador se selecciona
- Aparece un **panel lateral** a la derecha:

```
┌───────────────────────┐
│ 🏫 Colegio El Alba   │
│ 📍 Los Palos Grandes │
│        [X]           │
├───────────────────────┤
│  ┌─────┬──────┐      │
│  │ 250 │Privado│     │
│  │Est. │Sector │     │
│  └─────┴──────┘      │
│                      │
│ 📍 Coordenadas GPS   │
│ 10.4980°N           │
│ -66.8290°W          │
│                      │
│ 🏫 Esta es tu       │
│    institución      │
│                      │
│ [Abrir en Google]   │
└───────────────────────┘
```

### **3. Cerrar panel**

- Click en la **[X]** del panel
- O click fuera del panel
- El panel se desliza hacia la derecha y desaparece

---

## 🎨 Características Visuales

### **Marcadores:**

#### **Colegio El Alba (Tu institución):**
- 🏫 Emoji grande
- Color **azul** brillante
- **Pulso constante** (nunca se detiene)
- Tamaño: 20px
- Anillo de 45px pulsando

#### **Privadas:**
- 🎓 Emoji
- Color **morado**
- Tamaño: 12px → 16px (hover) → 18px (selected)
- Anillo solo al hover/select

#### **Públicas:**
- 🏛️ Emoji
- Color **verde**
- Tamaño: 12px → 16px (hover) → 18px (selected)
- Anillo solo al hover/select

---

## 📋 Flujo Completo de Prueba

### **Paso a Paso (5 minutos):**

1. **[ ]** Login como Directora
2. **[ ]** Click "Ver Todas las Instituciones"
3. **[ ]** Grid con 8 cards se abre
4. **[ ]** Click **"Ver en Mapa"** en cualquier card
5. **[ ]** Mapa visual se abre en modal
6. **[ ]** Observa el mapa con grid y carreteras
7. **[ ]** Haz **hover** sobre Colegio El Alba (azul)
8. **[ ]** Label aparece con nombre y estudiantes
9. **[ ]** Haz **click** en Colegio El Alba
10. **[ ]** Panel lateral aparece animado
11. **[ ]** Lee la información (250 estudiantes, etc.)
12. **[ ]** Observa el badge "Esta es tu institución"
13. **[ ]** Haz **hover** sobre Instituto Pedagógico (verde)
14. **[ ]** Haz **click** en Instituto Pedagógico
15. **[ ]** Panel se actualiza con nueva info
16. **[ ]** Click **"Abrir en Google Maps"** (se abre en nueva pestaña)
17. **[ ]** Regresa al mapa
18. **[ ]** Haz **click en [X]** del panel (se cierra)
19. **[ ]** Explora otros marcadores
20. **[ ]** Cierra el modal (ESC o click fuera)

---

## 🎯 Casos de Uso

### **Caso 1: Explorar instituciones cercanas**

**Objetivo:** Ver qué instituciones están en mi zona

1. Abro el mapa de instituciones
2. Click "Ver en Mapa" en cualquier institución
3. Veo el mapa completo con todas las instituciones
4. Observo que:
   - Colegio El Alba (mi institución) está en Los Palos Grandes
   - Colegio Emil Friedman también está en Los Palos Grandes
   - Son vecinos geográficos
5. Click en Emil Friedman para ver detalles
6. Veo que tiene 280 estudiantes
7. Si quiero ir físicamente, click "Abrir en Google Maps"

---

### **Caso 2: Comparar instituciones**

**Objetivo:** Ver datos de diferentes instituciones

1. Abro el grid de instituciones
2. Click "Ver Detalles" en "Liceo Andrés Bello"
3. Veo que es público con 650 estudiantes
4. Click "Ver en Mapa Interactivo"
5. En el mapa, hago click en "Colegio Santiago de León"
6. Panel se actualiza: 450 estudiantes, privado
7. Comparo: Andrés Bello (650) vs Santiago de León (450)
8. Puedo seguir explorando otros marcadores

---

### **Caso 3: Verificar ubicaciones exactas**

**Objetivo:** Obtener coordenadas GPS precisas

1. Abro el mapa visual
2. Click en "Instituto Pedagógico Caracas"
3. Panel muestra:
   - 📍 Coordenadas GPS
   - 10.5060°N, -66.9020°W
4. Copio mentalmente o hago screenshot
5. Uso las coordenadas para reportes o análisis

---

## 🎨 Detalles Visuales a Notar

### **1. Pulso del Colegio El Alba**

El marcador azul tiene **doble pulso**:
- Pulso grande (45px → 35px → 45px) cada 4 segundos
- Pulso mediano (35px → 25px → 35px) cada 3 segundos
- **Nunca se detiene** (diferenciador clave)

### **2. Anillo al Hover**

Cuando pasas el mouse sobre cualquier marcador:
- Aparece un **anillo de color**:
  - Morado para privadas
  - Verde para públicas
- El anillo **pulsa** (size + 6px → + 10px → + 6px)
- Transición suave de 300ms

### **3. Labels Emergentes**

Al hacer hover:
- Fondo **negro 90% opacidad**
- Borde del **color de la institución**
- Texto **blanco** en dos líneas:
  - Línea 1: Nombre (bold)
  - Línea 2: 👥 estudiantes
- Posición: **18px a la derecha** del marcador

### **4. Panel Lateral**

Cuando seleccionas una institución:
- Entra desde la **derecha** (slide-in)
- Duración: **300ms**
- Fondo **blanco** con border **primary/20**
- Header con **gradiente**
- Stats en **grid 2x1**
- Sección de coordenadas con fondo **muted**
- Si es tu institución: **badge azul** especial

---

## 🗺️ Carreteras y Ríos

### **Carreteras Visibles:**

1. **Autopista del Este** (diagonal superior)
2. **Autopista Francisco Fajardo** (horizontal central) ← Más gruesa
3. **Avenida Libertador** (diagonal)
4. **Conexiones Norte-Sur** (3 líneas verticales)

**Estilo:**
- Color: Azul claro (#3b82f6)
- Opacidad: 20%
- Algunas con `strokeDasharray` (línea punteada)

### **Ríos:**

1. **Río Guaire** (curva inferior)
2. **Afluente secundario** (curva media)

**Estilo:**
- Color: Cian (#06b6d4)
- Opacidad: 15%
- Línea punteada sutil

---

## 💡 Tips Pro

### **1. Pre-selección automática**

Si abres el mapa desde "Ver Detalles" de una institución:
- Esa institución **ya estará seleccionada**
- El panel lateral **ya estará visible**
- No necesitas buscarla en el mapa

### **2. Navegación rápida**

- **ESC** → Cierra el modal
- **Click fuera** → Cierra el modal
- **X en panel** → Cierra solo el panel
- **Click en marcador** → Cambia selección

### **3. Identificación rápida**

Para encontrar rápido una institución:
- **Azul con pulso** = Tu institución
- **Moradas** = Privadas (4 total)
- **Verdes** = Públicas (4 total)

### **4. Comparar poblaciones**

Los labels muestran estudiantes al hover:
- Hover sobre varios marcadores
- Compara números mentalmente
- El más grande: Instituto Pedagógico (720)
- El más pequeño: Colegio El Alba (250)

---

## 🎯 Qué Buscar (Checklist Visual)

- [ ] Grid de fondo con puntos
- [ ] Carreteras azules (6 líneas)
- [ ] Ríos cian (2 curvas)
- [ ] Colegio El Alba pulsando constantemente
- [ ] 3 instituciones moradas (privadas, además de El Alba)
- [ ] 4 instituciones verdes (públicas)
- [ ] Labels al hacer hover
- [ ] Anillos animados al hover
- [ ] Panel lateral al hacer click
- [ ] Botón "Abrir en Google Maps" funciona
- [ ] Leyenda en la parte inferior
- [ ] Texto "Caracas" arriba a la izquierda
- [ ] Texto "Venezuela" abajo a la derecha

---

## 🐛 Troubleshooting

### **Problema: El mapa no se abre**
**Solución:**
- Verifica que clickeaste "Ver en Mapa" (no "Ver Detalles")
- Refresca la página (F5)
- Asegúrate de que el servidor está corriendo

### **Problema: No veo los marcadores**
**Solución:**
- Espera 150ms (loading time)
- Verifica la consola por errores
- Refresca la página

### **Problema: El panel lateral no aparece**
**Solución:**
- Haz click **directamente en el marcador** (no cerca)
- Si el panel está abierto, ciérralo primero (X) y vuelve a intentar
- Prueba con otro marcador

### **Problema: Las animaciones están lentas**
**Solución:**
- Cierra otras pestañas del navegador
- Verifica que tu GPU está habilitada
- Prueba en Chrome o Edge (mejor performance)

---

## 📊 Datos Técnicos

| Elemento | Especificación |
|----------|----------------|
| **ViewBox SVG** | 800 × 600 |
| **Centro del mapa** | (400, 300) |
| **Escala** | 15000 |
| **Instituciones** | 8 |
| **Marcadores animados** | 8 |
| **FPS objetivo** | 60 |
| **Tiempo de carga** | < 150ms |

---

## 🎉 Disfruta el Mapa Visual

El mapa interactivo está diseñado para:

✅ **Permanecer en la app** (sin abrir pestañas)  
✅ **Visualización instantánea** (sin cargar Google Maps)  
✅ **Contexto geográfico completo** (ver todas las instituciones)  
✅ **Interacción fluida** (hover, click, panel lateral)  
✅ **Datos precisos** (coordenadas GPS reales)  
✅ **Animaciones profesionales** (pulsos, anillos, slides)  
✅ **Diseño consistente** (como #ofertas)  

**¡Explora el ecosistema educativo de Caracas con estilo!** 🚀

---

## 📖 Referencias

- **Documentación técnica:** `MAPA_VISUAL_INTERACTIVO.md`
- **Mapa de instituciones:** `MAPA_INTERACTIVO_PROFESIONAL.md`
- **Guía de instituciones:** `GUIA_MAPA_INTERACTIVO.md`

---

*¿Tienes preguntas? Consulta la documentación completa en los archivos .md*

