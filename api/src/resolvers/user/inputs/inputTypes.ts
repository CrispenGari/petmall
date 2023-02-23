import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  password: string;

  @Field(() => Boolean, { nullable: false })
  isWeb: boolean;

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
