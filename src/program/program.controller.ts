// program.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProgramService } from './program.service';
import { Program } from '@prisma/client';

@Controller('programs')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  async create(@Body() data: any): Promise<Program> {
    return this.programService.createProgram(data);
  }

  @Get()
  async findAll(): Promise<Program[]> {
    return this.programService.getAllPrograms();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Program> {
    return this.programService.getProgramById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: any): Promise<Program> {
    return this.programService.updateProgram(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Program> {
    return this.programService.deleteProgram(id);
  }
}