import { Field, ObjectType } from "type-graphql";
import { ChatType } from "./ChatType";
import { NotificationType } from "./NotificationType";
import { PetType } from "./PetType";
@ObjectType()
export class UserType {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  firstName: string;

  @Field(() => String, { nullable: false })
  lastName: string;

  @Field(() => Boolean, { nullable: false })
  isLoggedIn: boolean;

  @Field(() => Boolean, { nullable: false })
  verified: boolean;

  @Field(() => Boolean, { nullable: false })
  emailVerified: boolean;

  @Field(() => String, { nullable: true })
  avatar?: string | undefined | null;

  @Field(() => [PetType], { nullable: true })
  pets?: PetType[];

  @Field(() => [NotificationType], { nullable: true })
  notifications?: NotificationType[];

  @Field(() => [ChatType], { nullable: true })
  chats?: ChatType[];

  @Field(() => String, { nullable: true })
  createAt?: Date | string;
  @Field(() => String, { nullable: true })
  updateAt?: Date | string;
}
