import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Footer,
  Header,
  ProfileCard,
  ProfileChangePassword,
  ProfileDeleteAccount,
  ProfileLogoutButton,
  ProfilePetsFlatList,
} from "../../../components";
import { StateType } from "../../../types";
import { decodeId, sendNotification } from "../../../utils";

import "./Profile.css";
import {
  useNewChatMessageSubscription,
  useNewNotificationSubscription,
} from "../../../graphql/generated/graphql";

interface Props {}
const Profile: React.FC<Props> = () => {
  const params = useParams();

  const userId: string = decodeId(params.userId as string);
  const [category, setCategory] = React.useState<string>("ALL PETS");
  const { user } = useSelector((state: StateType) => state);
  const navigator = useNavigate();
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!!user?.emailVerified && !!!user?.isLoggedIn) {
      navigator("/app/pets", { replace: true });
    }
    return () => {
      mounted = false;
    };
  }, [navigator, user]);

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

  return (
    <div className="profile">
      <Header />
      <ProfileCard
        userId={userId}
        setCategory={setCategory}
        category={category}
      />
      <ProfilePetsFlatList
        userId={userId}
        category={category}
        subtitle={`Pet in the market.`}
        setCategory={setCategory}
      />
      {user?.id === userId && (
        <>
          <ProfileChangePassword />
          <ProfileDeleteAccount />
          <ProfileLogoutButton />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Profile;
