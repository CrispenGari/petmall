import { constants } from "../../../constants";
import { ActionType, User } from "../../../types";

export const userReducer = (
  state: User | null = null,
  { payload, type }: ActionType<User | null>
) => {
  switch (type) {
    case constants.SET_USER:
      return (state = payload);
    default:
      return state;
  }
};
