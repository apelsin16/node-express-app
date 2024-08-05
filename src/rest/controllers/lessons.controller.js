import Logger from '../../logger';
import { LessonsService } from '../../services/lessons.service';

export class LessonsController {
  constructor() {
    this.lessonsService = new LessonsService();
  }

  async createLesson(request, response) {
    try {
        const { studentId, course, start, end } = request.body;
        
        const student = request.user.type === 'STUDENT' ? request.user.id : studentId;

        const lesson = await this.lessonsService.createLesson(student, {
            course,
            start: new Date(start),
            end: new Date(end),
        });
  
        return response.json(lesson);
      } catch (error) {
        Logger.error(error);
  
        response.status(500).send('Щось пішло не так');
      }
  }

  async getLessons(request, response) {
    try {
      const lessons = request.user.type === 'STUDENT' ? 
        await this.lessonsService.getStudentLessons(request.user.id) :
        await this.lessonsService.getTeacherLessons(request.user.id);

      return response.json(lessons);
    } catch (error) {
      Logger.error(error);

      response.status(500).send('Щось пішло не так');
    }
  }
}