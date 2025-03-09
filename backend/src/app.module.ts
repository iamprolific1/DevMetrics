import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { GraphqlModule } from './graphql/graphql.module';
import { DeveloperModule } from './modules/developer/developer.module';
import { CommitModule } from './modules/commits/commit.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    GraphqlModule,
    DeveloperModule,
    CommitModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
