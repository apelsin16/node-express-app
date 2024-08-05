import * as Joi from 'joi';

export const GetLessonsSchema = Joi.object({
  query: Joi.object({
    studentId: Joi.string().hex().length(24).required()
  }),
});