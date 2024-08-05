import { Teacher } from '../mongo/teacher';

export class TeachersService {
  async getTeacherById(id) {
    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return null;
    }

    return teacher.toResponse();
  }

  async updateTeacher(id, body) {
    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return null;
    }

    if (body.specialties) {
      teacher.specialties = body.specialties;
    }

    await teacher.save();

    return teacher.toResponse();
  }
}