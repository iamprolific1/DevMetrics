import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Developer } from '../developer/developer.model';

@ObjectType()
export class Code_Quality {
  @Field(() => Int)
  id: number;

  @Field(() => Developer)
  developer: Developer;

  @Field(() => Int)
  developerId: number;

  @Field()
  repo: string;

  @Field(() => Int, { defaultValue: 0 })
  lintErrors: number;

  @Field(() => Int, { defaultValue: 0 })
  formattingErrors: number;

  @Field(() => Int)
  codeSmells: number;

  @Field(() => Float)
  maintainabilityScore: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
