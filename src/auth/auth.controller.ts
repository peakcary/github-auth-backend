import { Controller, Get, Query, Redirect, Res,UseGuards } from '@nestjs/common'; 
import { AuthService } from './auth.service'; 
import { JwtAuthGuard } from './jwt-auth.guard'; // JWT 守卫

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

  // @Get('github/callback')
  // async githubCallback(@Query('code') code: string, @Res() res) {
  //   const accessToken = await this.authService.getAccessToken(code);
  //   const userInfo = await this.authService.getUserInfo(accessToken);

  //   const user = await this.authService.findOrCreateUser(
  //     userInfo.id.toString(),
  //     userInfo.login,
  //     accessToken,
  //   );

  //   res.json(user);
  // }

  @Get('github/callback')
  async githubCallback(@Query('code') code: string, @Res() res) {
    try {
      const accessToken = await this.authService.getAccessToken(code);
      const userInfo = await this.authService.getUserInfo(accessToken);
      const user = await this.authService.findOrCreateUser(
        userInfo.id.toString(),
        userInfo.login,
        accessToken,
      );

      const jwt = await this.authService.login(user);
      res.json(jwt); // 返回 JWT 令牌
    } catch (error) {
      res.status(500).json({ message: 'Authentication failed', error: error.message });
    }
  }

  // 受 JWT 保护的示例路由
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Res() res) {
    res.json({ message: 'This is a protected route' });
  }
}
