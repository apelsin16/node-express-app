import { DateTime, Interval } from 'luxon';

import { Lesson } from '../mongo/lesson';
import { TimeSlot } from '../mongo/time-slot';

import pubsub from '../pubsub';
import { datesAreCorrect } from '../utilities';

import { CoursesService } from './courses.service';

export class LessonsService {
  constructor () {
    this.coursesService = new CoursesService();
  }

  async createLesson(student, body) {
    const { start, end, course: courseId } = body;
    
    if (!datesAreCorrect(start, end)) {
      throw new Error('Перевірте будь ласка дати');
    }

    const course = await this.coursesService.getCourseById(courseId);

    const existingLesson = await Lesson.findOne({
      start,
      end,
      student,
    });

    if (existingLesson) {
      throw new Error('У Вас вже є заняття в цей час');
    }
    
    const existingSlot = await TimeSlot.findOne({
      teacher: course.teacher,
      start,
      end,
    });

    if (existingSlot) {
      throw new Error('Цей час викладача заблоковано');
    }

    const lessonInterval = Interval.fromDateTimes(
      DateTime.fromJSDate(start),
      DateTime.fromJSDate(end),
    );

    const courseInterval = Interval.fromDateTimes(
      DateTime.fromJSDate(course.start),
      DateTime.fromJSDate(course.end),
    );

    if (!courseInterval.engulfs(lessonInterval)) {
      throw new Error('Вказані дати не входять у курс');
    }

    const lesson = new Lesson({
      start,
      end,
      course: course.id,
      student,
      teacher: course.teacher,
    });

    await lesson.save();

    const response = lesson.toResponse();

    await pubsub.publish('NEW_LESSON', { lessonAdded: response });

    return response;
  }

  async getStudentLessons(student) {
    const lessons = await Lesson.find({
      student,
    });

    return lessons.map(lesson => lesson.toResponse());
  }

  async getTeacherLessons(teacher) {
    const lessons = await Lesson.find({
      teacher,
    });

    return lessons.map(lesson => lesson.toResponse());
  }
}