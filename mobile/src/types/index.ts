import * as Location from "expo-location";
export type User = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export interface StateType {
  user: User | null;
  location: Location.LocationGeocodedAddress | null;
}

export interface ActionType<T> {
  payload: T;
  type: string;
}

export type GenderType = "MALE" | "FEMALE";
