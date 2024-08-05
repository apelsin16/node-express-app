import { makeExecutableSchema } from '@graphql-tools/schema';
import commonTypes from '../../common.types';
import studentsTypes from './students.types';
import studentsResolvers from './students.resolvers';

const studentsSchema = makeExecutableSchema({
  typeDefs: [studentsTypes, commonTypes],
  resolvers: studentsResolvers,
});

export default studentsSchema; 