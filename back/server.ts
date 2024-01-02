import { ApolloServer } from "@apollo/server";
import { prisma } from "./prisma/db";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import { mergedSchema } from "./schema";

dotenv.config();

const PORT = process.env.GQL_PORT || 5100;

// Create an Express app and HTTP server; we will attach the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
const httpServer = createServer(app);

// Set up WebSocket server.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/api",
});

const serverCleanup = useServer({ schema: mergedSchema }, wsServer);

// Set up ApolloServer.
const server = new ApolloServer({
  schema: mergedSchema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
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

async function startServer() {
  await server.start();
  app.use(
    "/api",
    cors<cors.CorsRequest>({
      origin: "http://localhost:5173",
      optionsSuccessStatus: 200,
      credentials: true,
    }),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res, prisma }),
    })
  );
}

startServer();
// Now that our HTTP server is fully set up, actually listen.
httpServer.listen(PORT, () => {
  console.log(`🚀 Query endpoint ready at http://localhost:${PORT}/api`);
  console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}/api`);
});

// In the background, increment a number every second and notify subscribers when it changes.
