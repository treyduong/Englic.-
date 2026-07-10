import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.urlencoded({ extended: true, limit: '20mb' }));
  app.use(express.json({ limit: '20mb' }));

  // Cho phép frontend user website gọi public route lấy đề thi từ backend.
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Backend đang chạy tại port: ${port}`);
  console.log(`Admin panel: http://localhost:${port}/admin`);
}
bootstrap();
