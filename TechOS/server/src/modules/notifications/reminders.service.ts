import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class RemindersService {
  private readonly logger = new Logger(RemindersService.name);

  constructor(
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  // Ejecutar cada 5 minutos para comprobar clases próximas
  @Cron(CronExpression.EVERY_5_MINUTES)
  async checkUpcomingClasses() {
    this.logger.debug('Checking for upcoming classes...');
    
    const now = new Date();
    const in15Minutes = new Date(now.getTime() + 15 * 60 * 1000);
    
    // Buscar eventos de clases que empiezan en los próximos 15 minutos
    const upcomingEvents = await this.prisma.calendarEvent.findMany({
      where: {
        startsAt: {
          gte: now,
          lte: in15Minutes,
        },
        type: {
          in: ['class', 'exam', 'workshop'],
        },
      },
      include: {
        course: {
          include: {
            teacher: true,
          },
        },
      },
    });

    // Emitir recordatorios por Socket.IO
    for (const event of upcomingEvents) {
      const minutesUntil = Math.round((event.startsAt.getTime() - now.getTime()) / 60000);
      
      const reminderPayload = {
        eventId: event.id,
        title: event.title,
        description: event.description,
        type: event.type,
        courseId: event.courseId,
        startsAt: event.startsAt,
        minutesUntil,
      };

      // Emitir a la sala de la institución
      this.notificationsGateway.notify(
        `institution:${event.institutionId}`,
        'class:reminder',
        reminderPayload,
      );

      // Si tiene curso específico, emitir también a la sala del curso
      if (event.courseId) {
        this.notificationsGateway.notify(
          `course:${event.courseId}`,
          'class:reminder',
          reminderPayload,
        );
      }

      this.logger.log(
        `Reminder sent for event "${event.title}" starting in ${minutesUntil} minutes`,
      );
    }
  }

  // Ejecutar cada día a las 8 AM para recordatorios diarios
  @Cron('0 8 * * *', { timeZone: 'America/Caracas' })
  async sendDailyReminders() {
    this.logger.debug('Sending daily reminders...');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Buscar todos los eventos del día
    const todayEvents = await this.prisma.calendarEvent.findMany({
      where: {
        startsAt: {
          gte: today,
          lt: tomorrow,
        },
      },
      include: {
        course: true,
      },
      orderBy: {
        startsAt: 'asc',
      },
    });

    // Agrupar por institución
    const eventsByInstitution = todayEvents.reduce((acc, event) => {
      if (!acc[event.institutionId]) {
        acc[event.institutionId] = [];
      }
      acc[event.institutionId].push(event);
      return acc;
    }, {} as Record<string, typeof todayEvents>);

    // Enviar resumen diario a cada institución
    for (const [institutionId, events] of Object.entries(eventsByInstitution)) {
      this.notificationsGateway.notify(
        `institution:${institutionId}`,
        'daily:summary',
        {
          date: today,
          eventsCount: events.length,
          events: events.map(e => ({
            id: e.id,
            title: e.title,
            type: e.type,
            startsAt: e.startsAt,
            endsAt: e.endsAt,
            courseId: e.courseId,
          })),
        },
      );
    }

    this.logger.log(`Daily reminders sent to ${Object.keys(eventsByInstitution).length} institutions`);
  }

  // Recordatorios para entregas/tareas próximas a vencer
  @Cron(CronExpression.EVERY_HOUR)
  async checkUpcomingDeliveries() {
    this.logger.debug('Checking for upcoming deliveries...');
    
    const now = new Date();
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    const upcomingDeliveries = await this.prisma.calendarEvent.findMany({
      where: {
        type: 'delivery',
        endsAt: {
          gte: now,
          lte: in24Hours,
        },
      },
      include: {
        course: true,
      },
    });

    for (const delivery of upcomingDeliveries) {
      const hoursUntil = Math.round((delivery.endsAt.getTime() - now.getTime()) / 3600000);
      
      this.notificationsGateway.notify(
        `course:${delivery.courseId}`,
        'delivery:reminder',
        {
          eventId: delivery.id,
          title: delivery.title,
          description: delivery.description,
          courseId: delivery.courseId,
          endsAt: delivery.endsAt,
          hoursUntil,
        },
      );
    }

    this.logger.log(`Delivery reminders sent for ${upcomingDeliveries.length} items`);
  }
}

