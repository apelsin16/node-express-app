
import { Router } from 'express';

import { API_SCOPES } from '../../constants/api-scopes';
import { LessonsController } from '../controllers/lessons.controller';
import validationMiddleware from '../middlewares/validation.middleware';
import validateTokenMiddleware from '../middlewares/validate-api-token.middleware';
import { CreateLessonSchema } from '../validators/create-lesson.validator';

const controller = new LessonsController();
const router = new Router();

router.post(
  '/',
  validateTokenMiddleware([API_SCOPES.CREATE_LESSONS]),
  validationMiddleware(CreateLessonSchema),
  (request, response) => controller.createLesson(request, response)
);

router.get(
  '/',
  validateTokenMiddleware([API_SCOPES.GET_LESSONS]),
  (request, response) => controller.getLessons(request, response)
);

export default router;