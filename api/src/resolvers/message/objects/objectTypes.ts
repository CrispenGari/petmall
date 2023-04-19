import { ObjectType, Field } from "type-graphql";
import { MessageType } from "../../common/objects/MessageType";

@ObjectType()
export class SendMessageObjectType {
  @Field(() => Boolean)
  success: boolean;
}
@ObjectType()
export class MarkMessagesAsReadObjectType {
  @Field(() => Boolean)
  success: boolean;
}

@ObjectType()
export class NewMessageType {
  @Field(() => String, { nullable: false })
  userId: string;

  @Field(() => String, { nullable: true })
  chatId?: string;

  @Field(() => MessageType, { nullable: false })
  message: MessageType;
}
