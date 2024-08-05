import { makeExecutableSchema } from '@graphql-tools/schema';
import commonTypes from '../../common.types';
import reviewsTypes from './reviews.types';
import reviewsResolvers from './reviews.resolvers';

const reviewsSchema = makeExecutableSchema({
  typeDefs: [reviewsTypes, commonTypes],
  resolvers: reviewsResolvers,
});

export default reviewsSchema; 