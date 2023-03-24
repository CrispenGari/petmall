import { Field, Int, ObjectType } from "type-graphql";
import { ChatType } from "../../common/objects/ChatType";

@ObjectType()
export class ChatMessagesObjectType {
  @Field(() => ChatType, { nullable: true })
  chat?: ChatType | null;
}
@ObjectType()
export class NewChatObjectType {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  chatId?: string;
}
@ObjectType()
export class ChatsObjectType {
  @Field(() => [ChatType])
  chats: ChatType[];

  @Field(() => Int)
  count: number;

  @Field(() => Int)
  unopened: number;
}

@ObjectType()
export class NewChatMessageType {
  @Field(() => String, { nullable: false })
  userId: String;
}
