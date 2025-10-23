# ⚡ Referencia Rápida - TechOS Demo

## 🚀 Comandos de Inicio

### **Windows**
```bash
# Opción 1: Script automático
INICIO_DEMO.bat

# Opción 2: Manual
cd TechOS
npm install
npm run dev
```

### **Mac/Linux**
```bash
cd TechOS
npm install
npm run dev
```

### **URL del Sistema**
```
http://localhost:5173
```

---

## 🔑 Credenciales Demo - Copiar y Pegar

### **Director**
```
Email: director@elalba.edu.ve
Password: demo123
```

### **Profesora de Matemáticas**
```
Email: prof.laura@elalba.edu.ve
Password: demo123
```

### **Estudiante - María González**
```
Email: maria.gonzalez@estudiante.elalba.edu.ve
Password: demo123
```

---

## 📍 Coordenadas GPS - Colegio El Alba

### **Para Copiar en Código**
```typescript
const COLEGIO_EL_ALBA = {
  latitude: 10.498,
  longitude: -66.829,
  attendanceRadiusMeters: 100,
  name: 'Colegio El Alba',
  address: 'Av. Principal de Las Mercedes, Caracas, Venezuela'
};
```

### **Para Google Maps**
```
10.498, -66.829
```

### **Link de Google Maps**
```
https://www.google.com/maps?q=10.498,-66.829
```

---

## 🗺️ Rutas del Sistema

### **Rutas Principales**
```
/                    → DemoLandingPage (Inicio)
/login               → Login con auto-login
/setup-sandbox       → Sandbox Paso 1
/setup-sandbox/step2 → Sandbox Paso 2
/setup-sandbox/step3 → Sandbox Paso 3
```

### **Dashboards (Requieren Login)**
```
/admin/dashboard           → Admin Dashboard
/teacher/dashboard         → Teacher Dashboard
/student/dashboard         → Student Dashboard
/representative/dashboard  → Representative Dashboard
```

### **Funcionalidades Académicas**
```
/calendar   → Calendario Unificado
/materials  → Repositorio de Materiales
/gradebook  → Libro de Calificaciones
/grades     → Vista de Notas (Estudiante)
```

### **Otros**
```
/map           → Mapa de Instituciones
/ofertas       → Ofertas Laborales
/attendance    → Sistema de Asistencia
```

---

## 📂 Archivos Importantes

### **Frontend - Páginas Nuevas**
```
src/pages/DemoLandingPage.tsx
src/pages/SandboxSetupStep1.tsx
src/pages/SandboxSetupStep2.tsx
src/pages/SandboxSetupStep3.tsx
src/pages/Login.tsx (modificado)
src/pages/StudentDashboard.tsx (modificado)
```

### **Frontend - Componentes**
```
src/components/GeolocationAttendance.tsx
src/components/AcademicDemoButton.tsx
src/components/NotificationBell.tsx
```

### **Datos**
```
src/data/colegioElAlbaDemo.ts
```

### **Backend**
```
server/src/modules/attendance/attendance.controller.ts
server/src/modules/attendance/attendance.service.ts
```

---

## 🎨 Componentes UI Usados

### **Shadcn UI**
```typescript
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
```

### **Iconos (Lucide React)**
```typescript
import {
  School, MapPin, Users, Calendar, Clock, 
  GraduationCap, CheckCircle, XCircle, Loader2,
  ArrowRight, ArrowLeft, Plus, Trash2, Wrench
} from 'lucide-react';
```

---

## 🔔 Sistema de Notificaciones

### **Toast (Shadcn)**
```typescript
import { useToast } from '@/hooks/use-toast';

const { toast } = useToast();

toast({
  title: 'Título',
  description: 'Descripción',
  variant: 'default' | 'destructive'
});
```

### **Sonner**
```typescript
import { toast as sonnerToast } from 'sonner';

sonnerToast.success('Mensaje de éxito');
sonnerToast.error('Mensaje de error');
sonnerToast.warning('Advertencia');
```

---

## 📍 Código de Geolocalización

### **Obtener Ubicación**
```typescript
navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log('Ubicación:', lat, lon);
  },
  (error) => {
    console.error('Error:', error);
  },
  {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  }
);
```

### **Fórmula de Haversine**
```typescript
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Radio de la Tierra en metros
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distancia en metros
}
```

### **Verificar Radio**
```typescript
const distance = calculateDistance(
  userLat, userLon,
  institutionLat, institutionLon
);

const isWithinRadius = distance <= allowedRadius;

if (isWithinRadius) {
  console.log('✅ Dentro del radio');
} else {
  console.log('❌ Fuera del radio');
}
```

---

## 🗄️ Variables de Entorno

### **Frontend (.env)**
```bash
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_key
VITE_API_URL=http://localhost:4000
```

### **Backend (.env)**
```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/techos
PORT=4000
```

---

## 🔧 Scripts npm

### **Frontend**
```bash
npm run dev          # Iniciar desarrollo
npm run build        # Compilar para producción
npm run preview      # Vista previa de build
npm run lint         # Verificar errores
```

