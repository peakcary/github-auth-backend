import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module'; // 导入 Prisma 模块

@Module({
  imports: [PrismaModule], // 导入其他模块
  providers: [AuthService], // 注入服务
  controllers: [AuthController], // 注册控制器
})
export class AuthModule {}