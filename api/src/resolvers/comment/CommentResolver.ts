import {
  Arg,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Resolver,
} from "type-graphql";
import { CtxType } from "../../types";
import { verifyJwt } from "../../utils";
import { CommentToPetInput } from "./inputs/inputTypes";
import { PetObjectType } from "../pet/objects/objectTypes";
import { ReplyToCommentInput } from "./inputs/inputTypes";
import { Events } from "../../constants";

@Resolver()
export class CommentResolver {
  @Mutation(() => PetObjectType, { nullable: false })
  async commentToPet(
    @Arg("input", () => CommentToPetInput) { id, comment }: CommentToPetInput,
    @Ctx() { prisma, request }: CtxType,
    @PubSub() pubsub: PubSubEngine
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
    try {
      const cmt = await prisma.comment.create({
        data: {
          comment: comment,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      await prisma.pet.update({
        where: { id },
        data: {
          comments: {
            connect: { id: cmt.id },
          },
        },
      });
      await pubsub.publish(Events.NEW_COMMENT, {
        petId: pet.id,
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
  async replyToComment(
    @Arg("input", () => ReplyToCommentInput)
    { id, comment }: ReplyToCommentInput,
    @Ctx() { prisma, request }: CtxType,
    @PubSub() pubsub: PubSubEngine
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
    const _comment = await prisma.comment.findFirst({
      where: {
        id: id as string,
      },
    });

    if (!!!_comment) {
      return {
        success: false,
      };
    }
    await pubsub.publish(Events.NEW_COMMENT_REPLY, {
      petId: _comment.petId,
    });
    try {
      const cmt = await prisma.comment.create({
        data: {
          comment: comment,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      await prisma.comment.update({
        where: { id },
        data: {
          replies: {
            connect: { id: cmt.id },
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
