import * as Joi from 'joi';

export const CreateLessonSchema = Joi.object({
  body: Joi.object({
    studentId: Joi.string().hex().length(24).required(),
    course: Joi.string().hex().length(24).required(),
    start: Joi.date().required(),
    end: Joi.date().required()
  }),
});