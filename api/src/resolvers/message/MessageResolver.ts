import { Message } from "@prisma/client";
import {
  Arg,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { Events } from "../../constants";
import { CtxType } from "../../types";
import { verifyJwt } from "../../utils";
import {
  MarkMessagesAsReadInputType,
  MarkMessagesAsUnReadInputType,
  NewMessageSubscriptionInput,
  SendMessageInputType,
} from "./inputs/inputTypes";
import {
  MarkMessagesAsReadObjectType,
  MarkMessagesAsUnReadObjectType,
  NewMessageType,
  SendMessageObjectType,
} from "./objects/objectTypes";

@Resolver()
export class MessageResolver {
  @Mutation(() => MarkMessagesAsReadObjectType)
  async markMessagesAsRead(
    @Arg("input", () => MarkMessagesAsReadInputType)
    { chatId }: MarkMessagesAsReadInputType,
    @Ctx() { prisma, request }: CtxType,
    @PubSub() pubsub: PubSubEngine
  ): Promise<MarkMessagesAsReadObjectType> {
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
    if (!!!me) {
      return {
        success: false,
      };
    }
    const chat = await prisma.chat.findFirst({ where: { id: chatId } });
    if (!!!chat) {
      return { success: false };
    }
    const friendId: string = chat.userIds.find((id) => id !== me.id) || "";
    await prisma.message.updateMany({
      where: {
        chatId: chat.id,
        AND: {
          senderId: friendId,
        },
      },
      data: { opened: true },
    });
    await pubsub.publish(Events.READ_CHAT_MESSAGE, {
      userId: me.id,
      chatId,
    });
    await pubsub.publish(Events.READ_CHAT_MESSAGE, {
      userId: friendId,
    });
    return {
      success: true,
    };
  }
  @Mutation(() => MarkMessagesAsUnReadObjectType)
  async markMessagesAsUnRead(
    @Arg("input", () => MarkMessagesAsUnReadInputType)
    { chatId, messageId }: MarkMessagesAsUnReadInputType,
    @Ctx() { prisma, request }: CtxType,
    @PubSub() pubsub: PubSubEngine
  ): Promise<MarkMessagesAsUnReadObjectType> {
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
    if (!!!me) {
      return {
        success: false,
      };
    }
    const chat = await prisma.chat.findFirst({ where: { id: chatId } });
    if (!!!chat) {
      return { success: false };
    }
    const friendId: string = chat.userIds.find((id) => id !== me.id) || "";
    await prisma.message.update({
      where: {
        id: messageId,
      },
      data: { opened: false },
    });
    await pubsub.publish(Events.READ_CHAT_MESSAGE, {
      userId: me.id,
      chatId,
    });
    await pubsub.publish(Events.READ_CHAT_MESSAGE, {
      userId: friendId,
    });
    return {
      success: true,
    };
  }

  @Mutation(() => SendMessageObjectType)
  async sendMessage(
    @Arg("input", () => SendMessageInputType)
    { message, chatId }: SendMessageInputType,
    @Ctx() { prisma, request }: CtxType,
    @PubSub() pubsub: PubSubEngine
  ): Promise<SendMessageObjectType> {
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
    if (!!!me) {
      return {
        success: false,
      };
    }

    const chat = await prisma.chat.findFirst({ where: { id: chatId } });

    if (!!!chat) {
      return { success: false };
    }
    const friendId: string = chat.userIds.find((id) => id !== me.id) || "";

    const msg = await prisma.message.create({
      data: {
        message,
        chat: { connect: { id: chat.id } },
        sender: { connect: { id: me.id } },
      },
    });
    await pubsub.publish(Events.NEW_CHAT_MESSAGE, {
      userId: msg.senderId,
      chatId: "",
      message: msg,
    });
    await pubsub.publish(Events.NEW_CHAT_MESSAGE, {
      userId: friendId,
      chatId: chat.id,
      message: msg,
    });
    return {
      success: true,
    };
  }

  @Subscription(() => NewMessageType, {
    topics: [Events.NEW_CHAT_MESSAGE],
    nullable: false,
  })
  async newMessage(
    @Arg("input", () => NewMessageSubscriptionInput)
    { userId: uid }: NewMessageSubscriptionInput,
    @Root()
    {
      userId,
      message,
      chatId,
    }: { userId: string; message: Message; chatId: string }
  ): Promise<NewMessageType | undefined> {
    // the notification does not belong to you
    if (userId !== uid) return undefined;
    return {
      userId,
      message,
      chatId,
    };
  }
}
