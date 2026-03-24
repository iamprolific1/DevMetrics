import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Developer } from '../developer/developer.model';

@ObjectType()
export class Onboarding {
  @Field(() => Int)
  id: number;

  @Field(() => Developer)
  developer: Developer;

  @Field(() => Int)
  developerId: number;

  @Field(() => Int)
  stepNumber: number;

  @Field()
  completed: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
