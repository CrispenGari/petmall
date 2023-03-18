import { constants } from "../../../constants";
import { NotificationObjectType } from "../../../graphql/generated/graphql";
import { ActionType } from "../../../types";

export const notificationsReducer = (
  state: NotificationObjectType = {
    notifications: [],
    total: 0,
    unread: 0,
  },
  { payload, type }: ActionType<NotificationObjectType>
) => {
  switch (type) {
    case constants.SET_NOTIFICATIONS:
      return (state = payload);
    default:
      return state;
  }
};
