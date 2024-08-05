import { S3Storage } from '../storages/s3.storage';

import { USER_TYPES } from '../constants/user-types';
import { CourseFile } from '../mongo/course-file';
import { CoursesService } from './courses.service';

export class CourseFilesService {
  constructor() {
    this.coursesService = new CoursesService();
    this.fileStorage = new S3Storage();
  }

  async uploadFile(courseId, teacherId, { file: uploadedFile }) {
    const course = await this.coursesService.getCourseById(courseId);

    if (course.teacher.toString() !== teacherId) {
      throw new Error('Викладач не викладає цей курс');
    }

    const { name, mimeType, path } = await this.fileStorage.upload(uploadedFile);

    const file = new CourseFile({
      name,
      mimeType,
      path,
      course: courseId,
    });

    await file.save();

    return file.toResponse();
  }

  async getFiles(courseId, user, searchTerm) {
    switch (user.type) {
      case 'STUDENT': return this.getStudentFiles(courseId, user.id, searchTerm);
      case 'TEACHER': return this.getTeacherFiles(courseId, user.id, searchTerm);
      default: return [];
    }
  }

  async getStudentFiles(courseId, studentId, searchTerm) {
    const course = await this.coursesService.getCourseById(courseId);

    if (!course.students.find(studentOId => studentOId.toString() === studentId)) {
      throw new Error('Студент не має доступу до цього курсу');
    }

    const searchParams = {
      course: courseId,
      students: studentId
    };

    if (searchTerm) {
      searchParams.name = { $regex: new RegExp(searchTerm, 'gi') }
    }

    const files = await CourseFile.find(searchParams);

    return files.map(file => file.toResponse());
  }

  async getTeacherFiles(courseId, teacherId, searchTerm) {
    const course = await this.coursesService.getCourseById(courseId);

    if (course.teacher.toString() !== teacherId) {
      throw new Error('Викладач не викладає цей курс');
    }

    const searchParams = {
      course: courseId
    };

    if (searchTerm) {
      searchParams.name = { $regex: new RegExp(searchTerm, 'gi') }
    }

    const files = await CourseFile.find(searchParams);

    return files.map(file => file.toResponse());
  }

  async removeFile(fileId, teacher) {
    const file = await CourseFile.findById(fileId);

    if (!file) {
      throw new Error('Такого файлу не існує');
    }

    const course = await this.coursesService.getCourseById(file.course);

    if (course.teacher.toString() !== teacher) {
      throw new Error('Викладач не викладає цей курс');
    }

    await this.fileStorage.remove(file.path);

    await CourseFile.deleteOne({ _id: fileId });

    return `Файл ${file.name} видалено`;
  }

  async updateFileAccess(teacherId, fileId, students) {
    const file = await CourseFile.findById(fileId);

    if (!file) {
      throw new Error('Такого файлу не існує');
    }

    const course = await this.coursesService.getCourseById(file.course);

    if (course.teacher.toString() !== teacherId) {
      throw new Error('Викладач не викладає цей курс');
    }

    file.students = Array.from(new Set(students));

    await file.save();

    return file.toResponse();
  }

  async getDownloadUrl(user, fileId) {
    const file = await CourseFile.findById(fileId);

    if (!file) {
      throw new Error('Файл не знайдений');
    }

    if (user.type === USER_TYPES.STUDENT) {
      if (!file.students.find(studentId => studentId === user.id)) {
        throw new Error('У вас нема доступу до файлу');
      }
    } else {
      const course = await this.coursesService.getCourseById(file.course);

      if (course.teacher !== user.id) {
        throw new Error('Викладач не викладає цей курс');
      }
    }

    return this.fileStorage.getDownloadURL(file.path);
  }
}