import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CtxType } from "../../types";
import { verifyJwt } from "../../utils";
import { ChatMessagesInputType, NewChatInputType } from "./inputs/inputTypes";
import {
  ChatMessagesObjectType,
  ChatsObjectType,
  NewChatObjectType,
} from "./objects/objectTypes";

@Resolver()
export class ChatResolver {
  @Mutation(() => NewChatObjectType)
  async newChat(
    @Arg("input", () => NewChatInputType)
    { userId, message, petId }: NewChatInputType,
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
    const pet = await prisma.pet.findFirst({ where: { id: petId } });
    if (!!!friend) return { success: false };
    if (!!!pet) return { success: false };

    if (!!!me) {
      return {
        success: false,
      };
    }
    const chatId: string = [me.id, friend.id]
      .sort((a, b) => a.localeCompare(b))
      .join("@");
    const chatTitle = `${pet.name} • ${me.firstName} & ${friend.firstName}`;
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
          pet: { connect: { id: pet.id } },
          chatTitle,
        },
      });
      await prisma.message.create({
        data: {
          message,
          sender: { connect: { id: me.id } },
          chat: { connect: { id: _chat.id } },
        },
      });

      return {
        success: true,
        chatId: _chat.id,
      };
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
      chatId: chat.id,
    };
  }

  @Query(() => ChatMessagesObjectType)
  async chat(
    @Arg("input", () => ChatMessagesInputType) { id }: ChatMessagesInputType,
    @Ctx() { prisma }: CtxType
  ): Promise<ChatMessagesObjectType> {
    const chat = await prisma.chat.findFirst({
      where: { id },
      include: {
        messages: {
          include: { sender: true },
        },
        pet: {
          include: {
            seller: true,
            comments: true,
            reactions: true,
            location: true,
          },
        },
      },
    });
    return {
      chat,
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
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: true,
        messages: {
          include: {
            sender: true,
          },
          orderBy: { createdAt: "asc" },
        },
        pet: {
          include: {
            reactions: true,
            seller: true,
            comments: true,
            location: true,
            chats: true,
          },
        },
      },
    });
    return {
      count: chats.length,
      chats: chats,
    };
  }
}
