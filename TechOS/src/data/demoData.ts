// src/data/demoData.ts
// Datos de la demo del Colegio El Alba - Caso de Estudio Real

export const institution = {
  name: 'Unidad Educativa Privada Colegio "El Alba"',
  shortName: 'Colegio El Alba',
  address: '6ta. Calle transversal con segunda avenida quinta san Rafael número 9, los Palos Grandes Miranda, Venezuela',
  coordinates: {
    lat: 10.498, // Coordenadas aproximadas para la demo (Los Palos Grandes, Caracas)
    lon: -66.829,
  },
  attendanceRadiusMeters: 150, // Radio de asistencia permitido en metros
  phone: '+58 212-555-0123',
  type: 'Privada',
  levels: ['Educación Básica', 'Educación Media'],
};

// Instituciones académicas de Caracas para el mapa
// Instituciones educativas reales de Venezuela (Caracas) con cifras realistas
export const caracasInstitutions = [
  // Universidades
  {
    id: 'univ-001',
    name: 'Universidad Central de Venezuela',
    type: 'Universidad',
    sector: 'Público',
    coordinates: { lat: 10.4895, lon: -66.8887 },
    district: 'Ciudad Universitaria',
    students: 'Por determinar',
    status: 'active',
    phone: '+58 212-605-2000',
    website: 'www.ucv.ve',
    description: 'Universidad autónoma más antigua de Venezuela, fundada en 1721. Patrimonio de la Humanidad UNESCO desde 2000.',
    programs: ['Medicina', 'Ingeniería', 'Derecho', 'Arquitectura', 'Ciencias', 'Humanidades', 'Agronomía', 'Veterinaria', 'Odontología', 'Farmacia']
  },
  {
    id: 'univ-002',
    name: 'Universidad Simón Bolívar',
    type: 'Universidad',
    sector: 'Público',
    coordinates: { lat: 10.4078, lon: -66.8769 },
    district: 'Sartenejas',
    students: 'Por determinar',
    status: 'active',
    phone: '+58 212-906-3111',
    website: 'www.usb.ve',
    description: 'Universidad experimental de excelencia en ciencia y tecnología, fundada en 1967.',
    programs: ['Ingeniería Eléctrica', 'Ingeniería Electrónica', 'Ingeniería Mecánica', 'Ingeniería de Materiales', 'Ciencias', 'Arquitectura', 'Urbanismo']
  },
  {
    id: 'univ-003',
    name: 'Universidad Católica Andrés Bello',
    type: 'Universidad',
    sector: 'Privado',
    coordinates: { lat: 10.4482, lon: -66.8750 },
    district: 'Montalbán',
    students: 'Por determinar',
    status: 'active',
    phone: '+58 212-407-4444',
    website: 'www.ucab.edu.ve',
    description: 'Universidad jesuita reconocida por su excelencia académica, fundada en 1953.',
    programs: ['Comunicación Social', 'Derecho', 'Administración', 'Ingeniería', 'Educación', 'Humanidades', 'Ciencias Económicas']
  },
  {
    id: 'univ-004',
    name: 'Universidad Metropolitana',
    type: 'Universidad',
    sector: 'Privado',
    coordinates: { lat: 10.4930, lon: -66.8182 },
    district: 'Terrazas del Ávila',
    students: 'Por determinar',
    status: 'active',
    phone: '+58 212-240-3111',
    website: 'www.unimet.edu.ve',
    description: 'Universidad privada enfocada en innovación y emprendimiento, fundada en 1970.',
    programs: ['Administración', 'Ingeniería', 'Educación', 'Comunicación', 'Psicología', 'Ciencias']
  },
  
  // Institutos
  {
    id: 'inst-001',
    name: 'Instituto Universitario de Tecnología',
    type: 'Instituto',
    sector: 'Público',
    coordinates: { lat: 10.5015, lon: -66.9138 },
    district: 'La Yaguara',
    students: 'Por determinar',
    status: 'active',
    phone: '+58 212-576-4800',
    description: 'Instituto tecnológico de educación superior con más de 40 años formando técnicos.',
    programs: ['Informática', 'Electrónica', 'Administración', 'Contaduría']
  },
  {
    id: 'inst-002',
    name: 'Instituto Pedagógico de Caracas',
    type: 'Instituto',
    sector: 'Público',
    coordinates: { lat: 10.5060, lon: -66.9020 },
    district: 'El Paraíso',
    students: 'Por determinar',
    status: 'active',
    phone: '+58 212-451-3211',
    description: 'Formación de docentes de alta calidad desde 1936.',
    programs: ['Educación', 'Pedagogía', 'Docencia en Ciencias', 'Docencia en Humanidades']
  },
  
  // Colegios
  {
    id: 'col-001',
    name: 'Colegio El Alba',
    type: 'Colegio',
    sector: 'Privado',
    coordinates: { lat: 10.498, lon: -66.829 },
    district: 'Los Palos Grandes',
    students: 'Por determinar',
    status: 'active',
    phone: '+58 212-285-7654',
    description: 'Institución educativa de excelencia con más de 30 años de trayectoria en educación integral.',
    levels: ['Preescolar', 'Básica', 'Media']
  },
  {
    id: 'col-002',
    name: 'Colegio San Ignacio de Loyola',
    type: 'Colegio',
    sector: 'Privado',
    coordinates: { lat: 10.485, lon: -66.852 },
    district: 'Altamira',
    students: 'Por determinar',
    status: 'active',
    phone: '+58 212-263-1073',
    description: 'Colegio jesuita de excelencia académica fundado en 1952.',
    levels: ['Preescolar', 'Básica', 'Media']
  },
  {
    id: 'col-003',
    name: 'Liceo Andrés Bello',
    type: 'Colegio',
    sector: 'Público',
    coordinates: { lat: 10.501, lon: -66.887 },
    district: 'Sabana Grande',
    students: 'Por determinar',
    status: 'active',
    phone: '+58 212-762-3456',
    description: 'Liceo público emblemático de Caracas con más de 60 años de historia.',
    levels: ['Media']
  },
  {
    id: 'col-004',
    name: 'Colegio Emil Friedman',
    type: 'Colegio',
    sector: 'Privado',
    coordinates: { lat: 10.496, lon: -66.835 },
    district: 'Los Palos Grandes',
    students: 'Por determinar',
    status: 'active',
    phone: '+58 212-285-2143',
    description: 'Educación integral con énfasis en valores y desarrollo humano.',
    levels: ['Preescolar', 'Básica', 'Media']
  },
  {
    id: 'col-005',
    name: 'U.E. La Salle',
    type: 'Colegio',
    sector: 'Privado',
    coordinates: { lat: 10.489, lon: -66.893 },
    district: 'La Florida',
    students: 'Por determinar',
    status: 'active',
    phone: '+58 212-731-5678',
    description: 'Red de colegios La Salle en Venezuela, educación cristiana lasallista.',
    levels: ['Preescolar', 'Básica', 'Media']
  },
  {
    id: 'col-006',
    name: 'Colegio Santiago de León',
    type: 'Colegio',
    sector: 'Privado',
    coordinates: { lat: 10.505, lon: -66.915 },
    district: 'Las Mercedes',
    students: 'Por determinar',
    status: 'active',
    phone: '+58 212-993-4321',
    description: 'Educación de calidad con énfasis en formación bilingüe.',
    levels: ['Preescolar', 'Básica', 'Media']
  },
];

