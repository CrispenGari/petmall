import { constants } from "../constants";
import { NotificationObjectType, UserType } from "../graphql/generated/graphql";
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
