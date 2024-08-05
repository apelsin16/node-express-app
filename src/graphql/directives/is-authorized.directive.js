import { mapSchema, MapperKind, getDirective } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';

export const isAuthorizedDirectiveTypeDef = 'directive @isAuthorized(type: String) on FIELD_DEFINITION';

export const isAuthorizedDirectiveTransformer = (schema) =>
  mapSchema(schema, {
    [MapperKind.FIELD]: (fieldConfig) => {
      const isAuthorizedDirective = getDirective(
        schema,
        fieldConfig,
        'isAuthorized'
      )?.[0];

      if (isAuthorizedDirective) {
        const { type } = isAuthorizedDirective;

        const { resolve = defaultFieldResolver } = fieldConfig;
        
        fieldConfig.resolve = function (parent, args, context, info) {
          const { user } = context;

          if (!user) {
            throw new Error('Unauthorized');
          }

          if (type) {
            if (user.type !== type) {
              throw new Error('Unauthorized');
            }
          }
         
          return resolve(parent, args, context, info);
        };

        return fieldConfig;
      }
    },
  });