export const demoUsers = {
  director: {
    id: 'user-director-01',
    name: 'Adoración Barros',
    role: 'Director',
    email: 'director@elalba.com',
    password: 'password123',
    position: 'Directora',
  },
  subdirector: {
    id: 'user-subdirector-01',
    name: 'María Alejandra Mujica',
    role: 'Subdirector',
    email: 'subdirector@elalba.com',
    password: 'password123',
    position: 'Subdirectora',
  },
  teachers: [
    { 
      id: 'user-teacher-01', 
      name: 'Prof. Carlos Mendoza', 
      role: 'Docente', 
      email: 'profe.mates@elalba.com', 
      password: 'password123',
      subject: 'Matemáticas',
    },
    { 
      id: 'user-teacher-02', 
      name: 'Profa. Laura Ramírez', 
      role: 'Docente', 
      email: 'profe.castellano@elalba.com', 
      password: 'password123',
      subject: 'Castellano y Literatura',
    },
    { 
      id: 'user-teacher-03', 
      name: 'Prof. Roberto Sánchez', 
      role: 'Docente', 
      email: 'profe.ciencia@elalba.com', 
      password: 'password123',
      subject: 'Física y Química',
    },
    { 
      id: 'user-teacher-04', 
      name: 'Profa. Carmen Silva', 
      role: 'Docente', 
      email: 'profe.ghc@elalba.com', 
      password: 'password123',
      subject: 'GHC (Geografía, Historia y Ciudadanía)',
    },
    { 
      id: 'user-teacher-05', 
      name: 'Prof. Antonio Díaz', 
      role: 'Docente', 
      email: 'profe.deporte@elalba.com', 
      password: 'password123',
      subject: 'Educación Física',
    },
    { 
      id: 'user-teacher-06', 
      name: 'Profa. Isabel Torres', 
      role: 'Docente', 
      email: 'profe.artes@elalba.com', 
      password: 'password123',
      subject: 'Artes Plásticas',
    },
  ],
  students: [
    { 
      id: 'user-student-01', 
      name: 'Ana Pérez', 
      role: 'Estudiante', 
      email: 'ana.perez@elalba.com', 
      password: 'password123', 
      year: 5,
      section: 'A',
    },
    { 
      id: 'user-student-02', 
      name: 'Luis González', 
      role: 'Estudiante', 
      email: 'luis.gonzalez@elalba.com', 
      password: 'password123', 
      year: 5,
      section: 'A',
    },
    { 
      id: 'user-student-03', 
      name: 'Sofía Rodríguez', 
      role: 'Estudiante', 
      email: 'sofia.rodriguez@elalba.com', 
      password: 'password123', 
      year: 4,
      section: 'B',
    },
    { 
      id: 'user-student-04', 
      name: 'Carlos Martínez', 
      role: 'Estudiante', 
      email: 'carlos.martinez@elalba.com', 
      password: 'password123', 
      year: 4,
      section: 'B',
    },
    { 
      id: 'user-student-05', 
      name: 'María Fernández', 
      role: 'Estudiante', 
      email: 'maria.fernandez@elalba.com', 
      password: 'password123', 
      year: 5,
      section: 'A',
    },
    // Más estudiantes de diferentes años
    { 
      id: 'user-student-06', 
      name: 'Diego Ramírez', 
      role: 'Estudiante', 
      email: 'diego.ramirez@elalba.com', 
      password: 'password123', 
      year: 3,
      section: 'A',
    },
    { 
      id: 'user-student-07', 
      name: 'Valentina Castro', 
      role: 'Estudiante', 
      email: 'valentina.castro@elalba.com', 
      password: 'password123', 
      year: 3,
      section: 'B',
    },
    { 
      id: 'user-student-08', 
      name: 'Andrés Torres', 
      role: 'Estudiante', 
      email: 'andres.torres@elalba.com', 
      password: 'password123', 
      year: 2,
      section: 'A',
    },
    { 
      id: 'user-student-09', 
      name: 'Isabella Morales', 
      role: 'Estudiante', 
      email: 'isabella.morales@elalba.com', 
      password: 'password123', 
      year: 2,
      section: 'B',
    },
    { 
      id: 'user-student-10', 
      name: 'Sebastián Vargas', 
      role: 'Estudiante', 
      email: 'sebastian.vargas@elalba.com', 
      password: 'password123', 
      year: 1,
      section: 'A',
    },
  ],
};

