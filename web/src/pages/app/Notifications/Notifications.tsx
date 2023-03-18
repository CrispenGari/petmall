import React from "react";
import { Icon, Input } from "semantic-ui-react";
import { Divider, Footer, Header, Notification } from "../../../components";
import "./Notifications.css";
interface Props {}
const Notifications: React.FC<Props> = () => {
  const [filter, setFilter] = React.useState<string>("");

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
          <Notification />
          <Notification />
          <Notification />

          <Divider title="Read" />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          <Notification />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;
