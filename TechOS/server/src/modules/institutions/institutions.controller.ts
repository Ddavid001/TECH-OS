import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Get()
  list() {
    return this.institutionsService.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.institutionsService.get(id);
  }

  @Post()
  create(@Body() dto: {
    name: string;
    type: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    attendanceRadiusMeters?: number;
  }) {
    return this.institutionsService.create(dto);
  }

  @Post(':id/campuses')
  addCampus(
    @Param('id') id: string,
    @Body()
    dto: { name: string; latitude: number; longitude: number; radiusMeters?: number }
  ) {
    return this.institutionsService.addCampus(id, dto);
  }
}


