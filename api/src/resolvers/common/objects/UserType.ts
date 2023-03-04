import { Field, ObjectType } from "type-graphql";
import { PetType } from "./PetType";

// model User {
//     id       String  @unique @default(uuid())
//     email String @unique
//     password String

//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt

//     comment Comment?
//     reaction Reaction?
//     pets Pet[]
//   }

@ObjectType()
export class UserType {
  @Field(() => String)
  id: string;
  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => [PetType], { nullable: true })
  pets?: PetType[];

  @Field(() => String, { nullable: true })
  createAt?: Date;
  @Field(() => String, { nullable: true })
  updateAt?: Date;
}
