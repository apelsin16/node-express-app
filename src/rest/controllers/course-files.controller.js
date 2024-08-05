import { CourseFilesService } from '../../services/course-files.service';

export class CourseFilesController {
  constructor() {
    this.service = new CourseFilesService();
  }

  async getDownloadUrl(request, response) {
    try {
      const url = await this.service.getDownloadUrl(request.user, request.params.fileId);

      return response.send(url);
    } catch(error) {
      const message = error.message || 'Щось пішло не так';

      response.status(500).send(message);
    }
  }
}