import { Student } from '../mongo/student';
import { Teacher } from '../mongo/teacher';

export class StatsService {
  async getUserStats(type) {
    let model;

    switch(type) {
      case 'STUDENT': model = Student; break;
      case 'TEACHER': model = Teacher; break;
      default: {
        return {
          total: 0,
          online: 0
        }
      }
    }

    const [total, online] = await Promise.all([
      model.countDocuments(),
      model.countDocuments({ online: true })
    ]);

    return {
      total,
      online
    }
  }
}