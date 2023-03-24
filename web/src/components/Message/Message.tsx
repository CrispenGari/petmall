import React from "react";
import { useSelector } from "react-redux";
import { MessageType } from "../../graphql/generated/graphql";
import { StateType } from "../../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { COLORS, relativeTimeObject } from "../../constants";
import "./Message.css";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

interface Props {
  message: MessageType;
}
const Message: React.FC<Props> = ({ message }) => {
  const { user: me } = useSelector((state: StateType) => state);
  return (
    <div
      className="message"
      style={{
        alignSelf: me?.id === message.senderId ? "flex-end" : "flex-start",
      }}
    >
      <img
        alt="user-avatar"
        src={!!message.sender?.avatar ? message.sender.avatar : "/profile.png"}
      />
      <div
        className="message__main"
        style={{
          backgroundColor:
            me?.id === message.senderId ? COLORS.main : COLORS.secondary,
        }}
      >
        <p>{message.message}</p>
        <div className="message__main__info">
          <p>
            {me?.id === message.senderId ? "you" : message.sender?.firstName} •{" "}
            {dayjs(new Date(Number(message?.createdAt ?? ""))).fromNow()} ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
