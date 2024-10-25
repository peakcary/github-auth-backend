import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // 导入 PrismaService

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(profile: any, accessToken: string) {
    const { id, username } = profile;
    let user = await this.prisma.user.findUnique({ where: { githubId: id } });

    if (!user) {
      user = await this.prisma.user.create({
        data: { githubId: id, username, accessToken },
      });
    }

    return user;
  }
}