import { User } from "@prisma/client";
import { FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { __cookieName__ } from "../constants";

export const storeCookie = (reply: FastifyReply, value: string) => {
  reply.setCookie(__cookieName__, value, {
    httpOnly: true,
    sameSite: "lax",
  });
};
export const signJwt = async ({ id, email }: User): Promise<string> => {
  return await jwt.sign(
    {
      id,
      email,
    },
    process.env.JWT_TOKEN_SCRETE
  );
};

export const verifyJwt = async (token: string) => {
  return jwt.verify(token, process.env.JWT_TOKEN_SCRETE) as Partial<User>;
};
