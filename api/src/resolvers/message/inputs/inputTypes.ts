import { Field, InputType } from "type-graphql";

@InputType()
export class SendMessageInputType {
  @Field(() => String)
  message: string;

  @Field(() => String)
  chatId: string;
}


@InputType()
export class NewChatMessageSubscriptionInput {
  @Field(() => String, { nullable: false })
  userId: String;
}
