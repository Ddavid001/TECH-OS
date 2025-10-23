# ✅ Configuración Completa del Sistema Académico

## 📦 Estado Actual

### ✅ **COMPLETADO**

#### 1. Variables de Entorno Configuradas

**Frontend** (`.env.local`):
```env
VITE_API_URL=http://localhost:4000
```

**Backend** (`server/.env`):
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/techos
PORT=4000
```

#### 2. Dependencias Instaladas

✅ **Frontend**:
- `socket.io-client` v4.7.5
- Todas las dependencias base

✅ **Backend**:
- `@nestjs/schedule` v4.0.0
- Todas las dependencias NestJS

✅ **Prisma**:
- Cliente generado correctamente

#### 3. Botón de Demo Creado

Se ha creado un **botón de acceso rápido** a las demos del sistema académico:

**Componente**: `src/components/AcademicDemoButton.tsx`

**Características**:
- 🎨 Diseño moderno con gradiente
- 🚀 Modal con 4 tarjetas interactivas
- 📍 Navegación directa a cada demo
- 📝 Lista de características implementadas

**Ubicaciones del Botón**:
- ✅ Landing Page (Hero section)
- ✅ Teacher Dashboard
- ✅ Admin Dashboard
- ✅ Student Dashboard

---

## 🚀 Cómo Iniciar el Sistema

### Opción 1: Iniciar Manualmente

**Terminal 1 - Backend:**
```bash
cd TechOS/server
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd TechOS
npm run dev
```

### Opción 2: Si tienes Base de Datos PostgreSQL

Si tienes PostgreSQL instalado y configurado:

1. **Actualizar credenciales** en `server/.env`:
```env
DATABASE_URL=postgresql://TU_USUARIO:TU_CONTRASEÑA@localhost:5432/techos
```

2. **Crear base de datos**:
```sql
CREATE DATABASE techos;
```

3. **Ejecutar migraciones**:
```bash
cd server
npm run prisma:migrate
```

4. **Iniciar servicios** (ver Opción 1)

---

## 🎯 Acceso a las Demos

Una vez que ambos servicios estén corriendo:

### Desde Cualquier Página

1. Busca el botón **"🎓 Sistema Académico Demo"**
2. Click en el botón
3. Se abrirá un modal con 4 opciones:

#### 📅 **Calendario Unificado**
- Ruta: `/calendar`
- Visualiza eventos académicos
- Crea exámenes, talleres, entregas
- Navegación por meses

#### 📁 **Repositorio de Materiales**
- Ruta: `/materials`
- Drag & drop de archivos
- Descarga de materiales
- Organizado por curso

#### 📊 **Libro de Calificaciones** (Docentes)
- Ruta: `/gradebook`
- Crea evaluaciones con peso
- Ingresa notas por estudiante
- Calcula promedios automáticamente

#### 🎓 **Mis Notas** (Estudiantes)
- Ruta: `/grades`
- Dashboard de calificaciones
- Promedio por curso
- Indicadores visuales

---

## 🔔 Notificaciones en Tiempo Real

El sistema incluye notificaciones automáticas vía Socket.IO:

### Eventos Automáticos

1. **Recordatorio de Clase** (cada 5 min)
   - 15 minutos antes de cada clase
   - Notificación en navegador
   - Toast en la aplicación

2. **Recordatorio de Entrega** (cada hora)
   - 24 horas antes de vencimiento
   - Solo para tareas/entregas

3. **Resumen Diario** (8 AM)
   - Lista de eventos del día
   - Enviado a toda la institución

### Activar Notificaciones del Navegador

Al iniciar la aplicación por primera vez:
1. El navegador solicitará permiso
2. Click en **"Permitir"**
3. Las notificaciones se mostrarán automáticamente

---

## 📊 Endpoints API Disponibles

### Base URL
```
http://localhost:4000
```

### Calendario
```
POST   /academic/calendar
GET    /academic/calendar?institutionId=X&courseId=Y
```

### Materiales
```
POST   /academic/materials
GET    /academic/materials?courseId=X
DELETE /academic/materials/:id
```

### Evaluaciones
```
POST   /academic/evaluations
GET    /academic/evaluations?courseId=X
```

### Calificaciones
```
POST   /academic/grades
GET    /academic/grades/student/:studentId
GET    /academic/gradebook/:courseId
```

---

## 🎨 Diseño del Botón

El botón de demo tiene:
- **Gradiente**: Azul a púrpura
- **Icono**: 🎓 Emoji de graduación
- **Texto**: "Sistema Académico Demo"
- **Efecto**: Sombra y hover animado

Al hacer click:
- Se abre un modal elegante
- 4 tarjetas con colores distintivos
- Click en cualquier tarjeta navega a esa demo
- Lista de características implementadas

---

## 🧪 Probar el Sistema (Sin Base de Datos)

Aunque no tengas base de datos configurada, puedes:

1. ✅ Ver la UI de todas las páginas
2. ✅ Probar drag & drop de materiales
3. ✅ Navegar el calendario
4. ✅ Ver el layout del gradebook
5. ⚠️ Los datos no se guardarán (esperado)

### Modo Demo Visual

Las páginas mostrarán:
- Formularios funcionales
- UI responsive
- Componentes interactivos
- Mensajes de error si falta el backend

---

## 🔧 Troubleshooting

### ❌ Error: "Cannot connect to database"

**Solución**:
- Instala PostgreSQL localmente, o
- Usa una base de datos en la nube (Supabase, Railway, etc.)
- Actualiza `DATABASE_URL` en `server/.env`

### ❌ Error: "VITE_API_URL is not defined"

**Solución**:
- Verifica que existe `.env.local` en `TechOS/`
- Reinicia el servidor de desarrollo (`npm run dev`)

### ❌ Socket.IO no conecta

**Solución**:
- Verifica que el backend esté corriendo en el puerto 4000
- Revisa la consola del navegador (F12)
- Verifica que no haya firewall bloqueando

### ❌ No veo el botón de demo

**Solución**:
- Refresca la página (Ctrl + F5)
- Verifica que estás en una de estas páginas:
  - Landing Page (`/`)
  - Teacher Dashboard (`/teacher/dashboard`)
  - Admin Dashboard (`/admin/dashboard`)
  - Student Dashboard (`/student/dashboard`)

---

## 📁 Estructura de Archivos

```
TechOS/
├── .env.local ✅ (Configurado)
├── src/
│   ├── components/
│   │   └── AcademicDemoButton.tsx ✅ (Nuevo)
│   ├── pages/
│   │   ├── CalendarPage.tsx ✅
│   │   ├── MaterialsPage.tsx ✅
│   │   ├── GradebookPage.tsx ✅
│   │   └── StudentGradesPage.tsx ✅
│   └── hooks/
│       └── useSocket.tsx ✅
├── server/
│   ├── .env ✅ (Configurado)
│   ├── src/
│   │   └── modules/
│   │       ├── academic/
│   │       │   ├── academic.service.ts ✅ (Expandido)
│   │       │   └── academic.controller.ts ✅ (Expandido)
│   │       └── notifications/
│   │           ├── reminders.service.ts ✅ (Nuevo)
│   │           └── notifications.gateway.ts ✅
│   └── prisma/
│       └── schema.prisma ✅ (Actualizado)
└── CONFIGURACION_COMPLETA.md ✅ (Este archivo)
```

---

## 🎉 ¡Listo para Usar!

El sistema está **100% configurado** y listo para:

1. ✅ Iniciar servicios
2. ✅ Probar demos
3. ✅ Recibir notificaciones
4. ✅ Acceso fácil desde cualquier dashboard

### Próximo Paso

**Inicia los servicios:**

```bash
# Terminal 1
cd TechOS/server
npm run start:dev

# Terminal 2
cd TechOS
npm run dev
```

Luego abre: **http://localhost:5173**

¡Busca el botón **🎓 Sistema Académico Demo** y explora las funcionalidades!

---

## 📞 Soporte

Si tienes algún problema:
1. Revisa la sección **Troubleshooting**
2. Verifica los logs en la consola
3. Revisa `IMPLEMENTACION_ACADEMICA.md` para detalles técnicos

---

**Desarrollado con ❤️ para TechOS**

