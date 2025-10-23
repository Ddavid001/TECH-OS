# ✅ Checklist de Inicio - TechOS Demo

## 📋 Verificación Pre-Inicio

Usa este checklist antes de iniciar la demostración para asegurar que todo funcione correctamente.

---

## 🔧 **1. Verificación del Sistema**

### **Node.js y npm**
```bash
node --version   # Debe ser v16+ 
npm --version    # Debe ser v8+
```

- [ ] Node.js instalado (v16 o superior)
- [ ] npm instalado (v8 o superior)
- [ ] Terminal funcionando correctamente

---

## 📂 **2. Estructura de Archivos**

### **Archivos Frontend Nuevos**
- [ ] `src/pages/DemoLandingPage.tsx` existe
- [ ] `src/pages/SandboxSetupStep1.tsx` existe
- [ ] `src/pages/SandboxSetupStep2.tsx` existe
- [ ] `src/pages/SandboxSetupStep3.tsx` existe
- [ ] `src/components/GeolocationAttendance.tsx` existe

### **Archivos de Datos**
- [ ] `src/data/colegioElAlbaDemo.ts` tiene datos completos
- [ ] Coordenadas GPS configuradas: `10.498, -66.829`
- [ ] Radio de asistencia configurado: `100m`

### **Archivos de Documentación**
- [ ] `README_DEMO.md` existe
- [ ] `RESUMEN_EJECUTIVO_DEMO.md` existe
- [ ] `IMPLEMENTACION_COMPLETA_DEMO.md` existe
- [ ] `INICIO_DEMO.bat` existe

### **Rutas Actualizadas**
- [ ] `src/App.tsx` tiene ruta `/` → `DemoLandingPage`
- [ ] `src/App.tsx` tiene rutas `/setup-sandbox/*`

---

## 🔑 **3. Credenciales Demo Configuradas**

### **En Login.tsx**
- [ ] Botón "Entrar como Director" visible
- [ ] Botón "Entrar como Docente" visible
- [ ] Botón "Entrar como Estudiante" visible

### **Credenciales Hardcodeadas**
- [ ] `director@elalba.edu.ve` / `demo123`
- [ ] `prof.laura@elalba.edu.ve` / `demo123`
- [ ] `maria.gonzalez@estudiante.elalba.edu.ve` / `demo123`

---

## 📍 **4. Geolocalización Configurada**

### **En GeolocationAttendance.tsx**
- [ ] Coordenadas del Colegio El Alba definidas
- [ ] Radio de 100m configurado
- [ ] Función `calculateDistance()` implementada
- [ ] Manejo de errores de geolocalización

### **Permisos del Navegador**
- [ ] Sabes cómo permitir geolocalización en tu navegador
- [ ] Navegador soporta Geolocation API (Chrome, Firefox, Edge, Safari)

---

## 🎨 **5. Componentes UI**

### **Shadcn UI Instalado**
- [ ] `Card` component disponible
- [ ] `Button` component disponible
- [ ] `Input` component disponible
- [ ] `Select` component disponible
- [ ] `Slider` component disponible
- [ ] `Toast` component disponible

### **Iconos**
- [ ] `lucide-react` instalado
- [ ] Iconos importados correctamente

---

## 🔔 **6. Notificaciones**

### **Toast + Sonner**
- [ ] `useToast` hook disponible
- [ ] `Sonner` importado en App.tsx
- [ ] `Toaster` componente renderizado

---

## 🗺️ **7. Backend (Opcional)**

### **Si vas a usar backend**
- [ ] PostgreSQL instalado y corriendo
- [ ] Variables de entorno configuradas (.env)
- [ ] Prisma schema actualizado
- [ ] `npm install` ejecutado en `/server`
- [ ] Endpoint `/attendance/checkin` disponible

### **Si NO vas a usar backend**
- [ ] El sistema funciona en modo visual/demo
- [ ] Las notificaciones se muestran correctamente
- [ ] No hay errores de red en consola (o los ignoras)

---

## 🚀 **8. Instalación de Dependencias**

### **Frontend**
```bash
cd TechOS
npm install
```

- [ ] Sin errores en la instalación
- [ ] `node_modules/` creado
- [ ] `package-lock.json` actualizado

### **Backend (Opcional)**
```bash
cd server
npm install
npx prisma generate
```

- [ ] Prisma client generado
- [ ] Sin errores de dependencias

---

## 🧪 **9. Tests Pre-Inicio**

### **Compilación**
```bash
npm run dev
```

- [ ] Proyecto compila sin errores
- [ ] Servidor de desarrollo inicia
- [ ] Puerto 5173 disponible
- [ ] URL accesible: `http://localhost:5173`

### **Navegación Básica**
- [ ] Página principal (`/`) carga correctamente
- [ ] Muestra DemoLandingPage
- [ ] Dos tarjetas visibles (Demo Guiada + Sandbox)
- [ ] Botones funcionan
- [ ] Sin errores en consola

---

## 🎯 **10. Verificación de Funcionalidades**

### **Auto-Login**
- [ ] Navegas a `/login`
- [ ] Ves sección de "Demo Guiada"
- [ ] 3 botones de auto-login visibles
- [ ] Click en botón llena formulario
- [ ] Login automático funciona

### **Geolocalización**
- [ ] Login como estudiante
- [ ] Dashboard carga correctamente
- [ ] Widget de asistencia visible
- [ ] Botón "Marcar Asistencia" presente
- [ ] Click solicita permiso de ubicación

### **Sandbox**
- [ ] Desde `/` click en "Sandbox"
- [ ] Redirige a `/setup-sandbox`
- [ ] Paso 1 muestra formulario
- [ ] Puede avanzar a Paso 2
- [ ] Puede avanzar a Paso 3

