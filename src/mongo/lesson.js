import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  start: Date,
  end: Date,
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Course'
  },
  student: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Student'
  },
  teacher: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Teacher'
  },
});

lessonSchema.methods.toResponse = function toResponse() {
  return {
    id: this._id,
    start: this.start,
    end: this.end,
    course: this.course,
    teacher: this.teacher,
    student: this.student,
  };
};

export const Lesson = mongoose.model('Lesson', lessonSchema);

