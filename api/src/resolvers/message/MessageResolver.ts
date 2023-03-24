import { Message } from "@prisma/client";
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
  NewChatMessageSubscriptionInput,
  SendMessageInputType,
} from "./inputs/inputTypes";
import {
  NewChatMessageType,
  SendMessageObjectType,
} from "./objects/objectTypes";

@Resolver()
export class MessageResolver {
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

    const msg = await prisma.message.create({
      data: {
        message,
        chat: { connect: { id: chat.id } },
        sender: { connect: { id: me.id } },
      },
    });

    return {
      success: true,
    };
  }

  @Subscription(() => NewChatMessageType, {
    topics: [Events.NEW_CHAT_MESSAGE, Events.READ_CHAT_MESSAGE],
    nullable: false,
  })
  async newChatMessage(
    @Arg("input", () => NewChatMessageSubscriptionInput)
    { userId: uid }: NewChatMessageSubscriptionInput,
    @Root()
    { userId, message }: { userId: string; message: Message }
  ): Promise<NewChatMessageType | undefined> {
    // the notification does not belong to you
    if (userId !== uid) return undefined;
    return {
      userId,
      message,
    };
  }
}
