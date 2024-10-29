// enrollment.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from '@prisma/client';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  async enroll(@Body() data: any): Promise<Enrollment> {
    const { userId, programId, role } = data;
    return this.enrollmentService.enrollUser(userId, programId, role);
  }

  @Get()
  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentService.getAllEnrollments();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Enrollment> {
    return this.enrollmentService.getEnrollmentById(id);
  }
}