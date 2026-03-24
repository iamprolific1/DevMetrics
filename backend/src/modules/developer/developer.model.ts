import { ObjectType, Int, Field } from '@nestjs/graphql';
import { Commit } from '../commits/commit.model';
import { Pull_Request } from '../pull_requests/pull_request.model';
import { Issue } from '../issues/issue.model';
import { Code_Quality } from '../code_quality/code_quality.model';

@ObjectType()
export class Developer {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  githubId: number;

  @Field({ nullable: true })
  name?: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Commit], { nullable: true })
  Commit?: Commit[];

  @Field(() => [Pull_Request], { nullable: true })
  Pull_Request?: Pull_Request[];

  @Field(() => [Issue], { nullable: true })
  Issue?: Issue[];

  @Field(() => [Code_Quality], { nullable: true })
  Code_Quality: Code_Quality[];
}
