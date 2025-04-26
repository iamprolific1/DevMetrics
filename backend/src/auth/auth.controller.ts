/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Req,
  Res,
  Get,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import logger from 'src/utils/logger';

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

  @Get('/validate')
  async validateAccessToken(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const token = request.cookies['accessToken'];
    console.log('accessToken: ', token);

    if (!token) {
      return response.status(404).json({ error: 'Token is missing' });
    }

    try {
      const user = await this.authService.validateAccessToken(token);

      if (user.firstTimeUser) {
        return response.json({ redirect: '/onboarding' });
      }

      return response.json({ redirect: '/dashboard' });
    } catch (error) {
      console.error('Invalid or expired token:', error);
      return response.status(401).json({ error: 'Invalid or expired token' });
    }
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt')) // protect route with jwt guard
  getMe(@Req() request: Request) {
    const user = request.user;

    if (!user) {
      return { user: null };
    }

    return { user };
  }

  @Get('refresh')
  async refreshToken(@Req() request: Request, @Res() response: Response) {
    const token = request.cookies['refreshToken'];
    console.log('Refresh token:', token);
    if (!token) {
      console.log(
        'Refresh token is missing!! Attempting to log user in directly again',
      );
    }

    try {
      const user = await this.authService.validateRefreshToken(token);

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const tokens = await this.authService.generateTokens(user, response);
      console.log('tokens: ', tokens);
      const { accessToken } = tokens;
      response.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        domain: 'localhost',
        path: '/',
        maxAge: 15 * 60 * 1000,
      });
    } catch (error) {
      logger.error('Refresh token validation failed:', error);
      response.status(401).json({ error: 'Refresh token validation failed' });
    }
  }
}
