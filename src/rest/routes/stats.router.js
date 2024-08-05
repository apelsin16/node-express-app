import { Router } from 'express';
import { StatsController } from '../controllers/stats.controller';
import validationMiddleware from '../middlewares/validation.middleware';
import { GetUserStatsSchema } from '../validators/get-user-stats.validator';

const controller = new StatsController();
const router = new Router();

router.get('/', 
  validationMiddleware(GetUserStatsSchema), 
  (req, res) => controller.getUserStats(req, res)
);

export default router;
