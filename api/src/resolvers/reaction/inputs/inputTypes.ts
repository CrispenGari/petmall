import { InputType, Field } from "type-graphql";

@InputType()
export class ReactToPetInput {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  reaction: string;
}

@InputType()
export class ReactToCommentInput {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  reaction: string;
}
