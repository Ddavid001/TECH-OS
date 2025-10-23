# 🎓 TechOS - Demo del Colegio El Alba

## 🚀 Inicio Rápido (Windows)

### Opción 1: Script Automático
```bash
# Doble click en:
INICIO_DEMO.bat
```

### Opción 2: Manual
```bash
cd TechOS
npm install
npm run dev
```

Luego abre: **http://localhost:5173**

---

## 🎯 ¿Qué puedo probar?

### 🏫 **Demo Guiada - Colegio El Alba**
Explora el sistema con datos reales de una institución venezolana.

**Credenciales de acceso rápido**:
- **Director**: `director@elalba.edu.ve` / `demo123`
- **Profesora de Matemáticas**: `prof.laura@elalba.edu.ve` / `demo123`
- **Estudiante**: `maria.gonzalez@estudiante.elalba.edu.ve` / `demo123`

**Funcionalidades demo**:
- ✅ Dashboard personalizado por rol
- ✅ Asistencia con verificación GPS
- ✅ Calendario académico
- ✅ Repositorio de materiales
- ✅ Libro de calificaciones
- ✅ Vista de notas del estudiante

### 🔧 **Sandbox Interactivo**
Crea tu propia institución desde cero en 3 pasos.

**Proceso**:
1. **Paso 1**: Configura tu institución (nombre, tipo, ubicación GPS)
2. **Paso 2**: Agrega usuarios (docentes, estudiantes, admin)
3. **Paso 3**: Crea horarios visuales (opcional)

---

## 📍 **Asistencia con Geolocalización**

### ¿Cómo funciona?
1. El estudiante inicia sesión
2. Ve su clase actual en el dashboard
3. Click en **"Marcar Asistencia"**
4. El sistema solicita permiso de ubicación
5. Calcula la distancia al Colegio El Alba
6. ✅ **Dentro del radio (100m)**: Asistencia verificada
7. ❌ **Fuera del radio**: Ubicación no permitida

### **Ubicación del Colegio El Alba**
- 📍 **Dirección**: Av. Principal de Las Mercedes, Caracas
- 🌍 **Coordenadas**: 10.498, -66.829
- 📏 **Radio permitido**: 100 metros

### **Para Testing**
Si no estás en Caracas, puedes:
- Usar un GPS spoofer en tu navegador
- Modificar las coordenadas en el código
- El modo demo funciona visualmente sin backend

---

## 🎨 **Navegación del Sistema**

### **Página Principal** (`/`)
- Dos opciones de demo claramente diferenciadas
- Información detallada de cada opción
- Sección de características del sistema

### **Login Mejorado** (`/login`)
- Formulario tradicional de email/contraseña
- **Botones de auto-login** para demo:
  - `Entrar como Director` 
  - `Entrar como Docente`
  - `Entrar como Estudiante`
- Un click para acceder instantáneamente

### **Dashboard del Estudiante**
- Widget destacado de **Asistencia con GPS**
- Información de clase actual
- Botón de "Marcar Asistencia"
- Horario del día
- Lista completa de cursos

---

## 🛠️ **Tecnologías Utilizadas**

- ⚛️ **React 18** + TypeScript
- 🎨 **Shadcn UI** (componentes)
- 📍 **Geolocation API** (HTML5)
- 🔔 **Sonner + Toast** (notificaciones)
- 🗺️ **Haversine Formula** (cálculo GPS)
- 🎯 **React Router v6**
- 🏗️ **NestJS** (backend opcional)

---

## 📱 **Responsive Design**

El sistema funciona perfectamente en:
- 🖥️ Desktop (1920x1080+)
- 💻 Laptop (1366x768+)
- 📱 Tablet (768x1024+)
- 📱 Mobile (375x667+)

---

## 🔐 **Seguridad**

### **Geolocalización**
- Requiere permiso explícito del usuario
- Solo funciona en HTTPS o localhost
- No almacena coordenadas personales
- Verificación en tiempo real

### **Datos de Demo**
- Contraseñas simplificadas (`demo123`)
- No usar en producción
- Datos ficticios del Colegio El Alba

---

## 📚 **Documentación Completa**

Para información técnica detallada, ver:
- **`IMPLEMENTACION_COMPLETA_DEMO.md`**: Guía técnica completa
- **`CONFIGURACION_COMPLETA.md`**: Configuración del sistema
- **`IMPLEMENTACION_ACADEMICA.md`**: Sistema académico

---

## 🐛 **Troubleshooting**

### **El sistema no inicia**
```bash
# Limpia e instala de nuevo
rm -rf node_modules
npm install
npm run dev
```

### **"Geolocalización no disponible"**
- Usa HTTPS o localhost
- Permite permisos de ubicación en tu navegador
- Chrome: Settings → Privacy → Site Settings → Location

### **"Credenciales incorrectas"**
- Usa los botones de auto-login
- Verifica que estés usando los emails completos
- La contraseña es siempre: `demo123`

### **"Fuera del radio permitido"**
- Normal si no estás en Caracas
- El sistema funciona en modo visual
- Puedes cambiar las coordenadas para testing local

---

## 📞 **Soporte**

Para preguntas o problemas:
1. Revisa la documentación completa
2. Verifica los logs en la consola del navegador
3. Contacta al equipo de desarrollo

---

## 🎉 **Características Destacadas**

### ✨ **Lo Nuevo**
- 🆕 Página de selección de demos
- 🆕 Auto-login con un click
- 🆕 Asistencia con verificación GPS
- 🆕 Widget visual de clase actual
- 🆕 Sandbox interactivo en 3 pasos
- 🆕 Datos completos del Colegio El Alba

### 🔥 **Funcionalidades Core**
- ✅ Sistema multi-rol (Admin, Teacher, Student)
- ✅ Calendario académico unificado
- ✅ Repositorio de materiales (drag & drop)
- ✅ Libro de calificaciones
- ✅ Vista de notas para estudiantes
- ✅ Notificaciones en tiempo real
- ✅ Mapa de instituciones
- ✅ Sistema de ofertas laborales

---

## 🌟 **Próximos Pasos**

Después de explorar la demo:
1. Prueba el **Sandbox** para crear tu institución
2. Explora cada **rol** (Director, Docente, Estudiante)
3. Revisa el **código fuente** en los archivos *.tsx
4. Personaliza las **coordenadas GPS** para tu ubicación
5. Integra con tu **backend real**

---

**🎓 Sistema desarrollado para mejorar la educación en Venezuela**

© 2025 TechOS - Colegio El Alba Demo

