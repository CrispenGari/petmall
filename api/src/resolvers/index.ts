import { NonEmptyArray } from "type-graphql";
import { HelloResolver } from "./hello/HelloResolver";
import { UserResolver } from "./user/UserResolver";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  HelloResolver,
  UserResolver,
];
