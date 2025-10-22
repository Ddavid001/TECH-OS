# Sistema de Ofertas Laborales y Postulaciones Docentes

## 📋 Descripción General

Se ha implementado un sistema completo de ofertas laborales y postulaciones docentes para TechOS, con datos realistas de instituciones educativas en Caracas. El sistema incluye:

- **Ofertas Laborales**: 14 ofertas detalladas de universidades, colegios e institutos
- **Perfiles de Profesores**: 10 perfiles completos con experiencia, formación y certificaciones
- **Integración con Mapa**: Las ofertas están conectadas con las instituciones del mapa de Caracas
- **Sistema de Búsqueda y Filtrado**: Filtros avanzados por categoría, ubicación, tipo de contrato, etc.

## 🎯 Características Principales

### 1. Ofertas Laborales

#### Tipos de Datos Incluidos:
- **Información Básica**: Título, institución, ubicación, descripción
- **Requisitos**: Lista detallada de calificaciones necesarias
- **Responsabilidades**: Funciones principales del cargo
- **Beneficios**: Lo que ofrece la institución
- **Detalles Contractuales**: Tipo de contrato, salario, vacantes, fechas

#### Instituciones Representadas:
- **Universidades**: UCV, USB, UNIMET, UCAB
- **Colegios**: San Ignacio, Los Arcos, Don Bosco
- **Institutos**: IUTIRLA, IUTAI, Instituto de Diseño

#### Categorías de Ofertas:
- Educación (profesores de diversas materias)
- Investigación (investigadores y asistentes)
- Administración (coordinadores y gestores)
- Tecnología (instructores técnicos y desarrolladores)

### 2. Perfiles de Profesores Postulantes

#### Datos Completos de Cada Profesor:
- **Información Personal**: Nombre, contacto, foto, biografía
- **Especialidades**: Áreas de conocimiento y expertise
- **Experiencia Profesional**: 
  - Historial de instituciones
  - Posiciones desempeñadas
  - Descripción de logros
  - Fechas de inicio y fin
- **Formación Académica**: 
  - Títulos obtenidos (Doctorado, Maestría, Licenciatura)
  - Instituciones de estudio
  - Áreas de especialización
  - Años de graduación
- **Certificaciones**: 
  - Nombre de certificación
  - Organismo emisor
  - Fechas de vigencia
- **Habilidades Técnicas**: Herramientas, software, metodologías
- **Idiomas**: Nivel de dominio de cada idioma
- **Disponibilidad**: Fechas y ubicaciones preferidas
- **Documentos**: CV, portfolio, LinkedIn

#### Perfiles Destacados:
1. **Carlos Rodríguez** - Doctor en Matemáticas (8 años exp.)
2. **María González** - Doctora en Biología (10 años exp.)
3. **José Martínez** - Magíster en Historia (8 años exp.)
4. **Ana Pérez** - Química (6 años exp.)
5. **Luis Hernández** - Doctor en Física (9 años exp.)
6. **Carmen Díaz** - Literatura (14 años exp.)
7. **Roberto Sánchez** - Ingeniero en Sistemas (8 años exp.)
8. **Patricia Flores** - Idiomas (14 años exp.)
9. **Miguel Torres** - Educación Física (7 años exp.)
10. **Gabriela Ramírez** - Artes Plásticas (9 años exp.)

## 📁 Estructura de Archivos Creados

### Datos
```
src/data/
├── job-offers-data.ts          # 14 ofertas laborales detalladas
├── teacher-profiles-data.ts    # 10 perfiles de profesores completos
└── caracas-institutions.ts     # Actualizado con nuevas ofertas
```

### Tipos
```
src/types/index.ts              # Tipos TypeScript agregados:
├── JobOffer
├── TeacherProfile
├── TeacherExperience
├── TeacherEducation
├── TeacherCertification
└── TeacherApplicationData
```

### Componentes
```
src/components/
├── job-offers/
│   └── JobOfferCard.tsx        # Tarjeta de oferta laboral
└── applications/
    └── TeacherProfileCard.tsx  # Tarjeta de perfil de profesor
```

### Páginas
```
src/pages/
├── JobOffersPage.tsx           # Lista de ofertas con filtros
├── JobOfferDetail.tsx          # Detalle de oferta individual
├── ApplicationsPage.tsx        # Lista de profesores postulados
├── TeacherProfileDetail.tsx    # Perfil completo de profesor
├── ApplicationsPortal.tsx      # Portal actualizado
└── CaracasMapPage.tsx          # Integración con mapa
```

### Rutas
```
App.tsx - Rutas agregadas:
├── /job-offers                 # Lista de ofertas
├── /job-offers/:jobId          # Detalle de oferta
├── /applications/browse        # Lista de profesores
└── /applications/teacher/:id   # Perfil de profesor
```

## 🎨 Características de UI/UX

### Diseño Visual
- **Cards con Gradientes**: Diseño moderno con gradientes sutiles
- **Hover Effects**: Transiciones suaves en tarjetas
- **Badges Informativos**: Categorización visual clara
- **Iconos Contextuales**: Lucide Icons para mejor comprensión
- **Responsive Design**: Adaptable a móvil, tablet y desktop

### Sistema de Filtrado
- **Búsqueda por Texto**: En títulos, instituciones, descripciones
- **Filtros por Categoría**: Educación, Investigación, Administración, Tecnología
- **Filtros por Tipo de Institución**: Universidad, Colegio, Instituto
- **Filtros por Contrato**: Tiempo completo, medio tiempo, contrato, temporal
- **Filtros por Experiencia**: Rangos de años de experiencia
- **Filtros por Educación**: Doctorado, Maestría, Licenciatura

