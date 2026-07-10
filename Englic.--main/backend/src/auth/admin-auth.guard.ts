import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const password = process.env.ADMIN_PASSWORD;
    if (!password) return true;

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const cookies = this.parseCookies(request.headers?.cookie || '');
    const expectedToken = Buffer.from(password).toString('base64url');

    if (cookies.admin_session === expectedToken) {
      return true;
    }

    response.redirect('/admin/login');
    return false;
  }

  private parseCookies(cookieHeader: string): Record<string, string> {
    return cookieHeader.split(';').reduce((acc, item) => {
      const [key, ...valueParts] = item.trim().split('=');
      if (key) acc[key] = decodeURIComponent(valueParts.join('='));
      return acc;
    }, {} as Record<string, string>);
  }
}
