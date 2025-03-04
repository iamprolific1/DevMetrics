import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
