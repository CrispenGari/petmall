import { Dispatch } from "react";
import { NavigateFunction, Params } from "react-router-dom";
import { AnyAction } from "redux";
import {
  ChatsObjectType,
  NotificationObjectType,
  UserType,
} from "../graphql/generated/graphql";

export interface StateType {
  user: UserType | null;
  location: any | null;
  notifications: NotificationObjectType;
  reloadCount: number;
  chats: ChatsObjectType;
}

export interface ActionType<T> {
  payload: T;
  type: string;
}

export type GenderType = "MALE" | "FEMALE";
export interface GlobalPropsType {
  location: Location;
  navigate: NavigateFunction;
  params: Readonly<Params<string>>;
  dispatch: Dispatch<AnyAction>;
  user: UserType | null;
  searchParams: URLSearchParams;
}

export type ErrorType = {
  field: string;
  message: string;
};
