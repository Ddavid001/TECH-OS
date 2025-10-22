export interface LocalTeacherProfile {
  id: string;
  full_name: string;
  email: string;
  role: 'teacher';
  phone?: string;
  city?: string;
  expertise?: string[];
  experience_years?: number;
  education?: string;
  bio?: string;
}

export const LOCAL_TEACHER_PROFILES: LocalTeacherProfile[] = [
  { id: 'loc-t-1', full_name: 'María González', email: 'maria.gonzalez@gmail.com', role: 'teacher', phone: '+58 412-000-0001', city: 'Caracas', expertise: ['Matemáticas', 'Álgebra'], experience_years: 6, education: 'Lic. Matemáticas - UCV', bio: 'Apasionada por la enseñanza de álgebra y cálculo.' },
  { id: 'loc-t-2', full_name: 'Carlos Pérez', email: 'carlos.perez@gmail.com', role: 'teacher', phone: '+58 414-000-0002', city: 'Caracas', expertise: ['Física'], experience_years: 5, education: 'Lic. Física - USB', bio: 'Experiencia en laboratorio y proyectos STEM.' },
  { id: 'loc-t-3', full_name: 'Ana Rodríguez', email: 'ana.rodriguez@gmail.com', role: 'teacher', phone: '+58 424-000-0003', city: 'Baruta', expertise: ['Inglés'], experience_years: 7, education: 'Lic. Educación mención Inglés - UCAB', bio: 'Docente bilingüe con certificación TEFL.' },
  { id: 'loc-t-4', full_name: 'Luis Fernández', email: 'luis.fernandez@gmail.com', role: 'teacher', phone: '+58 412-000-0004', city: 'Chacao', expertise: ['Programación', 'Bases de Datos'], experience_years: 8, education: 'Ing. Sistemas - UCAB', bio: 'Especialista en backend y SQL.' },
  { id: 'loc-t-5', full_name: 'Sofía Martínez', email: 'sofia.martinez@gmail.com', role: 'teacher', phone: '+58 414-000-0005', city: 'Caracas', expertise: ['Marketing Digital'], experience_years: 4, education: 'Lic. Comunicación - UNIMET', bio: 'Estrategias de contenidos y pauta.' },
  { id: 'loc-t-6', full_name: 'Jorge Ramírez', email: 'jorge.ramirez@gmail.com', role: 'teacher', phone: '+58 412-000-0006', city: 'Los Dos Caminos', expertise: ['Química'], experience_years: 3, education: 'Lic. Química - UCV', bio: 'Enfoque práctico en laboratorio.' },
  { id: 'loc-t-7', full_name: 'Daniela Herrera', email: 'daniela.herrera@gmail.com', role: 'teacher', phone: '+58 414-000-0007', city: 'El Hatillo', expertise: ['Economía'], experience_years: 6, education: 'Economista - UCAB', bio: 'Macroeconomía y finanzas básicas.' },
  { id: 'loc-t-8', full_name: 'Ricardo López', email: 'ricardo.lopez@gmail.com', role: 'teacher', phone: '+58 424-000-0008', city: 'Caracas', expertise: ['Redes', 'Sistemas'], experience_years: 9, education: 'Ing. Telecom - USM', bio: 'Cisco, TCP/IP y seguridad.' },
  { id: 'loc-t-9', full_name: 'Patricia Díaz', email: 'patricia.diaz@gmail.com', role: 'teacher', phone: '+58 412-000-0009', city: 'Caracas', expertise: ['Producción Audiovisual'], experience_years: 5, education: 'Com. Social - UMA', bio: 'Producción y edición con Premiere.' },
  { id: 'loc-t-10', full_name: 'Miguel Torres', email: 'miguel.torres@gmail.com', role: 'teacher', phone: '+58 414-000-0010', city: 'Caracas', expertise: ['Anatomía'], experience_years: 10, education: 'MD - UCV', bio: 'Docente en áreas de salud.' },
  { id: 'loc-t-11', full_name: 'Valentina Suárez', email: 'valentina.suarez@gmail.com', role: 'teacher', phone: '+58 424-000-0011', city: 'Caracas', expertise: ['Econometría'], experience_years: 6, education: 'MSc Economía - UCAB', bio: 'Stata/R y modelos.' },
  { id: 'loc-t-12', full_name: 'Andrés Castillo', email: 'andres.castillo@gmail.com', role: 'teacher', phone: '+58 412-000-0012', city: 'Caracas', expertise: ['Sistemas Operativos', 'C'], experience_years: 7, education: 'Ing. Computación - USB', bio: 'Concurrencia, procesos y Linux.' },
];


