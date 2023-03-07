import { Field, Float, ObjectType } from "type-graphql";
import { PetType } from "./PetType";

@ObjectType()
export class LocationType {
  @Field(() => String)
  id: string;
  @Field(() => Float, { nullable: true })
  lat: number;

  @Field(() => Float, { nullable: true })
  lon: number;

  @Field(() => PetType, { nullable: true })
  pet?: PetType;

  @Field(() => String, { nullable: true })
  createAt?: Date;
  @Field(() => String, { nullable: true })
  updateAt?: Date;
}
