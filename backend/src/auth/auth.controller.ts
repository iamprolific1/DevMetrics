/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Req,
  Res,
  Get,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
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

  @Post('refresh')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
    @Res() response: Response,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    try {
      const user = await this.authService.validateRefreshToken(refreshToken);

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const tokens = await this.authService.generateTokens(user);
      return response.json({ tokens });
    } catch (error) {
      console.error('�� Refresh token validation failed:', error);
      response.status(401).json({ error: 'Refresh token validation failed' });
    }
  }
}
