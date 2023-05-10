import { IGraphQLApiOptions, isNotEmpty } from '@nesty/common';
import { GqlModuleOptions, GraphQLTypesLoader } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { buildSchema, extendSchema, printSchema } from 'graphql';
import * as path from 'path';
import { ConfigService } from '@nesty/config';

export async function createGraphqlModuleOptions(
  configService: ConfigService,
  typesLoader: GraphQLTypesLoader,
  options: IGraphQLApiOptions,
): Promise<GqlModuleOptions> {
  return {
    driver: ApolloDriver,
    path: `/${options.path}`,
    typeDefs: await createTypeDefs(configService, options, typesLoader),
    playground: options.playground || false,
    debug: options.debug || false,
    cors: {
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      origin: '*',
      allowedHeaders:
        'Authorization, Language, Tenant-Id, X-Requested-With, X-Auth-Token, X-HTTP-Method-Override, Content-Type, Content-Language, Accept, Accept-Language, Observe',
    },
    include: [options.resolverModule],
  } as GqlModuleOptions;
}

async function createTypeDefs(
  configService: ConfigService,
  options: IGraphQLApiOptions,
  typesLoader: GraphQLTypesLoader,
): Promise<string> {
  const normalizedPaths = options.typePaths.map((p) =>
    p.split(path.sep).join('/'),
  );
  const typeDefs = await typesLoader.mergeTypesByPaths(normalizedPaths);
  const schema = buildSchema(typeDefs);

  return printSchema(schema);
}
