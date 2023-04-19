import React from "react";

import { Header, Banner, FlatList } from "../../../components";
import { RELOADED_KEY, PETS_CATEGORIES } from "../../../constants";
import { retrieve, sendNotification, store } from "../../../utils";

import "./Home.css";
import { useSelector } from "react-redux";
import { StateType } from "../../../types";
import {
  useNewNotificationSubscription,
  useNewMessageSubscription,
} from "../../../graphql/generated/graphql";
import { useNavigate } from "react-router-dom";
interface Props {}
const Home: React.FC<Props> = () => {
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

  const [{ data: newMessage }] = useNewMessageSubscription({
    variables: {
      input: {
        userId: me?.id || "",
      },
    },
  });

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && newMessage?.newMessage.chatId) {
      setNoti({
        title: `New Market Message - PetMall`,
        message: `${newMessage.newMessage.message?.message}`,
        data: {
          id: newMessage.newMessage.chatId,
          type: "new-message",
        },
      });
    }
    return () => {
      mounted = false;
    };
  }, [newMessage]);

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
      sendNotification(noti.title, noti.message, noti.data, navigator);
      setNoti({
        message: "",
        title: "",
        data: { id: "", type: "pet-interaction" },
      });
    }
    return () => {
      mounted = false;
    };
  }, [noti, navigator]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      (async () => {
        const reloaded = await retrieve(RELOADED_KEY);
        if (!!!reloaded) {
          await store(RELOADED_KEY, "reloaded");
          window.location.reload();
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div className="home">
      <Header />
      <Banner />
      {PETS_CATEGORIES.map((category) => (
        <FlatList
          title={category}
          key={category}
          subtitle={`All ${category.toLowerCase()} in the market.`}
        />
      ))}
    </div>
  );
};

export default Home;
