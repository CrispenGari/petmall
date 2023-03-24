import { constants } from "../constants";
import {
  ChatsObjectType,
  NotificationObjectType,
  UserType,
} from "../graphql/generated/graphql";
export const setUser = (payload: UserType | null) => {
  return {
    type: constants.SET_USER,
    payload,
  };
};
export const setLocationAction = (payload: any | null) => {
  return {
    type: constants.SET_LOCATION,
    payload,
  };
};
export const setNotifications = (payload: NotificationObjectType) => {
  return {
    type: constants.SET_NOTIFICATIONS,
    payload,
  };
};

export const setChats = (payload: ChatsObjectType) => {
  return {
    type: constants.SET_CHATS,
    payload,
  };
};
