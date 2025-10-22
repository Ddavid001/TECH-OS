import { TeacherProfile } from '@/types';

/**
 * Perfiles de profesores postulantes con experiencia detallada
 * Datos realistas para el sistema de postulaciones
 */
export const teacherProfiles: TeacherProfile[] = [
  {
    id: 'teacher-001',
    firstName: 'Carlos',
    lastName: 'Rodríguez Méndez',
    email: 'carlos.rodriguez@email.com',
    phone: '+58 412-345-6789',
    photo: 'https://i.pravatar.cc/150?img=12',
    bio: 'Matemático apasionado por la enseñanza con más de 8 años de experiencia en educación universitaria. Especializado en análisis matemático y métodos numéricos. He dirigido proyectos de investigación en ecuaciones diferenciales parciales y sus aplicaciones en ingeniería.',
    specialties: ['Cálculo Avanzado', 'Análisis Matemático', 'Ecuaciones Diferenciales', 'Métodos Numéricos'],
    experience: [
      {
        institution: 'Universidad Central de Venezuela',
        position: 'Profesor Asistente',
        subject: 'Matemáticas',
        startDate: '2018-09-01',
        endDate: '2024-07-31',
        description: 'Impartí cursos de cálculo I, II y III, álgebra lineal y ecuaciones diferenciales a estudiantes de ingeniería. Dirigí 15 tesis de pregrado y participé en 3 proyectos de investigación financiados.'
      },
      {
        institution: 'Universidad Simón Bolívar',
        position: 'Instructor',
        subject: 'Matemáticas Aplicadas',
        startDate: '2016-02-01',
        endDate: '2018-08-31',
        description: 'Desarrollé material didáctico innovador para cursos de matemáticas aplicadas. Implementé uso de software especializado (MATLAB, Mathematica) en la enseñanza.'
      }
    ],
    education: [
      {
        degree: 'Doctorado en Matemáticas',
        institution: 'Universidad Central de Venezuela',
        field: 'Análisis Matemático',
        graduationYear: '2022'
      },
      {
        degree: 'Maestría en Matemáticas Aplicadas',
        institution: 'Universidad Simón Bolívar',
        field: 'Métodos Numéricos',
        graduationYear: '2017'
      },
      {
        degree: 'Licenciatura en Matemáticas',
        institution: 'Universidad de Los Andes',
        field: 'Matemáticas Puras',
        graduationYear: '2014'
      }
    ],
    certifications: [
      {
        name: 'Certificación en Pedagogía Universitaria',
        issuer: 'SADPRO-UCV',
        issueDate: '2019-06-15'
      },
      {
        name: 'MATLAB Associate Certification',
        issuer: 'MathWorks',
        issueDate: '2020-03-10'
      }
    ],
    skills: ['MATLAB', 'Mathematica', 'LaTeX', 'Python', 'R', 'Moodle'],
    languages: ['Español (Nativo)', 'Inglés (Avanzado)', 'Francés (Intermedio)'],
    yearsOfExperience: 8,
    cvUrl: '/documents/cv-carlos-rodriguez.pdf',
    linkedinUrl: 'https://linkedin.com/in/carlos-rodriguez-math',
    availableFrom: '2024-11-01',
    preferredLocations: ['Caracas', 'Los Teques'],
    created_at: '2024-09-15T10:00:00Z',
    updated_at: '2024-10-20T15:30:00Z'
  },
  {
    id: 'teacher-002',
    firstName: 'María',
    lastName: 'González Villegas',
    email: 'maria.gonzalez@email.com',
    phone: '+58 424-567-8901',
    photo: 'https://i.pravatar.cc/150?img=5',
    bio: 'Bióloga con Doctorado en Ciencias Biológicas y amplia experiencia en investigación y docencia. Apasionada por la conservación ambiental y la educación científica. He publicado más de 20 artículos en revistas indexadas sobre ecología tropical.',
    specialties: ['Biología Celular', 'Ecología', 'Genética', 'Conservación Ambiental'],
    experience: [
      {
        institution: 'Universidad Simón Bolívar',
        position: 'Profesora Agregada',
        subject: 'Biología',
        startDate: '2016-01-15',
        description: 'Responsable de cursos de biología celular, genética y ecología. Coordinadora del laboratorio de biología molecular. He dirigido 25 tesis de pregrado y 8 de maestría. Investigadora activa con proyectos sobre biodiversidad venezolana.'
      },
      {
        institution: 'IVIC (Instituto Venezolano de Investigaciones Científicas)',
        position: 'Investigadora Postdoctoral',
        subject: 'Ecología Tropical',
        startDate: '2014-06-01',
        endDate: '2015-12-31',
        description: 'Investigación sobre conservación de especies endémicas de la Cordillera de la Costa. Publicaciones en revistas internacionales de alto impacto.'
      }
    ],
    education: [
      {
        degree: 'Doctorado en Ciencias Biológicas',
        institution: 'Universidad Simón Bolívar',
        field: 'Ecología y Evolución',
        graduationYear: '2014'
      },
      {
        degree: 'Licenciatura en Biología',
        institution: 'Universidad Central de Venezuela',
        field: 'Biología',
        graduationYear: '2008'
      }
    ],
    certifications: [
      {
        name: 'Especialista en Manejo de Vida Silvestre',
        issuer: 'MINEC',
        issueDate: '2015-08-20'
      },
      {
        name: 'Certificación en Bioseguridad de Laboratorio',
        issuer: 'OMS',
        issueDate: '2017-11-05'
      }
    ],
    skills: ['Microscopía', 'PCR', 'Análisis Estadístico', 'R', 'SPSS', 'Gestión de Laboratorio'],
    languages: ['Español (Nativo)', 'Inglés (Avanzado)', 'Portugués (Intermedio)'],
    yearsOfExperience: 10,
    cvUrl: '/documents/cv-maria-gonzalez.pdf',
    portfolioUrl: 'https://researchgate.net/profile/Maria-Gonzalez',
    linkedinUrl: 'https://linkedin.com/in/maria-gonzalez-bio',
    availableFrom: '2024-12-01',
    preferredLocations: ['Caracas', 'Valencia'],
    created_at: '2024-09-10T14:20:00Z',
    updated_at: '2024-10-18T09:15:00Z'
  },
  {
    id: 'teacher-003',
    firstName: 'José',
    lastName: 'Martínez Rojas',
    email: 'jose.martinez@email.com',
    phone: '+58 414-678-9012',
    photo: 'https://i.pravatar.cc/150?img=8',
    bio: 'Historiador especializado en historia contemporánea de América Latina. Magíster en Historia con enfoque en historia social y política venezolana del siglo XX. Experiencia en pedagogía innovadora utilizando recursos digitales.',
    specialties: ['Historia de Venezuela', 'Historia Latinoamericana', 'Historia Contemporánea', 'Metodología de la Investigación Histórica'],
    experience: [
      {
        institution: 'Universidad Católica Andrés Bello',
        position: 'Profesor Instructor',
        subject: 'Historia',
        startDate: '2018-09-01',
        description: 'Docente de Historia de Venezuela, Historia Universal Contemporánea y Metodología de la Investigación. He desarrollado proyectos de historia oral con estudiantes, documentando memoria histórica de comunidades caraqueñas.'
      },
      {
        institution: 'Colegio San Ignacio',
        position: 'Profesor de Ciencias Sociales',
        subject: 'Historia y Geografía',
        startDate: '2016-09-01',
        endDate: '2018-08-31',
        description: 'Enseñanza de historia y geografía a estudiantes de bachillerato. Implementé metodologías activas y uso de recursos digitales. Coordiné proyecto de participación estudiantil en museo histórico.'
      }
    ],
    education: [
      {
        degree: 'Maestría en Historia Contemporánea',
        institution: 'Universidad Católica Andrés Bello',
        field: 'Historia de Venezuela',
        graduationYear: '2018'
      },
      {
        degree: 'Licenciatura en Historia',
        institution: 'Universidad Central de Venezuela',
        field: 'Historia',
        graduationYear: '2015'
      }
    ],
    certifications: [
      {
        name: 'Diplomado en Pedagogía Digital',
        issuer: 'UCAB',
        issueDate: '2020-07-15'
      },
      {
        name: 'Archivística y Gestión Documental',
        issuer: 'Archivo General de la Nación',
        issueDate: '2017-05-10'
      }
    ],
    skills: ['Investigación Histórica', 'Análisis Documental', 'Herramientas Digitales', 'Storytelling', 'Canva', 'Presentaciones Multimedia'],
    languages: ['Español (Nativo)', 'Inglés (Avanzado)', 'Italiano (Básico)'],
    yearsOfExperience: 8,
    cvUrl: '/documents/cv-jose-martinez.pdf',
    availableFrom: '2024-11-15',
    preferredLocations: ['Caracas'],
    created_at: '2024-09-20T11:30:00Z',
    updated_at: '2024-10-19T16:45:00Z'
  },
  {
    id: 'teacher-004',
    firstName: 'Ana',
    lastName: 'Pérez Suárez',
    email: 'ana.perez@email.com',
    phone: '+58 426-789-0123',
    photo: 'https://i.pravatar.cc/150?img=1',
    bio: 'Química con experiencia en docencia e investigación. Especializada en química orgánica y ambiental. Comprometida con la formación de jóvenes científicos y la divulgación científica.',
    specialties: ['Química Orgánica', 'Química Analítica', 'Química Ambiental', 'Laboratorio Químico'],
    experience: [
      {
        institution: 'Universidad Central de Venezuela',
        position: 'Profesora Instructora',
        subject: 'Química',
        startDate: '2020-02-01',
        description: 'Docencia en química orgánica I y II, y química ambiental. Coordinadora de prácticas de laboratorio. Desarrollo de experimentos seguros y didácticos para estudiantes de ciencias e ingeniería.'
      },
      {
        institution: 'Laboratorio Ambiental FONACIT',
        position: 'Analista Químico',
        subject: 'Análisis Ambiental',
        startDate: '2018-06-01',
        endDate: '2020-01-31',
        description: 'Análisis de muestras ambientales (agua, suelo, aire). Investigación sobre contaminantes orgánicos. Redacción de informes técnicos y científicos.'
      }
    ],
    education: [
      {
        degree: 'Licenciatura en Química',
        institution: 'Universidad Central de Venezuela',
        field: 'Química',
        graduationYear: '2017'
      },
      {
        degree: 'Técnico Superior en Análisis Químico',
        institution: 'Instituto Universitario de Tecnología',
        field: 'Química Analítica',
        graduationYear: '2014'
      }
    ],
    certifications: [
      {
        name: 'Buenas Prácticas de Laboratorio',
        issuer: 'Colegio de Químicos de Venezuela',
        issueDate: '2018-03-15'
      },
      {
        name: 'Seguridad en Laboratorio Químico',
        issuer: 'UCV - Facultad de Ciencias',
        issueDate: '2019-09-20'
      }
    ],
    skills: ['Cromatografía', 'Espectroscopía', 'Manejo de Residuos', 'Seguridad de Laboratorio', 'Análisis Instrumental'],
    languages: ['Español (Nativo)', 'Inglés (Intermedio)'],
    yearsOfExperience: 6,
    cvUrl: '/documents/cv-ana-perez.pdf',
    availableFrom: '2024-11-01',
    preferredLocations: ['Caracas', 'Maracay'],
    created_at: '2024-09-25T08:45:00Z',
    updated_at: '2024-10-21T12:20:00Z'
  },
  {
    id: 'teacher-005',
    firstName: 'Luis',
    lastName: 'Hernández Silva',
    email: 'luis.hernandez@email.com',
    phone: '+58 412-890-1234',
    photo: 'https://i.pravatar.cc/150?img=15',
    bio: 'Doctor en Física con especialización en física de materiales y óptica. Investigador activo con publicaciones internacionales. Experiencia en formación de recursos humanos en física experimental.',
    specialties: ['Física General', 'Óptica', 'Física de Materiales', 'Física Experimental'],
    experience: [
      {
        institution: 'Universidad Simón Bolívar',
        position: 'Profesor Asistente',
        subject: 'Física',
        startDate: '2017-09-01',
        description: 'Docencia en física I, II, III y laboratorios de física. Investigador en el Grupo de Óptica y Materiales. Dirección de tesis de pregrado y postgrado. Publicaciones en revistas internacionales.'
      },
      {
        institution: 'Universidad de Carabobo',
        position: 'Investigador Postdoctoral',
        subject: 'Física de Materiales',
        startDate: '2015-06-01',
        endDate: '2017-08-31',
        description: 'Investigación en síntesis y caracterización de materiales nanoestructurados. Colaboración con grupos internacionales. Formación de estudiantes en técnicas experimentales avanzadas.'
      }
    ],
    education: [
      {
        degree: 'Doctorado en Física',
        institution: 'Universidad Simón Bolívar',
        field: 'Física de Materiales',
        graduationYear: '2015'
      },
      {
        degree: 'Licenciatura en Física',
        institution: 'Universidad Central de Venezuela',
        field: 'Física',
        graduationYear: '2009'
      }
    ],
    certifications: [
      {
        name: 'Certificación en Espectroscopía Raman',
        issuer: 'Horiba Scientific',
        issueDate: '2016-11-10'
      },
      {
        name: 'Seguridad con Láser',
        issuer: 'Laser Institute of America',
        issueDate: '2018-04-15'
      }
    ],
    skills: ['Espectroscopía', 'Microscopía Electrónica', 'Python', 'OriginLab', 'LaTeX', 'Instrumentación Científica'],
    languages: ['Español (Nativo)', 'Inglés (Avanzado)', 'Alemán (Básico)'],
    yearsOfExperience: 9,
    cvUrl: '/documents/cv-luis-hernandez.pdf',
    portfolioUrl: 'https://scholar.google.com/citations?user=luishernandez',
    linkedinUrl: 'https://linkedin.com/in/luis-hernandez-physics',
    availableFrom: '2024-12-01',
    preferredLocations: ['Caracas', 'Valencia'],
    created_at: '2024-09-12T13:10:00Z',
    updated_at: '2024-10-17T10:35:00Z'
  },
  {
    id: 'teacher-006',
    firstName: 'Carmen',
    lastName: 'Díaz Moreno',
    email: 'carmen.diaz@email.com',
    phone: '+58 424-901-2345',
    photo: 'https://i.pravatar.cc/150?img=9',
    bio: 'Licenciada en Letras con amplia trayectoria en enseñanza de literatura y lengua española. Apasionada por la lectura crítica y la escritura creativa. He desarrollado talleres literarios y clubes de lectura en diversos contextos educativos.',
    specialties: ['Literatura Latinoamericana', 'Lengua Española', 'Escritura Creativa', 'Análisis Literario'],
    experience: [
      {
        institution: 'Universidad Central de Venezuela',
        position: 'Profesora Asociada',
        subject: 'Literatura',
        startDate: '2015-09-01',
        description: 'Enseñanza de literatura latinoamericana, venezolana y universal. Coordinadora del Taller de Escritura Creativa. He publicado ensayos sobre literatura contemporánea y dirigido más de 30 tesis de pregrado.'
      },
      {
        institution: 'Liceo Andrés Bello',
        position: 'Profesora de Castellano y Literatura',
        subject: 'Lengua y Literatura',
        startDate: '2010-09-01',
        endDate: '2015-08-31',
        description: 'Docencia en bachillerato. Implementé círculos de lectura y talleres de escritura. Organicé concursos literarios estudiantiles y encuentros con escritores venezolanos.'
      }
    ],
    education: [
      {
        degree: 'Licenciatura en Letras',
        institution: 'Universidad Central de Venezuela',
        field: 'Literatura Hispanoamericana',
        graduationYear: '2009'
      }
    ],
    certifications: [
      {
        name: 'Diplomado en Enseñanza de la Literatura',
        issuer: 'UCV',
        issueDate: '2012-11-20'
      },
      {
        name: 'Taller de Escritura Creativa',
        issuer: 'Centro de Estudios Latinoamericanos Rómulo Gallegos',
        issueDate: '2014-06-15'
      }
    ],
    skills: ['Análisis Literario', 'Corrección de Textos', 'Dinamización de Lectura', 'Redacción', 'Crítica Literaria'],
    languages: ['Español (Nativo)', 'Inglés (Avanzado)', 'Francés (Intermedio)'],
    yearsOfExperience: 14,
    cvUrl: '/documents/cv-carmen-diaz.pdf',
    availableFrom: '2024-11-01',
    preferredLocations: ['Caracas'],
    created_at: '2024-09-08T09:20:00Z',
    updated_at: '2024-10-20T14:50:00Z'
  },
  {
    id: 'teacher-007',
    firstName: 'Roberto',
    lastName: 'Sánchez Castro',
    email: 'roberto.sanchez@email.com',
    phone: '+58 414-012-3456',
    photo: 'https://i.pravatar.cc/150?img=13',
    bio: 'Ingeniero en Sistemas con más de 8 años de experiencia en desarrollo de software y docencia. Especializado en desarrollo web full-stack y aplicaciones móviles. Apasionado por enseñar programación con metodologías prácticas y proyectos reales.',
    specialties: ['Desarrollo Web', 'JavaScript', 'React', 'Node.js', 'Bases de Datos', 'Programación Orientada a Objetos'],
    experience: [
      {
        institution: 'Instituto Universitario de Tecnología',
        position: 'Profesor de Informática',
        subject: 'Programación y Desarrollo Web',
        startDate: '2019-02-01',
        description: 'Docencia en programación web, bases de datos y desarrollo de aplicaciones. Coordinador del laboratorio de informática. Desarrollo de proyectos reales con estudiantes para empresas locales.'
      },
      {
        institution: 'TechSolutions C.A.',
        position: 'Desarrollador Full-Stack Senior',
        subject: 'Desarrollo de Software',
        startDate: '2016-01-01',
        endDate: '2019-01-31',
        description: 'Desarrollo de aplicaciones web empresariales usando React, Node.js y MongoDB. Liderazgo de equipo de desarrollo. Implementación de metodologías ágiles (Scrum).'
      }
    ],
    education: [
      {
        degree: 'Ingeniería en Sistemas',
        institution: 'Universidad Simón Bolívar',
        field: 'Ingeniería de Software',
        graduationYear: '2015'
      }
    ],
    certifications: [
      {
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        issueDate: '2020-08-15',
        expiryDate: '2023-08-15'
      },
      {
        name: 'MongoDB Certified Developer',
        issuer: 'MongoDB University',
        issueDate: '2019-05-20'
      },
      {
        name: 'React Nanodegree',
        issuer: 'Udacity',
        issueDate: '2018-11-10'
      }
    ],
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Git', 'Docker', 'AWS'],
    languages: ['Español (Nativo)', 'Inglés (Avanzado)'],
    yearsOfExperience: 8,
    cvUrl: '/documents/cv-roberto-sanchez.pdf',
    portfolioUrl: 'https://github.com/robertosanchez',
    linkedinUrl: 'https://linkedin.com/in/roberto-sanchez-dev',
    availableFrom: '2024-11-15',
    preferredLocations: ['Caracas', 'Remoto'],
    created_at: '2024-09-18T15:40:00Z',
    updated_at: '2024-10-22T11:25:00Z'
  },
  {
    id: 'teacher-008',
    firstName: 'Patricia',
    lastName: 'Flores Vargas',
    email: 'patricia.flores@email.com',
    phone: '+58 426-123-4567',
    photo: 'https://i.pravatar.cc/150?img=10',
    bio: 'Licenciada en Idiomas Modernos con más de 12 años de experiencia enseñando inglés como lengua extranjera. Certificada en metodologías internacionales de enseñanza. Experiencia en preparación para exámenes TOEFL e IELTS.',
    specialties: ['Inglés como Lengua Extranjera', 'Inglés para Negocios', 'Preparación TOEFL/IELTS', 'Literatura Inglesa'],
    experience: [
      {
        institution: 'Universidad Metropolitana',
        position: 'Profesora de Inglés',
        subject: 'Inglés',
        startDate: '2012-09-01',
        description: 'Enseñanza de inglés en todos los niveles. Coordinadora del Centro de Idiomas. Desarrollo de programas de inglés para propósitos específicos (negocios, turismo, tecnología). Preparación de estudiantes para certificaciones internacionales.'
      },
      {
        institution: 'Centro Venezolano Americano',
        position: 'Instructora Senior de Inglés',
        subject: 'Inglés',
        startDate: '2010-02-01',
        endDate: '2012-08-31',
        description: 'Enseñanza de inglés general y conversación. Desarrollo de materiales didácticos. Examinadora certificada de Cambridge. Talleres de capacitación para nuevos instructores.'
      }
    ],
    education: [
      {
        degree: 'Licenciatura en Idiomas Modernos',
        institution: 'Universidad Metropolitana',
        field: 'Inglés',
        graduationYear: '2009'
      },
      {
        degree: 'Maestría en Lingüística Aplicada',
        institution: 'Universidad Pedagógica Experimental Libertador',
        field: 'Enseñanza del Inglés',
        graduationYear: '2014'
      }
    ],
    certifications: [
      {
        name: 'CELTA (Certificate in English Language Teaching to Adults)',
        issuer: 'Cambridge Assessment English',
        issueDate: '2011-07-15'
      },
      {
        name: 'IELTS Teacher Training',
        issuer: 'British Council',
        issueDate: '2015-09-20'
      },
      {
        name: 'TOEFL iBT Propell Workshop',
        issuer: 'ETS',
        issueDate: '2018-03-10'
      }
    ],
    skills: ['Metodología Comunicativa', 'Evaluación Lingüística', 'Diseño Curricular', 'Plataformas E-learning', 'Zoom', 'Moodle'],
    languages: ['Español (Nativo)', 'Inglés (Nativo - C2)', 'Francés (Intermedio - B1)'],
    yearsOfExperience: 14,
    cvUrl: '/documents/cv-patricia-flores.pdf',
    linkedinUrl: 'https://linkedin.com/in/patricia-flores-english',
    availableFrom: '2024-12-01',
    preferredLocations: ['Caracas', 'Remoto'],
    created_at: '2024-09-05T10:15:00Z',
    updated_at: '2024-10-19T13:40:00Z'
  },
  {
    id: 'teacher-009',
    firstName: 'Miguel',
    lastName: 'Torres Blanco',
    email: 'miguel.torres@email.com',
    phone: '+58 412-234-5678',
    photo: 'https://i.pravatar.cc/150?img=11',
    bio: 'Licenciado en Educación Física con especialización en entrenamiento deportivo. Experiencia en educación física escolar y entrenamiento de equipos deportivos. Certificado en primeros auxilios y RCP.',
    specialties: ['Educación Física', 'Entrenamiento Deportivo', 'Recreación', 'Psicomotricidad Infantil'],
    experience: [
      {
        institution: 'Colegio San Ignacio',
        position: 'Profesor de Educación Física',
        subject: 'Educación Física y Deportes',
        startDate: '2019-09-01',
        description: 'Planificación y ejecución de clases de educación física para primaria y secundaria. Entrenador de equipos de fútbol y voleibol. Organización de actividades deportivas y recreativas. Promoción de hábitos de vida saludable.'
      },
      {
        institution: 'Club Deportivo Los Samanes',
        position: 'Entrenador de Fútbol Juvenil',
        subject: 'Entrenamiento Deportivo',
        startDate: '2017-01-01',
        endDate: '2019-08-31',
        description: 'Entrenamiento de equipos juveniles categorías sub-13 y sub-15. Planificación de entrenamientos y estrategias de juego. Participación en torneos regionales y nacionales.'
      }
    ],
    education: [
      {
        degree: 'Licenciatura en Educación Física',
        institution: 'Universidad Pedagógica Experimental Libertador',
        field: 'Educación Física y Deportes',
        graduationYear: '2016'
      }
    ],
    certifications: [
      {
        name: 'Licencia UEFA C de Entrenador',
        issuer: 'Federación Venezolana de Fútbol',
        issueDate: '2018-06-20'
      },
      {
        name: 'Primeros Auxilios y RCP',
        issuer: 'Cruz Roja Venezolana',
        issueDate: '2020-02-15',
        expiryDate: '2025-02-15'
      },
      {
        name: 'Entrenamiento Funcional',
        issuer: 'ISSA',
        issueDate: '2019-11-10'
      }
    ],
    skills: ['Planificación Deportiva', 'Metodología de Entrenamiento', 'Evaluación Física', 'Liderazgo de Grupos', 'Primeros Auxilios'],
    languages: ['Español (Nativo)', 'Inglés (Intermedio)'],
    yearsOfExperience: 7,
    cvUrl: '/documents/cv-miguel-torres.pdf',
    availableFrom: '2024-11-01',
    preferredLocations: ['Caracas', 'Miranda'],
    created_at: '2024-09-22T12:30:00Z',
    updated_at: '2024-10-21T09:50:00Z'
  },
  {
    id: 'teacher-010',
    firstName: 'Gabriela',
    lastName: 'Ramírez Ortiz',
    email: 'gabriela.ramirez@email.com',
    phone: '+58 424-345-6789',
    photo: 'https://i.pravatar.cc/150?img=3',
    bio: 'Artista plástica y educadora con pasión por el desarrollo de la creatividad en niños y jóvenes. Experiencia en pintura, dibujo y escultura. He expuesto en galerías nacionales y coordinado proyectos de arte comunitario.',
    specialties: ['Artes Plásticas', 'Dibujo', 'Pintura', 'Escultura', 'Historia del Arte'],
    experience: [
      {
        institution: 'Instituto de Diseño de Caracas',
        position: 'Profesora de Artes Plásticas',
        subject: 'Dibujo y Pintura',
        startDate: '2018-02-01',
        description: 'Enseñanza de técnicas de dibujo, pintura y composición. Coordinación de exposiciones estudiantiles. Desarrollo de proyectos de arte colaborativo. Talleres de experimentación con diversos materiales.'
      },
      {
        institution: 'Escuela de Artes Visuales Cristóbal Rojas',
        position: 'Instructora de Dibujo',
        subject: 'Dibujo Artístico',
        startDate: '2015-09-01',
        endDate: '2018-01-31',
        description: 'Enseñanza de fundamentos de dibujo artístico. Anatomía artística y perspectiva. Preparación de estudiantes para ingreso a universidades de arte.'
      }
    ],
    education: [
      {
        degree: 'Licenciatura en Artes Plásticas',
        institution: 'Universidad de las Artes',
        field: 'Pintura',
        graduationYear: '2014'
      }
    ],
    certifications: [
      {
        name: 'Diplomado en Pedagogía del Arte',
        issuer: 'Museo de Bellas Artes',
        issueDate: '2016-10-20'
      },
      {
        name: 'Taller de Técnicas Mixtas',
        issuer: 'Fundación Museos Nacionales',
        issueDate: '2017-05-15'
      }
    ],
    skills: ['Pintura', 'Dibujo', 'Escultura', 'Arte Digital', 'Illustrator', 'Photoshop', 'Curación de Exposiciones'],
    languages: ['Español (Nativo)', 'Inglés (Intermedio)', 'Italiano (Básico)'],
    yearsOfExperience: 9,
    cvUrl: '/documents/cv-gabriela-ramirez.pdf',
    portfolioUrl: 'https://gabrielaramirez.art',
    availableFrom: '2024-11-15',
    preferredLocations: ['Caracas'],
    created_at: '2024-09-28T14:50:00Z',
    updated_at: '2024-10-20T16:20:00Z'
  }
];

// Función para obtener profesores por especialidad
export const getTeachersBySpecialty = (specialty: string): TeacherProfile[] => {
  return teacherProfiles.filter(teacher => 
    teacher.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase()))
  );
};

// Función para obtener profesores por años de experiencia
export const getTeachersByExperience = (minYears: number): TeacherProfile[] => {
  return teacherProfiles.filter(teacher => teacher.yearsOfExperience >= minYears);
};

// Función para obtener profesores disponibles
export const getAvailableTeachers = (): TeacherProfile[] => {
  const today = new Date().toISOString();
  return teacherProfiles.filter(teacher => 
    !teacher.availableFrom || teacher.availableFrom <= today
  );
};
