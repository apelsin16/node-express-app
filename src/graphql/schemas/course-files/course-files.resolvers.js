import { CourseFilesService } from '../../../services/course-files.service';
import { CoursesService } from '../../../services/courses.service';
import { StudentsService } from '../../../services/students.service';
import { fileTypeIsCorrect } from '../../../utilities';

const coursesService = new CoursesService();
const studentsService = new StudentsService();
const service = new CourseFilesService();

export default {
  Query: {
    files: (parent, { courseId, searchTerm }, { user }) => service.getFiles(courseId, user, searchTerm),
  },
  Mutation: {
    uploadFile: (parent, { courseId, file }, { user }) => {
      const isFileTypeAllowed = fileTypeIsCorrect(file, ['application/pdf', 'image/jpeg']);

      if(!isFileTypeAllowed) {
        throw new Error('Цей тип файлу не можна завантажувати');
      }

      return service.uploadFile(courseId, user.id, file);
    },
    removeFile: (parent, { fileId }, { user }) => service.removeFile(fileId, user.id),
    updateFileAccess: (parent, { fileId, students }, { user }) => service.updateFileAccess(user.id, fileId, students),
  },
  CourseFile: {
    course: (parent) => coursesService.getCourseById(parent.course),
    students:(parent) => studentsService.getStudentsByIds(parent.students),
  }
};
