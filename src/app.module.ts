import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';  // 加载环境变量
import { AuthModule } from './auth/auth.module'; // 引入 AuthModule
import { PrismaModule } from './prisma/prisma.module'; // 引入 PrismaModule
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 让配置模块在整个应用中全局可用
    }),
    AuthModule,  // 注册 Auth 模块
    PrismaModule, // 注册 Prisma 模块
    UserModule,
  ],
})
export class AppModule {}
 