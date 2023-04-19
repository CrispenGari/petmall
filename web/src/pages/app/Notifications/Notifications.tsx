import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon, Input } from "semantic-ui-react";
import { Divider, Footer, Header, Notification } from "../../../components";
import { StateType } from "../../../types";
import "./Notifications.css";
import { sendNotification } from "../../../utils";
import {
  useNewNotificationSubscription,
  useNewChatMessageSubscription,
} from "../../../graphql/generated/graphql";
interface Props {}
const Notifications: React.FC<Props> = () => {
  const [filter, setFilter] = React.useState<string>("");
  const { notifications, user } = useSelector((state: StateType) => state);

  const navigator = useNavigate();
  const [noti, setNoti] = React.useState<{
    message: string;
    title: string;
    data: {
      type: "pet-interaction" | "new-message";
      id: string;
    };
  }>({
    message: "",
    title: "",
    data: { id: "", type: "pet-interaction" },
  });
  const { user: me } = useSelector((state: StateType) => state);
  const [{ data: notification }] = useNewNotificationSubscription({
    variables: {
      input: {
        userId: me?.id || "",
      },
    },
  });
  const [{ data: chatMessage }] = useNewChatMessageSubscription({
    variables: {
      input: {
        userId: me?.id || "",
      },
    },
  });

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!chatMessage?.newChatMessage.userId) {
      (async () => {
        if (!!chatMessage.newChatMessage) {
          if (!!chatMessage.newChatMessage.chatId) {
            setNoti({
              title: `New Market Message - PetMall`,
              message: "You have a new chat message.",
              data: {
                id: chatMessage.newChatMessage.chatId,
                type: "new-message",
              },
            });
          }
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [chatMessage]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!notification?.newNotification) {
      (async () => {
        if (!!notification.newNotification.notification) {
          if (!!notification.newNotification.petId) {
            setNoti({
              title: `New Notification - PetMall`,
              message: notification.newNotification.notification.notification,
              data: {
                id: notification.newNotification.petId,
                type: "pet-interaction",
              },
            });
          }
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [notification]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!noti.title && !!navigator) {
      (async () => {
        sendNotification(noti.title, noti.message, noti.data, navigator);
        setNoti({
          message: "",
          title: "",
          data: { id: "", type: "pet-interaction" },
        });
      })();
    }
    return () => {
      mounted = false;
    };
  }, [noti, navigator]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!!user?.emailVerified && !!!user?.isLoggedIn) {
      navigator("/app/pets", { replace: true });
    }
    return () => {
      mounted = false;
    };
  }, [navigator, user]);

  const [_notifications, set_Notifications] = React.useState(
    notifications.notifications
  );

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      if (!!filter) {
        set_Notifications(
          notifications.notifications.filter((notification) =>
            notification.title
              .toLowerCase()
              .includes(filter.trim().toLowerCase())
          )
        );
      } else {
        set_Notifications(notifications.notifications.filter(Boolean));
      }
    }
    return () => {
      mounted = false;
    };
  }, [filter, notifications]);
  return (
    <div className="notifications">
      <Header />
      <div className="notifications__main">
        <div className="notifications__main__header">
          <Input
            fluid
            className="notifications__main__header__input"
            iconPosition="left"
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter notifications..."
            icon={<Icon name="search" />}
            value={filter}
          />
        </div>
        <div className="notifications__main__lists">
          <Divider title="Unread" />

          {_notifications.filter((notification) => !notification.read)
            .length === 0 ? (
            <div className="notifications__main__empty">
              <p>No new notifications.</p>
            </div>
          ) : (
            _notifications
              .filter((notification) => !notification.read)
              .map((notification) => (
                <Notification
                  key={notification.id}
                  notification={notification}
                />
              ))
          )}
          <Divider title="Read" />
          {_notifications.filter((notification) => notification.read).length ===
          0 ? (
            <div className="notifications__main__empty">
              <p>No old notifications.</p>
            </div>
          ) : (
            _notifications
              .filter((notification) => notification.read)
              .map((notification) => (
                <Notification
                  key={notification.id}
                  notification={notification}
                />
              ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;
