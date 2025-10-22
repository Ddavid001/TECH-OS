export type InstitutionType = 'school' | 'university' | 'institute';

export interface VenezuelaInstitution {
  id: string;
  name: string;
  type: InstitutionType;
  latitude: number;
  longitude: number;
}

export const VENEZUELA_INSTITUTIONS: VenezuelaInstitution[] = [
  // Caracas (Distrito Capital)
  { id: 've-ucv', name: 'Universidad Central de Venezuela (UCV)', type: 'university', latitude: 10.489722, longitude: -66.889167 },
  { id: 've-usb', name: 'Universidad Simón Bolívar (USB)', type: 'university', latitude: 10.408611, longitude: -66.886111 },
  { id: 've-ucab', name: 'Universidad Católica Andrés Bello (UCAB)', type: 'university', latitude: 10.503056, longitude: -66.936944 },
  { id: 've-unimet', name: 'Universidad Metropolitana (UNIMET)', type: 'university', latitude: 10.497222, longitude: -66.826389 },
  { id: 've-usm', name: 'Universidad Santa María (USM)', type: 'university', latitude: 10.5019, longitude: -66.8269 },
  { id: 've-ema', name: 'Colegio Emil Friedman', type: 'school', latitude: 10.476667, longitude: -66.869444 },
  { id: 've-ign', name: 'Colegio San Ignacio de Loyola', type: 'school', latitude: 10.494722, longitude: -66.865278 },

  // Maracaibo (Zulia)
  { id: 've-luz', name: 'Universidad del Zulia (LUZ)', type: 'university', latitude: 10.666667, longitude: -71.6125 },
  { id: 've-unermb', name: 'UNERMB Cabimas', type: 'university', latitude: 10.399, longitude: -71.438 },
  { id: 've-colegio-zulia-1', name: 'Colegio Gonzaga Maracaibo', type: 'school', latitude: 10.6505, longitude: -71.6075 },

  // Valencia (Carabobo)
  { id: 've-uc', name: 'Universidad de Carabobo (UC)', type: 'university', latitude: 10.249, longitude: -67.968 },
  { id: 've-colegio-carabobo-1', name: 'Colegio Jefferson Valencia', type: 'school', latitude: 10.196, longitude: -68.012 },

  // Barquisimeto (Lara)
  { id: 've-ucla', name: 'Universidad Centroccidental Lisandro Alvarado (UCLA)', type: 'university', latitude: 10.069, longitude: -69.322 },
  { id: 've-colegio-lara-1', name: 'Colegio Las Colinas', type: 'school', latitude: 10.054, longitude: -69.298 },

  // Mérida (Mérida)
  { id: 've-ula', name: 'Universidad de Los Andes (ULA)', type: 'university', latitude: 8.593, longitude: -71.144 },
  { id: 've-colegio-merida-1', name: 'Colegio La Salle Mérida', type: 'school', latitude: 8.613, longitude: -71.157 },

  // San Cristóbal (Táchira)
  { id: 've-una-tachira', name: 'Universidad Nacional Abierta Táchira', type: 'university', latitude: 7.773, longitude: -72.226 },
  { id: 've-colegio-tachira-1', name: 'Colegio Los Angeles', type: 'school', latitude: 7.762, longitude: -72.226 },

  // Puerto La Cruz / Barcelona (Anzoátegui)
  { id: 've-udo-anzo', name: 'UDO Anzoátegui', type: 'university', latitude: 10.182, longitude: -64.636 },
  { id: 've-colegio-anzo-1', name: 'Colegio Juan XXIII PLC', type: 'school', latitude: 10.207, longitude: -64.676 },

  // Puerto Ordaz (Bolívar)
  { id: 've-unes-bolivar', name: 'UNEXPO Puerto Ordaz', type: 'university', latitude: 8.286, longitude: -62.736 },
  { id: 've-colegio-bolivar-1', name: 'Colegio Loyola Gumilla', type: 'school', latitude: 8.296, longitude: -62.727 },

  // Maturín (Monagas)
  { id: 've-udo-monagas', name: 'UDO Monagas', type: 'university', latitude: 9.748, longitude: -63.177 },
  { id: 've-colegio-monagas-1', name: 'Colegio María Inmaculada', type: 'school', latitude: 9.74, longitude: -63.18 },

  // Cumaná (Sucre)
  { id: 've-udo-sucre', name: 'UDO Sucre', type: 'university', latitude: 10.456, longitude: -64.173 },
  { id: 've-colegio-sucre-1', name: 'Colegio Francisco Vicente Aguilera', type: 'school', latitude: 10.468, longitude: -64.185 },

  // Maracay (Aragua)
  { id: 've-ucv-maracay', name: 'UCV Maracay - Veterinaria', type: 'university', latitude: 10.279, longitude: -67.638 },
  { id: 've-colegio-aragua-1', name: 'Colegio San José Maracay', type: 'school', latitude: 10.252, longitude: -67.598 },

  // Coro (Falcón)
  { id: 've-unefm', name: 'Universidad Nacional Experimental Francisco de Miranda (UNEFM)', type: 'university', latitude: 11.406, longitude: -69.673 },
  { id: 've-colegio-falcon-1', name: 'Colegio Los Médanos', type: 'school', latitude: 11.404, longitude: -69.676 },

  // Ciudad Guayana (Bolívar)
  { id: 've-uneg', name: 'Universidad Nacional Experimental de Guayana (UNEG)', type: 'university', latitude: 8.287, longitude: -62.76 },

  // Guárico (San Juan de los Morros)
  { id: 've-unerg', name: 'Universidad Rómulo Gallegos (UNERG)', type: 'university', latitude: 9.911, longitude: -67.353 },

  // Apure (San Fernando)
  { id: 've-unellez', name: 'UNELLEZ San Fernando', type: 'university', latitude: 7.888, longitude: -67.473 },

  // Trujillo
  { id: 've-ula-trujillo', name: 'ULA Trujillo', type: 'university', latitude: 9.366, longitude: -70.432 },

  // Nueva Esparta (Porlamar)
  { id: 've-une-ne', name: 'Universidad de Oriente Nueva Esparta', type: 'university', latitude: 10.960, longitude: -63.849 },
  { id: 've-colegio-ne-1', name: 'Colegio San Nicolás de Bari', type: 'school', latitude: 10.966, longitude: -63.839 },
];


