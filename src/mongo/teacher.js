import mongoose from 'mongoose';

import { userSchema } from './user';

const teacherSchema = new mongoose.Schema({
  specialties: [String],
}).add(userSchema);

teacherSchema.methods.toResponse = function toResponse() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    specialties: this.specialties,
    online: this.online,
  };
};

export const Teacher = mongoose.model('Teacher', teacherSchema);

