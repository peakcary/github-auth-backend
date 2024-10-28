import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // 设置全局前缀为 /api
  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000/api`);
}
bootstrap();