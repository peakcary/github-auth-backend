// useronprogram.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserOnProgram } from '@prisma/client';

@Injectable()
export class UserOnProgramService {
  constructor(private prisma: PrismaService) {}

  async createUserOnProgram(enrollmentId: number, notes: string, result: string): Promise<UserOnProgram> {
    return this.prisma.userOnProgram.create({
      data: { enrollmentId, notes, result },
    });
  }

  async getAllUserOnPrograms(): Promise<UserOnProgram[]> {
    return this.prisma.userOnProgram.findMany();
  }

  async getUserOnProgramById(id: number): Promise<UserOnProgram> {
    return this.prisma.userOnProgram.findUnique({
      where: { id },
    });
  }

  async updateUserOnProgram(id: number, data: any): Promise<UserOnProgram> {
    return this.prisma.userOnProgram.update({
      where: { id },
      data,
    });
  }

  async deleteUserOnProgram(id: number): Promise<UserOnProgram> {
    return this.prisma.userOnProgram.delete({
      where: { id },
    });
  }
}