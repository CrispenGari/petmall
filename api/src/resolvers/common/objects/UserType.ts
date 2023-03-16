import { Field, ObjectType } from "type-graphql";
import { PetType } from "./PetType";
@ObjectType()
export class UserType {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  avatar?: string | undefined | null;

  @Field(() => [PetType], { nullable: true })
  pets?: PetType[];

  @Field(() => String, { nullable: true })
  createAt?: Date;
  @Field(() => String, { nullable: true })
  updateAt?: Date;
}
