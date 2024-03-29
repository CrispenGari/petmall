import { ObjectType, Field } from "type-graphql";
import { MessageType } from "./MessageType";
import { PetType } from "./PetType";

@ObjectType()
export class ChatType {
  @Field(() => String)
  id: string;

  @Field(() => [String])
  userIds: string[];

  @Field(() => String)
  chatId: string;

  @Field(() => String)
  chatTitle: string;

  @Field(() => [MessageType], { nullable: true })
  messages?: MessageType[];

  @Field(() => PetType, { nullable: true })
  pet?: PetType;

  @Field(() => String)
  createdAt: Date | string;
  @Field(() => String)
  updatedAt: Date | string;
}
