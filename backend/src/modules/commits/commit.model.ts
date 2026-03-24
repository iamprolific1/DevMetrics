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
  sha: string;

  @Field()
  message: string;

  @Field()
  url: string;

  @Field()
  repo: string;

  @Field()
  timestamp: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
