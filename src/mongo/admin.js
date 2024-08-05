import mongoose from 'mongoose';

import { userSchema } from './user';

const adminSchema = new mongoose.Schema({}).add(userSchema);

adminSchema.methods.toResponse = function toResponse() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    online: this.online,
  };
};

export const Admin = mongoose.model('Admin', adminSchema);

