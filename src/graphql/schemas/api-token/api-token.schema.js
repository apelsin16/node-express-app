import { makeExecutableSchema } from '@graphql-tools/schema';

import commonTypes from '../../common.types';

import apiTokenTypes from './api-token.types';
import apiTokenResolvers from './api-token.resolvers';

const apiTokenSchema = makeExecutableSchema({
  typeDefs: [apiTokenTypes, commonTypes],
  resolvers: apiTokenResolvers,
});

export default apiTokenSchema; 