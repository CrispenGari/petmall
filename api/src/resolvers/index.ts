import { NonEmptyArray } from "type-graphql";
import { CommentResolver } from "./comment/CommentResolver";
import { HelloResolver } from "./hello/HelloResolver";
import { NotificationResolver } from "./notification/NotificationResolver";
import { PetResolver } from "./pet/PetResolver";
import { ReactionResolver } from "./reaction/ReactionResolver";
import { UserResolver } from "./user/UserResolver";
export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  HelloResolver,
  UserResolver,
  PetResolver,
  CommentResolver,
  ReactionResolver,
  NotificationResolver,
];
