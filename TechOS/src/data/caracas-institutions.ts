import { MapMarker } from '@/types';

// Datos de instituciones educativas en Caracas
export const caracasInstitutions: MapMarker[] = [
  {
    id: 'univ-ucv',
    name: 'Universidad Central de Venezuela',
    type: 'university',
    latitude: 10.4907,
    longitude: -66.8926,
    address: 'Ciudad Universitaria, Caracas',
    jobOffers: ['Profesor de Matemáticas', 'Investigador en Ciencias Sociales', 'Asistente Administrativo']
  },
  {
    id: 'univ-usb',
    name: 'Universidad Simón Bolívar',
    type: 'university',
    latitude: 10.4113,
    longitude: -66.8837,
    address: 'Valle de Sartenejas, Caracas',
    jobOffers: ['Profesor de Ingeniería', 'Coordinador de Laboratorio', 'Asistente de Investigación']
  },
  {
    id: 'univ-unimet',
    name: 'Universidad Metropolitana',
    type: 'university',
    latitude: 10.4624,
    longitude: -66.8265,
    address: 'Autopista Petare-Guarenas, Caracas',
    jobOffers: ['Profesor de Economía', 'Coordinador Académico', 'Asistente de Biblioteca']
  },
  {
    id: 'school-sanignacio',
    name: 'Colegio San Ignacio',
    type: 'school',
    latitude: 10.4954,
    longitude: -66.8468,
    address: 'Av. Las Palmas, Chacao, Caracas',
    jobOffers: ['Profesor de Primaria', 'Coordinador de Actividades', 'Psicólogo Escolar']
  },
  {
    id: 'school-losarcos',
    name: 'Colegio Los Arcos',
    type: 'school',
    latitude: 10.4805,
    longitude: -66.8553,
    address: 'Calle Los Laboratorios, Los Ruices, Caracas',
    jobOffers: ['Profesor de Ciencias', 'Asistente de Aula', 'Coordinador Deportivo']
  },
  {
    id: 'inst-iutirla',
    name: 'Instituto Universitario de Tecnología Industrial Rodolfo Loero Arismendi',
    type: 'institute',
    latitude: 10.5060,
    longitude: -66.9099,
    address: 'Av. Principal de Los Ruices, Caracas',
    jobOffers: ['Profesor de Tecnología', 'Asistente Técnico', 'Coordinador de Pasantías']
  },
  {
    id: 'inst-iutpal',
    name: 'Instituto Universitario de Tecnología de Administración Industrial',
    type: 'institute',
    latitude: 10.4890,
    longitude: -66.8790,
    address: 'Av. Francisco de Miranda, Caracas',
    jobOffers: ['Profesor de Administración', 'Asistente Contable', 'Coordinador de Programas']
  },
  {
    id: 'school-campobosco',
    name: 'Colegio Don Bosco',
    type: 'school',
    latitude: 10.5087,
    longitude: -66.9175,
    address: 'Av. Principal de Altamira, Caracas',
    jobOffers: ['Profesor de Secundaria', 'Orientador Vocacional', 'Asistente Administrativo']
  },
  {
    id: 'univ-ucat',
    name: 'Universidad Católica Andrés Bello',
    type: 'university',
    latitude: 10.4917,
    longitude: -66.8632,
    address: 'Urb. Montalbán, La Vega, Caracas',
    jobOffers: ['Profesor de Derecho', 'Investigador', 'Coordinador de Extensión']
  },
  {
    id: 'inst-cultart',
    name: 'Instituto de Diseño de Caracas',
    type: 'institute',
    latitude: 10.4970,
    longitude: -66.8540,
    address: 'Av. Libertador, Caracas',
    jobOffers: ['Profesor de Diseño Gráfico', 'Asistente de Taller', 'Coordinador de Exposiciones']
  }
];

// Datos de ofertas laborales por categoría
export const jobOffersByCategory = {
  'Educación': [
    { title: 'Profesor de Matemáticas', institution: 'Universidad Central de Venezuela', location: 'Caracas', type: 'Tiempo completo' },
    { title: 'Profesor de Primaria', institution: 'Colegio San Ignacio', location: 'Caracas', type: 'Tiempo completo' },
    { title: 'Profesor de Ciencias', institution: 'Colegio Los Arcos', location: 'Caracas', type: 'Medio tiempo' }
  ],
  'Administración': [
    { title: 'Asistente Administrativo', institution: 'Universidad Central de Venezuela', location: 'Caracas', type: 'Tiempo completo' },
    { title: 'Coordinador Académico', institution: 'Universidad Metropolitana', location: 'Caracas', type: 'Tiempo completo' },
    { title: 'Asistente Contable', institution: 'Instituto Universitario de Tecnología de Administración Industrial', location: 'Caracas', type: 'Medio tiempo' }
  ],
  'Investigación': [
    { title: 'Investigador en Ciencias Sociales', institution: 'Universidad Central de Venezuela', location: 'Caracas', type: 'Proyecto' },
    { title: 'Asistente de Investigación', institution: 'Universidad Simón Bolívar', location: 'Caracas', type: 'Beca' },
    { title: 'Investigador', institution: 'Universidad Católica Andrés Bello', location: 'Caracas', type: 'Tiempo completo' }
  ],
  'Tecnología': [
    { title: 'Profesor de Tecnología', institution: 'Instituto Universitario de Tecnología Industrial Rodolfo Loero Arismendi', location: 'Caracas', type: 'Tiempo completo' },
    { title: 'Asistente Técnico', institution: 'Instituto Universitario de Tecnología Industrial Rodolfo Loero Arismendi', location: 'Caracas', type: 'Medio tiempo' },
    { title: 'Coordinador de Laboratorio', institution: 'Universidad Simón Bolívar', location: 'Caracas', type: 'Tiempo completo' }
  ]
};