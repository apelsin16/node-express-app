import morgan from 'morgan';

import Logger from './logger';

const stream = {
  write: (message) => Logger.http(message),
};

const skip = (req) => req.baseUrl === '/graphql';

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);

export default morganMiddleware;