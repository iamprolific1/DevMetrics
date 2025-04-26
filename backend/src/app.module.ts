import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { GraphqlModule } from './graphql/graphql.module';
import { DeveloperModule } from './modules/developer/developer.module';
import { CommitModule } from './modules/commits/commit.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    GraphqlModule,
    DeveloperModule,
    CommitModule,
    UserModule,
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService],
})
export class AppModule {}
