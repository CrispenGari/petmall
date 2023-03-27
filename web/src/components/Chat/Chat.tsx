import React from "react";
import { ChatType } from "../../graphql/generated/graphql";
import "./Chat.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { AiOutlineDelete } from "react-icons/ai";
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
  const lastMessage = chat.messages
    ? chat.messages[chat.messages.length - 1]
    : undefined;

  const deleteChat = async () => {};
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
        <div className="chat__delete__button" onClick={deleteChat}>
          <AiOutlineDelete />
        </div>
      </div>
    </div>
  );
};

export default Chat;
