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

export enum Gender {
  MALE,
  FEMALE,
}
export enum Category {
  CATS,
  DOGS,
  BIRDS,
  RABBITS,
  HORSES,
  FERRETS,
  FISH,
  GUINEA_PIGS,
  RATS_AND_MICE,
  AMPHIBIANS,
  REPTILES,
}

export enum ReactionType {
  LIKE,
  LOVE,
  CLAP,
  DISLIKE,
  BLUSH,
}
