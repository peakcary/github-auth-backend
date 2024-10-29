import { Controller, Get, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth/github')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  async githubLogin(@Res() res: Response) {
    const githubAuthUrl = 'https://github.com/login/oauth/authorize';
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = process.env.GITHUB_REDIRECT_URI;
    const url = `${githubAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}`;
    res.redirect(url);
  }

  @Get('callback')
  async githubCallback(@Req() req: Request, @Res() res: Response) {
    try {
      const code = req.query.code as string;
      if (!code) {
        throw new HttpException('Missing code from GitHub', HttpStatus.BAD_REQUEST);
      }

      const user = await this.authService.githubLogin(code);
      const jwt = await this.authService.login(user);
      res.json(jwt);
    } catch (error) {
      console.error('Callback error:', error);
      res.status(error.status || 500).json({
        message: error.message || 'Internal server error',
        statusCode: error.status || 500,
      });
    }
  }
}