import { InputType, Field } from "type-graphql";

@InputType()
export class ReplyToCommentInput {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  comment: string;
}
