import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github';
import { ConfigService } from '@nestjs/config';

interface GithubProfile extends Profile {
  emails?: { value: string }[];
  photos?: { value: string }[];
}

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private configService: ConfigService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID') as string,
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET') as string,
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL') as string,
      scope: ['user:email', 'repo'],
      passReqToCallback: true,
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GithubProfile,
  ) {
    return {
      githubId: profile.id,
      username: profile.username,
      avatar: profile.photos?.[0].value || null,
      email: profile.emails?.[0].value || null,
      accessToken,
    };
  }
}
