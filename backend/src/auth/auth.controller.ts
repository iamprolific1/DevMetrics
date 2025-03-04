import { Controller, Req, Res, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('github')
  githubAuth(@Req() request: Request, @Res() response: Response) {
    return this.authService.githubAuth(request, response);
  }
  @Get('github/callback')
  githubCallback(@Req() request: Request, @Res() response: Response) {
    return this.authService.githubCallback(request, response);
  }
}
