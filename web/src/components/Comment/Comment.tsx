import React from "react";
import { AiFillLike, AiFillDislike, AiFillHeart } from "react-icons/ai";
import { FaHandHoldingHeart, FaHandHoldingUsd } from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import CommentReactions from "../CommentReactions/CommentReactions";
import "./Comment.css";
interface Props {}
const Comment: React.FC<Props> = () => {
  const [reaction, setReaction] = React.useState<string>("");
  return (
    <div className="comment">
      <h1>user</h1>
      <div className="comment__body">
        <img src="/profile.png" alt="user" />
        <p>This pet is nice.</p>
      </div>
      <div className="comment__details">
        <div className="comment__details__reactions">
          <Popup
            content={
              <CommentReactions reaction={reaction} setReaction={setReaction} />
            }
            on="click"
            pinned
            closeOnDocumentClick
            className="comment__details__reactions__popup"
            trigger={
              <div className="comment__details__reactions__buttons">
                {reaction === "DISLIKE" ? (
                  <div
                    className="comment__details__reactions__button"
                    title="react"
                  >
                    <AiFillDislike />
                  </div>
                ) : reaction === "LOVE" ? (
                  <div
                    className="comment__details__reactions__button"
                    title="react"
                  >
                    <AiFillHeart />
                  </div>
                ) : reaction === "OFFER_HEART" ? (
                  <div
                    className="comment__details__reactions__button"
                    title="react"
                  >
                    <FaHandHoldingHeart />
                  </div>
                ) : reaction === "OFFER__MONEY" ? (
                  <div
                    className="comment__details__reactions__button"
                    title="react"
                  >
                    <FaHandHoldingUsd />
                  </div>
                ) : (
                  <div
                    className="comment__details__reactions__button"
                    title="react"
                  >
                    <AiFillLike />
                  </div>
                )}
              </div>
            }
          />
          <p>0 reactions</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
