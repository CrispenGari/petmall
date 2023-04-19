import {
  Arg,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { Events } from "../../constants";
import { CtxType } from "../../types";
import { verifyJwt } from "../../utils";
import {
  ChatMessagesInputType,
  DeleteChatInputType,
  NewChatInputType,
  NewChatMessageSubscriptionInput,
} from "./inputs/inputTypes";
import {
  ChatMessagesObjectType,
  ChatsObjectType,
  DeleteChatObjectType,
  NewChatMessageType,
  NewChatObjectType,
} from "./objects/objectTypes";

@Resolver()
export class ChatResolver {
  @Mutation(() => NewChatObjectType)
  async newChat(
    @Arg("input", () => NewChatInputType)
    { userId, message, petId }: NewChatInputType,
    @Ctx() { prisma, request }: CtxType,
    @PubSub() pubsub: PubSubEngine
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
    const chatId: string = [
      pet.id,
      [me.id, friend.id].sort((a, b) => a.localeCompare(b)).join("@"),
    ].join(":");
    // chatId = petId:user1Id@user2Id
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
      await pubsub.publish(Events.NEW_CHAT_MESSAGE, {
        userId: me.id,
        chatId: _chat.id,
      });
      await pubsub.publish(Events.NEW_CHAT_MESSAGE, {
        userId: friend.id,
        chatId: _chat.id,
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
    await pubsub.publish(Events.NEW_CHAT_MESSAGE, { userId: me.id });
    await pubsub.publish(Events.NEW_CHAT_MESSAGE, { userId: friend.id });
    return {
      success: true,
      chatId: chat.id,
    };
  }

  @Mutation(() => DeleteChatObjectType)
  async deleteChat(
    @Arg("input", () => DeleteChatInputType)
    { id }: DeleteChatInputType,
    @Ctx() { prisma, request }: CtxType,
    @PubSub() pubsub: PubSubEngine
  ): Promise<DeleteChatObjectType> {
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
    const chat = await prisma.chat.findFirst({ where: { id } });
    if (!!!chat) return { success: false };
    if (!!!me) return { success: false };
    const friendId = chat.userIds.find((i) => i !== me.id) || "";
    const friend = await prisma.user.findFirst({ where: { id: friendId } });
    if (!!!friend) return { success: false };
    try {
      await prisma.chat.delete({ where: { id: chat.id } });
    } catch (error) {
      return {
        success: false,
      };
    }
    await pubsub.publish(Events.DELETE_CHAT, { userId: me.id });
    await pubsub.publish(Events.DELETE_CHAT, { userId: friend.id });
    return {
      success: true,
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
          orderBy: { createdAt: "asc" },
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
        unopened: 0,
      };
    const payload = await verifyJwt(jwt);
    if (!!!payload) {
      return {
        count: 0,
        chats: [],
        unopened: 0,
      };
    }

    const me = await prisma.user.findFirst({
      where: { id: payload.id },
    });
    if (!!!me) {
      return {
        count: 0,
        chats: [],
        unopened: 0,
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
          orderBy: { createdAt: "desc" },
          take: 1,
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

    const unopened: number = chats
      .flatMap((chat) => chat.messages)
      .filter(
        (message) => !message.opened && message.senderId !== me.id
      ).length;
    return {
      count: chats.length,
      chats: chats,
      unopened,
    };
  }
  @Subscription(() => NewChatMessageType, {
    topics: [
      Events.NEW_CHAT_MESSAGE,
      Events.READ_CHAT_MESSAGE,
      Events.DELETE_CHAT,
    ],
    nullable: false,
  })
  async newChatMessage(
    @Arg("input", () => NewChatMessageSubscriptionInput)
    { userId: uid }: NewChatMessageSubscriptionInput,
    @Root()
    { userId, chatId }: { userId: string; chatId: string }
  ): Promise<NewChatMessageType | undefined> {
    // the notification does not belong to you
    if (userId !== uid) return undefined;
    return {
      userId,
      chatId,
    };
  }
}
