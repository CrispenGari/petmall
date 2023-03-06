import { combineReducers } from "redux";
import { locationReducer } from "./locationReducer/locationReducer";
import { userReducer } from "./userReducer/userReducer";

export const reducers = combineReducers({
  user: userReducer,
  location: locationReducer,
});
