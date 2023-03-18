import { Field, ObjectType } from "type-graphql";
import { ChatType } from "./ChatType";
import { NotificationType } from "./NotificationType";
import { PetType } from "./PetType";
@ObjectType()
export class UserType {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  avatar?: string | undefined | null;

  @Field(() => [PetType], { nullable: true })
  pets?: PetType[];

  @Field(() => [NotificationType], { nullable: true })
  notifications?: NotificationType[];

  @Field(() => [ChatType], { nullable: true })
  chats?: ChatType[];

  @Field(() => String, { nullable: true })
  createAt?: Date;
  @Field(() => String, { nullable: true })
  updateAt?: Date;
}
