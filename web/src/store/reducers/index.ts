import { combineReducers } from "redux";
import { locationReducer } from "./locationReducer/locationReducer";
import { notificationsReducer } from "./notificationReducer";
import { userReducer } from "./userReducer/userReducer";

export const reducers = combineReducers({
  user: userReducer,
  notifications: notificationsReducer,
  location: locationReducer,
});
