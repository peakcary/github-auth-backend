import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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

  async getUserInfo(accessToken: string) {
    const { data } = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${accessToken}` },
    });
    return data;
  }

  async findOrCreateUser(githubId: string, username: string, accessToken: string) {
    let user = await this.prisma.user.findUnique({ where: { githubId } });

    if (!user) {
      user = await this.prisma.user.create({
        data: { githubId, username, accessToken },
      });
    }

    return user;
  }
}