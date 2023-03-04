import { Field, ObjectType } from "type-graphql";
import { PetType } from "./PetType";

@ObjectType()
export class LocationType {
  @Field(() => String)
  id: string;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  district?: string;
  @Field(() => String, { nullable: true })
  city?: string;
  @Field(() => String, { nullable: true })
  isoCountryCode?: string;
  @Field(() => String, { nullable: true })
  streetNumber?: string;
  @Field(() => String, { nullable: true })
  timezone?: string;
  @Field(() => String, { nullable: true })
  subregion?: string;
  @Field(() => String, { nullable: true })
  postalCode?: string;
  @Field(() => String, { nullable: true })
  country?: string;
  @Field(() => String, { nullable: true })
  region?: string;
  @Field(() => String, { nullable: true })
  street?: string;
  @Field(() => PetType, { nullable: true })
  pet?: PetType;

  @Field(() => String, { nullable: true })
  createAt?: Date;
  @Field(() => String, { nullable: true })
  updateAt?: Date;
}
