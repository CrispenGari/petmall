import "reflect-metadata";
import "dotenv/config";
import _ from "node-env-types";
import Fastify from "fastify";
import mercurius from "mercurius";
import { buildSchema } from "type-graphql";
import { CtxType } from "./types";
import { resolvers } from "./resolvers";
import { HelloResolver } from "./resolvers/hello/HelloResolver";
import { PrismaClient } from "@prisma/client";

_();
const PORT: any = process.env.PORT || 3001;
const HOST =
  process.env.NODE_ENV === "production"
    ? "0.0.0.0"
    : "localhost" || "127.0.0.1";

(async () => {
  const fastify = Fastify({
    logger: false,
    ignoreTrailingSlash: true,
  });

  const prisma = new PrismaClient();
  const schema = await buildSchema({
    resolvers: [HelloResolver],
    validate: false,
  });
  fastify.register(mercurius, {
    context: (request, reply): CtxType => {
      return {
        request,
        reply,
        prisma,
      };
    },
    graphiql: true,
    schema: schema as any,
    path: "/graphql",
  });

  fastify.listen({ port: PORT, host: HOST }, (error, address) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.log(` Server is now listening on ${address}`);
  });
})();
