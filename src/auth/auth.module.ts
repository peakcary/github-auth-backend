import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service'; // 导入 UserService
import { UserModule } from '../user/user.module'; // 导入 UserModule
import { PrismaModule } from '../prisma/prisma.module'; // 导入 PrismaModule

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule, // 确保导入 UserModule
    PrismaModule, // 确保导入 PrismaModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService], // 在 providers 中添加 UserService
  exports: [AuthService],
})
export class AuthModule {}