import { constants } from "../constants";
import { User } from "../types";
import * as Location from "expo-location";

export const setUser = (payload: User | null) => {
  return {
    type: constants.SET_USER,
    payload,
  };
};
export const setLocationAction = (
  payload: Location.LocationGeocodedAddress | null
) => {
  return {
    type: constants.SET_LOCATION,
    payload,
  };
};
