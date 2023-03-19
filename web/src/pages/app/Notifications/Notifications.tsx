import React from "react";
import { useSelector } from "react-redux";
import { Icon, Input } from "semantic-ui-react";
import { Divider, Footer, Header, Notification } from "../../../components";
import { StateType } from "../../../types";
import "./Notifications.css";
interface Props {}
const Notifications: React.FC<Props> = () => {
  const [filter, setFilter] = React.useState<string>("");
  const { notifications } = useSelector((state: StateType) => state);
  return (
    <div className="notifications">
      <Header />
      <div className="notifications__main">
        <div className="notifications__main__header">
          <Input
            fluid
            className="notifications__main__header__input"
            iconPosition="left"
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter notifications..."
            icon={<Icon name="search" />}
            value={filter}
          />
        </div>
        <div className="notifications__main__lists">
          <Divider title="Unread" />
          {notifications.notifications
            .filter((notification) => !notification.read)
            .map((notification) => (
              <Notification key={notification.id} notification={notification} />
            ))}
          <Divider title="Read" />
          {notifications.notifications
            .filter((notification) => notification.read)
            .map((notification) => (
              <Notification key={notification.id} notification={notification} />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;
