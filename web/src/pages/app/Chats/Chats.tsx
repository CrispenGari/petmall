import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon, Input } from "semantic-ui-react";
import { Footer, Header } from "../../../components";
import { StateType } from "../../../types";
import { Chat } from "../../../components";
import "./Chats.css";
import {
  useNewNotificationSubscription,
  useNewChatMessageSubscription,
} from "../../../graphql/generated/graphql";
import { sendNotification } from "../../../utils";
interface Props {}
const Chats: React.FC<Props> = () => {
  const [filter, setFilter] = React.useState<string>("");
  const { user, chats } = useSelector((state: StateType) => state);
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
  const [_chats, set_Chats] = useState(chats.chats);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      if (!!filter) {
        set_Chats(
          chats.chats.filter((chat) =>
            chat.chatTitle.toLowerCase().includes(filter.trim().toLowerCase())
          )
        );
      } else {
        set_Chats(chats.chats.filter(Boolean));
      }
    }
    return () => {
      mounted = false;
    };
  }, [filter, chats]);
  return (
    <div className="chats">
      <Header />
      <div className="chats__main">
        <div className="chats__main__header">
          <Input
            fluid
            className="chats__main__header__input"
            iconPosition="left"
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter chats..."
            icon={<Icon name="search" />}
            value={filter}
          />
        </div>
        <div className="chats__main__lists">
          {chats.count === 0 ? (
            <div className="chats__main__empty">
              <p>No new chats.</p>
            </div>
          ) : _chats.length === 0 ? (
            <div className="chats__main__empty">
              <p>No chats that matches "{filter.trim()}"</p>
            </div>
          ) : (
            _chats.map((chat) => <Chat key={chat.id} chat={chat as any} />)
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chats;
