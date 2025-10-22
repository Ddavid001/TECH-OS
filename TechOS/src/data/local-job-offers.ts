export interface LocalJobOffer {
  id: string;
  institution_id?: string;
  institution_name: string;
  position_title: string;
  branch?: string;
  requirements: string;
  tentative_salary?: string;
  schedule?: string;
  description?: string;
  is_active: boolean;
}

export const LOCAL_JOB_OFFERS: LocalJobOffer[] = [
  { id: 'offer-1', institution_name: 'Universidad Central de Venezuela (UCV)', position_title: 'Profesor de Matemáticas', branch: 'Ciencias Exactas', requirements: 'Licenciatura en Matemáticas. 3+ años experiencia.', tentative_salary: '$800 - $1,200', schedule: 'Lun-Vie 7:00-12:00', description: 'Docente para álgebra y cálculo.', is_active: true },
  { id: 'offer-2', institution_name: 'Universidad Simón Bolívar (USB)', position_title: 'Profesor de Programación', branch: 'Ingeniería y Tecnología', requirements: 'Ing. en Computación. Python/Java.', tentative_salary: '$1,200 - $1,800', schedule: 'Lun-Mié-Vie 8:00-12:00', description: 'Introducción a Programación.', is_active: true },
  { id: 'offer-3', institution_name: 'Universidad Católica Andrés Bello (UCAB)', position_title: 'Profesor de Inglés', branch: 'Idiomas', requirements: 'Lic. Educación mención Inglés o TEFL/TESOL.', tentative_salary: '$700 - $1,000', schedule: 'Lun-Vie 13:00-17:00', description: 'Inglés intermedio-avanzado.', is_active: true },
  { id: 'offer-4', institution_name: 'Universidad Metropolitana (UNIMET)', position_title: 'Profesor de Marketing Digital', branch: 'Publicidad y Marketing', requirements: 'Certificaciones Google/Facebook Ads.', tentative_salary: '$900 - $1,400', schedule: 'Mar-Jue 16:00-20:00', description: 'Estrategias de marketing digital.', is_active: true },
  { id: 'offer-5', institution_name: 'Universidad Santa María (USM)', position_title: 'Profesor de Derecho Civil', branch: 'Derecho', requirements: 'Abogado con Maestría. 5+ años docencia.', tentative_salary: '$1,100 - $1,600', schedule: 'Sab 8:00-14:00', description: 'Derecho civil II.', is_active: true },
  { id: 'offer-6', institution_name: 'Universidad Monteávila (UMA)', position_title: 'Profesor de Comunicación Social', branch: 'Comunicación', requirements: 'Comunicador Social con posgrado.', tentative_salary: '$800 - $1,200', schedule: 'Lun-Mié 14:00-18:00', description: 'Periodismo digital.', is_active: true },
  { id: 'offer-7', institution_name: 'UPEL Caracas', position_title: 'Profesor de Pedagogía', branch: 'Educación', requirements: 'Lic. Educación. Experiencia en aula.', tentative_salary: '$750 - $1,100', schedule: 'Mar-Jue 8:00-12:00', description: 'Didáctica general.', is_active: true },
  { id: 'offer-8', institution_name: 'UNEFA Caracas', position_title: 'Profesor de Electrónica', branch: 'Ingeniería', requirements: 'Ing. Electrónica. Analógica/Digital.', tentative_salary: '$1,000 - $1,500', schedule: 'Lun-Mié 9:00-13:00', description: 'Laboratorio de electrónica.', is_active: true },
  { id: 'offer-9', institution_name: 'UCV - FACES', position_title: 'Profesor de Economía', branch: 'Ciencias Económicas', requirements: 'Economista. Micro/Macro.', tentative_salary: '$900 - $1,400', schedule: 'Mar-Jue 10:00-14:00', description: 'Economía intermedia.', is_active: true },
  { id: 'offer-10', institution_name: 'UCAB - Escuela de Ingeniería', position_title: 'Profesor de Bases de Datos', branch: 'Ingeniería de Sistemas', requirements: 'SQL/PostgreSQL. 2+ años docencia.', tentative_salary: '$1,200 - $1,700', schedule: 'Mar-Jue 15:00-18:00', description: 'Modelado y SQL.', is_active: true },
  { id: 'offer-11', institution_name: 'USB - Matemáticas', position_title: 'Profesor de Cálculo II', branch: 'Matemáticas', requirements: 'Cálculo diferencial/integral.', tentative_salary: '$1,000 - $1,500', schedule: 'Lun-Mié-Vie 10:00-12:00', description: 'Cálculo avanzado.', is_active: true },
  { id: 'offer-12', institution_name: 'UNIMET - Escuela de Derecho', position_title: 'Profesor de Derecho Penal', branch: 'Derecho', requirements: 'Penal sustantivo/procesal.', tentative_salary: '$1,100 - $1,600', schedule: 'Mie 17:00-21:00', description: 'Derecho penal II.', is_active: true },
  { id: 'offer-13', institution_name: 'USM - Ingeniería', position_title: 'Profesor de Redes', branch: 'Telecomunicaciones', requirements: 'Redes Cisco, TCP/IP.', tentative_salary: '$1,000 - $1,400', schedule: 'Sab 9:00-13:00', description: 'Enrutamiento y switching.', is_active: true },
  { id: 'offer-14', institution_name: 'UMA - Comunicación', position_title: 'Profesor de Producción Audiovisual', branch: 'Artes', requirements: 'Producción/Edición (Premiere/DaVinci).', tentative_salary: '$900 - $1,300', schedule: 'Vie 14:00-18:00', description: 'Producción audiovisual.', is_active: true },
  { id: 'offer-15', institution_name: 'UPEL - Educación Física', position_title: 'Profesor de Educación Física', branch: 'Deporte', requirements: 'Entrenamiento/Metodología.', tentative_salary: '$800 - $1,100', schedule: 'Mar-Jue 8:00-12:00', description: 'Didáctica del deporte.', is_active: true },
  { id: 'offer-16', institution_name: 'UCV - Medicina', position_title: 'Profesor de Anatomía', branch: 'Salud', requirements: 'Médico con postgrado en Anatomía.', tentative_salary: '$1,300 - $1,900', schedule: 'Lun-Mié 7:00-11:00', description: 'Anatomía humana.', is_active: true },
  { id: 'offer-17', institution_name: 'UCAB - Economía', position_title: 'Profesor de Econometría', branch: 'Economía', requirements: 'Econometría/Stata/R.', tentative_salary: '$1,200 - $1,800', schedule: 'Mar-Jue 9:00-11:00', description: 'Modelos econométricos.', is_active: true },
  { id: 'offer-18', institution_name: 'USB - Computación', position_title: 'Profesor de Sistemas Operativos', branch: 'Sistemas', requirements: 'Linux, concurrencia, C.', tentative_salary: '$1,300 - $1,900', schedule: 'Lun-Mié 14:00-16:00', description: 'Sistemas Operativos.', is_active: true },
];


