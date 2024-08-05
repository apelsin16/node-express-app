import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  text: String,
  date: {
    type: Date,
    default: Date.now,
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

reviewSchema.methods.toResponse = function toResponse() {
  return {
    id: this._id,
    date: this.date,
    text: this.text,
    student: this.student,
    teacher: this.teacher,
  };
};

export const Review = mongoose.model('Review', reviewSchema);

