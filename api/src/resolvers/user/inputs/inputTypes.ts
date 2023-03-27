import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { FileUpload } from "graphql-upload/Upload";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  firstName: string;

  @Field(() => String, { nullable: false })
  lastName: string;

  @Field(() => String, { nullable: false })
  password: string;

  @Field({ nullable: false })
  confirmPassword: string;
}
@InputType()
export class UpdateUserInfoInputType {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  firstName: string;

  @Field(() => String, { nullable: false })
  lastName: string;
}

@InputType()
export class ChangePasswordInputType {
  @Field(() => String, { nullable: false })
  resetPasswordToken: string;

  @Field(() => String, { nullable: false })
  password: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field({ nullable: false })
  confirmPassword: string;
}
@InputType()
export class ChangeAccountPasswordInputType {
  @Field(() => String, { nullable: false })
  password: string;

  @Field(() => String, { nullable: false })
  currentAccountPassword: string;

  @Field({ nullable: false })
  confirmPassword: string;
}

@InputType()
export class RequestForgotPasswordEmailLinkInputType {
  @Field(() => String, { nullable: false })
  email: string;
}

@InputType()
export class VerifyEmailInputType {
  @Field(() => String, { nullable: false })
  code: string;

  @Field(() => String, { nullable: false })
  email: string;
}

@InputType()
export class LoginInput {
  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;
}

@InputType()
export class GetUserByIdInput {
  @Field({ nullable: false })
  id: string;
}

@InputType()
export class UpdateAvatarInputType {
  @Field(() => GraphQLUpload, { nullable: false })
  avatar: FileUpload;
}

@InputType()
export class UpdateProfileInfoInputType {
  @Field({ nullable: false })
  email: string;
}
