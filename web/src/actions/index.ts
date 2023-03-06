import { constants } from "../constants";
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
