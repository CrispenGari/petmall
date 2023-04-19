import { Field, InputType } from "type-graphql";

@InputType()
export class SendMessageInputType {
  @Field(() => String)
  message: string;

  @Field(() => String)
  chatId: string;
}

@InputType()
export class MarkMessagesAsReadInputType {
  @Field(() => String)
  chatId: string;
}
@InputType()
export class MarkMessagesAsUnReadInputType {
  @Field(() => String)
  chatId: string;

  @Field(() => String)
  messageId: string;
}

@InputType()
export class NewMessageSubscriptionInput {
  @Field(() => String, { nullable: false })
  userId: String;
}
