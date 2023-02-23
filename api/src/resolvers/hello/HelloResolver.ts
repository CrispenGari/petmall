import { Resolver, Query, Arg, Ctx, Mutation } from "type-graphql";
import { CtxType } from "../../types";

@Resolver()
export class HelloResolver {
  @Query(() => String, { nullable: false })
  async hello(
    @Arg("name", { nullable: false }) name: string,
    @Ctx() { reply, request }: CtxType
  ) {
    reply.setCookie("name", name);
    reply.cookie("qid", name);
    console.log(request.cookies);
    return "Hello " + name;
  }
}