---

## 🐛 **11. Verificación de Errores Comunes**

### **Sin Errores de Linter**
```bash
npm run lint
# o verifica en el IDE
```

- [ ] 0 errores en `DemoLandingPage.tsx`
- [ ] 0 errores en `Login.tsx`
- [ ] 0 errores en `GeolocationAttendance.tsx`
- [ ] 0 errores en `SandboxSetupStep*.tsx`
- [ ] 0 errores en `StudentDashboard.tsx`

### **Sin Errores de Consola**
- [ ] Abre DevTools (F12)
- [ ] Tab "Console"
- [ ] Sin errores rojos críticos
- [ ] Warnings aceptables (si los hay)

### **Sin Errores de Red**
- [ ] Tab "Network" en DevTools
- [ ] Requests a `/attendance/checkin` (si usas backend)
- [ ] Status 200 OK o error esperado 400
- [ ] Sin errores 404 inesperados

---

## 📱 **12. Testing en Diferentes Dispositivos**

### **Desktop** (Recomendado para demo)
- [ ] Resolución 1920x1080 o superior
- [ ] Chrome, Firefox o Edge
- [ ] Geolocalización disponible
- [ ] UI se ve correctamente

### **Mobile** (Opcional)
- [ ] Navegador móvil
- [ ] GPS activo
- [ ] UI responsive
- [ ] Botones táctiles funcionan

---

## 📚 **13. Documentación Lista**

### **Para ti**
- [ ] Leíste `README_DEMO.md`
- [ ] Leíste `RESUMEN_EJECUTIVO_DEMO.md`
- [ ] Tienes `IMPLEMENTACION_COMPLETA_DEMO.md` a mano

### **Para presentación**
- [ ] Conoces las credenciales de demo
- [ ] Conoces las coordenadas GPS del Colegio El Alba
- [ ] Puedes explicar cómo funciona la geolocalización
- [ ] Conoces los 3 pasos del Sandbox

---

## 🎬 **14. Demo Script (Opcional)**

### **Preparación**
- [ ] Navegador en `http://localhost:5173`
- [ ] DevTools abierto (F12)
- [ ] Tab de Console visible
- [ ] Permiso de geolocalización pre-aprobado

### **Flujo de Demo** (5 minutos)
1. [ ] Mostrar DemoLandingPage
2. [ ] Explicar dos opciones
3. [ ] Click en "Demo Guiada"
4. [ ] Usar auto-login (Estudiante)
5. [ ] Mostrar dashboard
6. [ ] Click en "Marcar Asistencia"
7. [ ] Mostrar resultado GPS
8. [ ] Volver a inicio
9. [ ] Mostrar Sandbox (Paso 1)
10. [ ] Configurar institución ejemplo

---

## ✅ **Checklist Final**

### **Pre-Demo** (5 min antes)
- [ ] Servidor de desarrollo corriendo
- [ ] Navegador abierto en la URL correcta
- [ ] No hay errores en consola
- [ ] Internet conectado (para mapas/iconos)
- [ ] Batería suficiente (laptop)

### **Durante Demo**
- [ ] Habla con confianza
- [ ] Muestra las notificaciones
- [ ] Explica la verificación GPS
- [ ] Destaca el diseño moderno
- [ ] Menciona el modo Sandbox

### **Post-Demo**
- [ ] Responde preguntas
- [ ] Comparte documentación
- [ ] Ofrece tour personalizado
- [ ] Recopila feedback

---

## 🎯 **Criterios de Éxito**

Tu demo está lista si:

✅ Servidor inicia sin errores  
✅ Página principal se ve profesional  
✅ Auto-login funciona con 1 click  
✅ Geolocalización pide permisos  
✅ Notificaciones se muestran correctamente  
✅ Sandbox permite crear institución  
✅ Sin errores críticos en consola  
✅ UI es responsive  

---

## 🚨 **Si algo falla**

### **Problema**: No compila
**Solución**:
```bash
rm -rf node_modules
npm install
npm run dev
```

### **Problema**: Geolocalización no funciona
**Solución**:
- Usa Chrome o Firefox
- Permite permisos de ubicación
- Usa HTTPS o localhost
- Verifica que GPS esté activo

### **Problema**: Auto-login no funciona
**Solución**:
- Verifica que `DEMO_CREDENTIALS` está en `Login.tsx`
- Revisa consola de errores
- Modo demo funciona sin backend

### **Problema**: Botones no responden
**Solución**:
- Revisa errores en consola
- Verifica que Shadcn UI está instalado
- Refresca la página (F5)

---

## 📞 **Contactos de Emergencia**

### **Durante la Demo**
- Ten `README_DEMO.md` abierto
- Ten consola de DevTools visible
- Prepara respuestas a preguntas frecuentes

### **Documentación de Apoyo**
- `IMPLEMENTACION_COMPLETA_DEMO.md` → Detalles técnicos
- `RESUMEN_EJECUTIVO_DEMO.md` → Vista rápida
- `INDICE_DOCUMENTACION.md` → Navegación

---

## 🎉 **¡Todo Listo!**

Si completaste todos los checks, tu demo está **100% lista**.

**Comando final para iniciar**:
```bash
cd TechOS
npm run dev
```

**URL**:
```
http://localhost:5173
```

**Credencial recomendada para demo**:
```
Email: maria.gonzalez@estudiante.elalba.edu.ve
Password: demo123
```

---

**🎓 TechOS - Colegio El Alba Demo**  
**Checklist v1.0 - Octubre 2025**  
**¡Éxito en tu demostración! 🚀**

