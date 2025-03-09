/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import axios from 'axios';
import * as bcrypt from 'bcryptjs';
import logger from 'src/utils/logger';

type TokenResponseType = {
  access_token: string;
};

type DeveloperProfileType = {
  id: number;
  name: string;
  login: string;
  avatar_url: string;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  githubAuth(@Req() request: Request, @Res() response: Response) {
    return response.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID as string}&redirect_uri=${process.env.GITHUB_CALLBACK_URL}&scope=user:email repo`,
    );
  }

  async githubCallback(@Req() request: Request, @Res() response: Response) {
    const { code } = request.query;
    if (!code) {
      return response.status(400).json({ error: 'No code provided' });
    }

    try {
      const tokenResponse = await this.exchangeCodeForToken(code as string);
      const accessToken = tokenResponse.access_token;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const userProfile = await this.getUserProfile(accessToken);
      const user = await this.validateUser(userProfile, accessToken);
      const tokens = await this.generateTokens(user);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      response.json({ user, ...tokens });

      // save user's data in the database.
    } catch (error) {
      logger.error('❌ Authentication failed:', error);
      response.status(401).json({ error: 'Authentication failed' });
    }
  }

  // function to exchange callback code for github access token
  private async exchangeCodeForToken(code: string): Promise<TokenResponseType> {
    const clientId = process.env.GITHUB_CLIENT_ID as string;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET as string;
    const redirectUri = process.env.GITHUB_CALLBACK_URL as string;

    const tokenUrl = 'https://github.com/login/oauth/access_token';
    const tokenRequestData = {
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectUri,
    };

    const response = await axios.post(tokenUrl, tokenRequestData, {
      headers: {
        Accept: 'application/json',
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }

  // function to get user profile using github access token
  private async getUserProfile(accessToken: string) {
    const userProfileUrl = 'https://api.github.com/user';
    const userProfileResponse = await axios.get(userProfileUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return userProfileResponse.data;
  }

  // function to validate and save user data.
  private async validateUser(
    profile: DeveloperProfileType,
    accessToken: string,
  ) {
    const existingUser = await this.prisma.developer.findUnique({
      where: { githubId: profile.id },
    });

    if (!existingUser) {
      return await this.prisma.developer.create({
        data: {
          githubId: profile.id,
          username: profile.login,
          name: profile.name,
          email: profile.email || null,
          avatarUrl: profile.avatar_url || null,
          accessToken,
        },
      });
    }

    // update access token if user exists
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.prisma.developer.update({
      where: { githubId: profile.id },
      data: { accessToken },
    });
  }

  async generateTokens(user: { githubId: number; username: string }) {
    const payload = { sub: user.githubId, username: user.username };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET as string,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_SECRET as string,
      expiresIn: '7d',
    });

    // hash refresh token before storing in DB
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prisma.developer.update({
      where: { githubId: user.githubId },
      data: { refreshToken: hashedRefreshToken },
    });

    return { accessToken, refreshToken };
  }

  // function to validate refresh token
  async validateRefreshToken(refreshToken: string) {
    type PayloadType = { sub: number; username: string };

    const payload: PayloadType = this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_SECRET as string,
    });

    const user = await this.prisma.developer.findUnique({
      where: { githubId: payload.sub },
    });

    if (
      !user ||
      !(await bcrypt.compare(refreshToken, user.refreshToken as string))
    ) {
      logger.error('Invalid refresh token');
      throw new UnauthorizedException('Invalid Refresh Token');
    }

    return user;
  }
}
