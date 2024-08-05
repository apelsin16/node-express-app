import { makeExecutableSchema } from '@graphql-tools/schema';
import commonTypes from '../../common.types';
import authTypes from './auth.types';
import authResolvers from './auth.resolvers';

const authSchema = makeExecutableSchema({
  typeDefs: [authTypes, commonTypes],
  resolvers: authResolvers,
});

export default authSchema; 