const Students = `
  input UpdateStudentBody {
    skills: [String]!
  }  

  type Query {
    student(id: String!): Student @isAuthorized
  }

  type Mutation {
    updateStudent(body: UpdateStudentBody!): Student @isAuthorized(type: "STUDENT")
  }
`;

export default Students;
