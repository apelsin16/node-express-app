import { makeExecutableSchema } from '@graphql-tools/schema';
import commonTypes from '../../common.types';
import timeSlotsTypes from './time-slots.types';
import timeSlotsResolvers from './time-slots.resolvers';

const timeSlotsSchema = makeExecutableSchema({
  typeDefs: [timeSlotsTypes, commonTypes],
  resolvers: timeSlotsResolvers,
});

export default timeSlotsSchema; 