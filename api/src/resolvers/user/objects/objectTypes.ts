import { Field, ObjectType } from "type-graphql";
import { ErrorType } from "../../common/objects/ErrorType";
import { PetType } from "../../common/objects/PetType";

@ObjectType()
export class UserObjectType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;

  @Field(() => [PetType])
  pets?: PetType[];
}

@ObjectType()
export class MeObjectType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

@ObjectType()
export class RegisterObjectType {
  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;

  @Field(() => String, { nullable: true })
  jwt?: string;

  @Field(() => MeObjectType, { nullable: true })
  me?: MeObjectType;
}

@ObjectType()
export class LoginObjectType {
  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;

  @Field(() => String, { nullable: true })
  jwt?: string;

  @Field(() => MeObjectType, { nullable: true })
  me?: MeObjectType;
}
