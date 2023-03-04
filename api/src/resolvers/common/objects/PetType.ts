import { Field, Float, Int, ObjectType } from "type-graphql";
import { ReactionType } from "./ReactionType";
import { LocationType } from "./LocationType";
import { UserType } from "./UserType";
import { CommentType } from "./CommentType";

@ObjectType()
export class PetType {
  @Field(() => String)
  id: string;
  @Field(() => String)
  name: string;
  @Field(() => Int)
  age: number;
  @Field(() => String)
  description: string;
  @Field(() => String)
  gender: string;
  @Field(() => String)
  image: string;
  @Field(() => String)
  category: string;
  @Field(() => Boolean)
  sold: boolean;
  @Field(() => Float)
  price: number;

  @Field(() => UserType, { nullable: true })
  seller?: UserType;

  @Field(() => LocationType, { nullable: true })
  location?: LocationType;

  @Field(() => [ReactionType], { nullable: true })
  reactions?: ReactionType[];

  @Field(() => [CommentType], { nullable: true })
  comments?: CommentType[];

  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
}