### Organización en Bloques
- **Tabs por Categoría**: Ofertas agrupadas por área
- **Tabs por Especialidad**: Profesores agrupados por campo
- **Grid Responsivo**: 1, 2 o 3 columnas según dispositivo
- **Secciones Claras**: Separación visual de contenido

## 🔗 Integración con el Mapa

### Conexión de Datos
- Las ofertas en `job-offers-data.ts` están **alineadas** con las instituciones del mapa
- Cada institución en `caracas-institutions.ts` tiene ofertas asociadas
- Al hacer clic en una institución del mapa, se muestran sus ofertas activas
- Botones directos para ver detalles de cada oferta

### Flujo de Usuario en el Mapa
1. Usuario selecciona institución en el mapa
2. Panel lateral muestra ofertas de esa institución
3. Click en oferta redirige a página de detalle
4. Usuario puede postularse directamente

## 📊 Estadísticas del Sistema

### Ofertas Laborales
- **Total**: 14 ofertas activas
- **Universidades**: 6 ofertas
- **Colegios**: 4 ofertas
- **Institutos**: 4 ofertas
- **Con Salario Indicado**: 8 ofertas
- **Vacantes Totales**: 17 posiciones

### Profesores Postulantes
- **Total**: 10 perfiles completos
- **Doctores**: 4 profesores
- **Con Maestría**: 3 profesores
- **Certificaciones Totales**: 26 certificaciones
- **Años Promedio de Experiencia**: 9 años
- **Idiomas**: Todos bilingües (Español-Inglés)

## 🚀 Funcionalidades Implementadas

### Para Buscadores de Empleo (Profesores)
✅ Explorar ofertas por categoría  
✅ Filtrar por tipo de institución  
✅ Ver detalles completos de ofertas  
✅ Aplicar directamente desde la oferta  
✅ Contactar por email o WhatsApp  
✅ Compartir ofertas  

### Para Reclutadores (Instituciones)
✅ Ver perfiles completos de profesores  
✅ Filtrar por especialidad y experiencia  
✅ Revisar experiencia laboral detallada  
✅ Ver certificaciones y formación  
✅ Descargar CV de candidatos  
✅ Contactar directamente a candidatos  

### Para Todos los Usuarios
✅ Navegación intuitiva  
✅ Búsqueda rápida  
✅ Diseño responsive  
✅ Información organizada en bloques  
✅ Integración con mapa de Caracas  

## 🔄 Flujos de Usuario Principales

### Flujo 1: Buscar y Aplicar a Oferta
```
Inicio → Job Offers → Filtrar → Ver Detalle → Aplicar → Formulario → Confirmación
```

### Flujo 2: Explorar Profesores
```
Inicio → Applications → Filtrar → Ver Perfil → Contactar
```

### Flujo 3: Desde el Mapa
```
Mapa → Seleccionar Institución → Ver Ofertas → Ver Detalle → Aplicar
```

### Flujo 4: Postularse como Profesor
```
Portal → Teacher Application → Llenar Formulario → Subir Docs → Enviar
```

## 🎯 Próximas Mejoras Sugeridas

### Funcionalidades Adicionales
- [ ] Sistema de autenticación completo para postulaciones
- [ ] Dashboard para instituciones con gestión de ofertas
- [ ] Sistema de mensajería interno
- [ ] Notificaciones por email
- [ ] Sistema de favoritos/guardados
- [ ] Estadísticas y analytics
- [ ] Sistema de recomendaciones basado en perfil
- [ ] Calendario de entrevistas
- [ ] Evaluaciones y referencias
- [ ] Sistema de matching automático

### Integraciones con APIs Externas
- [ ] LinkedIn API para importar perfiles
- [ ] Google Maps API para ubicaciones precisas
- [ ] SendGrid para emails automáticos
- [ ] Stripe para pagos de suscripciones premium
- [ ] Twilio para notificaciones SMS

### Mejoras de Datos
- [ ] Más ofertas (objetivo: 50+)
- [ ] Más perfiles de profesores (objetivo: 100+)
- [ ] Más instituciones de Caracas
- [ ] Datos de otras ciudades de Venezuela
- [ ] Salarios reales de mercado
- [ ] Testimonios y reseñas

## 📝 Notas Técnicas

### Arquitectura de Datos
- Datos separados en archivos modulares
- Tipos TypeScript completos para type safety
- Datos coherentes entre ofertas e instituciones
- Estructura escalable para agregar más datos

### Performance
- Lazy loading de páginas con React.lazy
- Componentes optimizados sin re-renders innecesarios
- Filtrado eficiente con useMemo
- Imágenes de avatar con servicio externo (pravatar.cc)

### Accesibilidad
- Iconos con aria-labels apropiados
- Contraste de colores adecuado
- Navegación por teclado
- Textos descriptivos

## 🎨 Paleta de Colores Utilizada

- **Primary**: Para acciones principales y elementos destacados
- **Secondary**: Para información complementaria
- **Green**: Para profesores y postulaciones
- **Blue**: Para educación
- **Purple**: Para ofertas laborales
- **Orange**: Para fechas límite y urgencias

## 📞 Contacto y Soporte

Para cualquier pregunta sobre el sistema implementado, consultar:
- Documentación de tipos en `src/types/index.ts`
- Datos de ejemplo en `src/data/`
- Componentes reutilizables en `src/components/`

---

**Última actualización**: 22 de octubre, 2024  
**Versión**: 1.0.0  
**Estado**: ✅ Implementado y funcional
