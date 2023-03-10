import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { CtxType } from "../../types";
import { verifyJwt } from "../../utils";

import { PetObjectType } from "../pet/objects/objectTypes";
import { ReplyToCommentInput } from "./inputs/inputTypes";

@Resolver()
export class CommentResolver {
  @Mutation(() => PetObjectType, { nullable: false })
  async replyToComment(
    @Arg("input", () => ReplyToCommentInput)
    { id, comment }: ReplyToCommentInput,
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
