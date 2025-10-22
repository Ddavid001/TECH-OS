# Sistema de Ofertas Laborales y Postulaciones Docentes

## 📋 Descripción General

Este sistema implementa una plataforma completa para la gestión de ofertas laborales en instituciones educativas y postulaciones de profesores en Caracas, Venezuela. El sistema está integrado con el mapa interactivo de instituciones educativas.

## 🎯 Características Principales

### 1. **Ofertas Laborales Dinámicas**
- ✅ Listado completo de ofertas laborales de instituciones educativas
- ✅ Filtrado por área de estudio, tipo de contrato e institución
- ✅ Búsqueda en tiempo real
- ✅ Vista detallada de cada oferta con requisitos y beneficios
- ✅ Información de salario, ubicación y fechas límite
- ✅ Integración con el mapa de Caracas

### 2. **Perfiles de Profesores**
- ✅ Perfiles completos con experiencia, certificaciones y especialidades
- ✅ Listado de profesores disponibles con filtros avanzados
- ✅ Vista detallada de cada profesor
- ✅ Historial de postulaciones
- ✅ CV, portfolio y enlaces profesionales
- ✅ Múltiples idiomas y niveles educativos

### 3. **Sistema de Postulaciones**
- ✅ Formulario completo de postulación docente
- ✅ Campos para experiencia detallada
- ✅ Carga de documentos (CV, certificados)
- ✅ Carta de presentación
- ✅ Preferencias salariales y disponibilidad
- ✅ Enlaces a LinkedIn y portfolio

### 4. **Integración con Mapa**
- ✅ Marcadores de instituciones muestran ofertas activas
- ✅ Popups con información de ofertas laborales
- ✅ Navegación directa a ofertas desde el mapa
- ✅ Visualización geográfica de oportunidades

## 📁 Estructura de Archivos Creados/Modificados

### Migraciones de Base de Datos
```
/workspace/TechOS/supabase/migrations/
├── 20251022000000_add_job_offers_and_teacher_profiles.sql
└── 20251022000001_seed_job_offers.sql
```

### Datos Mock
```
/workspace/TechOS/src/data/
├── mock-job-offers.ts          # 10 ofertas laborales reales
└── mock-teacher-profiles.ts    # 12 perfiles de profesores con postulaciones
```

### Páginas
```
/workspace/TechOS/src/pages/
├── JobOffersPage.tsx            # Listado de ofertas con filtros
├── JobOfferDetail.tsx           # Detalle de oferta individual
├── ApplicationsPage.tsx         # Listado de profesores disponibles
├── TeacherProfileDetail.tsx     # Perfil completo de profesor
└── TeacherApplication.tsx       # Formulario mejorado (actualizado)
```

### Componentes
```
/workspace/TechOS/src/components/
├── job-offers/
│   └── JobOffersPanel.tsx       # Panel de ofertas (actualizado)
└── map/
    └── InteractiveMap.tsx       # Mapa integrado con ofertas (actualizado)
```

### Tipos
```
/workspace/TechOS/src/types/index.ts  # Tipos actualizados
```

## 🗄️ Modelo de Datos

### Tablas Principales

#### 1. **job_offers**
```sql
- id (UUID)
- institution_id (FK a institutions)
- title (TEXT)
- description (TEXT)
- requirements (TEXT[])
- responsibilities (TEXT[])
- subject_area (TEXT)
- job_type (ENUM: full_time, part_time, contract, temporary)
- status (ENUM: active, closed, draft)
- salary_min/max (DECIMAL)
- location (TEXT)
- benefits (TEXT[])
- vacancies (INTEGER)
- application_deadline (DATE)
- start_date (DATE)
```

#### 2. **teacher_profiles**
```sql
- id (UUID)
- user_id (FK a profiles)
- specialties (TEXT[])
- education_level (ENUM: bachelors, masters, phd, specialist)
- years_of_experience (INTEGER)
- certifications (TEXT[])
- languages (TEXT[])
- bio (TEXT)
- cv_url (TEXT)
- portfolio_url (TEXT)
- linkedin_url (TEXT)
```

