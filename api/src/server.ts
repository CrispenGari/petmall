import "reflect-metadata";
import "dotenv/config";
import _ from "node-env-types";
import Fastify from "fastify";
import mercurius from "mercurius";
import { buildSchema } from "type-graphql";
import { CtxType } from "./types";
import { resolvers } from "./resolvers";
import Redis from "ioredis";
import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { petMallRoute } from "./routes/token";
import fastifyWebsocket from "@fastify/websocket";
import fastifyStatic from "@fastify/static";
import path from "path";
import MercuriusGQLUpload from "mercurius-upload";
_();

const PORT: any = process.env.PORT || 3001;
const HOST =
  process.env.NODE_ENV === "production"
    ? "0.0.0.0"
    : "localhost" || "127.0.0.1";

(async () => {
  const redis = new Redis({});
  const fastify = Fastify({
    logger: false,
    ignoreTrailingSlash: true,
  });

  const prisma = new PrismaClient();
  const schema = await buildSchema({
    resolvers,
    validate: false,
  });

  fastify.register(fastifyWebsocket, {
    options: {
      maxPayload: 1048576,
    },
  });

  fastify.register(cors, {
    credentials: true,
    origin: ["http://localhost:3000"],
  });

  fastify.register(cookie, {
    secret: "my-secret",
    parseOptions: {
      sameSite: "lax",
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  });
  fastify.register(fastifyStatic, {
    root: path.join(__dirname.replace("dist", ""), "storage"),
    prefixAvoidTrailingSlash: true,
    prefix: "/petmall/api/storage",
  });
  fastify.register(MercuriusGQLUpload, {
    validate: false,
  });
  fastify.register(petMallRoute);
  fastify.register(mercurius, {
    subscription: true,
    context: (request, reply): CtxType => {
      return {
        request,
        reply,
        prisma,
        redis,
      };
    },
    graphiql: true,
    schema: schema as any,
    errorHandler(error, _request, _reply) {
      console.error(error.message);
    },
  });

  fastify.listen({ port: PORT, host: HOST }, (error, address) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.log(` Server is now listening on ${address}`);
  });
})();
