import mongoose from 'mongoose';

const courseFileSchema = new mongoose.Schema({
  name: String,
  mimeType: String,
  path: String,
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Course'
  },
  students: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Student'
  },
});

courseFileSchema.methods.toResponse = function toResponse() {
  return {
    id: this._id,
    name: this.name,
    mimeType: this.mimeType,
    path: this.path,
    course: this.course,
    students: this.students,
  };
};

export const CourseFile = mongoose.model('CourseFile', courseFileSchema);
