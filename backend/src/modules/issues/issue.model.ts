import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Developer } from '../developer/developer.model';

export enum ISSUE_STATUS {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  RESOLVED = 'RESOLVED',
  IGNORED = 'IGNORED',
}

registerEnumType(ISSUE_STATUS, {
  name: 'ISSUE_STATUS',
  description: 'The status of an issue',
});

@ObjectType()
export class Issue {
  @Field(() => Int)
  id: number;

  @Field(() => Developer)
  developer: Developer;

  @Field(() => Int)
  developerId: number;

  @Field()
  repo: string;

  @Field(() => ISSUE_STATUS)
  status: ISSUE_STATUS;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
