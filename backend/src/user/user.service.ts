import { Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

enum FREQUENCY {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}
interface RequestBodyType {
  languages: string[];
  frequency: string;
  goal: number;
}

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async saveUserPreferenceData(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { languages, frequency, goal }: RequestBodyType = request.body;
    if (!languages || !frequency || !goal) {
      response.status(401).json('Data not provided');
      return;
    }

    // convert frequency to prisma enum
    const parsedFrequency = frequency.toUpperCase() as keyof typeof FREQUENCY;
    if (!(parsedFrequency in FREQUENCY)) {
      response.status(400).json({ error: 'Invalid frequency value' });
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const token: string = request.cookies['accessToken'];

    if (!token) {
      response.status(404).json({ error: 'No access token provided' });
      throw new UnauthorizedException('No access token provided');
    }

    // verify access token to get user data
    const payload: { sub: number; username: string } = this.jwtService.verify(
      token,
      {
        secret: process.env.JWT_SECRET as string,
      },
    );

    const user = await this.prisma.developer.findUnique({
      where: { githubId: payload.sub },
    });

    if (!user) {
      response.status(404).json({ error: 'User not found' });
      throw new UnauthorizedException('User is not authenticated');
    }

    try {
      await this.prisma.developer_Preferences.upsert({
        where: { developerId: user.githubId },
        update: {
          languages,
          frequency: parsedFrequency,
          codingGoal: goal,
        },
        create: {
          developerId: user.githubId,
          languages,
          frequency: parsedFrequency,
          codingGoal: goal,
        },
      });
      response
        .status(200)
        .json({ message: 'User preference data saved successfully' });
    } catch (error) {
      console.error('Error saving user data preference', error);
    }
  }
}
