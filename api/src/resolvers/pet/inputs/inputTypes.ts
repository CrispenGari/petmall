import { InputType, Field, Float, Int } from "type-graphql";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { FileUpload } from "graphql-upload/Upload";
@InputType()
export class LocationInput {
  @Field(() => Float, { nullable: false })
  lat: number;
  @Field(() => Float, { nullable: false })
  lon: number;
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
export class UpdatePetInputType {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => GraphQLUpload, { nullable: true })
  image?: FileUpload;

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
