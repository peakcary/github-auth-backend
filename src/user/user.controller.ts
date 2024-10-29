import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client'; // 导入 User 类型
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // 引入 JWT 守卫

@Controller('users') // 定义路由前缀
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  // 获取所有用户，使用 JWT 验证
  @UseGuards(JwtAuthGuard)
  // 获取所有用户
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

   // 获取所有用户，使用 JWT 验证
   @UseGuards(JwtAuthGuard)
  // 根据 ID 获取用户
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(Number(id));
  }

  // 更新用户信息
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<User>,
  ): Promise<User> {
    return this.userService.update(Number(id), data);
  }

  // 删除用户
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(Number(id));
  }
}
