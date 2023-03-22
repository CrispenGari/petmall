import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon, Input } from "semantic-ui-react";
import { Footer, Header } from "../../../components";
import { useMyChatsQuery } from "../../../graphql/generated/graphql";
import { StateType } from "../../../types";
import "./Chats.css";
interface Props {}
const Chats: React.FC<Props> = () => {
  const [filter, setFilter] = React.useState<string>("");
  const [{ data }] = useMyChatsQuery();

  console.log({ data });
  const { user } = useSelector((state: StateType) => state);
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
          <div className="chats__main__empty">
            <p>No new chats.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chats;
