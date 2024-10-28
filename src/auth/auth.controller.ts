import { Controller, Get, Query, Redirect, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('github/login')
  @Redirect('https://github.com/login/oauth/authorize', 302)
  githubLogin() {
    return {
      url: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
    };
  }

  @Get('github/callback')
  async githubCallback(@Query('code') code: string, @Res() res) {
    const accessToken = await this.authService.getAccessToken(code);
    const userInfo = await this.authService.getUserInfo(accessToken);

    const user = await this.authService.findOrCreateUser(
      userInfo.id.toString(),
      userInfo.login,
      accessToken,
    );

    res.json(user);
  }
}
