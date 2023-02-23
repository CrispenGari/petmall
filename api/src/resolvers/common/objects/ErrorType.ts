import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ErrorType {
  @Field({ nullable: false })
  field: string;

  @Field({ nullable: false })
  message: string;
}
