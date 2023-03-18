import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "./actions";
import {
  useNewNotificationSubscription,
  useNotificationsQuery,
} from "./graphql/generated/graphql";
import Routes from "./routes";
import { StateType } from "./types";

interface Props {}
const App: React.FC<Props> = () => {
  const { user: me, notifications: n } = useSelector(
    (state: StateType) => state
  );
  const dispatch = useDispatch();
  const [{ data: notification }] = useNewNotificationSubscription({
    variables: {
      input: {
        userId: me?.id || "",
      },
    },
  });
  const [{ data: notifications }, refetchNotifications] =
    useNotificationsQuery();
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!notification?.newNotification) {
      (async () => {
        await refetchNotifications();
      })();
    }
    return () => {
      mounted = false;
    };
  }, [refetchNotifications, notification]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!notifications?.notifications) {
      dispatch(setNotifications(notifications.notifications));
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, notifications]);

  console.log({ n });

  return (
    <div className="app">
      <Routes />
    </div>
  );
};

export default App;
