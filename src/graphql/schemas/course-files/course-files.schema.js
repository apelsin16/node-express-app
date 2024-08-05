import { makeExecutableSchema } from '@graphql-tools/schema';
import commonTypes from '../../common.types';
import courseFilesTypes from './course-files.types';
import courseFilesResolvers from './course-files.resolvers';

const courseFilesSchema = makeExecutableSchema({
  typeDefs: [courseFilesTypes, commonTypes],
  resolvers: courseFilesResolvers,
});

export default courseFilesSchema; 