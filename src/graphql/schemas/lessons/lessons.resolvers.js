import { withFilter } from 'graphql-subscriptions';

import { CoursesService } from '../../../services/courses.service';
import { LessonsService } from '../../../services/lessons.service';
import { StudentsService } from '../../../services/students.service';
import { TeachersService } from '../../../services/teachers.service';

import pubsub from '../../../pubsub';

const coursesService = new CoursesService();
const lessonsService = new LessonsService();
const studentsService = new StudentsService();
const teachersService = new TeachersService();

export default {
  Query: {
    lessons: (parent, args, { user }) => user.type === 'STUDENT' ? 
      lessonsService.getStudentLessons(user.id) : 
      lessonsService.getTeacherLessons(user.id),
  },
  Mutation: {
    createLesson: (parent, { body }, { user }) => lessonsService.createLesson(user.id, body),
  },
  Subscription: {
    lessonAdded: {
      subscribe: withFilter(
        () =>  pubsub.asyncIterator('NEW_LESSON'),
        (payload, variables, { user }) => {
          return (
            payload.lessonAdded.teacher.toString() === user?.id
          );
        },
      ),
    }
  },
  Lesson: {
    course: (parent) => coursesService.getCourseById(parent.course),
    student: (parent) => studentsService.getStudentById(parent.student),
    teacher: (parent) => teachersService.getTeacherById(parent.teacher),
  }
}