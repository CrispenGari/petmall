import React from "react";
import "./CommentReactions.css";
import { AiFillLike, AiFillDislike, AiFillHeart } from "react-icons/ai";
import { FaHandHoldingHeart, FaHandHoldingUsd } from "react-icons/fa";
interface PropsType {
  setReaction: React.Dispatch<React.SetStateAction<string>>;
  reaction?: string;
}
interface StateType {}
class CommentReactions extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }
  render() {
    const { setReaction, reaction } = this.props;
    return (
      <div className="comment__reactions">
        <div
          className={`comment__reactions__button ${
            reaction === "LIKE" ? "comment__reactions__button--active" : ""
          }`}
          onClick={() => setReaction("LIKE")}
        >
          <AiFillLike />
        </div>
        <div
          className={`comment__reactions__button ${
            reaction === "LOVE" ? "comment__reactions__button--active" : ""
          }`}
          onClick={() => setReaction("LOVE")}
        >
          <AiFillHeart />
        </div>
        <div
          className={`comment__reactions__button ${
            reaction === "OFFER_HEART"
              ? "comment__reactions__button--active"
              : ""
          }`}
          onClick={() => setReaction("OFFER_HEART")}
        >
          <FaHandHoldingHeart />
        </div>
        <div
          className={`comment__reactions__button ${
            reaction === "OFFER_MONEY" ? "reaction__button--active" : ""
          }`}
          onClick={() => setReaction("OFFER_MONEY")}
        >
          <FaHandHoldingUsd />
        </div>
        <div
          className={`reaction__button ${
            reaction === "DISLIKE" ? "comment__reactions__button--active" : ""
          }`}
          onClick={() => setReaction("DISLIKE")}
        >
          <AiFillDislike />
        </div>
      </div>
    );
  }
}

export default CommentReactions;
