// Datos de demostración para Colegio El Alba

export const COLEGIO_EL_ALBA = {
  id: 'colegio-el-alba-demo',
  name: 'Colegio El Alba',
  type: 'school',
  address: 'Av. Principal de Las Mercedes, Caracas, Venezuela',
  latitude: 10.498,  // Las Mercedes, Caracas
  longitude: -66.829,
  attendanceRadiusMeters: 100,
};

// Usuarios del sistema
export const DEMO_USERS = {
  director: {
    id: 'director-001',
    email: 'director@elalba.edu.ve',
    password: 'demo123',
    role: 'admin',
    firstName: 'Roberto',
    lastName: 'Mendoza',
    institutionId: COLEGIO_EL_ALBA.id,
  },
  teachers: [
    {
      id: 'teacher-001',
      email: 'prof.laura@elalba.edu.ve',
      password: 'demo123',
      role: 'teacher',
      firstName: 'Laura',
      lastName: 'Ramírez',
      institutionId: COLEGIO_EL_ALBA.id,
      subject: 'Matemáticas',
    },
    {
      id: 'teacher-002',
      email: 'prof.roberto@elalba.edu.ve',
      password: 'demo123',
      role: 'teacher',
      firstName: 'Roberto',
      lastName: 'García',
      institutionId: COLEGIO_EL_ALBA.id,
      subject: 'Lenguaje y Literatura',
    },
    {
      id: 'teacher-003',
      email: 'prof.carmen@elalba.edu.ve',
      password: 'demo123',
      role: 'teacher',
      firstName: 'Carmen',
      lastName: 'Silva',
      institutionId: COLEGIO_EL_ALBA.id,
      subject: 'Ciencias Naturales',
    },
    {
      id: 'teacher-004',
      email: 'prof.antonio@elalba.edu.ve',
      password: 'demo123',
      role: 'teacher',
      firstName: 'Antonio',
      lastName: 'Díaz',
      institutionId: COLEGIO_EL_ALBA.id,
      subject: 'Historia de Venezuela',
    },
  ],
  students: [
    {
      id: 'student-001',
      email: 'maria.gonzalez@estudiante.elalba.edu.ve',
      password: 'demo123',
      role: 'student',
      firstName: 'María',
      lastName: 'González',
      institutionId: COLEGIO_EL_ALBA.id,
      grade: '4to Grado',
    },
    {
      id: 'student-002',
      email: 'jose.rodriguez@estudiante.elalba.edu.ve',
      password: 'demo123',
      role: 'student',
      firstName: 'José',
      lastName: 'Rodríguez',
      institutionId: COLEGIO_EL_ALBA.id,
      grade: '4to Grado',
    },
    {
      id: 'student-003',
      email: 'ana.martinez@estudiante.elalba.edu.ve',
      password: 'demo123',
      role: 'student',
      firstName: 'Ana',
      lastName: 'Martínez',
      institutionId: COLEGIO_EL_ALBA.id,
      grade: '4to Grado',
    },
    {
      id: 'student-004',
      email: 'carlos.perez@estudiante.elalba.edu.ve',
      password: 'demo123',
      role: 'student',
      firstName: 'Carlos',
      lastName: 'Pérez',
      institutionId: COLEGIO_EL_ALBA.id,
      grade: '4to Grado',
    },
    {
      id: 'student-005',
      email: 'sofia.lopez@estudiante.elalba.edu.ve',
      password: 'demo123',
      role: 'student',
      firstName: 'Sofía',
      lastName: 'López',
      institutionId: COLEGIO_EL_ALBA.id,
      grade: '4to Grado',
    },
  ],
};

