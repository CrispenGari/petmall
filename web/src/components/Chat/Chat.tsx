import React from "react";
import {
  ChatType,
  useDeleteChatMutation,
  useMarkMessageAsUnReadMutation,
  useMarkMessagesAsReadMutation,
} from "../../graphql/generated/graphql";
import "./Chat.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import { relativeTimeObject } from "../../constants";
import { useNavigate } from "react-router-dom";
import { encodeId } from "../../utils";
import { useSelector } from "react-redux";
import { StateType } from "../../types";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});
interface Props {
  chat: ChatType;
}
const Chat: React.FC<Props> = ({ chat }) => {
  const { user: me } = useSelector((state: StateType) => state);
  const [, deleteChat] = useDeleteChatMutation();

  const lastMessage = chat.messages
    ? chat.messages[chat.messages.length - 1]
    : undefined;
  const [, markAsUnRead] = useMarkMessageAsUnReadMutation();
  const [, markAsRead] = useMarkMessagesAsReadMutation();

  const deleteChatHandler = async () => {
    await deleteChat({ input: { id: chat.id } });
  };
  const markAsReadHandler = async () => {
    await markAsRead({ input: { chatId: chat.id } });
  };
  const markAsUnReadHandler = async () => {
    await markAsUnRead({
      input: {
        chatId: chat.id,
        messageId: lastMessage?.id || "",
      },
    });
  };
  const navigate = useNavigate();
  return (
    <div className="chat">
      <img
        onClick={() => navigate(`/app/pet/${encodeId(chat?.pet?.id || "")}`)}
        alt="chat-avatar"
        src={!!chat.pet?.image ? chat.pet.image : "/profile.png"}
      />
      <div
        className="chat__main"
        onClick={() => navigate(`/app/chat/${encodeId(chat.id)}`)}
      >
        <h1>{chat.chatTitle}</h1>
        <p>
          {lastMessage?.senderId === me?.id && "you: "}
          {!!lastMessage
            ? lastMessage.message
            : "no messages in this chat yet"}{" "}
        </p>
        {lastMessage?.senderId ===
        me?.id ? null : lastMessage?.opened ? null : (
          <div className="chat__main__dot"></div>
        )}
        <div className="chat__main__info">
          <p>
            {dayjs(new Date(Number(lastMessage?.createdAt ?? ""))).fromNow()}{" "}
            ago
          </p>
        </div>
      </div>
      <div className="chat__buttons">
        <div className="chat__delete__button" onClick={deleteChatHandler}>
          <AiOutlineDelete />
        </div>
        {lastMessage?.senderId !== me?.id ? null : !!!lastMessage?.opened ? (
          <div
            className="chat__delete__button"
            title="mark as read"
            onClick={markAsReadHandler}
          >
            <HiOutlineMailOpen />
          </div>
        ) : (
          <div
            title="mark as unread"
            className="chat__delete__button"
            onClick={markAsUnReadHandler}
          >
            <HiOutlineMail />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
