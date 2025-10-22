import { TeacherProfile, Profile, JobApplication } from '@/types';

// Mock teacher profiles with complete information
export const mockTeacherProfiles: (Profile & { teacher_profile: TeacherProfile })[] = [
  {
    id: 'teacher-1',
    institution_id: 'univ-ucv',
    first_name: 'Carlos',
    last_name: 'Rodríguez',
    role: 'teacher',
    email: 'carlos.rodriguez@email.com',
    created_at: new Date('2023-01-15').toISOString(),
    teacher_profile: {
      id: 'tp-1',
      user_id: 'teacher-1',
      specialties: ['Matemáticas', 'Cálculo', 'Álgebra Lineal', 'Análisis Matemático'],
      education_level: 'masters',
      years_of_experience: 5,
      certifications: ['Certificado en Pedagogía Universitaria', 'Curso de Didáctica de Matemáticas'],
      languages: ['Español', 'Inglés'],
      bio: 'Profesor de matemáticas con amplia experiencia en enseñanza universitaria. Apasionado por hacer las matemáticas accesibles y fascinantes para todos los estudiantes. Me especializo en análisis matemático y cálculo diferencial e integral.',
      cv_url: '/documents/cv-carlos-rodriguez.pdf',
      linkedin_url: 'https://linkedin.com/in/carlos-rodriguez-math',
      created_at: new Date('2023-01-15').toISOString(),
      updated_at: new Date('2025-10-15').toISOString()
    }
  },
  {
    id: 'teacher-2',
    institution_id: 'univ-usb',
    first_name: 'María',
    last_name: 'González',
    role: 'teacher',
    email: 'maria.gonzalez@email.com',
    created_at: new Date('2022-08-20').toISOString(),
    teacher_profile: {
      id: 'tp-2',
      user_id: 'teacher-2',
      specialties: ['Biología', 'Genética', 'Biología Molecular', 'Ecología'],
      education_level: 'phd',
      years_of_experience: 8,
      certifications: ['Doctorado en Ciencias Biológicas', 'Investigadora Certificada PEII'],
      languages: ['Español', 'Inglés', 'Portugués'],
      bio: 'Doctora en Ciencias Biológicas con especialización en genética molecular. Investigadora activa con publicaciones en revistas internacionales. Me apasiona transmitir el amor por la ciencia a las nuevas generaciones.',
      cv_url: '/documents/cv-maria-gonzalez.pdf',
      portfolio_url: 'https://research.usb.ve/maria-gonzalez',
      linkedin_url: 'https://linkedin.com/in/maria-gonzalez-bio',
      created_at: new Date('2022-08-20').toISOString(),
      updated_at: new Date('2025-10-10').toISOString()
    }
  },
  {
    id: 'teacher-3',
    institution_id: 'univ-ucat',
    first_name: 'José',
    last_name: 'Martínez',
    role: 'teacher',
    email: 'jose.martinez@email.com',
    created_at: new Date('2023-03-10').toISOString(),
    teacher_profile: {
      id: 'tp-3',
      user_id: 'teacher-3',
      specialties: ['Historia', 'Historia Contemporánea', 'Historia de América Latina'],
      education_level: 'masters',
      years_of_experience: 6,
      certifications: ['Magíster en Historia Contemporánea', 'Diplomado en Didáctica de Ciencias Sociales'],
      languages: ['Español', 'Inglés', 'Francés'],
      bio: 'Historiador especializado en historia contemporánea de América Latina. Utilizo metodologías activas para hacer la historia relevante y emocionante. Creo firmemente que entender el pasado es clave para construir el futuro.',
      cv_url: '/documents/cv-jose-martinez.pdf',
      created_at: new Date('2023-03-10').toISOString(),
      updated_at: new Date('2025-09-20').toISOString()
    }
  },
  {
    id: 'teacher-4',
    institution_id: 'univ-ucv',
    first_name: 'Ana',
    last_name: 'Pérez',
    role: 'teacher',
    email: 'ana.perez@email.com',
    created_at: new Date('2023-05-15').toISOString(),
    teacher_profile: {
      id: 'tp-4',
      user_id: 'teacher-4',
      specialties: ['Química', 'Química Orgánica', 'Química Analítica'],
      education_level: 'bachelors',
      years_of_experience: 4,
      certifications: ['Licenciada en Química', 'Certificación en Seguridad de Laboratorio'],
      languages: ['Español', 'Inglés'],
      bio: 'Química con pasión por la enseñanza experimental. Me encanta realizar demostraciones prácticas que hacen que los conceptos químicos cobren vida. Experta en prácticas de laboratorio seguras y efectivas.',
      cv_url: '/documents/cv-ana-perez.pdf',
      created_at: new Date('2023-05-15').toISOString(),
      updated_at: new Date('2025-10-05').toISOString()
    }
  },
  {
    id: 'teacher-5',
    institution_id: 'univ-usb',
    first_name: 'Luis',
    last_name: 'Hernández',
    role: 'teacher',
    email: 'luis.hernandez@email.com',
    created_at: new Date('2022-11-01').toISOString(),
    teacher_profile: {
      id: 'tp-5',
      user_id: 'teacher-5',
      specialties: ['Física', 'Mecánica Cuántica', 'Termodinámica', 'Física Computacional'],
      education_level: 'phd',
      years_of_experience: 7,
      certifications: ['Doctor en Física', 'Investigador PEII Nivel A'],
      languages: ['Español', 'Inglés', 'Alemán'],
      bio: 'Doctor en Física con especialización en mecánica cuántica y física computacional. Investigador activo con colaboraciones internacionales. Busco inspirar la curiosidad científica y el pensamiento crítico en mis estudiantes.',
      cv_url: '/documents/cv-luis-hernandez.pdf',
      portfolio_url: 'https://physics.usb.ve/luis-hernandez',
      linkedin_url: 'https://linkedin.com/in/luis-hernandez-physics',
      created_at: new Date('2022-11-01').toISOString(),
      updated_at: new Date('2025-10-12').toISOString()
    }
  },
  {
    id: 'teacher-6',
    institution_id: 'univ-ucv',
    first_name: 'Carmen',
    last_name: 'Díaz',
    role: 'teacher',
    email: 'carmen.diaz@email.com',
    created_at: new Date('2022-06-15').toISOString(),
    teacher_profile: {
      id: 'tp-6',
      user_id: 'teacher-6',
      specialties: ['Literatura', 'Literatura Latinoamericana', 'Teoría Literaria', 'Escritura Creativa'],
      education_level: 'masters',
      years_of_experience: 9,
      certifications: ['Licenciada en Letras', 'Magíster en Literatura Latinoamericana'],
      languages: ['Español', 'Inglés', 'Italiano'],
      bio: 'Profesora de literatura con pasión por la palabra escrita. Promuevo la lectura crítica y la escritura creativa como herramientas de desarrollo personal y social. Especializada en narrativa latinoamericana contemporánea.',
      cv_url: '/documents/cv-carmen-diaz.pdf',
      linkedin_url: 'https://linkedin.com/in/carmen-diaz-letters',
      created_at: new Date('2022-06-15').toISOString(),
      updated_at: new Date('2025-09-30').toISOString()
    }
  },
  {
    id: 'teacher-7',
    institution_id: 'univ-usb',
    first_name: 'Roberto',
    last_name: 'Sánchez',
    role: 'teacher',
    email: 'roberto.sanchez@email.com',
    created_at: new Date('2023-02-20').toISOString(),
    teacher_profile: {
      id: 'tp-7',
      user_id: 'teacher-7',
      specialties: ['Informática', 'Desarrollo Web', 'Bases de Datos', 'Inteligencia Artificial'],
      education_level: 'masters',
      years_of_experience: 6,
      certifications: ['Ingeniero en Sistemas', 'AWS Certified Solutions Architect', 'Scrum Master Certified'],
      languages: ['Español', 'Inglés'],
      bio: 'Ingeniero en sistemas con amplia experiencia en desarrollo de software y arquitectura de sistemas. Combino la práctica profesional con la docencia para ofrecer una educación actualizada y relevante. Especializado en tecnologías cloud y desarrollo full-stack.',
      cv_url: '/documents/cv-roberto-sanchez.pdf',
      portfolio_url: 'https://github.com/robertosanchez',
      linkedin_url: 'https://linkedin.com/in/roberto-sanchez-dev',
      created_at: new Date('2023-02-20').toISOString(),
      updated_at: new Date('2025-10-18').toISOString()
    }
  },
  {
    id: 'teacher-8',
    institution_id: 'univ-unimet',
    first_name: 'Patricia',
    last_name: 'Flores',
    role: 'teacher',
    email: 'patricia.flores@email.com',
    created_at: new Date('2022-09-05').toISOString(),
    teacher_profile: {
      id: 'tp-8',
      user_id: 'teacher-8',
      specialties: ['Inglés', 'Lingüística', 'Traducción', 'Literatura Inglesa'],
      education_level: 'masters',
      years_of_experience: 10,
      certifications: ['Licenciada en Idiomas Modernos', 'Cambridge CELTA', 'TOEFL Certified Examiner'],
      languages: ['Español', 'Inglés', 'Francés', 'Italiano'],
      bio: 'Profesora de inglés con más de 10 años de experiencia en enseñanza de idiomas. Certificada en metodologías comunicativas y enfoque por tareas. Apasionada por los idiomas y las culturas, busco desarrollar competencias lingüísticas reales en mis estudiantes.',
      cv_url: '/documents/cv-patricia-flores.pdf',
      linkedin_url: 'https://linkedin.com/in/patricia-flores-languages',
      created_at: new Date('2022-09-05').toISOString(),
      updated_at: new Date('2025-10-08').toISOString()
    }
  },
  {
    id: 'teacher-9',
    institution_id: 'univ-ucv',
    first_name: 'Miguel',
    last_name: 'Torres',
    role: 'teacher',
    email: 'miguel.torres@email.com',
    created_at: new Date('2023-04-10').toISOString(),
    teacher_profile: {
      id: 'tp-9',
      user_id: 'teacher-9',
      specialties: ['Educación Física', 'Entrenamiento Deportivo', 'Fisiología del Ejercicio'],
      education_level: 'bachelors',
      years_of_experience: 5,
      certifications: ['Licenciado en Educación Física', 'Entrenador Personal Certificado', 'Primeros Auxilios'],
      languages: ['Español', 'Inglés'],
      bio: 'Profesor de educación física comprometido con el desarrollo integral de los estudiantes a través del deporte y la actividad física. Promuevo hábitos de vida saludables y el trabajo en equipo. Especializado en deportes colectivos y preparación física.',
      cv_url: '/documents/cv-miguel-torres.pdf',
      created_at: new Date('2023-04-10').toISOString(),
      updated_at: new Date('2025-09-25').toISOString()
    }
  },
  {
    id: 'teacher-10',
    institution_id: 'inst-cultart',
    first_name: 'Gabriela',
    last_name: 'Ramírez',
    role: 'teacher',
    email: 'gabriela.ramirez@email.com',
    created_at: new Date('2023-01-20').toISOString(),
    teacher_profile: {
      id: 'tp-10',
      user_id: 'teacher-10',
      specialties: ['Arte', 'Artes Plásticas', 'Diseño', 'Historia del Arte'],
      education_level: 'masters',
      years_of_experience: 7,
      certifications: ['Licenciada en Artes Plásticas', 'Magíster en Historia del Arte'],
      languages: ['Español', 'Inglés'],
      bio: 'Artista plástica y profesora con experiencia en diversas técnicas y medios. Creo en el arte como herramienta de expresión y transformación social. Busco desarrollar la creatividad y sensibilidad artística en cada estudiante.',
      cv_url: '/documents/cv-gabriela-ramirez.pdf',
      portfolio_url: 'https://gabrielaramirezart.com',
      linkedin_url: 'https://linkedin.com/in/gabriela-ramirez-art',
      created_at: new Date('2023-01-20').toISOString(),
      updated_at: new Date('2025-10-01').toISOString()
    }
  },
  {
    id: 'teacher-11',
    institution_id: 'univ-ucat',
    first_name: 'Ricardo',
    last_name: 'Vega',
    role: 'teacher',
    email: 'ricardo.vega@email.com',
    created_at: new Date('2022-07-15').toISOString(),
    teacher_profile: {
      id: 'tp-11',
      user_id: 'teacher-11',
      specialties: ['Derecho', 'Derecho Constitucional', 'Derechos Humanos', 'Derecho Internacional'],
      education_level: 'specialist',
      years_of_experience: 12,
      certifications: ['Abogado', 'Especialista en Derecho Constitucional', 'Diplomado en DDHH'],
      languages: ['Español', 'Inglés', 'Francés'],
      bio: 'Abogado especializado en derecho constitucional con amplia experiencia en litigio y docencia. He participado en casos de relevancia nacional ante tribunales constitucionales. Comprometido con la formación de abogados íntegros y competentes.',
      cv_url: '/documents/cv-ricardo-vega.pdf',
      linkedin_url: 'https://linkedin.com/in/ricardo-vega-law',
      created_at: new Date('2022-07-15').toISOString(),
      updated_at: new Date('2025-10-14').toISOString()
    }
  },
  {
    id: 'teacher-12',
    institution_id: 'univ-unimet',
    first_name: 'Sofía',
    last_name: 'Morales',
    role: 'teacher',
    email: 'sofia.morales@email.com',
    created_at: new Date('2022-10-01').toISOString(),
    teacher_profile: {
      id: 'tp-12',
      user_id: 'teacher-12',
      specialties: ['Economía', 'Macroeconomía', 'Economía Internacional', 'Econometría'],
      education_level: 'phd',
      years_of_experience: 11,
      certifications: ['Doctora en Economía', 'Investigadora Económica', 'CFA Level II'],
      languages: ['Español', 'Inglés'],
      bio: 'Doctora en Economía con especialización en macroeconomía y economía internacional. Investigadora con publicaciones en revistas indexadas. Busco formar economistas con pensamiento crítico capaces de analizar y proponer soluciones a problemas económicos complejos.',
      cv_url: '/documents/cv-sofia-morales.pdf',
      portfolio_url: 'https://economics.unimet.ve/sofia-morales',
      linkedin_url: 'https://linkedin.com/in/sofia-morales-economics',
      created_at: new Date('2022-10-01').toISOString(),
      updated_at: new Date('2025-10-16').toISOString()
    }
  }
];

