import {
  Resolver,
  Query,
  Arg,
  Ctx,
  Mutation,
  Subscription,
  Root,
  PubSub,
} from "type-graphql";
import { CtxType } from "../../types";
import { PubSubEngine } from "graphql-subscriptions";

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

  @Mutation(() => String, { nullable: false })
  async sayHello(
    @Arg("message", { nullable: false }) message: string,
    @PubSub() pubsub: PubSubEngine
  ) {
    await pubsub.publish("hello", message);
    return message;
  }

  @Mutation(() => String, { nullable: false })
  async sayHi(
    @Arg("message", { nullable: false }) message: string,
    @PubSub() pubsub: PubSubEngine
  ) {
    await pubsub.publish("hello", message);
    return message;
  }

  @Subscription(() => String, {
    topics: ["hello", "hi"],
  })
  async notify(@Root() message: string): Promise<string> {
    return message;
  }
}
