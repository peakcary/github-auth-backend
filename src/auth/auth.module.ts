import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module'; // 导入 Prisma 模块

@Module({
  imports: [PrismaModule], // 加入 Prisma 模块
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}