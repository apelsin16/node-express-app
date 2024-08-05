import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  online: { type: Boolean, default: false },
});