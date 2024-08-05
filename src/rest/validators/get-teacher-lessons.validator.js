import * as Joi from 'joi';

export const GetTeacherLessonsSchema = Joi.object({
  params: Joi.object({
    teacherId: Joi.string().hex().length(24).required()
  }),
});