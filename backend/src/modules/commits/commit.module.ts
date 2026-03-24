import { Module } from '@nestjs/common';
import { CommitResolver } from './commit.resolver';
import { CommitService } from './commit.service';

@Module({
  providers: [CommitResolver, CommitService],
  exports: [CommitResolver],
})
export class CommitModule {}