// Horarios de clases (formato: día 0=Domingo, 1=Lunes, etc.)
export const DEMO_SCHEDULES = [
  // Matemáticas - Lunes y Miércoles 8:00-9:30
  {
    id: 'schedule-001',
    courseId: 'course-1',
    teacherId: 'teacher-001',
    dayOfWeek: 1, // Lunes
    startTime: '08:00',
    endTime: '09:30',
  },
  {
    id: 'schedule-002',
    courseId: 'course-1',
    teacherId: 'teacher-001',
    dayOfWeek: 3, // Miércoles
    startTime: '08:00',
    endTime: '09:30',
  },
  // Lenguaje - Martes y Jueves 8:00-9:30
  {
    id: 'schedule-003',
    courseId: 'course-2',
    teacherId: 'teacher-002',
    dayOfWeek: 2, // Martes
    startTime: '08:00',
    endTime: '09:30',
  },
  {
    id: 'schedule-004',
    courseId: 'course-2',
    teacherId: 'teacher-002',
    dayOfWeek: 4, // Jueves
    startTime: '08:00',
    endTime: '09:30',
  },
  // Ciencias - Lunes y Miércoles 10:00-11:30
  {
    id: 'schedule-005',
    courseId: 'course-3',
    teacherId: 'teacher-003',
    dayOfWeek: 1, // Lunes
    startTime: '10:00',
    endTime: '11:30',
  },
  {
    id: 'schedule-006',
    courseId: 'course-3',
    teacherId: 'teacher-003',
    dayOfWeek: 3, // Miércoles
    startTime: '10:00',
    endTime: '11:30',
  },
  // Historia - Martes y Jueves 10:00-11:30
  {
    id: 'schedule-007',
    courseId: 'course-4',
    teacherId: 'teacher-004',
    dayOfWeek: 2, // Martes
    startTime: '10:00',
    endTime: '11:30',
  },
  {
    id: 'schedule-008',
    courseId: 'course-4',
    teacherId: 'teacher-004',
    dayOfWeek: 4, // Jueves
    startTime: '10:00',
    endTime: '11:30',
  },
];

export const DEMO_COURSES = [
  { id: 'course-1', name: 'Matemáticas 4to Grado' },
  { id: 'course-2', name: 'Lenguaje y Literatura 4to Grado' },
  { id: 'course-3', name: 'Ciencias Naturales 4to Grado' },
  { id: 'course-4', name: 'Historia de Venezuela 4to Grado' },
  { id: 'course-5', name: 'Educación Física 4to Grado' },
];

export const DEMO_STUDENTS = [
  { 
    id: 'student-1', 
    firstName: 'María', 
    lastName: 'González',
    email: 'maria.gonzalez@estudiante.elalba.edu.ve'
  },
  { 
    id: 'student-2', 
    firstName: 'José', 
    lastName: 'Rodríguez',
    email: 'jose.rodriguez@estudiante.elalba.edu.ve'
  },
  { 
    id: 'student-3', 
    firstName: 'Ana', 
    lastName: 'Martínez',
    email: 'ana.martinez@estudiante.elalba.edu.ve'
  },
  { 
    id: 'student-4', 
    firstName: 'Carlos', 
    lastName: 'Pérez',
    email: 'carlos.perez@estudiante.elalba.edu.ve'
  },
  { 
    id: 'student-5', 
    firstName: 'Sofía', 
    lastName: 'López',
    email: 'sofia.lopez@estudiante.elalba.edu.ve'
  },
  { 
    id: 'student-6', 
    firstName: 'Diego', 
    lastName: 'Fernández',
    email: 'diego.fernandez@estudiante.elalba.edu.ve'
  },
  { 
    id: 'student-7', 
    firstName: 'Isabella', 
    lastName: 'Sánchez',
    email: 'isabella.sanchez@estudiante.elalba.edu.ve'
  },
  { 
    id: 'student-8', 
    firstName: 'Miguel', 
    lastName: 'Torres',
    email: 'miguel.torres@estudiante.elalba.edu.ve'
  },
];

export const DEMO_CALENDAR_EVENTS = [
  {
    id: 'event-1',
    title: 'Examen de Matemáticas - Unidad 3',
    description: 'Fracciones y decimales',
    type: 'exam',
    courseId: 'course-1',
    startsAt: new Date(2025, 9, 28, 9, 0).toISOString(), // 28 Oct 2025, 9 AM
    endsAt: new Date(2025, 9, 28, 11, 0).toISOString(),
    course: { name: 'Matemáticas 4to Grado' }
  },
  {
    id: 'event-2',
    title: 'Taller de Lectura',
    description: 'Análisis de cuentos venezolanos',
    type: 'workshop',
    courseId: 'course-2',
    startsAt: new Date(2025, 9, 29, 10, 0).toISOString(),
    endsAt: new Date(2025, 9, 29, 12, 0).toISOString(),
    course: { name: 'Lenguaje y Literatura 4to Grado' }
  },
  {
    id: 'event-3',
    title: 'Entrega de Proyecto de Ciencias',
    description: 'Proyecto sobre el ciclo del agua',
    type: 'delivery',
    courseId: 'course-3',
    startsAt: new Date(2025, 9, 30, 8, 0).toISOString(),
    endsAt: new Date(2025, 9, 30, 23, 59).toISOString(),
    course: { name: 'Ciencias Naturales 4to Grado' }
  },
  {
    id: 'event-4',
    title: 'Día de la Cultura Venezolana',
    description: 'Evento especial con presentaciones culturales',
    type: 'event',
    courseId: null,
    startsAt: new Date(2025, 9, 31, 8, 0).toISOString(),
    endsAt: new Date(2025, 9, 31, 14, 0).toISOString(),
  },
  {
    id: 'event-5',
    title: 'Clase de Educación Física',
    description: 'Práctica de básquetbol',
    type: 'class',
    courseId: 'course-5',
    startsAt: new Date(2025, 10, 1, 14, 0).toISOString(),
    endsAt: new Date(2025, 10, 1, 15, 30).toISOString(),
    course: { name: 'Educación Física 4to Grado' }
  },
  {
    id: 'event-6',
    title: 'Examen de Historia',
    description: 'Independencia de Venezuela',
    type: 'exam',
    courseId: 'course-4',
    startsAt: new Date(2025, 10, 3, 9, 0).toISOString(),
    endsAt: new Date(2025, 10, 3, 10, 30).toISOString(),
    course: { name: 'Historia de Venezuela 4to Grado' }
  },
];

