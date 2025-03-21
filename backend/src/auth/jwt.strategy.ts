/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import logger from 'src/utils/logger';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (request: Request) => {
        if (request.cookies && request.cookies.accessToken) {
          return request.cookies.accessToken;
        }
        return null;
      },
      secretOrKey: configService.get<string>('JWT_SECRET') as string,
    });
  }

  async validate(payload: { sub: number; username: string }) {
    const user = await this.prisma.developer.findUnique({
      where: { githubId: payload.sub },
    });

    if (!user) {
      logger.error('User not found');
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
