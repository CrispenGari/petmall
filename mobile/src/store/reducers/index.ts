import { combineReducers } from "redux";
import { chatsReducer } from "./chatsReducer";
import { locationReducer } from "./locationReducer/locationReducer";
import { notificationsReducer } from "./notificationsReducer";
import { userReducer } from "./userReducer/userReducer";

export const reducers = combineReducers({
  user: userReducer,
  notifications: notificationsReducer,
  location: locationReducer,
  chats: chatsReducer,
});
