import { StudentsService } from '../../../services/students.service';

const studentsService = new StudentsService();

export default {
  Query: {
    student: (parent, { id }) => studentsService.getStudentById(id)
  },
  Mutation: {
    updateStudent: (parent, { body }, { user }) => studentsService.updateStudent(user.id, body)
  }
}