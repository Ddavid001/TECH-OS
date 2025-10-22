import { JobOffer, TeacherProfile, Profile, JobApplication } from '@/types';

// Mock data for job offers matching institutions in the map
export const mockJobOffers: JobOffer[] = [
  {
    id: 'job-1',
    institution_id: 'univ-ucv',
    title: 'Profesor de Matemáticas Avanzadas',
    description: 'Buscamos un profesor altamente calificado para impartir cursos de matemáticas a nivel universitario. El candidato ideal tendrá experiencia en investigación y docencia, con capacidad para inspirar a los estudiantes en el mundo de las matemáticas avanzadas.',
    requirements: [
      'Doctorado en Matemáticas o áreas afines',
      'Mínimo 3 años de experiencia docente universitaria',
      'Publicaciones en revistas indexadas',
      'Dominio de inglés técnico',
      'Experiencia en investigación matemática'
    ],
    responsibilities: [
      'Impartir clases de pregrado y postgrado en matemáticas',
      'Dirigir tesis de grado y postgrado',
      'Participar en proyectos de investigación',
      'Colaborar en actividades de extensión universitaria',
      'Publicar resultados de investigación'
    ],
    subject_area: 'Matemáticas',
    job_type: 'full_time',
    status: 'active',
    salary_min: 2500,
    salary_max: 4000,
    location: 'Ciudad Universitaria, Caracas',
    benefits: [
      'Seguro médico',
      'Días de formación continua',
      'Acceso a biblioteca digital',
      'Apoyo para conferencias internacionales'
    ],
    vacancies: 2,
    application_deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    start_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  },
  {
    id: 'job-2',
    institution_id: 'univ-usb',
    title: 'Profesor de Ingeniería de Software',
    description: 'Se requiere profesor con experiencia en desarrollo de software y metodologías ágiles para programa de Ingeniería en Computación. El candidato debe estar actualizado con las últimas tecnologías y tendencias en desarrollo de software.',
    requirements: [
      'Maestría en Computación o Ingeniería de Software',
      'Experiencia profesional mínima de 5 años en la industria',
      'Conocimiento en tecnologías web modernas (React, Node.js, etc.)',
      'Certificaciones en metodologías ágiles (Scrum, Kanban)',
      'Experiencia con CI/CD y DevOps'
    ],
    responsibilities: [
      'Dictar cursos de ingeniería de software y desarrollo web',
      'Supervisar proyectos de desarrollo estudiantiles',
      'Actualizar contenido programático con tecnologías actuales',
      'Mentoría de estudiantes en proyectos finales',
      'Colaborar con la industria tecnológica'
    ],
    subject_area: 'Ingeniería',
    job_type: 'full_time',
    status: 'active',
    salary_min: 3000,
    salary_max: 4500,
    location: 'Valle de Sartenejas, Caracas',
    benefits: [
      'Seguro HCM',
      'Capacitación continua en tecnologías',
      'Laboratorios equipados con última tecnología',
      'Horario flexible',
      'Oportunidades de consultoría'
    ],
    vacancies: 1,
    application_deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    start_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  },
  {
    id: 'job-3',
    institution_id: 'school-sanignacio',
    title: 'Profesor de Primaria - Español y Matemáticas',
    description: 'Colegio San Ignacio busca profesor de primaria con vocación de servicio y experiencia en educación básica. Se valorará el conocimiento del modelo educativo jesuita y compromiso con la formación integral de los estudiantes.',
    requirements: [
      'Licenciatura en Educación mención Educación Integral',
      'Mínimo 2 años de experiencia en primaria',
      'Conocimiento del modelo educativo jesuita (deseable)',
      'Manejo de herramientas digitales educativas',
      'Habilidades de comunicación con niños y padres'
    ],
    responsibilities: [
      'Planificar y ejecutar clases de español y matemáticas',
      'Evaluar el progreso de los estudiantes',
      'Comunicación efectiva con padres y representantes',
      'Participar en actividades extracurriculares',
      'Acompañamiento pastoral de estudiantes'
    ],
    subject_area: 'Educación Básica',
    job_type: 'full_time',
    status: 'active',
    salary_min: 1500,
    salary_max: 2200,
    location: 'Av. Las Palmas, Chacao, Caracas',
    benefits: [
      'Seguro médico familiar',
      'Vacaciones escolares completas',
      'Formación pedagógica continua',
      'Ambiente de trabajo colaborativo',
      'Actividades de integración'
    ],
    vacancies: 1,
    application_deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    start_date: '2025-09-01',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  },
  {
    id: 'job-4',
    institution_id: 'univ-unimet',
    title: 'Coordinador Académico - Facultad de Economía',
    description: 'Profesional con experiencia en gestión académica y coordinación de programas educativos. Buscamos un líder capaz de innovar en los procesos académicos y mantener la excelencia educativa.',
    requirements: [
      'Maestría en Economía, Administración o Educación',
      'Experiencia mínima de 7 años en docencia universitaria',
      'Al menos 3 años en cargos de gestión académica',
      'Habilidades de liderazgo y trabajo en equipo',
      'Conocimiento de procesos de acreditación'
    ],
    responsibilities: [
      'Coordinar programas académicos de pregrado y postgrado',
      'Supervisar y evaluar el desempeño del cuerpo docente',
      'Desarrollar y actualizar planes de estudio',
      'Gestionar procesos de evaluación curricular',
      'Liderar procesos de acreditación'
    ],
    subject_area: 'Economía',
    job_type: 'full_time',
    status: 'active',
    salary_min: 3500,
    salary_max: 5000,
    location: 'Autopista Petare-Guarenas, Caracas',
    benefits: [
      'Seguro médico privado',
      'Bonos por desempeño',
      'Apoyo para estudios doctorales',
      'Estacionamiento gratuito',
      'Oficina equipada'
    ],
    vacancies: 1,
    application_deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
    start_date: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  },
  {
    id: 'job-5',
    institution_id: 'school-losarcos',
    title: 'Profesor de Ciencias Naturales - Secundaria',
    description: 'Buscamos profesor dinámico para enseñar Biología, Química y Física en educación media. El candidato debe tener pasión por las ciencias y habilidad para hacer la materia interesante y accesible.',
    requirements: [
      'Licenciatura en Educación mención Biología o Química',
      'Experiencia en prácticas de laboratorio',
      'Habilidades para trabajo con adolescentes',
      'Uso de metodologías activas de enseñanza',
      'Conocimiento de olimpiadas científicas'
    ],
    responsibilities: [
      'Impartir clases de ciencias naturales',
      'Coordinar y supervisar prácticas de laboratorio',
      'Preparar estudiantes para olimpiadas científicas',
      'Innovar en métodos de enseñanza',
      'Evaluar de forma integral el aprendizaje'
    ],
    subject_area: 'Ciencias',
    job_type: 'full_time',
    status: 'active',
    salary_min: 1800,
    salary_max: 2500,
    location: 'Los Ruices, Caracas',
    benefits: [
      'Seguro médico',
      'Material didáctico y laboratorio equipado',
      'Formación continua en ciencias',
      'Bono de transporte',
      'Apoyo para proyectos científicos'
    ],
    vacancies: 2,
    application_deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    start_date: '2025-09-15',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  },
  {
    id: 'job-6',
    institution_id: 'inst-iutirla',
    title: 'Instructor de Programación y Bases de Datos',
    description: 'Se requiere instructor técnico para programas de TSU en Informática. El candidato debe tener experiencia práctica en desarrollo de software y capacidad de transmitir conocimientos técnicos.',
    requirements: [
      'TSU o Ingeniería en Informática',
      'Experiencia en desarrollo de software comercial',
      'Conocimiento profundo de SQL y bases de datos relacionales',
      'Manejo de lenguajes de programación modernos (Python, Java, JavaScript)',
      'Experiencia en proyectos reales'
    ],
    responsibilities: [
      'Dictar clases prácticas de programación',
      'Evaluar proyectos de desarrollo estudiantiles',
      'Actualizar laboratorios de computación',
      'Asesorar pasantías empresariales',
      'Mantener vinculación con la industria'
    ],
    subject_area: 'Tecnología',
    job_type: 'part_time',
    status: 'active',
    salary_min: 1200,
    salary_max: 1800,
    location: 'Av. Principal de Los Ruices, Caracas',
    benefits: [
      'Horario vespertino flexible',
      'Posibilidad de conversión a tiempo completo',
      'Acceso a equipos y software',
      'Red de contactos en la industria'
    ],
    vacancies: 2,
    application_deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(),
    start_date: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  },
  {
    id: 'job-7',
    institution_id: 'univ-ucat',
    title: 'Profesor de Derecho Constitucional',
    description: 'La Facultad de Derecho busca profesor especializado en Derecho Constitucional y Derechos Humanos. Se valorará experiencia en litigio y participación en casos relevantes.',
    requirements: [
      'Abogado con especialización o maestría en Derecho Constitucional',
      'Mínimo 5 años de ejercicio profesional',
      'Experiencia en litigio constitucional',
      'Publicaciones académicas en derecho',
      'Participación en casos de relevancia pública'
    ],
    responsibilities: [
      'Impartir cátedras de derecho constitucional',
      'Dirigir trabajos de investigación jurídica',
      'Participar en clínicas jurídicas',
      'Actividades de extensión y educación legal',
      'Asesoría en casos de interés público'
    ],
    subject_area: 'Derecho',
    job_type: 'part_time',
    status: 'active',
    salary_min: 2000,
    salary_max: 3000,
    location: 'Urb. Montalbán, La Vega, Caracas',
    benefits: [
      'Reconocimiento y prestigio académico',
      'Networking profesional',
      'Acceso a biblioteca jurídica especializada',
      'Flexibilidad horaria',
      'Participación en eventos académicos'
    ],
    vacancies: 1,
    application_deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    start_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  },
  {
    id: 'job-8',
    institution_id: 'inst-cultart',
    title: 'Profesor de Diseño Gráfico Digital',
    description: 'Diseñador profesional con experiencia en software de diseño y metodologías creativas. Buscamos alguien que pueda inspirar creatividad y enseñar las últimas tendencias en diseño.',
    requirements: [
      'Diseñador gráfico titulado',
      'Portfolio profesional comprobable',
      'Dominio de Adobe Creative Suite',
      'Experiencia en diseño UX/UI',
      'Conocimiento de tendencias actuales en diseño'
    ],
    responsibilities: [
      'Impartir talleres de diseño gráfico',
      'Evaluar proyectos creativos',
      'Coordinar exposiciones de trabajos estudiantiles',
      'Mentoría de portafolios profesionales',
      'Vinculación con estudios de diseño'
    ],
    subject_area: 'Diseño',
    job_type: 'part_time',
    status: 'active',
    salary_min: 1500,
    salary_max: 2200,
    location: 'Av. Libertador, Caracas',
    benefits: [
      'Acceso a software profesional',
      'Espacio de taller creativo equipado',
      'Red de contactos en la industria creativa',
      'Horario flexible',
      'Participación en eventos de diseño'
    ],
    vacancies: 1,
    application_deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    start_date: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  },
  {
    id: 'job-9',
    institution_id: 'school-campobosco',
    title: 'Orientador Vocacional',
    description: 'Psicólogo especializado en orientación educativa y vocacional para adolescentes. Buscamos profesional comprometido con el desarrollo integral de los jóvenes.',
    requirements: [
      'Psicólogo titulado y colegiado',
      'Especialización en psicología educativa o vocacional',
      'Experiencia con adolescentes',
      'Conocimiento de pruebas vocacionales',
      'Habilidades de consejería'
    ],
    responsibilities: [
      'Orientación individual y grupal',
      'Aplicación y análisis de pruebas vocacionales',
      'Talleres para padres sobre orientación',
      'Acompañamiento en elección de carrera',
      'Seguimiento de casos especiales'
    ],
    subject_area: 'Orientación',
    job_type: 'full_time',
    status: 'active',
    salary_min: 1800,
    salary_max: 2600,
    location: 'Av. Principal de Altamira, Caracas',
    benefits: [
      'Seguro médico',
      'Formación continua en psicología',
      'Supervisión profesional',
      'Vacaciones escolares',
      'Ambiente de apoyo profesional'
    ],
    vacancies: 1,
    application_deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    start_date: '2025-09-01',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  },
  {
    id: 'job-10',
    institution_id: 'inst-iutpal',
    title: 'Profesor de Administración y Contabilidad',
    description: 'Contador público o administrador con experiencia en docencia de materias contables y administrativas. Se valorará experiencia en empresas y conocimiento de normativas actuales.',
    requirements: [
      'Contador Público o Licenciado en Administración',
      'Experiencia profesional mínima 5 años',
      'Conocimiento de NIIF y normativas contables',
      'Experiencia docente deseable',
      'Manejo de software contable'
    ],
    responsibilities: [
      'Dictar materias del área contable y administrativa',
      'Supervisar prácticas profesionales',
      'Actualizar contenidos programáticos',
      'Asesoría académica a estudiantes',
      'Vinculación con empresas'
    ],
    subject_area: 'Administración',
    job_type: 'full_time',
    status: 'active',
    salary_min: 2000,
    salary_max: 3000,
    location: 'Av. Francisco de Miranda, Caracas',
    benefits: [
      'Seguro HCM',
      'Estabilidad laboral',
      'Formación pedagógica',
      'Bono de fin de año',
      'Posibilidades de ascenso'
    ],
    vacancies: 2,
    application_deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    start_date: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  }
];

// Helper function to get job offers by institution
export const getJobOffersByInstitution = (institutionId: string): JobOffer[] => {
  return mockJobOffers.filter(offer => offer.institution_id === institutionId);
};

// Helper function to get active job offers
export const getActiveJobOffers = (): JobOffer[] => {
  return mockJobOffers.filter(offer => offer.status === 'active');
};

// Helper function to get job offers by subject area
export const getJobOffersBySubject = (subjectArea: string): JobOffer[] => {
  return mockJobOffers.filter(offer => offer.subject_area === subjectArea);
};