// Eventos académicos y calendario
export const academicEvents = [
  {
    id: 'event-001',
    title: 'Examen de Matemáticas',
    date: '2025-10-25',
    time: '08:00',
    type: 'exam',
    year: 5,
    subject: 'Matemáticas',
    location: 'Aula 301',
  },
  {
    id: 'event-002',
    title: 'Entrega de Proyecto de Física',
    date: '2025-10-27',
    time: '10:00',
    type: 'assignment',
    year: 5,
    subject: 'Física y Química',
    location: 'Lab 1',
  },
  {
    id: 'event-003',
    title: 'Reunión de Representantes',
    date: '2025-10-28',
    time: '14:00',
    type: 'meeting',
    location: 'Auditorio',
  },
  {
    id: 'event-004',
    title: 'Día del Deporte',
    date: '2025-10-30',
    time: '07:00',
    type: 'activity',
    location: 'Cancha Principal',
  },
  {
    id: 'event-005',
    title: 'Taller de Arte',
    date: '2025-10-29',
    time: '13:00',
    type: 'workshop',
    location: 'Salón de Artes',
  },
  {
    id: 'event-006',
    title: 'Examen de Literatura',
    date: '2025-11-02',
    time: '08:00',
    type: 'exam',
    year: 4,
    subject: 'Castellano y Literatura',
    location: 'Aula 302',
  },
];

