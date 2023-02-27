import { Field, Float, Int, ObjectType } from "type-graphql";

@ObjectType()
export class PetObjectType {
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

  @Field(() => String)
  createdAt: Date;
  updatedAt: Date;
}
