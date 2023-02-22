import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient, Prisma } from "@prisma/client";

export type CtxType = {
  request: FastifyRequest;
  reply: FastifyReply;
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
};
