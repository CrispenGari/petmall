import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, TextArea } from "semantic-ui-react";
import { Footer, Header, Message } from "../../../components";
import {
  useChatMessagesQuery,
  useSendMessageMutation,
} from "../../../graphql/generated/graphql";
import { StateType } from "../../../types";
import { decodeId } from "../../../utils";
import CountUp from "react-countup";
import "./Chat.css";
interface Props {}
const Chat: React.FC<Props> = () => {
  const { user: me } = useSelector((state: StateType) => state);
  const [{ fetching: sending, data }, sendMessage] = useSendMessageMutation();
  const params = useParams<Readonly<{ chatId: string }>>();

  const chatId = decodeId(params.chatId || "");
  const [{ data: chat }] = useChatMessagesQuery({
    variables: { input: { id: chatId } },
  });
  const [message, setMessage] = React.useState<string>(``);

  console.log({ data });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!!!message.trim()) return;
    await sendMessage({ input: { message, chatId } });
    setMessage("");
  };
  const navigator = useNavigate();
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!!me?.emailVerified && !!!me?.isLoggedIn) {
      navigator("/app/pets", { replace: true });
    }
    return () => {
      mounted = false;
    };
  }, [navigator, me]);
  return (
    <div className="chat__page">
      <Header />
      <div
        className="chat__page__main"
        style={{ backgroundImage: `url(${chat?.chat.chat?.pet?.image})` }}
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
