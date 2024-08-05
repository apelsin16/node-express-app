import { USER_TYPES } from '../constants/user-types';
import { ApiToken } from '../mongo/api-token';
import { StudentsService } from './students.service';
import { TeachersService } from './teachers.service';

export class ApiTokenService {
  constructor() {
    this.teacherService = new TeachersService();
    this.studentService = new StudentsService()
  }

  async getTokens() {
    const tokens = await ApiToken.find();

    return tokens.map(token => token.toResponse());
  }

  async createToken({ userId, userType, scopes }) {
    if (userType === USER_TYPES.STUDENT) {
      await this.studentService.getStudentById(userId);
    } else {
      await this.teacherService.getTeacherById(userId);
    }

    const existingToken = await this.findTokenByUser(userId, userType);

    if(existingToken) {
      return existingToken;
    }

    const token = new ApiToken({
      userId,
      userType,
      scopes,
    });

    await token.save();

    return token.toResponse();
  }

  async updateToken(id, scopes) {
    const token = await ApiToken.findById(id);

    if (!token) {
      throw new Error('Token not found');
    }

    token.scopes = scopes;

    await token.save();

    return token.toResponse();
  }

  async removeToken(id) {
    const token = await ApiToken.findById(id);

    if (!token) {
      throw new Error('Token not found');
    }

    await token.deleteOne();

    return 'Ok';
  }

  async findTokenByUser(userId, userType) {
    return ApiToken.findOne({
      userId,
      userType,
    });
  }
  
  async findToken(token) {
    return ApiToken.findOne({
      token,
    });
  }
}