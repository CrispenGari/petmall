import { ObjectType, Field } from "type-graphql";
import { MessageType } from "./MessageType";

@ObjectType()
export class ChatType {
  @Field(() => String)
  id: string;

  @Field(() => [String])
  userIds: string[];

  @Field(() => String)
  chatId: string;

  @Field(() => [MessageType], { nullable: true })
  messages?: MessageType[];

  @Field(() => String)
  createdAt: Date | string;
  @Field(() => String)
  updatedAt: Date | string;
}
