import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Developer } from '../developer/developer.model';

export enum PR_STATUS {
  OPEN,
  CLOSED,
  MERGED,
}

registerEnumType(PR_STATUS, {
  name: 'PR_STATUS',
  description: 'The status of a pull request',
});

@ObjectType()
export class Pull_Request {
  @Field(() => Int)
  id: number;

  @Field(() => Developer)
  developer: Developer;

  @Field(() => Int)
  developerId: number;

  @Field()
  repo: string;

  @Field(() => Int)
  pr_count: number;

  @Field(() => PR_STATUS)
  status: PR_STATUS;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
