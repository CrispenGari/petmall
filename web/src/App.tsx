import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications, setUser } from "./actions";
import {
  useMeQuery,
  useNewNotificationSubscription,
  useNotificationsQuery,
  useOnUserStateChangeSubscription,
} from "./graphql/generated/graphql";
import Routes from "./routes";
import { StateType } from "./types";

interface Props {}
const App: React.FC<Props> = () => {
  const { user: me } = useSelector((state: StateType) => state);
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
  const [{ data: newUser }, refetchUser] = useMeQuery();
  const [{ data }] = useOnUserStateChangeSubscription({
    variables: { userId: me?.id || "" },
  });

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.onUserStateChange) {
      (async () => {
        await refetchUser();
      })();
    }
    return () => {
      mounted = false;
    };
  }, [refetchUser, data]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!newUser?.me) {
      dispatch(setUser(newUser.me));
    }
    return () => {
      mounted = false;
    };
  }, [newUser, dispatch]);

  console.log({ me: newUser?.me });
  return (
    <div className="app">
      <Routes />
    </div>
  );
};
export default App;
