# TechOS - Plataforma Educativa

Una plataforma integral para la gestión educativa que conecta profesores, estudiantes y representantes en tiempo real, con funcionalidades de mapa interactivo y portal de postulaciones.

## 🚀 Características Principales

### Funcionalidades Core
- **Autenticación Segura**: Sistema de login/registro con confirmación por email
- **Gestión de Roles**: Admin, Profesor, Estudiante, Representante
- **Dashboard Personalizado**: Interfaces específicas para cada tipo de usuario
- **Gestión de Asistencia**: Control de asistencia en tiempo real
- **Materiales de Clase**: Subida y gestión de materiales educativos

### Nuevas Funcionalidades
- **Mapa Interactivo**: Visualización de instituciones educativas en Caracas
- **Geolocalización**: Detección automática de ubicación del usuario
- **Portal de Postulaciones**: Sistema para docentes e instituciones
- **Gestión de Archivos**: Subida segura de documentos con Supabase Storage

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** con TypeScript
- **Vite** como bundler
- **Tailwind CSS** para estilos
- **shadcn/ui** para componentes
- **React Router** para navegación
- **React Hook Form** para formularios
- **Zod** para validación
- **Zustand** para manejo de estado
- **React Leaflet** para mapas interactivos

### Backend
- **Supabase** como Backend-as-a-Service
- **PostgreSQL** como base de datos
- **Row Level Security (RLS)** para seguridad
- **Supabase Storage** para archivos
- **Edge Functions** para lógica de servidor

### Herramientas de Desarrollo
- **ESLint** para linting
- **TypeScript** para tipado estático
- **Vite** para desarrollo rápido

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o bun
- Cuenta de Supabase

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd TechOS
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   bun install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Editar `.env.local` con tus credenciales de Supabase:
   ```env
   VITE_SUPABASE_URL=tu_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=tu_supabase_anon_key
   ```

4. **Configurar Supabase**
   - Crear un nuevo proyecto en Supabase
   - Ejecutar las migraciones SQL desde `supabase/migrations/`
   - Ejecutar el seed SQL desde `supabase/seed.sql`
   - Configurar las políticas RLS
   - Crear buckets de storage: `applications`, `class-materials`

5. **Ejecutar migraciones de base de datos**
   ```bash
   # En el dashboard de Supabase, ejecutar los archivos SQL en orden:
   # 1. 20251020044929_8adaad15-971c-468f-ab63-3c0fb265cc37.sql
   # 2. 20251020045443_487a2287-2793-470a-a030-c1424ae9425e.sql
   # 3. 20251020052830_09bbb889-89e9-42f9-b8ec-028afbb8fa3d.sql
   # 4. 20251021000000_add_institution_coordinates.sql
   ```

## 🚀 Ejecución

### Desarrollo
```bash
npm run dev
# o
bun dev
```

### Producción
```bash
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```
TechOS/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── ui/             # Componentes base (shadcn/ui)
│   │   ├── map/            # Componentes de mapa
│   │   └── navigation/     # Componentes de navegación
│   ├── pages/              # Páginas de la aplicación
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utilidades y helpers
│   ├── stores/             # Estado global (Zustand)
│   ├── types/              # Definiciones de tipos TypeScript
│   └── integrations/       # Integraciones externas
├── supabase/
│   ├── functions/          # Edge Functions
│   └── migrations/         # Migraciones de base de datos
└── public/                 # Archivos estáticos
```

## 🔐 Seguridad

### Row Level Security (RLS)
- Políticas implementadas para cada tabla
- Acceso basado en roles de usuario
- Validación de pertenencia a institución

### Validación de Datos
- Validación en frontend con Zod
- Validación en backend con Edge Functions
- Sanitización de inputs

### Manejo de Archivos
- Subida segura a Supabase Storage
- Validación de tipos de archivo
- Límites de tamaño

## 🗺️ Funcionalidades del Mapa

### Características
- **Geolocalización**: Detección automática de ubicación
- **Marcadores**: Instituciones educativas en Caracas
- **Filtros**: Por tipo de institución
- **Búsqueda**: Por nombre o dirección
- **Responsive**: Adaptado para móviles

### Datos de Instituciones
- Universidad Central de Venezuela
- Universidad Simón Bolívar
- Universidad Católica Andrés Bello
- Y más instituciones educativas de Caracas

## 📝 Portal de Postulaciones

### Para Docentes
- Formulario de información personal
- Subida de documentos (cédula, títulos)
- Experiencia y formación académica
- Seguimiento de estado de postulación

### Para Instituciones
- Registro de datos de la institución
- Documentos legales (RIF, registros)
- Información de contacto
- Gestión de postulaciones

## 🧪 Testing

### Estructura de Pruebas
```bash
# Instalar dependencias de testing
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom

# Ejecutar pruebas
npm run test
```

### Ejemplos de Pruebas
- Componentes de UI
- Hooks personalizados
- Funciones de utilidad
- Validaciones de formularios

## 📊 Monitoreo y Logs

### Error Handling
- Sistema centralizado de manejo de errores
- Logging de errores para debugging
- Notificaciones user-friendly

### Performance
- Lazy loading de componentes
- Memoización de componentes pesados
- Optimización de queries de Supabase

## 🚀 Deployment

### Vercel (Recomendado)
1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Deploy automático en cada push

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Configurar variables de entorno

## 🤝 Contribución

### Flujo de Trabajo
1. Fork del repositorio
2. Crear branch para feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push al branch: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### Estándares de Código
- Usar TypeScript estricto
- Seguir convenciones de ESLint
- Documentar funciones complejas
- Escribir pruebas para nuevas funcionalidades

## 📞 Soporte

### Documentación
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Issues
- Reportar bugs en GitHub Issues
- Solicitar features en GitHub Discussions
- Revisar documentación antes de preguntar

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🎯 Roadmap

### Próximas Funcionalidades
- [ ] Notificaciones push
- [ ] Chat en tiempo real
- [ ] Analytics avanzados
- [ ] API pública
- [ ] Aplicación móvil
- [ ] Integración con calendarios
- [ ] Sistema de calificaciones
- [ ] Reportes avanzados

---

**Desarrollado con ❤️ para la educación venezolana**