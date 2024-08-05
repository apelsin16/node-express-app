import mongoose from 'mongoose';

import { userSchema } from './user';

const studentSchema = new mongoose.Schema({
  skills: [String],
}).add(userSchema);

studentSchema.methods.toResponse = function toResponse() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    skills: this.skills,
    online: this.online
  };
};

export const Student = mongoose.model('Student', studentSchema);

