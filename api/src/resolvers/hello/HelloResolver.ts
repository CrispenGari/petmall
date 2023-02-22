import { Resolver, Query, Arg } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String, { nullable: false })
  async hello(@Arg("name", { nullable: false }) name: string) {
    return "Hello " + name;
  }
}
