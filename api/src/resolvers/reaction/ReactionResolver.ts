import {
  Arg,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Resolver,
} from "type-graphql";
import { Events } from "../../constants";
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
    const comment = await prisma.comment.findFirst({
      where: {
        id: id as string,
      },
      include: {
        reactions: true,
        pet: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!!!comment) {
      return {
        success: false,
      };
    }

    let petId = comment.petId;

    if (!!!petId) {
      const _parentComment = await prisma.comment.findFirst({
        where: { id: comment.commentId! },
      });
      petId = _parentComment!.petId;
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
    }

    try {
      const _reaction = await prisma.reaction.create({
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
      await pubsub.publish(Events.NEW_REACTION_TO_COMMENT, {
        petId,
      });
      if (comment.userId !== user.id) {
        const notification = await prisma.notification.create({
          data: {
            notification: `${user.firstName} reacted "${_reaction.reaction
              .replace("_", " ")
              .toLowerCase()}" to your comment "${comment.comment}".`,
            user: {
              connect: {
                id: comment.userId,
              },
            },
            petId: petId!,
            title: `Comment Reaction • ${user.firstName}`,
          },
        });
        await pubsub.publish(Events.NEW_REACTION_TO_COMMENT_NOTIFICATION, {
          notification,
          userId: comment.userId,
        });
      }
    } catch (error) {
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
        seller: true,
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
    }
    try {
      const _reaction = await prisma.reaction.create({
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
      await pubsub.publish(Events.NEW_REACTION_TO_PET, {
        petId: pet.id,
      });
      await pubsub.publish(Events.ON_REACT_TO_CATEGORY_PET_UPDATE, {
        category: pet.category,
      });
      if (pet.sellerId !== user.id) {
        const notification = await prisma.notification.create({
          data: {
            title: `Pet Reaction • ${user.firstName}`,
            notification: `${user.firstName} reacted "${_reaction.reaction
              .replace("_", " ")
              .toLowerCase()}" to the pet ${pet.name}.`,
            user: {
              connect: {
                id: pet.sellerId,
              },
            },
            petId: pet.id,
          },
        });
        await pubsub.publish(Events.NEW_REACTION_TO_PET_NOTIFICATION, {
          notification,
          userId: pet.sellerId,
        });
      }
    } catch (error) {
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  }
}
