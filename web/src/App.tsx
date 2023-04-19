import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChats, setNotifications, setUser } from "./actions";
import {
  useMeQuery,
  useMyChatsQuery,
  useNewChatMessageSubscription,
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
  const [{ data: chatMessage }] = useNewChatMessageSubscription({
    variables: {
      input: {
        userId: me?.id || "",
      },
    },
  });
  const [{ data: chats }, refetchChats] = useMyChatsQuery({});

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

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!chats?.chats) {
      dispatch(setChats(chats.chats as any));
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, chats]);
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
    if (mounted && !!chatMessage?.newChatMessage?.chatId) {
      (async () => {
        await refetchChats();
      })();
    }
    return () => {
      mounted = false;
    };
  }, [chatMessage, refetchChats]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!newUser?.me) {
      dispatch(setUser(newUser.me));
    }
    return () => {
      mounted = false;
    };
  }, [newUser, dispatch]);
  return (
    <div className="app">
      <Routes />
    </div>
  );
};
export default App;
