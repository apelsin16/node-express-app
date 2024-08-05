import { makeExecutableSchema } from '@graphql-tools/schema';
import commonTypes from '../../common.types';
import coursesTypes from './courses.types';
import coursesResolvers from './courses.resolvers';

const coursesSchema = makeExecutableSchema({
  typeDefs: [coursesTypes, commonTypes],
  resolvers: coursesResolvers,
});

export default coursesSchema; 