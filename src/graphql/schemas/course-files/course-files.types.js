const CourseFiles = `
  type Mutation {
    uploadFile(courseId: String!, file: Upload!): CourseFile @isAuthorized(type: "TEACHER")
    removeFile(fileId: String!): String @isAuthorized(type: "TEACHER")
    updateFileAccess(fileId: String!, students: [String]!): CourseFile @isAuthorized(type: "TEACHER")
  }

  type Query {
    files(courseId: String!, searchTerm: String): [CourseFile] @isAuthorized
  }
`;

export default CourseFiles;