export const subjects = {
  matematicas: { 
    id: 'mat', 
    name: 'Matemáticas', 
    color: '#166534',
    colorLight: '#dcfce7',
    teacher: 'Prof. Carlos Mendoza',
  },
  fisica: { 
    id: 'fis', 
    name: 'Física', 
    color: '#881337',
    colorLight: '#fce7f3',
    teacher: 'Prof. Roberto Sánchez',
  },
  quimica: { 
    id: 'qui', 
    name: 'Química', 
    color: '#854d0e',
    colorLight: '#fef9c3',
    teacher: 'Prof. Roberto Sánchez',
  },
  castellano: { 
    id: 'cas', 
    name: 'Castellano y Literatura', 
    color: '#1e3a8a',
    colorLight: '#dbeafe',
    teacher: 'Profa. Laura Ramírez',
  },
  ghc: { 
    id: 'ghc', 
    name: 'GHC', 
    color: '#3f6212',
    colorLight: '#ecfccb',
    teacher: 'Profa. Carmen Silva',
  },
  artes: { 
    id: 'art', 
    name: 'Artes Plásticas', 
    color: '#5b21b6',
    colorLight: '#f3e8ff',
    teacher: 'Profa. Isabel Torres',
  },
  edFisica: { 
    id: 'edf', 
    name: 'Educación Física', 
    color: '#991b1b',
    colorLight: '#fee2e2',
    teacher: 'Prof. Antonio Díaz',
  },
  preMilitar: { 
    id: 'pre', 
    name: 'Educación Pre Militar', 
    color: '#314863',
    colorLight: '#e0e7ff',
    teacher: 'Instructor Militar',
  },
};

// Horario transcrito del PDF del Colegio El Alba
export const schedules = {
  '5': { // 5to Año
    'Lunes': { 
      '7:00': subjects.matematicas, 
      '8:30': subjects.fisica, 
      '10:00': subjects.quimica, 
      '11:30': subjects.artes 
    },
    'Martes': { 
      '7:00': subjects.edFisica, 
      '8:30': subjects.castellano 
    },
    'Miércoles': { 
      '7:00': subjects.ghc, 
      '8:30': subjects.matematicas, 
      '10:00': subjects.fisica 
    },
    'Jueves': { 
      '7:00': subjects.quimica, 
      '8:30': subjects.artes, 
      '10:00': subjects.edFisica, 
      '11:30': subjects.castellano 
    },
    'Viernes': { 
      '7:00': subjects.ghc, 
      '8:30': subjects.matematicas, 
      '10:00': subjects.fisica 
    },
  },
  '4': { // 4to Año (basado en el horario del PDF)
    'Lunes': { 
      '7:00': subjects.matematicas, 
      '8:30': subjects.preMilitar, 
      '10:00': subjects.quimica 
    },
    'Martes': { 
      '7:00': subjects.fisica, 
      '8:30': subjects.ghc 
    },
    'Miércoles': { 
      '7:00': subjects.castellano, 
      '8:30': subjects.edFisica, 
      '10:00': subjects.artes 
    },
    'Jueves': { 
      '7:00': subjects.matematicas, 
      '8:30': subjects.preMilitar, 
      '10:00': subjects.quimica, 
      '11:30': subjects.fisica 
    },
    'Viernes': { 
      '7:00': subjects.ghc, 
      '8:30': subjects.castellano, 
      '10:00': subjects.edFisica, 
      '11:30': subjects.artes 
    },
  },
};

