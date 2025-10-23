export interface LocalJobOffer {
  id: string;
  institution_id?: string;
  institution_name: string;
  institution_type?: 'school' | 'university' | 'institute';
  position_title: string;
  branch?: string;
  requirements: string;
  schedule?: string;
  description?: string;
  is_active: boolean;
  state?: string;
  city?: string;
}

export const LOCAL_JOB_OFFERS: LocalJobOffer[] = [
  { id: 'offer-1', institution_name: 'Universidad Central de Venezuela (UCV)', institution_type: 'university', state: 'Distrito Capital', city: 'Caracas', position_title: 'Profesor de Matemáticas', branch: 'Ciencias Exactas', requirements: 'Licenciatura en Matemáticas. 3+ años experiencia.', schedule: 'Lun-Vie 7:00-12:00', description: 'Docente para álgebra y cálculo.', is_active: true },
  { id: 'offer-2', institution_name: 'Universidad Simón Bolívar (USB)', institution_type: 'university', state: 'Miranda', city: 'Baruta', position_title: 'Profesor de Programación', branch: 'Ingeniería y Tecnología', requirements: 'Ing. en Computación. Python/Java.', schedule: 'Lun-Mié-Vie 8:00-12:00', description: 'Introducción a Programación.', is_active: true },
  { id: 'offer-3', institution_name: 'Universidad Católica Andrés Bello (UCAB)', institution_type: 'university', state: 'Distrito Capital', city: 'Caracas', position_title: 'Profesor de Inglés', branch: 'Idiomas', requirements: 'Lic. Educación mención Inglés o TEFL/TESOL.', schedule: 'Lun-Vie 13:00-17:00', description: 'Inglés intermedio-avanzado.', is_active: true },
  { id: 'offer-4', institution_name: 'Universidad Metropolitana (UNIMET)', institution_type: 'university', state: 'Miranda', city: 'Caracas', position_title: 'Profesor de Marketing Digital', branch: 'Publicidad y Marketing', requirements: 'Certificaciones Google/Facebook Ads.', schedule: 'Mar-Jue 16:00-20:00', description: 'Estrategias de marketing digital.', is_active: true },
  { id: 'offer-5', institution_name: 'Universidad Santa María (USM)', institution_type: 'university', state: 'Miranda', city: 'Caracas', position_title: 'Profesor de Derecho Civil', branch: 'Derecho', requirements: 'Abogado con Maestría. 5+ años docencia.', schedule: 'Sab 8:00-14:00', description: 'Derecho civil II.', is_active: true },
  { id: 'offer-6', institution_name: 'Universidad Monteávila (UMA)', institution_type: 'university', state: 'Distrito Capital', city: 'Caracas', position_title: 'Profesor de Comunicación Social', branch: 'Comunicación', requirements: 'Comunicador Social con posgrado.', schedule: 'Lun-Mié 14:00-18:00', description: 'Periodismo digital.', is_active: true },
  { id: 'offer-7', institution_name: 'UPEL Caracas', institution_type: 'university', state: 'Distrito Capital', city: 'Caracas', position_title: 'Profesor de Pedagogía', branch: 'Educación', requirements: 'Lic. Educación. Experiencia en aula.', schedule: 'Mar-Jue 8:00-12:00', description: 'Didáctica general.', is_active: true },
  { id: 'offer-8', institution_name: 'UNEFA Caracas', institution_type: 'university', state: 'Distrito Capital', city: 'Caracas', position_title: 'Profesor de Electrónica', branch: 'Ingeniería', requirements: 'Ing. Electrónica. Analógica/Digital.', schedule: 'Lun-Mié 9:00-13:00', description: 'Laboratorio de electrónica.', is_active: true },
  { id: 'offer-9', institution_name: 'UCV - FACES', institution_type: 'university', state: 'Distrito Capital', city: 'Caracas', position_title: 'Profesor de Economía', branch: 'Ciencias Económicas', requirements: 'Economista. Micro/Macro.', schedule: 'Mar-Jue 10:00-14:00', description: 'Economía intermedia.', is_active: true },
  { id: 'offer-10', institution_name: 'UCAB - Escuela de Ingeniería', institution_type: 'university', state: 'Distrito Capital', city: 'Caracas', position_title: 'Profesor de Bases de Datos', branch: 'Ingeniería de Sistemas', requirements: 'SQL/PostgreSQL. 2+ años docencia.', schedule: 'Mar-Jue 15:00-18:00', description: 'Modelado y SQL.', is_active: true },
  { id: 'offer-11', institution_name: 'USB - Matemáticas', institution_type: 'university', state: 'Miranda', city: 'Baruta', position_title: 'Profesor de Cálculo II', branch: 'Matemáticas', requirements: 'Cálculo diferencial/integral.', schedule: 'Lun-Mié-Vie 10:00-12:00', description: 'Cálculo avanzado.', is_active: true },
  { id: 'offer-12', institution_name: 'UNIMET - Escuela de Derecho', institution_type: 'university', state: 'Miranda', city: 'Caracas', position_title: 'Profesor de Derecho Penal', branch: 'Derecho', requirements: 'Penal sustantivo/procesal.', schedule: 'Mie 17:00-21:00', description: 'Derecho penal II.', is_active: true },
  { id: 'offer-13', institution_name: 'USM - Ingeniería', institution_type: 'university', state: 'Miranda', city: 'Caracas', position_title: 'Profesor de Redes', branch: 'Telecomunicaciones', requirements: 'Redes Cisco, TCP/IP.', schedule: 'Sab 9:00-13:00', description: 'Enrutamiento y switching.', is_active: true },
  { id: 'offer-14', institution_name: 'UMA - Comunicación', institution_type: 'university', state: 'Distrito Capital', city: 'Caracas', position_title: 'Profesor de Producción Audiovisual', branch: 'Artes', requirements: 'Producción/Edición (Premiere/DaVinci).', schedule: 'Vie 14:00-18:00', description: 'Producción audiovisual.', is_active: true },
  { id: 'offer-15', institution_name: 'UPEL - Educación Física', institution_type: 'university', state: 'Distrito Capital', city: 'Caracas', position_title: 'Profesor de Educación Física', branch: 'Deporte', requirements: 'Entrenamiento/Metodología.', schedule: 'Mar-Jue 8:00-12:00', description: 'Didáctica del deporte.', is_active: true },
  { id: 'offer-16', institution_name: 'UCV - Medicina', institution_type: 'university', state: 'Distrito Capital', city: 'Caracas', position_title: 'Profesor de Anatomía', branch: 'Salud', requirements: 'Médico con postgrado en Anatomía.', schedule: 'Lun-Mié 7:00-11:00', description: 'Anatomía humana.', is_active: true },
  { id: 'offer-17', institution_name: 'UCAB - Economía', institution_type: 'university', state: 'Distrito Capital', city: 'Caracas', position_title: 'Profesor de Econometría', branch: 'Economía', requirements: 'Econometría/Stata/R.', schedule: 'Mar-Jue 9:00-11:00', description: 'Modelos econométricos.', is_active: true },
  { id: 'offer-18', institution_name: 'USB - Computación', institution_type: 'university', state: 'Miranda', city: 'Baruta', position_title: 'Profesor de Sistemas Operativos', branch: 'Sistemas', requirements: 'Linux, concurrencia, C.', schedule: 'Lun-Mié 14:00-16:00', description: 'Sistemas Operativos.', is_active: true },
  // Ofertas nuevas asociadas a instituciones de Caracas
  { id: 'offer-19', institution_name: 'Universidad Alejandro de Humboldt (UAH)', institution_type: 'university', state: 'Distrito Capital', city: 'Caracas', position_title: 'Profesor de Diseño Web', branch: 'Tecnología', requirements: 'HTML, CSS, JS. 2+ años de experiencia docente.', schedule: 'Mar-Jue 9:00-12:00', description: 'Cátedra de fundamentos de diseño web.', is_active: true },
  { id: 'offer-20', institution_name: 'Universidad José María Vargas (UJMV)', institution_type: 'university', state: 'Distrito Capital', city: 'Caracas', position_title: 'Profesor de Gestión Educativa', branch: 'Educación', requirements: 'Postgrado en Gestión Educativa.', schedule: 'Lun-Mié 13:00-16:00', description: 'Gestión y administración de instituciones educativas.', is_active: true },
  { id: 'offer-21', institution_name: 'Instituto de Diseño de Caracas (IDC)', institution_type: 'institute', state: 'Distrito Capital', city: 'Caracas', position_title: 'Profesor de Ilustración Digital', branch: 'Diseño', requirements: 'Suite Adobe, tableta gráfica, portafolio.', schedule: 'Vie 14:00-18:00', description: 'Ilustración vectorial y rasterizada aplicada.', is_active: true },
];


