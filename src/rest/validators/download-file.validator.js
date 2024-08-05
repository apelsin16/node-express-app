import Joi from 'joi';

export const DownloadFileSchema = Joi.object({
  params: Joi.object({
    fileId: Joi.string().hex().length(24).required(),
  }),
});