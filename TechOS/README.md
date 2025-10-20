# TechOS - Academic Continuity Platform

Una plataforma completa para la gestión educativa que conecta profesores, estudiantes y representantes en tiempo real.

## 🚀 Características

- **Dashboard de Administrador**: Gestión completa de usuarios, cursos y estadísticas
- **Dashboard de Profesor**: Gestión de cursos, materiales y asistencia
- **Dashboard de Estudiante**: Visualización de horarios y cursos
- **Dashboard de Representante**: Seguimiento de asistencia de estudiantes vinculados
- **Autenticación segura** con Supabase
- **Interfaz multilingüe** (Español/Inglés)
- **Gestión de archivos** para materiales de clase
- **Sistema de roles** con permisos granulares

## 🛠️ Tecnologías

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Tailwind CSS, shadcn/ui, Radix UI
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Routing**: React Router v6
- **Estado**: React Query (TanStack Query)
- **Formularios**: React Hook Form + Zod
- **Internacionalización**: i18next

## 📋 Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd TechOS
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp env.example .env.local
```

Edita `.env.local` con tus credenciales de Supabase:
        ```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_PUBLISHABLE_KEY=tu_clave_publica_de_supabase
```

4. **Configurar Supabase**
   - Crea un nuevo proyecto en [Supabase](https://supabase.com)
   - Ejecuta las migraciones SQL desde `supabase/migrations/`
   - Ejecuta el script de seed desde `supabase/seed.sql` para datos de ejemplo
   - Configura las políticas RLS (Row Level Security)
   - Habilita el bucket de almacenamiento para materiales
   - **Configurar Google OAuth (opcional):**
     - Ve a Authentication > Providers en tu dashboard de Supabase
     - Habilita Google provider
     - Configura OAuth credentials desde Google Cloud Console
     - Agrega tu dominio a las URLs autorizadas

5. **Ejecutar en desarrollo**
```bash
    npm run dev
    ```

## 🗄️ Base de Datos

El proyecto incluye las siguientes tablas principales:

- **institutions**: Instituciones educativas
- **profiles**: Perfiles de usuarios (extiende auth.users)
- **courses**: Cursos
- **enrollments**: Inscripciones de estudiantes
- **schedules**: Horarios de clases
- **attendance_records**: Registros de asistencia
- **class_materials**: Materiales de clase
- **teacher_absences**: Ausencias de profesores
- **representative_links**: Vínculos representante-estudiante

## 🔐 Autenticación y Roles

El sistema maneja 4 tipos de usuarios:

1. **Admin**: Gestión completa del sistema
2. **Teacher**: Gestión de cursos y materiales
3. **Student**: Acceso a horarios y cursos
4. **Representative**: Seguimiento de estudiantes vinculados

## 📱 Pantallas Principales

### Dashboard de Administrador
- Estadísticas generales
- Gestión de usuarios (CRUD)
- Vista de cursos y asistencia

### Dashboard de Profesor
- Clases del día
- Gestión de cursos
- Subida de materiales
- Registro de asistencia

### Dashboard de Estudiante
- Horario del día
- Cursos inscritos
- Materiales disponibles

### Dashboard de Representante
- Seguimiento de asistencia
- Estudiantes vinculados
- Historial de registros

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

### Variables de Entorno de Producción
Asegúrate de configurar las variables de entorno en tu plataforma de despliegue:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Linter

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── admin/          # Componentes específicos de admin
│   ├── teacher/       # Componentes específicos de profesor
│   └── ui/            # Componentes de UI base
├── hooks/             # Custom hooks
├── integrations/       # Integraciones externas (Supabase)
├── lib/               # Utilidades y helpers
├── pages/             # Páginas principales
├── i18n/              # Configuración de internacionalización
└── main.tsx           # Punto de entrada
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación de Supabase
2. Verifica las variables de entorno
3. Asegúrate de que las migraciones se ejecutaron correctamente
4. Abre un issue en el repositorio

## 🔄 Actualizaciones Futuras

- [ ] Notificaciones en tiempo real
- [ ] Sistema de calificaciones
- [ ] Chat entre usuarios
- [ ] Reportes avanzados
- [ ] App móvil
- [ ] Integración con calendarios externos