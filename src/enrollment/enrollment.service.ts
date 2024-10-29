// enrollment.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Enrollment } from '@prisma/client';

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  async enrollUser(userId: number, programId: number, role: string): Promise<Enrollment> {
    return this.prisma.enrollment.create({
      data: { userId, programId, role },
    });
  }

  async getAllEnrollments(): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany();
  }

  async getEnrollmentById(id: number): Promise<Enrollment> {
    return this.prisma.enrollment.findUnique({
      where: { id },
    });
  }

  async updateEnrollment(id: number, data: any): Promise<Enrollment> {
    return this.prisma.enrollment.update({
      where: { id },
      data,
    });
  }

  async deleteEnrollment(id: number): Promise<Enrollment> {
    return this.prisma.enrollment.delete({
      where: { id },
    });
  }
}