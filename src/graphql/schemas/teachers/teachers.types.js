const Teachers = `
  input UpdateTeacherBody {
    specialties: [String]!
  }  

  type Query {
    teacher(id: String!): Teacher @isAuthorized
  }

  type Mutation {
    updateTeacher(body: UpdateTeacherBody!): Teacher @isAuthorized(type: "TEACHER")
  }
`;

export default Teachers;
