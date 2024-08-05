import { makeExecutableSchema } from '@graphql-tools/schema';
import commonTypes from '../../common.types';
import teachersTypes from './teachers.types';
import teachersResolvers from './teachers.resolvers';

const teachersSchema = makeExecutableSchema({
  typeDefs: [teachersTypes, commonTypes],
  resolvers: teachersResolvers,
});

export default teachersSchema; 