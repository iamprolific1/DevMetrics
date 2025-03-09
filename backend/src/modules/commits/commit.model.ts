import { ObjectType, Int, Field } from '@nestjs/graphql';
import { Developer } from '../developer/developer.model';

@ObjectType()
export class Commit {
  @Field(() => Int)
  id: number;

  @Field(() => Developer) // One developer many commits relationship
  developer: Developer;

  @Field(() => Int)
  developerId: number;

  @Field()
  repo: string;

  @Field(() => Int)
  commit_count: number;

  @Field(() => Int)
  additions: number;

  @Field(() => Int)
  deletions: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
