import { InputType, Field } from "type-graphql";

@InputType()
export class ReplyToCommentInput {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  userId: string;

  @Field(() => String, { nullable: false })
  comment: string;
}

@InputType()
export class CommentToPetInput {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  comment: string;
}
