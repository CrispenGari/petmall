import { ObjectType, Field, Int } from "type-graphql";
import { MessageType } from "../../common/objects/MessageType";

@ObjectType()
export class SendMessageObjectType {
  @Field(() => Boolean)
  success: boolean;
}

@ObjectType()
export class NewMessageType {
  @Field(() => String, { nullable: false })
  userId: String;

  @Field(() => MessageType, { nullable: true })
  message?: MessageType;
}
