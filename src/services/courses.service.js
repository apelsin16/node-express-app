import { DateTime } from 'luxon';
import { Course } from '../mongo/course';

export class CoursesService {
  async createCourse(body) {
    const { name, start, end, teacher, students } = body;

    const startDate = DateTime.fromJSDate(start);
    const endDate = DateTime.fromJSDate(end);
    
    if (startDate >= endDate) {
      throw new Error('Невірно вказані дати початку/кінця курсу');
    }

    const course = new Course({
      name,
      start, 
      end, 
      teacher,
      students
    });

    await course.save();

    return course.toResponse();
  }

  async getCourseById(id) {
    const course = await Course.findById(id);

    if (!course) {
      return null;
    }

    return course.toResponse();
  }

  async updateCourseStudents(id, teacherId, students) {
    const course = await Course.findOne({
      _id: id,
      teacher: teacherId,
    });

    if (!course) {
      return null;
    }

    course.students = students;

    await course.save();

    return course.toResponse();
  }
}