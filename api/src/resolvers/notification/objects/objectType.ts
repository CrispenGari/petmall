import { Field, Int, ObjectType } from "type-graphql";
import { NotificationType } from "../../common/objects/NotificationType";

@ObjectType()
export class NewNotificationType {
  @Field(() => String, { nullable: false })
  userId: String;

  @Field(() => NotificationType, { nullable: true })
  notification?: NotificationType;
}

@ObjectType()
export class NotificationObjectType {
  @Field(() => [NotificationType], { nullable: false })
  notifications: NotificationType[];

  @Field(() => Int, { nullable: false })
  total: number;

  @Field(() => Int, { nullable: false })
  unread: number;
}
