import { TeachersService } from '../../../services/teachers.service';

const teachersService = new TeachersService();

export default {
  Query: {
    teacher: (parent, { id }) => teachersService.getTeacherById(id),
  },
  Mutation: {
    updateTeacher: (parent, { body }, { user }) => teachersService.updateTeacher(user.id, body),
  }
}