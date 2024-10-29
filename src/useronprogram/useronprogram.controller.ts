// useronprogram.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserOnProgramService } from './useronprogram.service';
import { UserOnProgram } from '@prisma/client';

@Controller('useronprogram')
export class UserOnProgramController {
  constructor(private readonly userOnProgramService: UserOnProgramService) {}

  @Post()
  async create(@Body() data: any): Promise<UserOnProgram> {
    const { enrollmentId, notes, result } = data;
    return this.userOnProgramService.createUserOnProgram(enrollmentId, notes, result);
  }

  @Get()
  async findAll(): Promise<UserOnProgram[]> {
    return this.userOnProgramService.getAllUserOnPrograms();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserOnProgram> {
    return this.userOnProgramService.getUserOnProgramById(id);
  }
}