import { makeExecutableSchema } from 'apollo-server-express';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import path from 'path';

const allTypeDefs = loadFilesSync(path.join(__dirname, '../api/**/*.graphql'));
const allResolvers = loadFilesSync(path.join(__dirname, '../api/**/*.js'));

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(allTypeDefs),
  resolvers: mergeResolvers(allResolvers)
});

export default schema;