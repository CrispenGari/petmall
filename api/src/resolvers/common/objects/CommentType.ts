import { Field, ObjectType } from "type-graphql";
import { UserType } from "./UserType";

@ObjectType()
class Comment {
  @Field(() => String)
  id: string;
  @Field(() => String)
  comment: string;

  @Field(() => UserType, { nullable: true })
  user?: UserType;

  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
}
@ObjectType()
export class CommentType {
  @Field(() => [Comment])
  replies: CommentType[];

  @Field(() => Comment)
  mainComment: Comment;
}
