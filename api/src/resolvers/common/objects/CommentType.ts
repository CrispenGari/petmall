import { Field, ObjectType } from "type-graphql";
import { ReactionType } from "./ReactionType";
import { UserType } from "./UserType";

@ObjectType()
export class CommentType {
  @Field(() => String)
  id: string;
  @Field(() => String)
  comment: string;

  @Field(() => UserType, { nullable: true })
  user?: UserType;

  @Field(() => [CommentType], { nullable: true })
  replies?: CommentType[];

  @Field(() => [ReactionType], { nullable: true })
  reactions?: ReactionType[];

  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
}
