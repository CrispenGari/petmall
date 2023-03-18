import React from "react";
import { Footer, Header } from "../../../components";
import "./Chats.css";
interface Props {}
const Chats: React.FC<Props> = ({}) => {
  return (
    <div className="chats">
      <Header />
      <div className="chats__main"></div>
      <Footer />
    </div>
  );
};

export default Chats;
