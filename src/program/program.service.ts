// program.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Program } from '@prisma/client';

@Injectable()
export class ProgramService {
  constructor(private prisma: PrismaService) {}

  async createProgram(data: any): Promise<Program> {
    return this.prisma.program.create({ data });
  }

  async getAllPrograms(): Promise<Program[]> {
    return this.prisma.program.findMany();
  }

  async getProgramById(id: number): Promise<Program> {
    return this.prisma.program.findUnique({
      where: { program_id: id },
    });
  }

  async updateProgram(id: number, data: any): Promise<Program> {
    return this.prisma.program.update({
      where: { program_id: id },
      data,
    });
  }

  async deleteProgram(id: number): Promise<Program> {
    return this.prisma.program.delete({
      where: { program_id: id },
    });
  }
}