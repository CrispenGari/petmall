import React from "react";
import { AiFillLike, AiFillDislike, AiFillHeart } from "react-icons/ai";
import { FaHandHoldingHeart, FaHandHoldingUsd, FaReply } from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import { CommentType } from "../../graphql/generated/graphql";
import CommentReactions from "../CommentReactions/CommentReactions";
import "./Comment.css";
interface Props {
  comment: CommentType;
  setReplyTo: React.Dispatch<
    React.SetStateAction<
      | (CommentType & {
          parentCommentId: string;
        })
      | undefined
    >
  >;
}
const Comment: React.FC<Props> = ({ comment, setReplyTo }) => {
  return (
    <div className="comment__main">
      <CommentChild
        parentCommentId={comment.id}
        comment={comment}
        withReply
        setReplyTo={setReplyTo}
      />
      <div className="comment__responses">
        {comment.replies?.map((reply) => (
          <CommentChild
            parentCommentId={comment.id}
            comment={reply}
            key={reply.id}
            withReply
            setReplyTo={setReplyTo}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;

const CommentChild: React.FunctionComponent<{
  comment: CommentType;
  withReply?: boolean;
  parentCommentId: string;
  setReplyTo: React.Dispatch<
    React.SetStateAction<
      | (CommentType & {
          parentCommentId: string;
        })
      | undefined
    >
  >;
}> = ({ comment, withReply, setReplyTo, parentCommentId }) => {
  const [reaction, setReaction] = React.useState<string>("");
  return (
    <div className="comment">
      <h1>{comment.user?.email}</h1>
      <div className="comment__body">
        <img src="/profile.png" alt="user" />
        <p>{comment.comment}</p>
      </div>
      <div className="comment__details">
        {withReply ? (
          <div
            className="comment__details__reply__button"
            title="reply"
            onClick={() => {
              setReplyTo!({
                ...comment,
                parentCommentId,
              });
            }}
          >
            <FaReply />
          </div>
        ) : null}
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
        </div>{" "}
      </div>
    </div>
  );
};
