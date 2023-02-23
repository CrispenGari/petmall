import { Field, ObjectType } from "type-graphql";
import { ErrorType } from "../../common/objects/ErrorType";

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
