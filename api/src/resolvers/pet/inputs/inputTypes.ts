import { InputType, Field, Float, Int, registerEnumType } from "type-graphql";
import { Category, Gender } from "../../../types";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { FileUpload } from "graphql-upload/Upload";
registerEnumType(Gender, {
  name: "Gender", // this one is mandatory
});

registerEnumType(Category, {
  name: "Category", // this one is mandatory
});

@InputType()
export class LocationInput {
  @Field(() => String, { nullable: true })
  district?: string;
  @Field(() => String, { nullable: true })
  city?: string;
  @Field(() => String, { nullable: true })
  street?: string;
  @Field(() => String, { nullable: true })
  region?: string;
  @Field(() => String, { nullable: true })
  country?: string;
  @Field(() => String, { nullable: true })
  postalCode?: string;
  @Field(() => String, { nullable: true })
  subregion?: string;
  @Field(() => String, { nullable: true })
  timezone?: string;
  @Field(() => String, { nullable: true })
  streetNumber?: string;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  isoCountryCode?: string;
}

@InputType()
export class NewPetInputType {
  @Field(() => GraphQLUpload)
  image: FileUpload;

  @Field(() => LocationInput, { nullable: true })
  location?: LocationInput;

  @Field(() => String, { nullable: false })
  description: string;
  @Field(() => Category, { nullable: false })
  category: Category;
  @Field(() => Gender, { nullable: false })
  gender: Gender;
  @Field(() => Float, { nullable: false })
  price: number;
  @Field(() => Int, { nullable: false })
  age: number;
  @Field(() => String, { nullable: false })
  name: string;
}
