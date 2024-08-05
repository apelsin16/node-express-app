import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { graphqlUploadExpress } from 'graphql-upload';

import schema from './graphql';
import { applyRoutes } from './rest';
import { extractAndVerifyToken } from './utilities';
import Logger from './logger';
import morganMiddleware from './morgan';
import morganGraphQLMiddleware from './morgan-graphql';

async function bootstrap() {
  const app = express();

  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const serverCleanup = useServer({
    schema,
    context: async (ctx) => extractAndVerifyToken(ctx.connectionParams)
  }, wsServer);

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  await mongoose.connect(process.env.MONGODB_URL);

  app.use(morganMiddleware);
  app.use(morganGraphQLMiddleware);

  app.use(graphqlUploadExpress());

  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => extractAndVerifyToken(req.headers)
    })
  );

  applyRoutes(app);

  const port = process.env.PORT ?? 3000;

  await new Promise((resolve) => httpServer.listen({ port }, resolve));

  Logger.info(`Server ready at http://localhost:${port}/`);
}

bootstrap().catch(error => Logger.error(error));
