import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class InstitutionsService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.institution.findMany({ include: { campuses: true } });
  }

  async get(id: string) {
    return this.prisma.institution.findUnique({ where: { id }, include: { campuses: true } });
  }

  async create(dto: {
    name: string;
    type: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    attendanceRadiusMeters?: number;
  }) {
    return this.prisma.institution.create({ data: dto });
  }

  async addCampus(institutionId: string, dto: { name: string; latitude: number; longitude: number; radiusMeters?: number }) {
    return this.prisma.campus.create({ data: { ...dto, institutionId, radiusMeters: dto.radiusMeters ?? 100 } });
  }
}


