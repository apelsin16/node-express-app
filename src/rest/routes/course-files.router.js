import { Router } from 'express';

import { API_SCOPES } from '../../constants/api-scopes';

import { CourseFilesController } from '../controllers/course-files.controller';
import validationMiddleware from '../middlewares/validation.middleware';
import validateTokenMiddleware from '../middlewares/validate-api-token.middleware';
import { DownloadFileSchema } from '../validators/download-file.validator';

const controller = new CourseFilesController();
const router = new Router();

router.get(
  '/:fileId/download',
  validateTokenMiddleware([API_SCOPES.DOWNLOAD_FILE]),
  validationMiddleware(DownloadFileSchema),
  (request, response) => controller.getDownloadUrl(request, response)
);

export default router;