import { InputType, Field, Float, Int, registerEnumType } from "type-graphql";
import { Category, Gender } from "../../../types";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { FileUpload } from "graphql-upload/Upload";
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
  @Field(() => String, { nullable: false })
  category: string;
  @Field(() => String, { nullable: false })
  gender: string;
  @Field(() => Float, { nullable: false })
  price: number;
  @Field(() => Int, { nullable: false })
  age: number;
  @Field(() => String, { nullable: false })
  name: string;
}

@InputType()
export class GetCategoryPetsInput {
  @Field(() => String, { nullable: false })
  category: string;
}

@InputType()
export class GetPetByIdInput {
  @Field(() => String, { nullable: false })
  id: string;
}

@InputType()
export class MarkAsSoldInput {
  @Field(() => String, { nullable: false })
  id: String;
}

@InputType()
export class ReactToPetInput {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  reaction: string;
}

@InputType()
export class CommentToPetInput {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  comment: string;
}
