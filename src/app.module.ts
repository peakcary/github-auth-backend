 
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProgramModule } from './program/program.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { UserOnProgramModule } from './useronprogram/useronprogram.module';

 
import { ConfigModule } from '@nestjs/config';
 
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    EnrollmentModule,
    ProgramModule,
    UserOnProgramModule,
  ],
})
export class AppModule {}



 