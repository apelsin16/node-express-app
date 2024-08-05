import { CoursesService } from '../../../services/courses.service';
import { StudentsService } from '../../../services/students.service';
import { TeachersService } from '../../../services/teachers.service';

const coursesService = new CoursesService();
const studentsService = new StudentsService();
const teachersService = new TeachersService();

export default {
  Query: {
    course: (parent, { id }) => coursesService.getCourseById(id),
  },
  Mutation: {
    createCourse: (parent, { body }, { user }) => coursesService.createCourse({
        ...body,
        teacher: user.id,
      }), 
    updateCourseStudents: (parent, { id, students }, { user }) => coursesService.updateCourseStudents(id, user.id, students),
  },
  Course: {
    teacher: (parent) => teachersService.getTeacherById(parent.teacher),
    students:(parent) => studentsService.getStudentsByIds(parent.students),
  }
}