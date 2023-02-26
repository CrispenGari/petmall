import { Arg, Mutation, Resolver } from "type-graphql";
import { NewPetInputType } from "./inputs/inputTypes";

@Resolver()
export class PetResolver {
  @Mutation(() => Boolean)
  async add(@Arg("input", () => NewPetInputType) { image }: NewPetInputType) {
    console.log(image);
    return true;
  }
  //   @Query(() => MeObjectType, { nullable: true })
  //   async me(
  //     @Ctx() { prisma, request }: CtxType
  //   ): Promise<MeObjectType | undefined> {
  //     const jwt = request.headers.authorization?.split(" ")[1];
  //     if (!!!jwt) return undefined;
  //     const payload = await verifyJwt(jwt);
  //     if (!!!payload) return undefined;
  //     const user = await prisma.user.findFirst({ where: { id: payload.id } });
  //     if (!!!user) return undefined;
  //     return {
  //       ...user,
  //     };
  //   }
}