#### 3. **job_applications**
```sql
- id (UUID)
- job_offer_id (FK a job_offers)
- teacher_id (FK a profiles)
- application_id (FK a applications)
- status (ENUM: pending, reviewing, shortlisted, rejected, accepted)
- cover_letter (TEXT)
- expected_salary (DECIMAL)
- availability_date (DATE)
```

## 🎨 Interfaz de Usuario

### Páginas Principales

#### 1. **Ofertas Laborales** (`/job-offers`)
- **Vista**: Grid de ofertas con tarjetas informativas
- **Filtros**: 
  - Búsqueda por texto
  - Área de estudio
  - Tipo de contrato
  - Tipo de institución
- **Estadísticas**: Total de ofertas, instituciones, áreas y vacantes
- **Acciones**: Ver detalle, postular

#### 2. **Detalle de Oferta** (`/job-offers/:id`)
- **Información completa**: Descripción, requisitos, responsabilidades
- **Sidebar**: Datos clave (salario, ubicación, tipo, vacantes)
- **Beneficios**: Lista visual de beneficios
- **Ofertas relacionadas**: De la misma institución
- **Acciones**: Postular, ver en mapa

#### 3. **Profesores Disponibles** (`/applications`)
- **Vista**: Grid de perfiles de profesores
- **Filtros**:
  - Búsqueda por nombre o especialidad
  - Especialidad específica
  - Nivel educativo
  - Experiencia mínima
- **Estadísticas**: Total de profesores, especialidades, experiencia promedio
- **Información**: Bio, especialidades, certificaciones, idiomas

#### 4. **Perfil de Profesor** (`/teacher-profile/:id`)
- **Información completa**: Bio, especialidades, certificaciones
- **Historial**: Postulaciones recientes
- **Enlaces**: LinkedIn, portfolio, CV
- **Contacto**: Email directo

#### 5. **Formulario de Postulación** (`/teacher-application`)
- **Información personal**: Nombre, email, teléfono
- **Información profesional**:
  - Nivel educativo
  - Años de experiencia
  - Especialidades
  - Formación académica
  - Certificaciones
  - Idiomas
- **Sobre mí**: Biografía y carta de presentación
- **Enlaces**: LinkedIn, portfolio
- **Preferencias**: Salario esperado, disponibilidad
- **Documentos**: Carga de CV y certificados

## 🗺️ Integración con Mapa

### Funcionalidades del Mapa Mejorado

1. **Marcadores Enriquecidos**
   - Muestran cantidad de ofertas activas
   - Colores por tipo de institución
   - Información contextual

2. **Popups Interactivos**
   - Nombre y tipo de institución
   - Lista de ofertas activas (hasta 3)
   - Navegación directa a ofertas
   - Botones de acción

3. **Navegación Fluida**
   - Desde mapa a ofertas
   - Desde ofertas a mapa
   - Filtrado por institución

## 📊 Datos Mock Incluidos

### Ofertas Laborales (10 ofertas)
1. **Universidad Central de Venezuela** - Profesor de Matemáticas Avanzadas
2. **Universidad Simón Bolívar** - Profesor de Ingeniería de Software
3. **Colegio San Ignacio** - Profesor de Primaria
4. **Universidad Metropolitana** - Coordinador Académico de Economía
5. **Colegio Los Arcos** - Profesor de Ciencias Naturales
6. **IUTIRLA** - Instructor de Programación
7. **Universidad Católica Andrés Bello** - Profesor de Derecho Constitucional
8. **Instituto de Diseño** - Profesor de Diseño Gráfico
9. **Colegio Don Bosco** - Orientador Vocacional
10. **IUTPAL** - Profesor de Administración y Contabilidad

### Perfiles de Profesores (12 profesores)
- **Áreas**: Matemáticas, Biología, Historia, Química, Física, Literatura, Informática, Inglés, Educación Física, Arte, Derecho, Economía
- **Niveles educativos**: Licenciatura, Maestría, Doctorado, Especialización
- **Experiencia**: 4-12 años
- **Idiomas**: Español, Inglés, Francés, Portugués, Italiano, Alemán

### Postulaciones (10 postulaciones activas)
- Estados variados: pendiente, en revisión, preseleccionado, aceptado, rechazado
- Cartas de presentación personalizadas
- Expectativas salariales
- Fechas de disponibilidad

## 🚀 Rutas de la Aplicación