export const DEMO_MATERIALS = [
  {
    id: 'material-1',
    title: 'Guía de Estudio - Fracciones',
    filePath: '/materiales/guia-fracciones.pdf',
    courseId: 'course-1',
    createdAt: new Date(2025, 9, 15).toISOString(),
    uploadedBy: {
      firstName: 'Prof. Laura',
      lastName: 'Ramírez',
      email: 'laura.ramirez@elalba.edu.ve'
    }
  },
  {
    id: 'material-2',
    title: 'Libro Digital - Literatura Venezolana',
    filePath: '/materiales/literatura-venezolana.pdf',
    courseId: 'course-2',
    createdAt: new Date(2025, 9, 18).toISOString(),
    uploadedBy: {
      firstName: 'Prof. Roberto',
      lastName: 'García',
      email: 'roberto.garcia@elalba.edu.ve'
    }
  },
  {
    id: 'material-3',
    title: 'Video Educativo - El Ciclo del Agua',
    filePath: '/materiales/ciclo-agua.mp4',
    courseId: 'course-3',
    createdAt: new Date(2025, 9, 20).toISOString(),
    uploadedBy: {
      firstName: 'Prof. Carmen',
      lastName: 'Silva',
      email: 'carmen.silva@elalba.edu.ve'
    }
  },
  {
    id: 'material-4',
    title: 'Presentación - Próceres de la Independencia',
    filePath: '/materiales/proceres-venezuela.pptx',
    courseId: 'course-4',
    createdAt: new Date(2025, 9, 22).toISOString(),
    uploadedBy: {
      firstName: 'Prof. Antonio',
      lastName: 'Díaz',
      email: 'antonio.diaz@elalba.edu.ve'
    }
  },
  {
    id: 'material-5',
    title: 'Ejercicios de Matemáticas - Práctica',
    filePath: '/materiales/ejercicios-matematicas.pdf',
    courseId: 'course-1',
    createdAt: new Date(2025, 9, 25).toISOString(),
    uploadedBy: {
      firstName: 'Prof. Laura',
      lastName: 'Ramírez',
      email: 'laura.ramirez@elalba.edu.ve'
    }
  },
];

