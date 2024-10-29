import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // 获取所有用户
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  // 根据用户 ID 获取用户
  async findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // 更新用户信息
  async update(id: number, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // 删除用户
  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  // 查找或创建用户
  async findOrCreateUser(
    githubId: string,
    username: string,
    email: string | null,
    accessToken: string,
  ) {
    try {
      return await this.prisma.user.upsert({
        where: { githubId },
        update: { accessToken, email },
        create: { githubId, username, email, accessToken },
      });
    } catch (error) {
      console.error('Error in findOrCreateUser:', error);
      throw new HttpException(
        'Failed to create or update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 通过 GitHub ID 查找用户
  async findOneByGithubId(githubId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { githubId },
    });
  }
}
