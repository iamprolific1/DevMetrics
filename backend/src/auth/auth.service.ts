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

      await this.fetchAndStoreData(user.githubId, accessToken, user.username);

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

  private async getRepositories(accessToken: string) {
    const url = `https://api.github.com/user/repos?per_page=100`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.map((repo: any) => ({
      name: repo.name,
      owner: { login: repo.owner.login },
    }));
  }

  // fetch all necessary data from GitHub
  private async fetchAndStoreData(
    githubId: number,
    accessToken: string,
    username: string,
  ) {
    const repositories = await this.getRepositories(accessToken);

    let allCommits: any[] = [];

    for (const repo of repositories) {
      const commits = await this.getCommits(
        repo.owner.login,
        repo.name,
        accessToken,
      );
      allCommits = allCommits.concat(commits);
    }

    const [pullRequests, issues] = await Promise.all([
      this.getPullRequests(username, accessToken),
      this.getIssues(username, accessToken),

      // store data
    ]);
    await this.storeCommits(allCommits, githubId);
    await this.storePullRequests(pullRequests.items, githubId);
    await this.storeIssues(issues.items, githubId);
  }

  private async getCommits(owner: string, repo: string, accessToken: string) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=50`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.map((commit: any) => ({
      sha: commit.sha,
      message: commit.commit.message,
      url: commit.html_url,
      repo: repo,
      timestamp: commit.commit.author.date,
    }));
  }

  private async getPullRequests(username: string, accessToken: string) {
    const url = `https://api.github.com/search/issues?q=author:${username}+type:pr`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      items: response.data.items.map((pr: any) => ({
        id: pr.id,
        title: pr.title,
        url: pr.html_url,
        repo: pr.repository_url.split('/').slice(-1)[0],
        state: pr.state,
        createdAt: pr.created_at,
        mergedAt: pr.merged_at,
      })),
      total_count: response.data.total_count,
    };
  }

  private async getIssues(username: string, accessToken: string) {
    const url = `https://api.github.com/search/issues?q=author:${username}+type:issue`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      items: response.data.items.map((issue: any) => ({
        id: issue.id,
        title: issue.title,
        url: issue.html_url,
        repo: issue.repository_url.split('/').slice(-1)[0],
        state: issue.state,
        createdAt: issue.created_at,
      })),
      total_count: response.data.total_count,
    };
  }

  private async storeCommits(commits: any[], githubId: number) {
    await this.prisma.commit.createMany({
      data: commits.map((commit) => ({
        sha: commit.sha,
        message: commit.message,
        url: commit.url,
        repo: commit.repo,
        timestamp: new Date(commit.timestamp),
        developerId: githubId,
      })),
      skipDuplicates: true,
    });
  }
  private async storePullRequests(pullRequests: any[], githubId: number) {
    await this.prisma.pull_Request.createMany({
      data: pullRequests.map((pr) => ({
        id: pr.id.toString(),
        title: pr.title,
        url: pr.url,
        repo: pr.repo,
        status: pr.state,
        createdAt: new Date(pr.createdAt),
        developerId: githubId,
      })),
      skipDuplicates: true,
    });
  }
  private async storeIssues(issues: any[], githubId: number) {
    await this.prisma.issue.createMany({
      data: issues.map((issue) => ({
        id: issue.id.toString(),
        title: issue.title,
        url: issue.url,
        repo: issue.repo,
        status: issue.state,
        createdAt: new Date(issue.createdAt),
        developerId: githubId,
      })),
      skipDuplicates: true,
    });
  }
}
