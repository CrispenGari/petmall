import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon, Input } from "semantic-ui-react";
import { Footer, Header } from "../../../components";
import { StateType } from "../../../types";
import { Chat } from "../../../components";
import "./Chats.css";
interface Props {}
const Chats: React.FC<Props> = () => {
  const [filter, setFilter] = React.useState<string>("");
  const { user, chats } = useSelector((state: StateType) => state);
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
          ) : (
            chats.chats.map((chat) => <Chat key={chat.id} chat={chat as any} />)
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chats;
