import { Notification } from "@prisma/client";
import { Arg, Ctx, Query, Resolver, Root, Subscription } from "type-graphql";
import { Events } from "../../constants";
import { CtxType } from "../../types";
import { verifyJwt } from "../../utils";
import { NewNotificationSubscriptionInput } from "./inputs/inputTypes";
import {
  NewNotificationType,
  NotificationObjectType,
} from "./objects/objectType";

@Resolver()
export class NotificationResolver {
  @Query(() => NotificationObjectType, { nullable: false })
  async notifications(
    @Ctx() { prisma, request }: CtxType
  ): Promise<NotificationObjectType> {
    const jwt = request.headers.authorization?.split(" ")[1];
    if (!!!jwt)
      return {
        total: 0,
        unread: 0,
        notifications: [],
      };
    const payload = await verifyJwt(jwt);
    if (!!!payload)
      return {
        total: 0,
        unread: 0,
        notifications: [],
      };
    const user = await prisma.user.findFirst({ where: { id: payload.id } });
    if (!!!user)
      return {
        total: 0,
        unread: 0,
        notifications: [],
      };

    const notifications = await prisma.notification.findMany({
      where: {
        userId: user.id,
      },
    });
    return {
      total: notifications.length,
      unread: notifications.filter((notification) => !notification.read).length,
      notifications,
    };
  }

  @Subscription(() => NewNotificationType, {
    topics: [
      Events.NEW_COMMENT_NOTIFICATION,
      Events.NEW_COMMENT_REPLY_NOTIFICATION,
      Events.NEW_REACTION_TO_PET_NOTIFICATION,
      Events.NEW_REACTION_TO_COMMENT_NOTIFICATION,
    ],
    nullable: false,
  })
  async newNotification(
    @Arg("input", () => NewNotificationSubscriptionInput)
    { userId: uid }: NewNotificationSubscriptionInput,
    @Root()
    { userId, notification }: { userId: string; notification: Notification }
  ): Promise<NewNotificationType | undefined> {
    // the notification does not belong to you
    if (userId !== uid) return undefined;
    return {
      userId,
      notification,
    };
  }
}
