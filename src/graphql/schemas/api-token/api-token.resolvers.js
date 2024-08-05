import { ApiTokenService } from '../../../services/api-token.service';

const service = new ApiTokenService();

export default {
  Query: {
    getTokens: (parent, args) => service.getTokens(),
  },
  Mutation: {
    createToken: (parent, { body }) => service.createToken(body),
    updateToken: (parent, { id, scopes }) => service.updateToken(id, scopes),
    removeToken: (parent, { id }) => service.removeToken(id),
  },
};