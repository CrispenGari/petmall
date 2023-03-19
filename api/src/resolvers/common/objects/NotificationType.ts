import { ObjectType, Field } from "type-graphql";
import { UserType } from "./UserType";

@ObjectType()
export class NotificationType {
  @Field(() => String)
  id: string;
  @Field(() => String)
  notification: string;

  @Field(() => String)
  userId: string;

  // which pet did this notification belongs to.
  @Field(() => String, { nullable: true })
  petId?: string | null | undefined;

  @Field(() => Boolean)
  read: boolean;

  @Field(() => UserType, { nullable: true })
  user?: UserType;

  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
}
