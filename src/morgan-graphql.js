import morgan from 'morgan';

import Logger from './logger';

const stream = {
  write: (message) => Logger.graphql(message.substring(0, message.lastIndexOf('\n'))),
};

const skip = req => req.baseUrl !== '/graphql';

const registerGraphQLToken = () => {
  morgan.token('graphql-query', (req) => req.body.query);
};

registerGraphQLToken();

const morganGraphQLMiddleware = morgan(
  ':res[content-length] - :response-time ms\n:graphql-query',
  { stream, skip }
);

export default morganGraphQLMiddleware;