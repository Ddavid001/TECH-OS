# 🗺️ Guía Rápida - Mapa Interactivo de Instituciones

## 🚀 Cómo Probar el Mapa

### **Opción 1: Desde el Dashboard del Director**

1. **Iniciar la aplicación:**
   ```bash
   cd TechOS
   npm run dev
   ```

2. **Acceder a la demo:**
   - Abre http://localhost:5173
   - Click en "TechOS Demo" (botón inferior derecho)
   - Click en "Colegio El Alba"

3. **Login como Directora:**
   - Click en "Entrar como Directora"
   - Espera a que cargue el dashboard

4. **Abrir el mapa:**
   - Busca el panel "Mapa de Asistencia en Tiempo Real"
   - Click en el botón **"Ver Todas las Instituciones"**
   - ¡El modal se abrirá con las 8 instituciones!

---

### **Opción 2: Desde la Página de Registro**

1. **Ir a la página de registro:**
   - Abre http://localhost:5173/register
   
2. **Scroll hasta el final:**
   - Baja hasta la sección "Instituciones Educativas en Caracas"
   
3. **Abrir el mapa:**
   - Click en **"Ver Mapa de Instituciones"**
   - ¡El modal se abrirá!

---

## 🎯 Qué Explorar en el Mapa

### **Vista Principal (Grid de 8 Cards)**

#### **1. Observa los colores:**
- 🔵 **Borde azul + fondo azul claro** = Colegio El Alba (tu institución)
- 🟣 **Borde morado** = Instituciones privadas
- 🟢 **Borde verde** = Instituciones públicas

#### **2. Haz hover sobre las cards:**
- La card se eleva con un shadow elegante
- Transición suave de 300ms

#### **3. Información en cada card:**
- Nombre de la institución
- Distrito (con ícono 🏢)
- Badge "Principal" para tu institución
- Número de estudiantes
- Tipo (Privado/Público)
- 2 botones: "Ver Detalles" y "Ver en Mapa"

---

### **Modal de Detalles (Click en cualquier card)**

#### **1. Header:**
```
🏫 Nombre de la Institución
📍 Distrito, Caracas
```

#### **2. Stats Grid (3 métricas):**
```
┌──────────────┬──────────────┬──────────────┐
│     250      │   Privado    │    Activo    │
│ Estudiantes  │    Sector    │    Estado    │
└──────────────┴──────────────┴──────────────┘
```

#### **3. Ubicación:**
- **Distrito:** Los Palos Grandes
- **Coordenadas:** 10.4980°N, -66.8290°W
- **Distancia desde tu instituto:** 2.5 km (si no es tu institución)

#### **4. Información adicional:**
- Características de la institución
- Highlight especial si es tu institución principal

#### **5. Botones de acción:**
- **Abrir en Google Maps** 🗺️
  - Abre las coordenadas exactas en Google Maps
  - Se abre en una nueva pestaña
  
- **Copiar Info** 📋
  - Copia toda la información al portapapeles
  - Muestra un toast de confirmación

---

## 📋 Las 8 Instituciones que Verás

### **Privadas (4)** 🎓

1. **Colegio El Alba** 🏫
   - Los Palos Grandes
   - 250 estudiantes
   - **Tu institución principal**

2. **U.E. San Francisco**
   - Altamira
   - 320 estudiantes

3. **Colegio Santiago de León**
   - Las Mercedes
   - 450 estudiantes

4. **Colegio Emil Friedman**
   - Los Palos Grandes
   - 280 estudiantes

5. **U.E. La Salle**
   - La Florida
   - 520 estudiantes

### **Públicas (4)** 🏛️

6. **Instituto El Ávila**
   - Chacao
   - 580 estudiantes

7. **Liceo Andrés Bello**
   - Sabana Grande
   - 650 estudiantes

8. **Instituto Pedagógico Caracas**
   - El Paraíso
   - 720 estudiantes

**Total: 3,770 estudiantes en el ecosistema**

---

## 🎨 Características a Observar

### **1. Loading State** ⏳
- Cuando abres el modal por primera vez
- 8 skeletons con animación shimmer
- Duración: 150ms

### **2. Grid Responsive** 📱
- **Mobile:** 1 columna
- **Tablet:** 2 columnas
- **Desktop:** 3 columnas
- **Large:** 4 columnas

Prueba redimensionando la ventana!

### **3. Leyenda** 📊
Al final del modal:
```
[─] Tu Instituto  [─] Privados (4)  [─] Públicos (4)
                                📍 Caracas, Venezuela
```

### **4. Animaciones Suaves** ✨
- Cards: hover shadow
- Modal: fade-in
- Detail modal: slide-in desde la derecha

---

## 🔍 Casos de Uso

### **Como Director:**

1. **Ver contexto geográfico:**
   - Abro el mapa
   - Veo las 8 instituciones
   - Identifico cuáles están en mi zona

2. **Comparar datos:**
   - Mi institución: 250 estudiantes
   - Instituto Pedagógico: 720 estudiantes
   - Puedo hacer benchmarking

3. **Obtener coordenadas:**
   - Click en "Ver Detalles"
   - Copio las coordenadas
   - Las uso para reportes o análisis

4. **Ir a Google Maps:**
   - Click en "Abrir en Google Maps"
   - Veo la ubicación exacta
   - Planeo rutas o visitas

### **Como Nuevo Usuario (Registro):**

