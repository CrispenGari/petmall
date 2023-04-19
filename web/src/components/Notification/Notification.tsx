import React from "react";
import { useNavigate } from "react-router-dom";
import {
  NotificationType,
  useDeleteNotificationMutation,
  useMarkNotificationAsReadMutation,
  useMarkNotificationAsUnReadMutation,
} from "../../graphql/generated/graphql";
import { encodeId } from "../../utils";
import "./Notification.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { relativeTimeObject } from "../../constants";
import { HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});
interface Props {
  notification: NotificationType;
}
const Notification: React.FC<Props> = ({ notification }) => {
  const [, open] = useMarkNotificationAsReadMutation();
  const [, close] = useMarkNotificationAsUnReadMutation();

  const [, deleteNotification] = useDeleteNotificationMutation();
  const navigate = useNavigate();
  const readNotificationAndOpen = async () => {
    if (!notification.read) {
      await open({ input: { id: notification.id } });
    }
    if (!!notification.petId) {
      navigate(`/app/pet/${encodeId(notification.petId)}?next=notifications`);
    }
  };

  const openNotification = async () => {
    if (!notification.read) {
      await open({ input: { id: notification.id } });
    }
  };

  const unOpenHandler = async () => {
    if (notification.read) {
      await close({ input: { id: notification.id } });
    }
  };

  const deleteNotificationHandler = async () => {
    await deleteNotification({
      input: { id: notification.id },
    });
  };
  return (
    <div className="notification">
      <div className="notification__main" onClick={readNotificationAndOpen}>
        <h1>{notification.title}</h1>
        <p>{notification.notification}</p>
        <div className="notification__info">
          <p>{dayjs(new Date(Number(notification.createdAt))).fromNow()} ago</p>
        </div>
      </div>

      <div className="notification__buttons">
        <div
          className="notification__delete__button"
          onClick={deleteNotificationHandler}
        >
          <AiOutlineDelete />
        </div>
        {notification.read ? (
          <div
            className="notification__delete__button"
            title="mark as unread"
            onClick={unOpenHandler}
          >
            <HiOutlineMail />
          </div>
        ) : (
          <div
            title="mark as read"
            className="notification__delete__button"
            onClick={openNotification}
          >
            <HiOutlineMailOpen />
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
