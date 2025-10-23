import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AcademicService {
  constructor(private prisma: PrismaService) {}

  createEvent(dto: { institutionId: string; title: string; description?: string; type: string; courseId?: string; startsAt: string; endsAt: string; createdById?: string; }) {
    return this.prisma.calendarEvent.create({ data: { ...dto, startsAt: new Date(dto.startsAt), endsAt: new Date(dto.endsAt) } });
  }

  listEvents(institutionId: string, courseId?: string) {
    return this.prisma.calendarEvent.findMany({
      where: {
        institutionId,
        ...(courseId ? { courseId } : {}),
      },
      include: {
        course: true,
      },
      orderBy: { startsAt: 'asc' },
    });
  }

  createMaterial(dto: { institutionId: string; courseId: string; title: string; filePath: string; uploadedById: string; }) {
    return this.prisma.material.create({ data: dto });
  }

  listMaterials(courseId: string) {
    return this.prisma.material.findMany({
      where: { courseId },
      include: {
        uploadedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  deleteMaterial(materialId: string) {
    return this.prisma.material.delete({ where: { id: materialId } });
  }

  createEvaluation(dto: { institutionId: string; courseId: string; title: string; weight?: number; date: string }) {
    return this.prisma.evaluation.create({ data: { ...dto, weight: dto.weight ?? 1, date: new Date(dto.date) } });
  }

  listEvaluations(courseId: string) {
    return this.prisma.evaluation.findMany({
      where: { courseId },
      include: {
        grades: {
          include: {
            student: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: { date: 'asc' },
    });
  }

  async upsertGrade(dto: { institutionId: string; evaluationId: string; studentId: string; value: number }) {
    // Check if grade already exists
    const existing = await this.prisma.grade.findFirst({
      where: {
        evaluationId: dto.evaluationId,
        studentId: dto.studentId,
      },
    });

    if (existing) {
      return this.prisma.grade.update({
        where: { id: existing.id },
        data: { value: dto.value },
      });
    }

    return this.prisma.grade.create({ data: dto });
  }

  async getStudentGrades(studentId: string, courseId?: string) {
    return this.prisma.grade.findMany({
      where: {
        studentId,
        ...(courseId ? { evaluation: { courseId } } : {}),
      },
      include: {
        evaluation: {
          include: {
            course: true,
          },
        },
      },
      orderBy: {
        evaluation: {
          date: 'desc',
        },
      },
    });
  }

  async getCourseGradebook(courseId: string) {
    const evaluations = await this.prisma.evaluation.findMany({
      where: { courseId },
      include: {
        grades: {
          include: {
            student: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: { date: 'asc' },
    });

    // Get all students enrolled in the course (via attendance or grades)
    const studentsInCourse = await this.prisma.user.findMany({
      where: {
        OR: [
          { attendances: { some: { courseId } } },
          { grades: { some: { evaluation: { courseId } } } },
        ],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
      distinct: ['id'],
    });

    return {
      evaluations,
      students: studentsInCourse,
    };
  }
}


