import * as Joi from 'joi';

export const GetUserStatsSchema = Joi.object({
  query: Joi.object({
    type: Joi.string().valid('STUDENT', 'TEACHER').required(),
  }),
});