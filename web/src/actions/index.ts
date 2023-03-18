import { constants } from "../constants";
import { NotificationObjectType } from "../graphql/generated/graphql";
import { User } from "../types";
export const setUser = (payload: User | null) => {
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
