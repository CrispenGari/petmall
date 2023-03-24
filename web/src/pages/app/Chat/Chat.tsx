import React, { RefObject } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Modal, TextArea } from "semantic-ui-react";
import { Footer, Header, Message } from "../../../components";
import { BoxIndicator } from "@crispengari/react-activity-indicators";
import {
  useChatMessagesQuery,
  useMarkMessagesAsReadMutation,
  useNewChatMessageSubscription,
  useSendMessageMutation,
} from "../../../graphql/generated/graphql";
import { StateType } from "../../../types";
import { decodeId } from "../../../utils";
import CountUp from "react-countup";
import "./Chat.css";
import { COLORS } from "../../../constants";
interface Props {}
const Chat: React.FC<Props> = () => {
  const { user: me } = useSelector((state: StateType) => state);
  const [{ fetching: sending }, sendMessage] = useSendMessageMutation();
  const [{ fetching: reading }, readMessages] = useMarkMessagesAsReadMutation();
  const params = useParams<Readonly<{ chatId: string }>>();
  const [{ data: chatMessage }] = useNewChatMessageSubscription({
    variables: {
      input: {
        userId: me?.id || "",
      },
    },
  });
  const chatId = decodeId(params.chatId || "");
  const navigator = useNavigate();

  const scrollRef = React.useRef<RefObject<HTMLDivElement>>();
  const [{ data: chat }, refetchChatMessages] = useChatMessagesQuery({
    variables: { input: { id: chatId } },
  });
  const [message, setMessage] = React.useState<string>(``);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!!!message.trim()) return;
    await sendMessage({ input: { message, chatId } });
    setMessage("");
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!!me?.emailVerified && !!!me?.isLoggedIn) {
      navigator("/app/pets", { replace: true });
    }
    return () => {
      mounted = false;
    };
  }, [navigator, me]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!chatId) {
      (async () => {
        await readMessages({ input: { chatId } });
      })();
    }
    return () => {
      mounted = false;
    };
  }, [chatId, readMessages]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!chatMessage?.newChatMessage.userId) {
      (async () => {
        await refetchChatMessages();
        if (scrollRef.current?.current) {
          scrollRef.current.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [refetchChatMessages, chatMessage]);
  return (
    <div className="chat__page">
      <Header />
      <div
        className="chat__page__main"
        style={{ backgroundImage: `url(${chat?.chat.chat?.pet?.image})` }}
        ref={scrollRef as any}
      >
        <div className="chat__page__main__header">
          <img
            alt="chat-avatar"
            src={
              !!chat?.chat.chat?.pet?.image
                ? chat.chat.chat.pet.image
                : "/profile.png"
            }
          />
          <div className="chat__page__main__header__main">
            <h1>{chat?.chat.chat?.chatTitle}</h1>
            <CountUp
              start={0}
              end={chat?.chat.chat?.pet?.price || 0}
              duration={1}
              separator=" "
              decimals={2}
              decimal="."
              prefix="R "
              className="chat__page__main__header__main__price"
            />
            <p>
              {chat?.chat.chat?.pet?.seller?.id === me?.id
                ? "You are the seller"
                : `Seller: ${chat?.chat.chat?.pet?.seller?.firstName}`}{" "}
              • {chat?.chat.chat?.pet?.reactions?.length} reactions •{" "}
              {chat?.chat.chat?.pet?.comments?.length} comments
            </p>
          </div>
        </div>
        <div className="chat__page__main__lists">
          {reading && <BoxIndicator size="small" color="#082032" />}
          <p>
            Your messages with are end-to-end encrypted.{" "}
            <Modal
              trigger={
                <span style={{ color: COLORS.tertiary }}>Learn more.</span>
              }
              header="End-to-End Encrypted"
              content="This means that your messages with your customer or your seller will be private between the two of you. Not anyone will have access to your messages outside this private chat even the PetMall team can to be able to see your messages."
              actions={[{ key: "done", content: "OK", positive: false }]}
            />
          </p>
          {chat?.chat.chat?.messages?.map((message) => (
            <Message message={message} key={message.id} />
          ))}
        </div>
        <Form onSubmit={onSubmit}>
          <TextArea
            placeholder="Write a message to the seller..."
            fluid
            className="chat__page__main__input"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            name="message"
            rows={1}
          />
          <Button
            color="green"
            type="submit"
            className="chat__page__main__send__btn"
            disabled={sending || !!!message.trim().length}
          >
            SEND
          </Button>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default Chat;
