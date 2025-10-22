import { JobOffer } from '@/types';

/**
 * Datos de ofertas laborales para instituciones educativas en Caracas
 * Coherentes con las instituciones del mapa
 */
export const jobOffers: JobOffer[] = [
  // Universidad Central de Venezuela
  {
    id: 'job-ucv-1',
    title: 'Profesor de Matemáticas Avanzadas',
    institution: 'Universidad Central de Venezuela',
    institutionType: 'university',
    location: 'Ciudad Universitaria, Caracas',
    description: 'Buscamos un profesor apasionado por las matemáticas para impartir cursos de cálculo avanzado, álgebra lineal y ecuaciones diferenciales a estudiantes de ingeniería y ciencias.',
    requirements: [
      'Doctorado en Matemáticas o campo relacionado',
      'Mínimo 3 años de experiencia docente universitaria',
      'Publicaciones en revistas indexadas',
      'Dominio de herramientas computacionales (MATLAB, Mathematica)',
      'Experiencia en investigación matemática'
    ],
    responsibilities: [
      'Impartir clases de matemáticas avanzadas',
      'Diseñar y evaluar material didáctico',
      'Dirigir proyectos de investigación',
      'Tutorías personalizadas a estudiantes',
      'Participar en comités académicos'
    ],
    benefits: [
      'Salario competitivo',
      'Acceso a laboratorios y recursos de investigación',
      'Oportunidades de publicación',
      'Formación continua',
      'Seguro médico'
    ],
    salary: '2000-3000 USD/mes',
    contractType: 'full-time',
    category: 'Educación',
    subject: 'Matemáticas',
    vacancies: 2,
    postedDate: '2024-10-15',
    deadline: '2024-11-30',
    contactEmail: 'rrhh.ciencias@ucv.edu.ve',
    isActive: true
  },
  {
    id: 'job-ucv-2',
    title: 'Investigador en Ciencias Sociales',
    institution: 'Universidad Central de Venezuela',
    institutionType: 'university',
    location: 'Ciudad Universitaria, Caracas',
    description: 'Investigador para el Centro de Estudios Sociales. Enfoque en políticas públicas y desarrollo social en Venezuela.',
    requirements: [
      'Maestría o Doctorado en Sociología, Ciencias Políticas o afines',
      'Experiencia en metodología de investigación cualitativa',
      'Publicaciones académicas',
      'Conocimientos en análisis de datos sociales',
      'Capacidad de trabajo en equipo'
    ],
    responsibilities: [
      'Desarrollar proyectos de investigación',
      'Publicar resultados en revistas académicas',
      'Presentar en conferencias',
      'Colaborar con otras instituciones',
      'Dirigir tesistas'
    ],
    benefits: [
      'Financiamiento para investigación',
      'Red de colaboración internacional',
      'Participación en congresos',
      'Acceso a bases de datos especializadas'
    ],
    contractType: 'full-time',
    category: 'Investigación',
    vacancies: 1,
    postedDate: '2024-10-10',
    deadline: '2024-11-20',
    contactEmail: 'investigacion@ucv.edu.ve',
    isActive: true
  },
  
  // Universidad Simón Bolívar
  {
    id: 'job-usb-1',
    title: 'Profesor de Ingeniería Electrónica',
    institution: 'Universidad Simón Bolívar',
    institutionType: 'university',
    location: 'Valle de Sartenejas, Caracas',
    description: 'Docente para el departamento de Electrónica. Especialización en sistemas embebidos y procesamiento de señales.',
    requirements: [
      'Doctorado en Ingeniería Electrónica o Eléctrica',
      'Experiencia en diseño de circuitos digitales',
      'Conocimiento en microcontroladores y FPGA',
      'Experiencia docente mínima de 2 años',
      'Nivel de inglés avanzado'
    ],
    responsibilities: [
      'Impartir cursos de electrónica digital y analógica',
      'Supervisar proyectos de grado',
      'Mantener laboratorios actualizados',
      'Investigación aplicada',
      'Vincular con la industria'
    ],
    benefits: [
      'Laboratorios equipados',
      'Apoyo para investigación',
      'Convenios industriales',
      'Desarrollo profesional continuo'
    ],
    salary: '2500-3500 USD/mes',
    contractType: 'full-time',
    category: 'Educación',
    subject: 'Ingeniería',
    vacancies: 1,
    postedDate: '2024-10-12',
    deadline: '2024-12-01',
    contactEmail: 'empleos@usb.ve',
    isActive: true
  },
  {
    id: 'job-usb-2',
    title: 'Coordinador de Laboratorio de Física',
    institution: 'Universidad Simón Bolívar',
    institutionType: 'university',
    location: 'Valle de Sartenejas, Caracas',
    description: 'Coordinador para laboratorios de física experimental. Gestión de equipos y desarrollo de prácticas.',
    requirements: [
      'Licenciatura en Física o Ingeniería',
      'Experiencia en gestión de laboratorios',
      'Conocimiento de equipos de medición',
      'Habilidades administrativas',
      'Capacidad de liderazgo'
    ],
    responsibilities: [
      'Gestionar inventario de equipos',
      'Desarrollar guías de prácticas',
      'Capacitar personal técnico',
      'Mantener equipos calibrados',
      'Coordinar horarios de laboratorio'
    ],
    benefits: [
      'Estabilidad laboral',
      'Capacitación técnica',
      'Ambiente universitario',
      'Seguro médico'
    ],
    contractType: 'full-time',
    category: 'Administración',
    vacancies: 1,
    postedDate: '2024-10-18',
    deadline: '2024-11-25',
    contactEmail: 'fisica.lab@usb.ve',
    isActive: true
  },

  // Universidad Metropolitana
  {
    id: 'job-unimet-1',
    title: 'Profesor de Economía y Finanzas',
    institution: 'Universidad Metropolitana',
    institutionType: 'university',
    location: 'Autopista Petare-Guarenas, Caracas',
    description: 'Docente para cursos de pregrado en economía, finanzas corporativas y mercados financieros.',
    requirements: [
      'Maestría en Economía o Finanzas',
      'Certificaciones profesionales (CFA, CPA) valoradas',
      'Experiencia en sector financiero',
      'Conocimiento de Excel y herramientas financieras',
      'Mínimo 2 años de experiencia docente'
    ],
    responsibilities: [
      'Impartir clases de economía y finanzas',
      'Desarrollar casos de estudio',
      'Asesorar trabajos de grado',
      'Actualizar contenidos',
      'Vincular con el sector empresarial'
    ],
    benefits: [
      'Salario competitivo',
      'Flexibilidad horaria',
      'Red empresarial',
      'Desarrollo profesional'
    ],
    salary: '1800-2800 USD/mes',
    contractType: 'part-time',
    category: 'Educación',
    subject: 'Economía',
    vacancies: 2,
    postedDate: '2024-10-14',
    deadline: '2024-11-28',
    contactEmail: 'economia@unimet.edu.ve',
    isActive: true
  },

  // Colegio San Ignacio
  {
    id: 'job-sanignacio-1',
    title: 'Profesor de Primaria',
    institution: 'Colegio San Ignacio',
    institutionType: 'school',
    location: 'Av. Las Palmas, Chacao, Caracas',
    description: 'Maestro de primaria para 4to grado. Se requiere vocación pedagógica y valores ignacianos.',
    requirements: [
      'Licenciatura en Educación Integral o Mención Primaria',
      'Experiencia mínima de 2 años con niños',
      'Conocimiento del modelo pedagógico ignaciano',
      'Dominio de herramientas digitales educativas',
      'Valores católicos y compromiso educativo'
    ],
    responsibilities: [
      'Planificar y ejecutar clases',
      'Evaluar el progreso de estudiantes',
      'Comunicación con representantes',
      'Participar en actividades escolares',
      'Trabajo en equipo con otros docentes'
    ],
    benefits: [
      'Ambiente educativo de excelencia',
      'Capacitación continua',
      'Comunidad educativa activa',
      'Estabilidad laboral',
      'Seguro médico'
    ],
    salary: '800-1200 USD/mes',
    contractType: 'full-time',
    category: 'Educación',
    subject: 'Educación Primaria',
    vacancies: 1,
    postedDate: '2024-10-16',
    deadline: '2024-11-15',
    contactEmail: 'rrhh@sanignacio.edu.ve',
    isActive: true
  },
  {
    id: 'job-sanignacio-2',
    title: 'Psicólogo Escolar',
    institution: 'Colegio San Ignacio',
    institutionType: 'school',
    location: 'Av. Las Palmas, Chacao, Caracas',
    description: 'Profesional de psicología para apoyo emocional y académico de estudiantes de primaria y secundaria.',
    requirements: [
      'Licenciatura en Psicología',
      'Especialización en Psicología Educativa o Infantil',
      'Experiencia en orientación escolar',
      'Conocimiento de pruebas psicométricas',
      'Empatía y habilidades de comunicación'
    ],
    responsibilities: [
      'Evaluación psicológica de estudiantes',
      'Orientación individual y grupal',
      'Talleres para padres y docentes',
      'Intervención en casos especiales',
      'Apoyo en adaptación escolar'
    ],
    benefits: [
      'Ambiente profesional',
      'Trabajo con equipo multidisciplinario',
      'Formación continua',
      'Impacto social positivo'
    ],
    contractType: 'full-time',
    category: 'Educación',
    vacancies: 1,
    postedDate: '2024-10-17',
    isActive: true
  },

  // Colegio Los Arcos
  {
    id: 'job-losarcos-1',
    title: 'Profesor de Ciencias Naturales',
    institution: 'Colegio Los Arcos',
    institutionType: 'school',
    location: 'Calle Los Laboratorios, Los Ruices, Caracas',
    description: 'Docente de ciencias para educación media. Énfasis en experimentos y aprendizaje práctico.',
    requirements: [
      'Licenciatura en Biología, Química o Educación Mención Ciencias',
      'Experiencia en laboratorio escolar',
      'Creatividad para enseñanza práctica',
      'Paciencia con adolescentes',
      'Nivel intermedio de inglés'
    ],
    responsibilities: [
      'Impartir clases de biología y química',
      'Organizar prácticas de laboratorio',
      'Evaluar proyectos científicos',
      'Participar en ferias científicas',
      'Mantener seguridad en laboratorio'
    ],
    benefits: [
      'Laboratorios bien equipados',
      'Apoyo en materiales didácticos',
      'Crecimiento profesional',
      'Buen ambiente laboral'
    ],
    salary: '700-1000 USD/mes',
    contractType: 'full-time',
    category: 'Educación',
    subject: 'Ciencias',
    vacancies: 1,
    postedDate: '2024-10-13',
    deadline: '2024-11-30',
    contactEmail: 'admision@losarcos.edu.ve',
    isActive: true
  },

  // Instituto de Tecnología
  {
    id: 'job-iutirla-1',
    title: 'Profesor de Programación y Desarrollo Web',
    institution: 'Instituto Universitario de Tecnología Industrial Rodolfo Loero Arismendi',
    institutionType: 'institute',
    location: 'Av. Principal de Los Ruices, Caracas',
    description: 'Instructor técnico para programas de TSU en Informática. Enfoque en desarrollo web moderno.',
    requirements: [
      'TSU o Licenciatura en Informática',
      'Experiencia profesional en desarrollo web',
      'Dominio de JavaScript, React, Node.js',
      'Conocimiento de bases de datos',
      'Portfolio de proyectos reales'
    ],
    responsibilities: [
      'Impartir clases prácticas de programación',
      'Supervisar proyectos finales',
      'Actualizar contenido tecnológico',
      'Vincular estudiantes con empresas',
      'Organizar talleres y hackathons'
    ],
    benefits: [
      'Horario flexible',
      'Conexión con industria tech',
      'Ambiente dinámico',
      'Actualización tecnológica constante'
    ],
    salary: '1000-1500 USD/mes',
    contractType: 'part-time',
    category: 'Tecnología',
    subject: 'Programación',
    vacancies: 2,
    postedDate: '2024-10-11',
    deadline: '2024-12-05',
    contactEmail: 'informatica@iutirla.edu.ve',
    isActive: true
  },
  {
    id: 'job-iutirla-2',
    title: 'Coordinador de Pasantías',
    institution: 'Instituto Universitario de Tecnología Industrial Rodolfo Loero Arismendi',
    institutionType: 'institute',
    location: 'Av. Principal de Los Ruices, Caracas',
    description: 'Profesional para coordinar pasantías empresariales de estudiantes de TSU.',
    requirements: [
      'Licenciatura en Administración, RRHH o afines',
      'Red de contactos empresariales',
      'Experiencia en gestión de pasantías',
      'Excelentes habilidades de comunicación',
      'Conocimiento del sector industrial'
    ],
    responsibilities: [
      'Gestionar convenios con empresas',
      'Asignar pasantes a organizaciones',
      'Supervisar desarrollo de pasantías',
      'Evaluar desempeño de estudiantes',
      'Reportar a coordinación académica'
    ],
    benefits: [
      'Red empresarial amplia',
      'Autonomía en gestión',
      'Impacto en formación profesional',
      'Estabilidad'
    ],
    contractType: 'full-time',
    category: 'Administración',
    vacancies: 1,
    postedDate: '2024-10-19',
    isActive: true
  },

  // Universidad Católica Andrés Bello
  {
    id: 'job-ucab-1',
    title: 'Profesor de Derecho Constitucional',
    institution: 'Universidad Católica Andrés Bello',
    institutionType: 'university',
    location: 'Urb. Montalbán, La Vega, Caracas',
    description: 'Docente para la Escuela de Derecho. Especialización en derecho público y constitucional.',
    requirements: [
      'Abogado con Maestría en Derecho Constitucional',
      'Experiencia litigante o académica',
      'Publicaciones jurídicas',
      'Conocimiento de jurisprudencia venezolana',
      'Excelente oratoria'
    ],
    responsibilities: [
      'Impartir Derecho Constitucional',
      'Dirigir seminarios de investigación',
      'Asesorar trabajos de grado',
      'Participar en foros académicos',
      'Publicar investigaciones'
    ],
    benefits: [
      'Prestigio institucional',
      'Biblioteca jurídica especializada',
      'Red de egresados',
      'Desarrollo académico'
    ],
    salary: '2000-3000 USD/mes',
    contractType: 'part-time',
    category: 'Educación',
    subject: 'Derecho',
    vacancies: 1,
    postedDate: '2024-10-08',
    deadline: '2024-11-18',
    contactEmail: 'derecho@ucab.edu.ve',
    isActive: true
  },

  // Instituto de Diseño
  {
    id: 'job-diseño-1',
    title: 'Profesor de Diseño Gráfico Digital',
    institution: 'Instituto de Diseño de Caracas',
    institutionType: 'institute',
    location: 'Av. Libertador, Caracas',
    description: 'Instructor creativo para programas de diseño gráfico. Enfoque en herramientas Adobe y tendencias digitales.',
    requirements: [
      'TSU o Licenciatura en Diseño Gráfico',
      'Portfolio profesional destacado',
      'Dominio de Adobe Creative Suite',
      'Experiencia en agencias o freelance',
      'Conocimiento de UX/UI valorado'
    ],
    responsibilities: [
      'Impartir talleres de diseño',
      'Evaluar proyectos creativos',
      'Asesorar portafolios de estudiantes',
      'Organizar exposiciones',
      'Vincular con industria creativa'
    ],
    benefits: [
      'Ambiente creativo',
      'Equipos y software actualizado',
      'Flexibilidad creativa',
      'Red de diseñadores'
    ],
    salary: '900-1400 USD/mes',
    contractType: 'part-time',
    category: 'Educación',
    subject: 'Diseño',
    vacancies: 1,
    postedDate: '2024-10-20',
    deadline: '2024-12-10',
    isActive: true
  }
];

// Categorías de ofertas
export const jobCategories = [
  'Educación',
  'Investigación',
  'Administración',
  'Tecnología'
];

// Tipos de contrato
export const contractTypes = {
  'full-time': 'Tiempo Completo',
  'part-time': 'Medio Tiempo',
  'contract': 'Contrato',
  'temporary': 'Temporal'
};
