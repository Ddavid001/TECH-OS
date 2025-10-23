import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // meters
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
    const institution = await this.prisma.institution.findUnique({ where: { id: dto.institutionId }, include: { campuses: true } });
    if (!institution) throw new BadRequestException('Institution not found');
    if (!institution.campuses.length && (institution.latitude == null || institution.longitude == null)) {
      throw new BadRequestException('No campus or base coordinates configured');
    }

    const candidates = institution.campuses.length
      ? institution.campuses.map(c => ({ lat: c.latitude, lon: c.longitude, radius: c.radiusMeters }))
      : [{ lat: institution.latitude!, lon: institution.longitude!, radius: institution.attendanceRadiusMeters }];

    const inside = candidates.some(c => haversineMeters(dto.latitude, dto.longitude, c.lat, c.lon) <= c.radius);
    const status = inside ? 'presente' : 'ausente';

    const att = await this.prisma.attendance.create({
      data: {
        institutionId: dto.institutionId,
        userId: dto.userId,
        courseId: dto.courseId,
        status,
        latitude: dto.latitude,
        longitude: dto.longitude,
      },
    });

    if (!inside) {
      throw new BadRequestException('Fuera del área permitida para asistencia');
    }

    return att;
  }
}


