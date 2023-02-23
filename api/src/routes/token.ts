import {
  FastifyInstance,
  FastifyServerOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";

export const tokenRoute = async (
  fastify: FastifyInstance,
  options: FastifyServerOptions
) => {
  fastify.setErrorHandler(async (err) => {
    console.log(err.message);
    throw new Error("caught");
  });
  fastify.post(
    "/api/token",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const res = request.cookies;
      console.log(res);
      return reply.status(200).send({
        code: 200,
        message: "Hello world",
      });
    }
  );
};