```typescript
// Ofertas
/job-offers                    // Listado de ofertas
/job-offers/:id               // Detalle de oferta
/job-offers/:id/apply         // Aplicar a oferta

// Profesores
/applications                 // Listado de profesores
/teacher-profile/:id          // Perfil de profesor
/teacher-application          // Formulario de postulación

// Portal
/applications-portal          // Elegir tipo de postulación

// Mapa
/map                         // Mapa interactivo con ofertas
/caracas-map                 // Vista de Caracas
```

## 💡 Características Técnicas

### Frontend
- **Framework**: React + TypeScript
- **Routing**: React Router v6
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Mapas**: Leaflet + React-Leaflet
- **Formularios**: React Hook Form + Zod

### Backend (preparado)
- **Base de datos**: PostgreSQL (Supabase)
- **Storage**: Supabase Storage para documentos
- **Autenticación**: Supabase Auth
- **Row Level Security**: Políticas de seguridad implementadas

### Datos
- **Tipos fuertemente tipados** en TypeScript
- **Datos mock** para desarrollo y pruebas
- **Estructura preparada** para migración a datos reales

## 📝 Próximos Pasos Sugeridos

### Para hacer el sistema completamente funcional:

1. **Conectar con Supabase**
   - Ejecutar las migraciones SQL
   - Configurar las credenciales de Supabase
   - Migrar datos mock a la base de datos

2. **Implementar Storage**
   - Configurar bucket de aplicaciones
   - Implementar carga de archivos
   - Gestión de CVs y documentos

3. **Sistema de Notificaciones**
   - Emails de confirmación
   - Notificaciones de estado de postulación
   - Alertas de nuevas ofertas

4. **Panel de Administración**
   - Gestión de ofertas por institución
   - Revisión de postulaciones
   - Proceso de selección

5. **Análiticas**
   - Dashboard de métricas
   - Reportes de postulaciones
   - Estadísticas de ofertas

## 🎯 Funcionalidades en Producción

✅ **Completamente Implementado**:
- Sistema de visualización de ofertas
- Perfiles de profesores
- Formulario de postulación completo
- Integración con mapa
- Búsqueda y filtros
- Navegación entre páginas
- UI/UX completo

⏳ **Pendiente (requiere configuración)**:
- Conexión a base de datos real
- Almacenamiento de archivos
- Autenticación de usuarios
- Sistema de notificaciones

## 📚 Documentación Adicional

### Tipos principales
```typescript
interface JobOffer {
  id: string;
  institution_id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  subject_area: string;
  job_type: 'full_time' | 'part_time' | 'contract' | 'temporary';
  status: 'active' | 'closed' | 'draft';
  salary_min?: number;
  salary_max?: number;
  location?: string;
  benefits: string[];
  vacancies: number;
  application_deadline?: string;
  start_date?: string;
}

interface TeacherProfile {
  id: string;
  user_id: string;
  specialties: string[];
  education_level?: 'bachelors' | 'masters' | 'phd' | 'specialist';
  years_of_experience: number;
  certifications: string[];
  languages: string[];
  bio?: string;
  cv_url?: string;
  portfolio_url?: string;
  linkedin_url?: string;
}

interface JobApplication {
  id: string;
  job_offer_id: string;
  teacher_id: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'accepted';
  cover_letter?: string;
  expected_salary?: number;
  availability_date?: string;
}
```

## 🎨 Diseño y UX

- **Diseño Moderno**: Interfaz limpia y profesional
- **Responsive**: Funciona en móviles, tablets y desktop
- **Accesible**: Navegación intuitiva y clara
- **Coherente**: Mantiene el estilo del resto de la aplicación
- **Informativo**: Información clara y bien organizada

## 🔒 Seguridad

- Row Level Security en todas las tablas
- Políticas de acceso configuradas
- Validación de formularios
- Protección de rutas sensibles

## 📞 Soporte

Para preguntas o problemas con el sistema:
1. Revisar esta documentación
2. Verificar los archivos de migración SQL
3. Consultar los tipos en `/src/types/index.ts`
4. Revisar los datos mock para ejemplos

---

**Desarrollado para TechOS** - Sistema de Gestión Educativa
**Fecha**: Octubre 2025
**Versión**: 1.0.0
