import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { InstitutionsModule } from './institutions/institutions.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AcademicModule } from './academic/academic.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    InstitutionsModule,
    AttendanceModule,
    AcademicModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}


