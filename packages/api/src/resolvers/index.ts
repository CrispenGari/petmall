import { NonEmptyArray } from "type-graphql";
import { HelloResolver } from "./hello/HelloResolver";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  HelloResolver,
];
