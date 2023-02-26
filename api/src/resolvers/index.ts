import { NonEmptyArray } from "type-graphql";
import { HelloResolver } from "./hello/HelloResolver";
import { PetResolver } from "./pet/PetResolver";
import { UserResolver } from "./user/UserResolver";
export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  HelloResolver,
  UserResolver,
  PetResolver,
];
