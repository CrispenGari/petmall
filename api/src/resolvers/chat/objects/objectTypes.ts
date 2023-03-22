import { Field, Int, ObjectType } from "type-graphql";
import { ChatType } from "../../common/objects/ChatType";

@ObjectType()
export class NewChatObjectType {
  @Field(() => Boolean)
  success: boolean;
}

@ObjectType()
export class ChatsObjectType {
  @Field(() => [ChatType])
  chats: ChatType[];

  @Field(() => Int)
  count: number;
}
