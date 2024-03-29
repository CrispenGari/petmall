import { ObjectType, Field } from "type-graphql";
import { UserType } from "./UserType";

@ObjectType()
export class MessageType {
  @Field(() => String)
  id: string;
  @Field(() => String)
  message: string;
  @Field(() => String)
  chatId: string;
  @Field(() => String)
  senderId: string;
  @Field(() => Boolean)
  opened: boolean;

  @Field(() => UserType, { nullable: true })
  sender?: UserType;

  @Field(() => String)
  createdAt: Date | string;
  @Field(() => String)
  updatedAt: Date | string;
}
