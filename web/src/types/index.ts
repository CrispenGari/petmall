import { Dispatch } from "react";
import { NavigateFunction, Params } from "react-router-dom";
import { AnyAction } from "redux";

export type User = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export interface StateType {
  user: User | null;
  location: any | null;
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
  user: User | null;
}

export type ErrorType = {
  field: string;
  message: string;
};
