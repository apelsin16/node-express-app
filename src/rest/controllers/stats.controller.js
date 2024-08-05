import Logger from '../../logger';
import { StatsService } from '../../services/stats.service';

export class StatsController {
  constructor() {
    this.service = new StatsService();
  }

  async getUserStats(request, response) {
    try {
      const statsObject = await this.service.getUserStats(request.query.type);

      return response.json(statsObject);
    } catch (error) {
      Logger.error(error);

      response.status(500).send('Щось пішло не так');
    }
  }
}