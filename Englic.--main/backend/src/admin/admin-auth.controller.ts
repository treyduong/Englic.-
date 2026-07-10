import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AdminViewService } from './views/admin-view.service';

@Controller('admin')
export class AdminAuthController {
  constructor(private readonly view: AdminViewService) {}

  @Get('login')
  login(@Res() res: Response) {
    res.send(this.view.login());
  }

  @Post('login')
  handleLogin(@Body('password') password: string, @Res() res: Response) {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || password === expected) {
      const token = Buffer.from(expected || 'dev-admin').toString('base64url');
      res.setHeader('Set-Cookie', `admin_session=${token}; Path=/; HttpOnly; SameSite=Lax`);
      return res.redirect('/admin');
    }

    return res.status(401).send(this.view.login('Mật khẩu admin không đúng.'));
  }
}
