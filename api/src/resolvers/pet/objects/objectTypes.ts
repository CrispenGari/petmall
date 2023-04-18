import { Field, Int, ObjectType } from "type-graphql";
import { PetType } from "../../common/objects/PetType";

@ObjectType()
export class PetsObjectType {
  @Field(() => [PetType], { nullable: true })
  pets?: PetType[];

  @Field(() => Int, { nullable: false })
  count: number;
}

@ObjectType()
export class PetObjectType {
  @Field(() => PetType, { nullable: true })
  pet?: PetType;

  @Field(() => Boolean, { nullable: false })
  success: boolean;
}

@ObjectType()
export class PetInteractionType {
  @Field(() => String, { nullable: false })
  petId: String;
}

@ObjectType()
export class CategoryPetSubscription {
  @Field(() => String, { nullable: false })
  category: String;
}
