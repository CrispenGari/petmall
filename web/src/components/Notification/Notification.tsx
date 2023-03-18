import React from "react";
import "./Notification.css";
interface Props {}
const Notification: React.FC<Props> = ({}) => {
  return (
    <div className="notification">
      <h1>crispengari</h1>
      <p>commented on your pet</p>
      <div className="notification__info">
        <p>just now</p>
      </div>
    </div>
  );
};

export default Notification;
