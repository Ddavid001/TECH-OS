import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

// Datos del Colegio El Alba (para la demo)
const COLEGIO_EL_ALBA = {
  name: 'Unidad Educativa Privada Colegio "El Alba"',
  coordinates: {
    lat: 10.498, // Los Palos Grandes, Caracas
    lon: -66.829,
  },
  attendanceRadiusMeters: 150,
};

// Fórmula de Haversine para calcular distancia entre dos puntos GPS
function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // Radio de la Tierra en metros
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async checkin(dto: { institutionId: string; userId: string; courseId: string; latitude: number; longitude: number }) {
    // Para la demo, siempre usamos las coordenadas del Colegio El Alba
    const institutionCoords = COLEGIO_EL_ALBA.coordinates;
    const allowedRadius = COLEGIO_EL_ALBA.attendanceRadiusMeters;

    console.log('📍 Verificando asistencia para el Colegio El Alba:');
    console.log('   Usuario:', dto.userId);
    console.log('   Ubicación del usuario:', dto.latitude, dto.longitude);
    console.log('   Ubicación del colegio:', institutionCoords.lat, institutionCoords.lon);
    console.log('   Radio permitido:', allowedRadius, 'metros');

    // Calcular la distancia entre el usuario y el colegio
    const distance = haversineMeters(
      dto.latitude,
      dto.longitude,
      institutionCoords.lat,
      institutionCoords.lon
    );

    console.log('   Distancia calculada:', distance.toFixed(2), 'metros');

    // Verificar si está dentro del radio permitido
    const inside = distance <= allowedRadius;
    const status = inside ? 'presente' : 'fuera_de_rango';

    console.log('   Estado:', inside ? '✅ Dentro del radio' : '❌ Fuera del radio');

    // En modo demo, retornamos la información sin guardar en BD
    const response = {
      success: inside,
      message: inside 
        ? `✅ Asistencia verificada en el ${COLEGIO_EL_ALBA.name}` 
        : `❌ Ubicación fuera del radio permitido (${distance.toFixed(0)}m del centro)`,
      data: {
        institutionId: dto.institutionId,
        userId: dto.userId,
        courseId: dto.courseId,
        status,
        latitude: dto.latitude,
        longitude: dto.longitude,
        distance: Math.round(distance),
        allowedRadius: allowedRadius,
        timestamp: new Date().toISOString(),
        institution: COLEGIO_EL_ALBA.name,
      },
    };

    // Si está fuera del rango, lanzar error con información detallada
    if (!inside) {
      throw new BadRequestException({
        message: response.message,
        distance: Math.round(distance),
        allowedRadius: allowedRadius,
        status: 'out_of_range',
      });
    }

    return response;
  }
}


