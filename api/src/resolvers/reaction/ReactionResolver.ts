import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { CtxType } from "../../types";
import { verifyJwt } from "../../utils";
import { PetObjectType } from "../pet/objects/objectTypes";
import { ReactToCommentInput, ReactToPetInput } from "./inputs/inputTypes";

@Resolver()
export class ReactionResolver {
  @Mutation(() => PetObjectType, { nullable: false })
  async reactToComment(
    @Arg("input", () => ReactToCommentInput)
    { id, reaction }: ReactToCommentInput,
    @Ctx() { prisma, request }: CtxType
  ): Promise<PetObjectType> {
    const jwt = request.headers.authorization?.split(" ")[1];
    if (!!!jwt)
      return {
        success: false,
      };
    const payload = await verifyJwt(jwt);
    if (!!!payload)
      return {
        success: false,
      };
    const user = await prisma.user.findFirst({ where: { id: payload.id } });
    if (!!!user)
      return {
        success: false,
      };
    const comment = await prisma.comment.findFirst({
      where: {
        id: id as string,
      },
      include: {
        reactions: true,
      },
    });

    if (!!!comment) {
      return {
        success: false,
      };
    }
    // if you don't want to react to your own comment?
    // if (pet.sellerId === user.id) {
    //   return { success: false };
    // }
    const _reaction = comment.reactions.find(
      (reaction) => reaction.userId === user.id
    );
    if (!!_reaction) {
      // you liked the pet already
      await prisma.reaction.delete({
        where: {
          id: _reaction.id,
        },
      });
      return {
        success: true,
      };
    }
    try {
      await prisma.reaction.create({
        data: {
          reaction,
          user: {
            connect: {
              id: user.id,
            },
          },
          comment: {
            connect: { id: comment.id },
          },
        },
      });
    } catch (error) {
      console.log({ error });
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  }
  @Mutation(() => PetObjectType, { nullable: false })
  async reactToPet(
    @Arg("input", () => ReactToPetInput) { id, reaction }: ReactToPetInput,
    @Ctx() { prisma, request }: CtxType
  ): Promise<PetObjectType> {
    const jwt = request.headers.authorization?.split(" ")[1];
    if (!!!jwt)
      return {
        success: false,
      };
    const payload = await verifyJwt(jwt);
    if (!!!payload)
      return {
        success: false,
      };
    const user = await prisma.user.findFirst({ where: { id: payload.id } });
    if (!!!user)
      return {
        success: false,
      };
    const pet = await prisma.pet.findFirst({
      where: {
        id: id as string,
      },
      include: {
        reactions: true,
      },
    });

    if (!!!pet) {
      return {
        success: false,
      };
    }
    // if you don't want to react to your own pet?
    // if (pet.sellerId === user.id) {
    //   return { success: false };
    // }
    const _reaction = pet.reactions.find(
      (reaction) => reaction.userId === user.id
    );
    if (!!_reaction) {
      // you liked the pet already
      await prisma.reaction.delete({
        where: {
          id: _reaction.id,
        },
      });
      return {
        success: true,
      };
    }
    try {
      await prisma.reaction.create({
        data: {
          reaction,
          user: {
            connect: {
              id: user.id,
            },
          },
          pet: {
            connect: {
              id: pet.id,
            },
          },
        },
      });
    } catch (error) {
      console.log({ error });
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  }
}
