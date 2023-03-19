import { Field, ObjectType } from "type-graphql";
import { ErrorType } from "../../common/objects/ErrorType";
import { PetType } from "../../common/objects/PetType";
import { UserType } from "../../common/objects/UserType";

@ObjectType()
export class RegisterObjectType {
  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;

  @Field(() => String, { nullable: true })
  jwt?: string;

  @Field(() => UserType, { nullable: true })
  me?: UserType;
}

@ObjectType()
export class LoginObjectType {
  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;

  @Field(() => String, { nullable: true })
  jwt?: string;

  @Field(() => UserType, { nullable: true })
  me?: UserType;
}
