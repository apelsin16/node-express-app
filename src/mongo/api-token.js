import mongoose from 'mongoose';
import { generate as generateRandomString } from 'randomstring';

import { API_SCOPES } from '../constants/api-scopes';
import { USER_TYPES } from '../constants/user-types';

const apiTokenSchema = new mongoose.Schema({
  userId: mongoose.SchemaTypes.ObjectId,
  userType: {
    type: String,
    enum: Object.values(USER_TYPES),
  },
  token: {
    type: String,
    default: () => generateRandomString(15),
  },
  scopes: {
    type: [String],
    enum: Object.values(API_SCOPES)
  },
});

apiTokenSchema.methods.toResponse = function () {
  return {
    id: this._id,
    token: this.token,
    userId: this.userId,
    userType: this.userType,
    scopes: this.scopes
  }
};

export const ApiToken = mongoose.model('ApiToken', apiTokenSchema);