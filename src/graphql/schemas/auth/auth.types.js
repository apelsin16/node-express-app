const Auth = `
  type Mutation {
    signUpStudent(body: SignupStudentBody): Student
    signUpTeacher(body: SignupTeacherBody): Teacher
    loginStudent(body: LoginUserBody): String
    loginTeacher(body: LoginUserBody): String
    logoutStudent: String @isAuthorized(type: "STUDENT")
    logoutTeacher: String @isAuthorized(type: "TEACHER")
    loginAdmin(body: LoginUserBody): String
    logoutAdmin: String @isAuthorized(type: "ADMIN")
  }

  input SignupStudentBody {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    skills: [String]
  }

  input SignupTeacherBody {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    specialties: [String]
  }

  input LoginUserBody {
    email: String!
    password: String!
  }
`;

export default Auth;
