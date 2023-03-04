import { Field, ObjectType } from "type-graphql";
import { UserType } from "./UserType";

@ObjectType()
export class CommentType {
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
