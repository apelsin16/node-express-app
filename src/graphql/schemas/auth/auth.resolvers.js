import { AuthService } from '../../../services/auth.service';

const service = new AuthService();

export default {
  Mutation: {
    signUpStudent: (parent, { body }) => service.signupStudent(body),
    signUpTeacher: (parent, { body }) => service.signUpTeacher(body),
    loginStudent: (parent, { body }) => service.loginStudent(body),
    loginTeacher: (parent, { body }) => service.loginTeacher(body),
    logoutStudent: (parent, variables, { user }) => service.logoutStudent(user.id),
    logoutTeacher: (parent, variables, { user }) => service.logoutTeacher(user.id),
    loginAdmin: (parent, { body }) => service.loginAdmin(body),
    logoutAdmin: (parent, variables, { user }) => service.logoutAdmin(user.id),
  },
};
