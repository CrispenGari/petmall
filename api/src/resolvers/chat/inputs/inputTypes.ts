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
export class NewChatMessageSubscriptionInput {
  @Field(() => String)
  userId: string;
}

@InputType()
export class ChatMessagesInputType {
  @Field(() => String)
  id: string;
}

@InputType()
export class DeleteChatInputType {
  @Field(() => String)
  id: string;
}
