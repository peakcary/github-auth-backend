import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';
 
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // constructor(private prisma: PrismaService,private readonly jwtService: JwtService) {}

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService, // 注入 PrismaService
  ) {}

  async findOrCreateUser(githubId: string, username: string, accessToken: string) {
    // 使用 PrismaService 查询或创建用户
    let user = await this.prismaService.user.findUnique({ where: { githubId } });
    if (!user) {
      user = await this.prismaService.user.create({
        data: { githubId, username, accessToken },
      });
    }
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getAccessToken(code: string): Promise<string> {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: 'application/json' } },
    );
    return response.data.access_token;
  } 

 
  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async getUserInfo(accessToken: string) {
    const { data } = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${accessToken}` },
    });
    return data;
  }

  // async findOrCreateUser(githubId: string, username: string, accessToken: string) {
  //   let user = await this.prisma.user.findUnique({ where: { githubId } });

  //   if (!user) {
  //     user = await this.prisma.user.create({
  //       data: { githubId, username, accessToken },
  //     });
  //   }

  //   return user;
  // }
}