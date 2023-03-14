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
