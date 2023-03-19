import React from "react";
import { useNavigate } from "react-router-dom";
import {
  NotificationType,
  useMarkNotificationAsReadMutation,
} from "../../graphql/generated/graphql";
import { encodeId } from "../../utils";
import "./Notification.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { relativeTimeObject } from "../../constants";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});
interface Props {
  notification: NotificationType;
}
const Notification: React.FC<Props> = ({ notification }) => {
  const [, markAsRead] = useMarkNotificationAsReadMutation();
  const navigate = useNavigate();
  const readNotificationAndOpen = async () => {
    if (!notification.read) {
      await markAsRead({ input: { id: notification.id } });
    }
    if (!!notification.petId) {
      navigate(`/app/pet/${encodeId(notification.petId)}?next=notifications`);
    }
  };
  return (
    <div className="notification" onClick={readNotificationAndOpen}>
      <h1>{notification.title}</h1>
      <p>{notification.notification}</p>
      <div className="notification__info">
        <p>{dayjs(new Date(Number(notification.createdAt))).fromNow()} ago</p>
      </div>
    </div>
  );
};

export default Notification;
