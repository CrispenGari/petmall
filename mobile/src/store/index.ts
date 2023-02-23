import { legacy_createStore, Store } from "redux";
import { ActionType, StateType } from "../types";
import { reducers } from "./reducers";
export const store: Store<StateType, ActionType<any>> = legacy_createStore(
  reducers
);
