import { GraphQLScalarType } from 'graphql';
import { DateTime } from 'luxon';

export const dateScalarDef = 'scalar Date';

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date Scalar',
  serialize(value) {
    if (value instanceof Date) {
      return value.toISOString();
    }
    throw new Error('Для серіалізації очікується об\'єкт типу `Date`');
  },
  parseValue(value) {
    const date = DateTime.fromISO(value);

    if (!date.isValid) {
      throw new Error('Передане значення не є датою або має невірний формат');
    }

    return date.toJSDate();
  },
  parseLiteral(ast) {
    const date = DateTime.fromISO(ast.value);

    if (!date.isValid) {
      throw new Error('Передане значення не є датою або має невірний формат');
    }

    return date.toJSDate();
  },
});
