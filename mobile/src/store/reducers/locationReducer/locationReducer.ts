import { constants } from "../../../constants";
import { ActionType } from "../../../types";
import * as Location from "expo-location";

export const locationReducer = (
  state: Location.LocationGeocodedAddress | null = null,
  { payload, type }: ActionType<Location.LocationGeocodedAddress | null>
) => {
  switch (type) {
    case constants.SET_LOCATION:
      return (state = payload);
    default:
      return state;
  }
};
