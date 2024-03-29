import { Notification } from "@prisma/client";
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
  DeleteNotificationInputType,
  MarkNotificationAsReadInputType,
  MarkNotificationAsUnReadInputType,
  NewNotificationSubscriptionInput,
} from "./inputs/inputTypes";
import {
  DeleteNotificationObjectType,
  MarkNotificationAsReadObjectType,
  MarkNotificationAsUnReadObjectType,
  NewNotificationType,
  NotificationObjectType,
} from "./objects/objectType";

@Resolver()
export class NotificationResolver {
  @Mutation(() => MarkNotificationAsReadObjectType)
  async markNotificationAsRead(
    @Arg("input", () => MarkNotificationAsReadInputType)
    { id }: MarkNotificationAsReadInputType,
    @Ctx() { prisma, request }: CtxType,
    @PubSub() pubsub: PubSubEngine
  ): Promise<MarkNotificationAsReadObjectType> {
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

    const notification = await prisma.notification.findFirst({
      where: { id },
      include: { user: true },
    });
    if (!!!notification) return { success: false };
    await prisma.notification.update({
      where: { id: notification.id },
      data: {
        read: true,
      },
    });
    await pubsub.publish(Events.REFETCH_NOTIFICATIONS, {
      notification,
      userId: notification.userId,
    });
    return {
      success: true,
    };
  }

  @Mutation(() => MarkNotificationAsUnReadObjectType)
  async markNotificationAsUnRead(
    @Arg("input", () => MarkNotificationAsUnReadInputType)
    { id }: MarkNotificationAsUnReadInputType,
    @Ctx() { prisma, request }: CtxType,
    @PubSub() pubsub: PubSubEngine
  ): Promise<MarkNotificationAsUnReadObjectType> {
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

    const notification = await prisma.notification.findFirst({
      where: { id },
      include: { user: true },
    });
    if (!!!notification) return { success: false };
    await prisma.notification.update({
      where: { id: notification.id },
      data: {
        read: false,
      },
    });
    await pubsub.publish(Events.REFETCH_NOTIFICATIONS, {
      notification,
      userId: notification.userId,
    });
    return {
      success: true,
    };
  }

  @Mutation(() => DeleteNotificationObjectType)
  async deleteNotification(
    @Arg("input", () => DeleteNotificationInputType)
    { id }: DeleteNotificationInputType,
    @Ctx() { prisma, request }: CtxType,
    @PubSub() pubsub: PubSubEngine
  ): Promise<DeleteNotificationObjectType> {
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

    const notification = await prisma.notification.findFirst({
      where: { id },
      include: { user: true },
    });
    if (!!!notification) return { success: false };
    await prisma.notification.delete({
      where: { id: notification.id },
    });
    await pubsub.publish(Events.REFETCH_NOTIFICATIONS, {
      notification,
      userId: notification.userId,
    });
    return {
      success: true,
    };
  }
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
      orderBy: {
        createdAt: "desc",
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
      Events.REFETCH_NOTIFICATIONS,
    ],
    nullable: false,
  })
  async newNotification(
    @Arg("input", () => NewNotificationSubscriptionInput)
    { userId: uid }: NewNotificationSubscriptionInput,
    @Root()
    {
      userId,
      notification,
      petId,
    }: { userId: string; notification: Notification; petId: string }
  ): Promise<NewNotificationType | undefined> {
    // the notification does not belong to you
    if (userId !== uid) return undefined;
    return {
      userId,
      notification,
      petId,
    };
  }
}
