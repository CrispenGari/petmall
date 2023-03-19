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

      if (pet.sellerId !== user.id) {
        const notification = await prisma.notification.create({
          data: {
            notification: `${user.firstName} commented "${cmt.comment}" to the pet ${pet.name}.`,
            user: {
              connect: {
                id: pet.sellerId,
              },
            },
            petId: pet.id,
            title: `New Pet Comment • ${user.firstName}`,
          },
        });
        await pubsub.publish(Events.NEW_COMMENT_NOTIFICATION, {
          notification,
          userId: pet.sellerId,
        });
      }
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
    { id, comment, userId }: ReplyToCommentInput,
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
        id,
      },
    });

    if (!!!_comment) {
      return {
        success: false,
      };
    }
    const friend = await prisma.user.findFirst({ where: { id: userId } });
    if (!!!friend) {
      return { success: false };
    }

    const pet = await prisma.pet.findFirst({
      where: { id: _comment.petId as string },
      include: {
        seller: true,
      },
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
      await pubsub.publish(Events.NEW_COMMENT_REPLY, {
        petId: _comment.petId,
      });
      if (friend.id !== user.id) {
        const notification = await prisma.notification.create({
          data: {
            notification: `${user.firstName} replied "${cmt.comment}" to the comment "${_comment.comment} on pet ${pet?.name}".`,
            user: {
              connect: {
                id: friend.id,
              },
            },
            petId: _comment.petId as string,
            title: `Comment Reply • ${user.firstName}`,
          },
        });
        await pubsub.publish(Events.NEW_COMMENT_REPLY_NOTIFICATION, {
          notification,
          userId: friend.id,
        });
      }
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
