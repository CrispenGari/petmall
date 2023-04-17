import { constants } from "../../../constants";
import { ChatsObjectType } from "../../../graphql/generated/graphql";
import { ActionType } from "../../../types";

export const chatsReducer = (
  state: ChatsObjectType = {
    count: 0,
    chats: [],
    unopened: 0,
  },
  { payload, type }: ActionType<ChatsObjectType>
) => {
  switch (type) {
    case constants.SET_CHATS:
      return (state = payload);
    default:
      return state;
  }
};