export const DEMO_EVALUATIONS = [
  {
    id: 'eval-1',
    title: 'Primer Parcial',
    weight: 2,
    date: new Date(2025, 8, 15).toISOString(),
    courseId: 'course-1',
    grades: [
      { id: 'grade-1', studentId: 'student-1', value: 18.5, student: DEMO_STUDENTS[0] },
      { id: 'grade-2', studentId: 'student-2', value: 16.0, student: DEMO_STUDENTS[1] },
      { id: 'grade-3', studentId: 'student-3', value: 19.0, student: DEMO_STUDENTS[2] },
      { id: 'grade-4', studentId: 'student-4', value: 15.5, student: DEMO_STUDENTS[3] },
      { id: 'grade-5', studentId: 'student-5', value: 20.0, student: DEMO_STUDENTS[4] },
      { id: 'grade-6', studentId: 'student-6', value: 17.5, student: DEMO_STUDENTS[5] },
      { id: 'grade-7', studentId: 'student-7', value: 19.5, student: DEMO_STUDENTS[6] },
      { id: 'grade-8', studentId: 'student-8', value: 14.0, student: DEMO_STUDENTS[7] },
    ]
  },
  {
    id: 'eval-2',
    title: 'Quiz de Fracciones',
    weight: 1,
    date: new Date(2025, 9, 5).toISOString(),
    courseId: 'course-1',
    grades: [
      { id: 'grade-9', studentId: 'student-1', value: 9.5, student: DEMO_STUDENTS[0] },
      { id: 'grade-10', studentId: 'student-2', value: 8.0, student: DEMO_STUDENTS[1] },
      { id: 'grade-11', studentId: 'student-3', value: 10.0, student: DEMO_STUDENTS[2] },
      { id: 'grade-12', studentId: 'student-4', value: 7.5, student: DEMO_STUDENTS[3] },
      { id: 'grade-13', studentId: 'student-5', value: 9.0, student: DEMO_STUDENTS[4] },
      { id: 'grade-14', studentId: 'student-6', value: 8.5, student: DEMO_STUDENTS[5] },
      { id: 'grade-15', studentId: 'student-7', value: 10.0, student: DEMO_STUDENTS[6] },
      { id: 'grade-16', studentId: 'student-8', value: 6.5, student: DEMO_STUDENTS[7] },
    ]
  },
  {
    id: 'eval-3',
    title: 'Tarea de Decimales',
    weight: 1,
    date: new Date(2025, 9, 20).toISOString(),
    courseId: 'course-1',
    grades: [
      { id: 'grade-17', studentId: 'student-1', value: 9.0, student: DEMO_STUDENTS[0] },
      { id: 'grade-18', studentId: 'student-2', value: 8.5, student: DEMO_STUDENTS[1] },
      { id: 'grade-19', studentId: 'student-3', value: 9.5, student: DEMO_STUDENTS[2] },
      { id: 'grade-20', studentId: 'student-4', value: 8.0, student: DEMO_STUDENTS[3] },
      { id: 'grade-21', studentId: 'student-5', value: 10.0, student: DEMO_STUDENTS[4] },
      { id: 'grade-22', studentId: 'student-6', value: 9.0, student: DEMO_STUDENTS[5] },
      { id: 'grade-23', studentId: 'student-7', value: 9.5, student: DEMO_STUDENTS[6] },
      { id: 'grade-24', studentId: 'student-8', value: 7.5, student: DEMO_STUDENTS[7] },
    ]
  },
];

// Calificaciones por estudiante para la vista del alumno
export const DEMO_STUDENT_GRADES = [
  {
    id: 'grade-demo-1',
    value: 18.5,
    evaluation: {
      id: 'eval-1',
      title: 'Primer Parcial',
      weight: 2,
      date: new Date(2025, 8, 15).toISOString(),
      course: {
        id: 'course-1',
        name: 'Matemáticas 4to Grado'
      }
    }
  },
  {
    id: 'grade-demo-2',
    value: 9.5,
    evaluation: {
      id: 'eval-2',
      title: 'Quiz de Fracciones',
      weight: 1,
      date: new Date(2025, 9, 5).toISOString(),
      course: {
        id: 'course-1',
        name: 'Matemáticas 4to Grado'
      }
    }
  },
  {
    id: 'grade-demo-3',
    value: 9.0,
    evaluation: {
      id: 'eval-3',
      title: 'Tarea de Decimales',
      weight: 1,
      date: new Date(2025, 9, 20).toISOString(),
      course: {
        id: 'course-1',
        name: 'Matemáticas 4to Grado'
      }
    }
  },
  {
    id: 'grade-demo-4',
    value: 17.5,
    evaluation: {
      id: 'eval-4',
      title: 'Examen de Lectura',
      weight: 2,
      date: new Date(2025, 8, 20).toISOString(),
      course: {
        id: 'course-2',
        name: 'Lenguaje y Literatura 4to Grado'
      }
    }
  },
  {
    id: 'grade-demo-5',
    value: 8.5,
    evaluation: {
      id: 'eval-5',
      title: 'Composición Escrita',
      weight: 1,
      date: new Date(2025, 9, 10).toISOString(),
      course: {
        id: 'course-2',
        name: 'Lenguaje y Literatura 4to Grado'
      }
    }
  },
  {
    id: 'grade-demo-6',
    value: 19.0,
    evaluation: {
      id: 'eval-6',
      title: 'Proyecto de Ciencias',
      weight: 3,
      date: new Date(2025, 8, 25).toISOString(),
      course: {
        id: 'course-3',
        name: 'Ciencias Naturales 4to Grado'
      }
    }
  },
  {
    id: 'grade-demo-7',
    value: 9.0,
    evaluation: {
      id: 'eval-7',
      title: 'Lab: Estados del Agua',
      weight: 1,
      date: new Date(2025, 9, 12).toISOString(),
      course: {
        id: 'course-3',
        name: 'Ciencias Naturales 4to Grado'
      }
    }
  },
];

