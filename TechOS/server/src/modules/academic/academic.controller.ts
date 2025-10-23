import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { AcademicService } from './academic.service';

@Controller('academic')
export class AcademicController {
  constructor(private service: AcademicService) {}

  @Post('calendar')
  createEvent(@Body() dto: any) { return this.service.createEvent(dto); }

  @Get('calendar')
  listEvents(
    @Query('institutionId') institutionId: string,
    @Query('courseId') courseId?: string,
  ) {
    return this.service.listEvents(institutionId, courseId);
  }

  @Post('materials')
  uploadMaterial(@Body() dto: any) { return this.service.createMaterial(dto); }

  @Get('materials')
  listMaterials(@Query('courseId') courseId: string) { return this.service.listMaterials(courseId); }

  @Delete('materials/:id')
  deleteMaterial(@Param('id') id: string) { return this.service.deleteMaterial(id); }

  @Post('evaluations')
  createEvaluation(@Body() dto: any) { return this.service.createEvaluation(dto); }

  @Get('evaluations')
  listEvaluations(@Query('courseId') courseId: string) {
    return this.service.listEvaluations(courseId);
  }

  @Post('grades')
  upsertGrade(@Body() dto: any) { return this.service.upsertGrade(dto); }

  @Get('grades/student/:studentId')
  getStudentGrades(
    @Param('studentId') studentId: string,
    @Query('courseId') courseId?: string,
  ) {
    return this.service.getStudentGrades(studentId, courseId);
  }

  @Get('gradebook/:courseId')
  getCourseGradebook(@Param('courseId') courseId: string) {
    return this.service.getCourseGradebook(courseId);
  }
}


