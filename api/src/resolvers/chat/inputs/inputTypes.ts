import { Field, InputType } from "type-graphql";

@InputType()
export class NewChatInputType {
  @Field(() => String)
  userId: string;
  @Field(() => String)
  message: string;
}
