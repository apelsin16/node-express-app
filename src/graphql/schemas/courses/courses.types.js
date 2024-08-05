const Courses = `
  input CreateCourseInput {
    name: String!
    start: Date!
    end: Date!
    students: [String]
  }
  
  type Mutation {
    createCourse(body: CreateCourseInput): Course @isAuthorized(type: "TEACHER")
    updateCourseStudents(id: String!, students: [String]!): Course @isAuthorized(type: "TEACHER")
  }
  
  type Query {
    course(id: String!): Course @isAuthorized
  }
`;

export default Courses;
