import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { FileUpload } from "graphql-upload/Upload";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  password: string;

  @Field({ nullable: false })
  confirmPassword: string;
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