### **Backend**
```bash
npm run start:dev    # Iniciar desarrollo
npm run build        # Compilar
npm run start:prod   # Producción
npx prisma generate  # Generar cliente Prisma
npx prisma migrate   # Ejecutar migraciones
```

---

## 🐛 Troubleshooting Rápido

### **Puerto 5173 ocupado**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

### **Limpiar caché**
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### **Reiniciar todo**
```bash
# Detener servidor (Ctrl+C)
npm run dev
# Abrir en incógnito
```

---

## 📊 Estructura de Datos Demo

### **Usuario Estudiante**
```typescript
{
  id: 'student-001',
  email: 'maria.gonzalez@estudiante.elalba.edu.ve',
  firstName: 'María',
  lastName: 'González',
  role: 'student',
  grade: '4to Grado',
  institutionId: 'colegio-el-alba-demo'
}
```

### **Horario de Clase**
```typescript
{
  id: 'schedule-001',
  courseId: 'course-1',
  teacherId: 'teacher-001',
  dayOfWeek: 1, // Lunes
  startTime: '08:00',
  endTime: '09:30'
}
```

### **Registro de Asistencia**
```typescript
{
  institutionId: 'colegio-el-alba-demo',
  userId: 'student-001',
  courseId: 'course-1',
  latitude: 10.498,
  longitude: -66.829,
  status: 'presente' | 'ausente'
}
```

---

## 🎯 Flujos de Testing

### **Test 1: Auto-Login (30 seg)**
```
1. Navegar a http://localhost:5173/login
2. Click en "Entrar como Estudiante"
3. Verificar redirección a /student/dashboard
4. ✅ Success
```

### **Test 2: Geolocalización (1 min)**
```
1. Login como estudiante
2. Ver widget de asistencia
3. Click "Marcar Asistencia"
4. Permitir ubicación
5. Ver notificación con distancia
6. ✅ Success
```

### **Test 3: Sandbox (3 min)**
```
1. Navegar a http://localhost:5173
2. Click "Sandbox Interactivo"
3. Completar Paso 1 (institución)
4. Click "Continuar"
5. Completar Paso 2 (usuarios)
6. Click "Continuar"
7. Completar Paso 3 (horarios)
8. Click "Finalizar"
9. ✅ Success
```

---

## 📱 DevTools

### **Abrir Consola**
```
Windows/Linux: F12
Mac: Cmd+Option+I
```

### **Simular GPS**
```
1. F12 → Tab "Sensors"
2. Geolocation → Custom
3. Lat: 10.498
4. Lon: -66.829
5. Override
```

### **Responsive Mode**
```
Windows/Linux: Ctrl+Shift+M
Mac: Cmd+Shift+M
```

---

## 🔗 Enlaces Útiles

### **Google Maps del Colegio**
```
https://www.google.com/maps?q=10.498,-66.829
```

### **localhost**
```
Frontend: http://localhost:5173
Backend: http://localhost:4000
API Docs: http://localhost:4000/api
```

### **Documentación**
```
README_DEMO.md
RESUMEN_EJECUTIVO_DEMO.md
IMPLEMENTACION_COMPLETA_DEMO.md
CHECKLIST_INICIO.md
```

---

## 💡 Tips Rápidos

### **Para Demo en Vivo**
- ✅ Usa modo incógnito (Ctrl+Shift+N)
- ✅ Cierra tabs innecesarias
- ✅ Usa resolución 1920x1080
- ✅ Ten DevTools abierto
- ✅ Pre-aprueba permisos de ubicación

### **Para Desarrollo**
- ✅ Usa VS Code con Prettier
- ✅ Activa auto-save
- ✅ Instala extensiones de React/TypeScript
- ✅ Usa terminal integrada
- ✅ Revisa errores de linter

### **Para Debugging**
- ✅ Console.log generoso
- ✅ React DevTools instalado
- ✅ Network tab para APIs
- ✅ Sources para breakpoints
- ✅ Performance tab si es lento

---

## ⚡ Atajos de Teclado

### **Navegador**
```
F5          → Recargar
Ctrl+F5     → Recargar sin caché
F12         → DevTools
Ctrl+Shift+I → DevTools
Ctrl+Shift+N → Modo incógnito
```

### **VS Code**
```
Ctrl+P      → Buscar archivo
Ctrl+Shift+P → Command palette
Ctrl+`      → Terminal
Ctrl+B      → Toggle sidebar
Ctrl+S      → Guardar
```

---

## 📞 Contactos

### **Documentación**
- `README_DEMO.md` → Inicio rápido
- `IMPLEMENTACION_COMPLETA_DEMO.md` → Detalles técnicos
- `INDICE_DOCUMENTACION.md` → Navegación completa

### **Código**
- `src/` → Frontend React
- `server/src/` → Backend NestJS
- `TechOS/` → Raíz del proyecto

---

**⚡ TechOS - Referencia Rápida**  
**Todo lo que necesitas en un lugar**  
**Octubre 2025**

