import { directivesDef } from './directives';
import { scalarsDef } from './scalars';

const Common = `
  ${directivesDef}

  ${scalarsDef}

  interface User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    online: Boolean!
  }

  type Student implements User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    skills: [String]
    online: Boolean!
  }

  type Teacher implements User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    specialties: [String]
    online: Boolean!
  }

  type Course {
    id: String!
    name: String!
    start: Date!
    end: Date!
    teacher: Teacher!
    students: [Student]!
  }

  type Lesson {
    id: String!
    start: Date!
    end: Date!
    course: Course!
    student: Student!
    teacher: Teacher!
  }

  type TimeSlot {
    id: String!
    start: Date!
    end: Date!
    teacher: Teacher!
  }
  
  type Review {
    id: String!
    date: Date!
    text: String!
    teacher: Teacher!
    student: Student!
  }
  
  type CourseFile {
    id: String!
    name: String!
    path: String!
    mimeType: String!
    course: Course!
    students: [Student]!
  }

  enum ApiScope {
    CREATE_LESSONS
    GET_LESSONS
    DOWNLOAD_FILE
  }

  type ApiToken {
    id: String!
    token: String!
    userId: String!
    userType: String!
    scopes: [ApiScope]!
  }
`;

export default Common;
