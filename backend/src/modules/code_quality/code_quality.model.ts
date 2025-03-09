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
  lint_errors: number;

  @Field(() => Int, { defaultValue: 0 })
  formatting_errors: number;

  @Field(() => Int)
  code_smells: number;

  @Field(() => Float)
  maintainability_score: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
