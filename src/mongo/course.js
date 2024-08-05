import mongoose from 'mongoose';


const courseSchema = new mongoose.Schema({
  name: String,
  start: Date,
  end: Date,
  teacher: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Teacher'
  },
  students: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Student'
  },
});

courseSchema.methods.toResponse = function toResponse() {
  return {
    id: this._id,
    name: this.name,
    start: this.start,
    end: this.end,
    teacher: this.teacher,
    students: this.students,
  };
};

export const Course = mongoose.model('Course', courseSchema);

