import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  // GitHub 登录逻辑
  async githubLogin(code: string) {
    try {
      const tokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        { headers: { Accept: 'application/json' } },
      );

      const { access_token } = tokenResponse.data;
      if (!access_token) {
        throw new HttpException(
          'Failed to retrieve access token',
          HttpStatus.BAD_REQUEST,
        );
      }

      const userResponse = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const { id, login: username, email } = userResponse.data;
      const githubId = id.toString();

      // 使用 UserService 查找或创建用户
      const user = await this.userService.findOrCreateUser(
        githubId,
        username,
        email,
        access_token,
      );

      return user;
    } catch (error) {
      console.error('GitHub login error:', error);
      throw new HttpException(
        'GitHub login failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 登录时生成 JWT
  async login(user: User) {
    const payload = {
      githubId: user.githubId,
      username: user.username,
      sub: user.id,
    };
    return { access_token: this.jwtService.sign(payload) };
  } 

  // auth.service.ts
  async validateUser(payload: any): Promise<User | null> {
    // 假设 payload 中有 githubId
    const { githubId } = payload; // 获取 githubId
    const user = await this.userService.findOneByGithubId(githubId); // 使用 githubId 查找用户

    if (!user) {
      console.log(`User not found for GitHub ID: ${githubId}`);
      throw new UnauthorizedException(); // 如果找不到用户，抛出未授权异常
    }
    return user; // 返回找到的用户
  }
}
