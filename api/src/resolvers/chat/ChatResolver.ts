import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CtxType } from "../../types";
import { verifyJwt } from "../../utils";
import { NewChatInputType } from "./inputs/inputTypes";
import { ChatsObjectType, NewChatObjectType } from "./objects/objectTypes";

@Resolver()
export class ChatResolver {
  @Mutation(() => NewChatObjectType)
  async newChat(
    @Arg("input", () => NewChatInputType) { userId, message }: NewChatInputType,
    @Ctx() { prisma, request }: CtxType
  ): Promise<NewChatObjectType> {
    const jwt = request.headers.authorization?.split(" ")[1];
    if (!!!jwt)
      return {
        success: false,
      };
    const payload = await verifyJwt(jwt);
    if (!!!payload) {
      return {
        success: false,
      };
    }
    const me = await prisma.user.findFirst({ where: { id: payload.id } });
    const friend = await prisma.user.findFirst({ where: { id: userId } });
    if (!!!friend) return { success: false };

    if (!!!me) {
      return {
        success: false,
      };
    }
    const chatId: string = [me.id, friend.id]
      .sort((a, b) => a.localeCompare(b))
      .join("@");

    const chat = await prisma.chat.findFirst({
      where: {
        chatId,
      },
    });

    if (!!!chat) {
      const _chat = await prisma.chat.create({
        data: {
          chatId,
          userIds: [me.id, friend.id].sort((a, b) => a.localeCompare(b)),
        },
      });
      await prisma.message.create({
        data: {
          message,
          sender: { connect: { id: me.id } },
          chat: { connect: { id: _chat.id } },
        },
      });
    } else {
      await prisma.message.create({
        data: {
          message,
          sender: { connect: { id: me.id } },
          chat: { connect: { id: chat.id } },
        },
      });
    }

    return {
      success: true,
    };
  }

  @Query(() => ChatsObjectType)
  async chats(@Ctx() { prisma, request }: CtxType): Promise<ChatsObjectType> {
    const jwt = request.headers.authorization?.split(" ")[1];
    if (!!!jwt)
      return {
        count: 0,
        chats: [],
      };
    const payload = await verifyJwt(jwt);
    if (!!!payload) {
      return {
        count: 0,
        chats: [],
      };
    }

    const me = await prisma.user.findFirst({
      where: { id: payload.id },
    });
    if (!!!me) {
      return {
        count: 0,
        chats: [],
      };
    }
    const chats = await prisma.chat.findMany({
      where: {
        chatId: {
          contains: me?.id,
        },
      },
      include: {
        messages: {
          include: {
            sender: true,
          },
        },
        users: true,
      },
    });
    return {
      count: chats.length,
      chats: chats,
    };
  }
}
