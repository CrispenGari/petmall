import { constants } from "../../../constants";
import { ActionType } from "../../../types";

export const locationReducer = (
  state: any | null = null,
  { payload, type }: ActionType<any | null>
) => {
  switch (type) {
    case constants.SET_LOCATION:
      return (state = payload);
    default:
      return state;
  }
};
