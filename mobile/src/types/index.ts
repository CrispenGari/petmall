import {
  ChatsObjectType,
  NotificationObjectType,
  UserType,
} from "../graphql/generated/graphql";

export interface StateType {
  user: UserType | null;
  location: {
    lat: number;
    lon: number;
  } | null;
  notifications: NotificationObjectType;
  reloadCount: number;
  chats: ChatsObjectType;
}

export interface ActionType<T> {
  payload: T;
  type: string;
}

export type GenderType = "MALE" | "FEMALE";
