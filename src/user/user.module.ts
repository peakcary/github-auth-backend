import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service'; // 导入 PrismaService

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService], // 确保 PrismaService 被提供
})
export class UserModule {}