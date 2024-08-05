import { makeExecutableSchema } from '@graphql-tools/schema';
import commonTypes from '../../common.types';
import lessonsTypes from './lessons.types';
import lessonsResolvers from './lessons.resolvers';

const lessonsSchema = makeExecutableSchema({
  typeDefs: [lessonsTypes, commonTypes],
  resolvers: lessonsResolvers,
});

export default lessonsSchema; 