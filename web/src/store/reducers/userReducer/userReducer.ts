import { constants } from "../../../constants";
import { UserType } from "../../../graphql/generated/graphql";
import { ActionType } from "../../../types";

export const userReducer = (
  state: UserType | null = null,
  { payload, type }: ActionType<UserType | null>
) => {
  switch (type) {
    case constants.SET_USER:
      return (state = payload);
    default:
      return state;
  }
};