1. **Conocer el ecosistema:**
   - Estoy en la página de registro
   - Bajo hasta la sección de instituciones
   - Click en "Ver Mapa de Instituciones"

2. **Explorar opciones:**
   - Veo 8 instituciones
   - 4 privadas, 4 públicas
   - Total de 3,770 estudiantes

3. **Generar confianza:**
   - Veo que hay instituciones reales
   - Coordenadas verificables
   - La plataforma es seria y profesional

---

## 💡 Tips y Trucos

### **1. Identificar tu institución rápidamente:**
- Busca el **borde azul**
- Busca el **fondo azul claro**
- Busca el badge **"Principal"**

### **2. Ver instituciones por tipo:**
- **Moradas** → Privadas (como la tuya)
- **Verdes** → Públicas

### **3. Calcular distancias:**
- Abre cualquier institución que NO sea la tuya
- En "Ubicación" verás: "Distancia desde tu instituto: X km"
- Se calcula con la fórmula Haversine (precisa)

### **4. Compartir información:**
- Click en "Copiar Info"
- Pega en WhatsApp, email, etc.
- Formato ya formateado:
  ```
  Colegio El Alba
  Los Palos Grandes, Caracas
  250 estudiantes
  Coordenadas: 10.498, -66.829
  ```

---

## 🎯 Prueba Completa (5 minutos)

### **Paso 1: Abrir el mapa**
- [ ] Login como Directora
- [ ] Click en "Ver Todas las Instituciones"
- [ ] El modal se abre con 8 cards

### **Paso 2: Explorar el grid**
- [ ] Observa los colores de los bordes
- [ ] Haz hover sobre varias cards
- [ ] Lee la información de cada una

### **Paso 3: Ver detalles**
- [ ] Click en "Colegio El Alba"
- [ ] Observa el stats grid
- [ ] Lee la información de ubicación

### **Paso 4: Google Maps**
- [ ] Click en "Abrir en Google Maps"
- [ ] Se abre en nueva pestaña
- [ ] Verifica las coordenadas

### **Paso 5: Copiar info**
- [ ] Click en "Copiar Info"
- [ ] Toast de confirmación aparece
- [ ] Pega en un editor de texto
- [ ] Verifica el formato

### **Paso 6: Explorar otras instituciones**
- [ ] Cierra el modal de detalles
- [ ] Click en "Instituto Pedagógico"
- [ ] Observa la distancia calculada
- [ ] Click en "Ver en Mapa"

### **Paso 7: Responsive**
- [ ] Redimensiona la ventana
- [ ] Observa cómo cambia el grid:
  - Mobile: 1 col
  - Tablet: 2 cols
  - Desktop: 3 cols
  - Large: 4 cols

### **Paso 8: Página de registro**
- [ ] Ve a http://localhost:5173/register
- [ ] Scroll hasta la sección de instituciones
- [ ] Click en "Ver Mapa de Instituciones"
- [ ] Mismo modal, misma funcionalidad

---

## 🐛 Troubleshooting

### **Problema: El modal no se abre**
**Solución:**
1. Verifica que estás en AdminDashboard o Register
2. Refresca la página (F5)
3. Asegúrate de que el servidor está corriendo

### **Problema: Las cards están vacías**
**Solución:**
1. Espera 150ms (loading state)
2. Verifica la consola por errores
3. Refresca la página

### **Problema: Google Maps no se abre**
**Solución:**
1. Verifica que tu navegador permite pop-ups
2. Revisa la configuración de bloqueador de anuncios
3. Intenta en una pestaña de incógnito

### **Problema: No se copia la información**
**Solución:**
1. Asegúrate de tener permisos de clipboard
2. Intenta en HTTPS (no HTTP)
3. Usa un navegador moderno (Chrome, Firefox, Edge)

---

## 📊 Estadísticas Rápidas

| Métrica | Valor |
|---------|-------|
| **Instituciones** | 8 |
| **Privadas** | 4 |
| **Públicas** | 4 |
| **Estudiantes** | 3,770 |
| **Distritos** | 7 |
| **Tiempo de carga** | 150ms |

---

## ✅ Checklist de Prueba

- [ ] Modal se abre correctamente
- [ ] Loading skeletons se muestran
- [ ] 8 cards aparecen
- [ ] Colores de borde son correctos
- [ ] Hover effects funcionan
- [ ] Click en card abre detalles
- [ ] Stats grid se muestra
- [ ] Distancia se calcula (para no-principal)
- [ ] Google Maps se abre
- [ ] Clipboard funciona
- [ ] Toast de confirmación aparece
- [ ] Responsive funciona (1-4 cols)
- [ ] Leyenda se muestra correctamente
- [ ] Desde Register también funciona

---

## 🎉 ¡Disfruta el Mapa!

El mapa interactivo está diseñado con el mismo estándar de calidad que el modal de ofertas laborales (#ofertas), garantizando una experiencia de usuario consistente y profesional en toda la plataforma.

**Características destacadas:**
- ✅ Diseño idéntico a #ofertas
- ✅ 8 instituciones reales de Caracas
- ✅ Coordenadas GPS verificables
- ✅ Integración con Google Maps
- ✅ Cálculo de distancias preciso
- ✅ 100% responsive
- ✅ Animaciones fluidas

**¡Explora, compara y conoce el ecosistema educativo de Caracas!** 🚀

---

*¿Necesitas más información? Consulta MAPA_INTERACTIVO_PROFESIONAL.md*

