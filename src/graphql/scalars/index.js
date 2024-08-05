import { makeExecutableSchema } from '@graphql-tools/schema';

import { dateScalarDef } from './date/date.type';
import dateResolver from './date/date.resolver';
import { uploadScalarDef } from './upload/upload.type';
import uploadResolver from './upload/upload.resolver';

export const scalarsDef = `
  ${dateScalarDef}
  ${uploadScalarDef}
`

export const scalarsSchema = makeExecutableSchema({
  typeDefs: scalarsDef,
  resolvers: [
    dateResolver,
    uploadResolver
  ],
});