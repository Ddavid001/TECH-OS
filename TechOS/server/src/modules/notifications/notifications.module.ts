import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { RemindersService } from './reminders.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [NotificationsGateway, RemindersService, PrismaService],
  exports: [NotificationsGateway],
})
export class NotificationsModule {}


