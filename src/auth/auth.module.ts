// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { PrismaModule } from '../prisma/prisma.module'; // 导入 Prisma 模块

// @Module({
//   imports: [PrismaModule], // 导入其他模块
//   providers: [AuthService], // 注入服务
//   controllers: [AuthController], // 注册控制器
// })
// export class AuthModule {}


import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../prisma/prisma.service'; // 确保路径正确

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService], // 注册 PrismaService
  exports: [AuthService],
})
export class AuthModule {}