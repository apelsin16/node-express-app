import { isAuthorizedDirectiveTransformer, isAuthorizedDirectiveTypeDef } from './is-authorized.directive';

export const directivesDef = `
  ${isAuthorizedDirectiveTypeDef}
`

export const applyDirectives = (schema) => {
  schema = isAuthorizedDirectiveTransformer(schema);

  return schema;
};
