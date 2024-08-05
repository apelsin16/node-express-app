import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema';

import { applyDirectives } from './directives';

import { scalarsSchema } from './scalars';
import authSchema from './schemas/auth/auth.schema';
import coursesSchema from './schemas/courses/courses.schema';
import courseFilesSchema from './schemas/course-files/course-files.schema';
import lessonsSchema from './schemas/lessons/lessons.schema';
import studentsSchema from './schemas/students/students.schema';
import teachersSchema from './schemas/teachers/teachers.schema';
import timeSlotsSchema from './schemas/time-slots/time-slots.schema';
import reviewsSchema from './schemas/reviews/reviews.schema';
import apiTokenSchema from './schemas/api-token/api-token.schema';

const linkSchema = makeExecutableSchema({
  typeDefs: `
    type Query {
      _: Boolean
    }
  `,
});

let schema = mergeSchemas({
  schemas: [
    linkSchema,
    authSchema,
    coursesSchema,
    courseFilesSchema,
    lessonsSchema,
    reviewsSchema,
    studentsSchema,
    teachersSchema,
    timeSlotsSchema,
    scalarsSchema,
    apiTokenSchema,
  ],
});


schema = applyDirectives(schema);

export default schema;
