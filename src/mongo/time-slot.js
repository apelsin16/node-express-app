import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
  start: Date,
  end: Date,
  teacher: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Teacher'
  },
});

timeSlotSchema.methods.toResponse = function toResponse() {
  return {
    id: this._id,
    start: this.start,
    end: this.end,
    teacher: this.teacher,
  };
};

export const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

