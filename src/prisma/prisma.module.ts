import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 记得导出服务以便其他模块使用
})
export class PrismaModule {}