// Mock job applications
export const mockJobApplications: JobApplication[] = [
  {
    id: 'app-1',
    job_offer_id: 'job-1', // Matemáticas UCV
    teacher_id: 'teacher-1', // Carlos Rodríguez
    status: 'pending',
    cover_letter: 'Me interesa profundamente esta posición ya que mi experiencia en matemáticas avanzadas y mi pasión por la docencia se alinean perfectamente con los requisitos del puesto. He desarrollado metodologías innovadoras para la enseñanza del cálculo que han mejorado significativamente el rendimiento estudiantil.',
    expected_salary: 3500,
    availability_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'app-2',
    job_offer_id: 'job-2', // Ingeniería Software USB
    teacher_id: 'teacher-7', // Roberto Sánchez
    status: 'reviewing',
    cover_letter: 'Como ingeniero en sistemas con experiencia tanto en la industria como en la docencia, creo poder aportar una perspectiva única al programa. Mi experiencia en desarrollo de software empresarial y arquitectura cloud me permite enseñar no solo teoría, sino aplicaciones prácticas del mundo real.',
    expected_salary: 4000,
    availability_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'app-3',
    job_offer_id: 'job-5', // Ciencias Los Arcos
    teacher_id: 'teacher-4', // Ana Pérez (Química)
    status: 'shortlisted',
    cover_letter: 'Mi experiencia en química experimental y mi pasión por la enseñanza de ciencias me hacen ideal para esta posición. Tengo amplia experiencia coordinando laboratorios y preparando estudiantes para competencias científicas.',
    expected_salary: 2200,
    availability_date: '2025-09-01',
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'app-4',
    job_offer_id: 'job-5', // Ciencias Los Arcos
    teacher_id: 'teacher-2', // María González (Biología)
    status: 'pending',
    cover_letter: 'Aunque mi especialidad principal es la biología molecular, tengo sólidos conocimientos en química y física. Mi enfoque investigativo puede inspirar a los estudiantes a ver las ciencias como una aventura de descubrimiento.',
    expected_salary: 2400,
    availability_date: '2025-09-10',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'app-5',
    job_offer_id: 'job-4', // Coordinador Economía UNIMET
    teacher_id: 'teacher-12', // Sofía Morales
    status: 'reviewing',
    cover_letter: 'Con mi doctorado en economía y más de 10 años de experiencia en docencia universitaria, además de mi participación en procesos de acreditación, estoy preparada para liderar la coordinación académica de la Facultad de Economía. Mi visión incluye fortalecer la investigación y mejorar la vinculación con el sector productivo.',
    expected_salary: 4800,
    availability_date: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'app-6',
    job_offer_id: 'job-7', // Derecho Constitucional UCAB
    teacher_id: 'teacher-11', // Ricardo Vega
    status: 'accepted',
    cover_letter: 'Mi especialización en derecho constitucional y mi experiencia en litigio constitucional me permiten ofrecer una formación tanto teórica como práctica. He participado en casos relevantes y puedo compartir estas experiencias con los estudiantes.',
    expected_salary: 2800,
    availability_date: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'app-7',
    job_offer_id: 'job-8', // Diseño Gráfico
    teacher_id: 'teacher-10', // Gabriela Ramírez
    status: 'pending',
    cover_letter: 'Como artista plástica con experiencia en diseño, puedo aportar una perspectiva única que combina la teoría del arte con las aplicaciones prácticas del diseño digital. Mi portfolio demuestra versatilidad en diversos medios y técnicas.',
    expected_salary: 2000,
    availability_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'app-8',
    job_offer_id: 'job-6', // Programación IUTIRLA
    teacher_id: 'teacher-7', // Roberto Sánchez
    status: 'pending',
    cover_letter: 'Aunque también he aplicado a la USB, estoy interesado en esta posición de medio tiempo que me permitiría compartir conocimientos prácticos con estudiantes de TSU. Mi experiencia en la industria puede ser muy valiosa para su formación técnica.',
    expected_salary: 1600,
    availability_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'app-9',
    job_offer_id: 'job-10', // Administración IUTPAL
    teacher_id: 'teacher-12', // Sofía Morales
    status: 'rejected',
    cover_letter: 'Aunque mi especialidad principal es la macroeconomía, tengo conocimientos sólidos en administración que podrían ser útiles para esta posición.',
    expected_salary: 2500,
    availability_date: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'app-10',
    job_offer_id: 'job-1', // Matemáticas UCV
    teacher_id: 'teacher-5', // Luis Hernández (Físico)
    status: 'pending',
    cover_letter: 'Como doctor en física, tengo una sólida formación matemática que incluye análisis matemático avanzado, cálculo tensorial y métodos matemáticos de la física. Creo que puedo aportar una perspectiva interesante sobre las aplicaciones de las matemáticas.',
    expected_salary: 3800,
    availability_date: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Helper functions
export const getTeacherById = (teacherId: string) => {
  return mockTeacherProfiles.find(t => t.id === teacherId);
};

export const getApplicationsByJobOffer = (jobOfferId: string): JobApplication[] => {
  return mockJobApplications.filter(app => app.job_offer_id === jobOfferId);
};

export const getApplicationsByTeacher = (teacherId: string): JobApplication[] => {
  return mockJobApplications.filter(app => app.teacher_id === teacherId);
};

export const getApplicationsByStatus = (status: string): JobApplication[] => {
  return mockJobApplications.filter(app => app.status === status);
};
