import { UserType } from "../graphql/generated/graphql";

export interface StateType {
  user: UserType | null;
  location: {
    lat: number;
    lon: number;
  } | null;
}

export interface ActionType<T> {
  payload: T;
  type: string;
}

export type GenderType = "MALE" | "FEMALE";
