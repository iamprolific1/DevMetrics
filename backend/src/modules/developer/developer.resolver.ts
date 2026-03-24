import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { DeveloperService } from './developer.service';
import { Developer } from './developer.model';

@Resolver(() => Developer)
export class DeveloperResolver {
  constructor(private developerService: DeveloperService) {}

  @Query(() => [Developer])
  async getDevelopers() {
    return this.developerService.findAll();
  }

  @Query(() => Developer, { nullable: true })
  async getDeveloperById(
    @Args('githubId', { type: () => Int }) githubId: number,
  ) {
    return this.developerService.findOne(githubId);
  }

  @Mutation(() => Developer)
  async deleteDeveloper(
    @Args('githubId', { type: () => Int }) githubId: number,
  ) {
    return this.developerService.deleteDeveloper(githubId);
  }
}
