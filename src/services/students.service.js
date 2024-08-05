import { Student } from '../mongo/student';

export class StudentsService {
  async getStudentById(id) {
    const student = await Student.findById(id);

    if (!student) {
      return null;
    }

    return student.toResponse();
  }

  async getStudentsByIds(ids) {
    const students = await Student.find({
      _id: ids
    });

    return students.map(student => student.toResponse());
  }

  async updateStudent(id, body) {
    const student = await Student.findById(id);

    if (!student) {
      return null;
    }

    if (body.skills) {
      student.skills = body.skills;
    }

    await student.save();

    return student.toResponse();
  }
}