import { combineReducers } from "redux";
import { userReducer } from "./userReducer/userReducer";

export const reducers = combineReducers({
  user: userReducer,
});
