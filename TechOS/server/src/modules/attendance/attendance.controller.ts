import { Body, Controller, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private service: AttendanceService) {}

  @Post('checkin')
  checkin(@Body() dto: { institutionId: string; userId: string; courseId: string; latitude: number; longitude: number }) {
    return this.service.checkin(dto);
  }
}


