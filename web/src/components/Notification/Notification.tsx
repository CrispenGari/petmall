import React from "react";
import { useNavigate } from "react-router-dom";
import {
  NotificationType,
  useMarkNotificationAsReadMutation,
} from "../../graphql/generated/graphql";
import { encodeId } from "../../utils";
import "./Notification.css";
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
      <h1>crispengari</h1>
      <p>{notification.notification}</p>
      <div className="notification__info">
        <p>just now</p>
      </div>
    </div>
  );
};

export default Notification;
