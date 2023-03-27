import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const petMallRoute = async (fastify: FastifyInstance) => {
  fastify.setErrorHandler(async (err) => {
    console.log(err.message);
    throw new Error("caught");
  });
  fastify.post("/", async (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send({
      code: 200,
      message: "Hello from petmall server",
    });
  });
};
