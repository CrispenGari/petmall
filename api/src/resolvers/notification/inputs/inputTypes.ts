import { Field, InputType } from "type-graphql";

@InputType()
export class NewNotificationSubscriptionInput {
  @Field(() => String)
  userId: string;
}

@InputType()
export class MarkNotificationAsReadInputType {
  @Field(() => String)
  id: string;
}
@InputType()
export class DeleteNotificationInputType {
  @Field(() => String)
  id: string;
}
@InputType()
export class MarkNotificationAsUnReadInputType {
  @Field(() => String)
  id: string;
}
