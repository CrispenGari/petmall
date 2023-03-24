import { Field, InputType } from "type-graphql";

@InputType()
export class NewChatInputType {
  @Field(() => String)
  userId: string;
  @Field(() => String)
  message: string;
  @Field(() => String)
  petId: string;
}

@InputType()
export class ChatMessagesInputType {
  @Field(() => String)
  id: string;
}
