// useronprogram.module.ts
import { Module } from '@nestjs/common';
import { UserOnProgramService } from './useronprogram.service';
import { UserOnProgramController } from './useronprogram.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UserOnProgramController],
  providers: [UserOnProgramService, PrismaService],
})
export class UserOnProgramModule {}