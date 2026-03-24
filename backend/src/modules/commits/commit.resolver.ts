import { Resolver, Query, Int, Args } from '@nestjs/graphql';
import { CommitService } from './commit.service';
import { Commit } from './commit.model';

@Resolver(() => Commit)
export class CommitResolver {
  constructor(private commitService: CommitService) {}

  @Query(() => [Commit])
  async getCommits() {
    return this.commitService.findAll();
  }

  @Query(() => Commit, { nullable: true })
  async getCommitsByDeveloper(
    @Args('githubId', { type: () => Int }) githubId: number,
  ) {
    return this.commitService.findByDeveloper(githubId);
  }
}
