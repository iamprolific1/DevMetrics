import { Module } from '@nestjs/common';
import { graphqlConfig } from './graph.config';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [GraphQLModule.forRoot(graphqlConfig)],
})
export class GraphqlModule {}
