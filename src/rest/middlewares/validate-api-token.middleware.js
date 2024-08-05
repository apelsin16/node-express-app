import { ApiTokenService } from '../../services/api-token.service';

const tokenService = new ApiTokenService();

function validateTokenMiddleware(scopes) {
  return async (request, response, next) => {
    const token = request.headers['x-api-token'];

    const apiToken = await tokenService.findToken(token);

    if (!apiToken) {
      return response.status(401).send('Unauthorized');
    }

    const matchingScopes = apiToken.scopes.filter(scope => scopes.includes(scope));

    if (matchingScopes.length === 0) {
      return response.status(401).send('Unauthorized');
    }

    request.user = {
      id: apiToken.userId,
      type: apiToken.userType,
    };

    next();
  }
}

export default validateTokenMiddleware;