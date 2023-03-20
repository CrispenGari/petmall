import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StateType } from "../../../types";
import "./Chat.css";
interface Props {}
const Chat: React.FC<Props> = () => {
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
    <div className="chat">
      <h1>Hello from Chat</h1>
    </div>
  );
};

export default Chat;
