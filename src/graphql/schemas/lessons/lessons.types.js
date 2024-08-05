const Lessons = `
  input CreateLessonInput {
    start: Date!
    end: Date!
    course: String!
  }
  
  type Query {
    lessons: [Lesson] @isAuthorized
  }

  type Mutation {
    createLesson(body: CreateLessonInput): Lesson @isAuthorized(type: "STUDENT")
  }

  type Subscription {
    lessonAdded: Lesson @isAuthorized(type: "TEACHER")
  }
`;

export default Lessons;
