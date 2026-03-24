import { Module } from '@nestjs/common';
import { DeveloperResolver } from './developer.resolver';
import { DeveloperService } from './developer.service';

@Module({
  providers: [DeveloperResolver, DeveloperService],
  exports: [DeveloperService],
})
export class DeveloperModule {}
