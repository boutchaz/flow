import { Module } from '@nestjs/common';

const Resolvers = [];

@Module({
  imports: [],
  providers: [...Resolvers],
  exports: [...Resolvers],
})
export class GraphqlApiModule {}