// Bloques de hora (cada clase dura 1:30 horas)
export const timeBlocks = ['7:00', '8:30', '10:00', '11:30', '13:00'];

// Días de la semana
export const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

// Función auxiliar para obtener la clase actual según el día y hora
export function getCurrentClass(year: number): {
  subject: typeof subjects[keyof typeof subjects] | null;
  nextSubject: typeof subjects[keyof typeof subjects] | null;
  isClassTime: boolean;
} {
  const now = new Date();
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const currentDay = dayNames[now.getDay()];
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  // Si no es día de semana o no existe horario para ese año
  if (!weekDays.includes(currentDay) || !schedules[year as 4 | 5]) {
    return { subject: null, nextSubject: null, isClassTime: false };
  }

  const daySchedule = schedules[year as 4 | 5][currentDay as keyof typeof schedules['4' | '5']];
  if (!daySchedule) {
    return { subject: null, nextSubject: null, isClassTime: false };
  }

  // Convertir horarios a minutos
  const timeSlots = Object.keys(daySchedule).map(time => {
    const [hour, minute] = time.split(':').map(Number);
    return {
      time,
      minutes: hour * 60 + minute,
      subject: daySchedule[time as keyof typeof daySchedule],
    };
  }).sort((a, b) => a.minutes - b.minutes);

  // Encontrar la clase actual
  let currentSubject = null;
  let nextSubject = null;
  let isClassTime = false;

  for (let i = 0; i < timeSlots.length; i++) {
    const slot = timeSlots[i];
    const classEndTime = slot.minutes + 90; // 1:30 horas = 90 minutos

    if (currentTimeInMinutes >= slot.minutes && currentTimeInMinutes < classEndTime) {
      // Estamos en clase
      currentSubject = slot.subject;
      isClassTime = true;
      if (i < timeSlots.length - 1) {
        nextSubject = timeSlots[i + 1].subject;
      }
      break;
    } else if (currentTimeInMinutes < slot.minutes) {
      // La próxima clase
      nextSubject = slot.subject;
      break;
    }
  }

  return { 
    subject: currentSubject, 
    nextSubject: nextSubject || timeSlots[0]?.subject || null, 
    isClassTime 
  };
}

// Datos simulados de asistencia para la demo
export const mockAttendanceData = [
  {
    id: 'att-001',
    userId: 'user-student-01',
    userName: 'Ana Pérez',
    subject: 'Matemáticas',
    time: '7:15 AM',
    status: 'present',
    distance: 45,
    coordinates: { lat: 10.4981, lon: -66.8291 },
  },
  {
    id: 'att-002',
    userId: 'user-student-02',
    userName: 'Luis González',
    subject: 'Matemáticas',
    time: '7:12 AM',
    status: 'present',
    distance: 32,
    coordinates: { lat: 10.4979, lon: -66.8289 },
  },
  {
    id: 'att-003',
    userId: 'user-student-05',
    userName: 'María Fernández',
    subject: 'Física',
    time: '8:45 AM',
    status: 'present',
    distance: 67,
    coordinates: { lat: 10.4983, lon: -66.8295 },
  },
  {
    id: 'att-004',
    userId: 'user-student-03',
    userName: 'Sofía Rodríguez',
    subject: 'Química',
    time: '10:25 AM',
    status: 'out_of_range',
    distance: 235,
    coordinates: { lat: 10.5005, lon: -66.8310 },
  },
  {
    id: 'att-005',
    userId: 'user-student-04',
    userName: 'Carlos Martínez',
    subject: 'Castellano',
    time: '11:40 AM',
    status: 'present',
    distance: 89,
    coordinates: { lat: 10.4977, lon: -66.8287 },
  },
];

// Estadísticas simuladas para el dashboard del director
export const mockStatistics = {
  todayAttendance: 85, // Porcentaje
  totalStudents: 120,
  presentToday: 102,
  absentToday: 18,
  lateToday: 5,
  totalTeachers: 15,
  activeClasses: 8,
  pendingRegistrations: 3,
};

export default {
  institution,
  demoUsers,
  subjects,
  schedules,
  timeBlocks,
  weekDays,
  getCurrentClass,
  mockAttendanceData,
  mockStatistics,
};

