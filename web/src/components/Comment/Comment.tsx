import React from "react";
import { AiFillLike, AiFillDislike, AiFillHeart } from "react-icons/ai";
import { FaHandHoldingHeart, FaHandHoldingUsd, FaReply } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Popup } from "semantic-ui-react";

import { CommentType } from "../../graphql/generated/graphql";
import { StateType } from "../../types";
import { encodeId } from "../../utils";
import CommentReactions from "../CommentReactions/CommentReactions";
import ReactionsSummary from "../ReactionsSummary/ReactionsSummary";
import "./Comment.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { relativeTimeObject } from "../../constants";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});
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
  sold: boolean;
}
const Comment: React.FC<Props> = ({ comment, setReplyTo, sold }) => {
  return (
    <div className="comment__main">
      <CommentChild
        parentCommentId={comment.id}
        comment={comment}
        withReply
        setReplyTo={setReplyTo}
        sold={sold}
      />
      <div className="comment__responses">
        {comment.replies?.map((reply, index) => (
          <CommentChild
            parentCommentId={comment.id}
            comment={reply}
            key={index}
            withReply
            setReplyTo={setReplyTo}
            sold={sold}
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
  sold: boolean;
}> = ({ comment, withReply, setReplyTo, parentCommentId, sold }) => {
  const [reaction, setReaction] = React.useState<string>("");
  const { user } = useSelector((state: StateType) => state);

  const navigate = useNavigate();

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!comment.reactions) {
      const _reaction = comment.reactions.find(
        (reaction) => reaction.userId === user?.id
      );
      if (!!!_reaction) {
        setReaction("");
      } else {
        setReaction(_reaction.reaction);
      }
    }
    return () => {
      mounted = false;
    };
  }, [user, comment]);

  return (
    <div className="comment">
      <h1
        onClick={() =>
          navigate(`/app/profile/${encodeId(comment.user?.id || "")}`)
        }
      >
        {comment.user?.firstName} {comment.user?.lastName}
      </h1>
      <div className="comment__body">
        <img
          onClick={() =>
            navigate(`/app/profile/${encodeId(comment.user?.id || "")}`)
          }
          src={comment.user?.avatar ? comment.user.avatar : "/profile.png"}
          alt="user"
        />
        <p>{comment.comment}</p>
      </div>
      <div className="comment__details">
        {withReply && comment.user?.id !== user?.id ? (
          <div
            className="comment__details__reply__button"
            title="reply"
            onClick={() => {
              if (sold) return;
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
              <CommentReactions
                sold={sold}
                commentId={comment.id}
                reaction={reaction}
                setReaction={setReaction}
              />
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
                    style={{
                      backgroundColor: !!reaction ? "#ff3953" : "#334756",
                    }}
                  >
                    <AiFillDislike />
                  </div>
                ) : reaction === "LOVE" ? (
                  <div
                    className="comment__details__reactions__button"
                    title="react"
                    style={{
                      backgroundColor: !!reaction ? "#ff3953" : "#334756",
                    }}
                  >
                    <AiFillHeart />
                  </div>
                ) : reaction === "OFFER_LOVE" ? (
                  <div
                    className="comment__details__reactions__button"
                    title="react"
                    style={{
                      backgroundColor: !!reaction ? "#ff3953" : "#334756",
                    }}
                  >
                    <FaHandHoldingHeart />
                  </div>
                ) : reaction === "OFFER_MONEY" ? (
                  <div
                    className="comment__details__reactions__button"
                    title="react"
                    style={{
                      backgroundColor: !!reaction ? "#ff3953" : "#334756",
                    }}
                  >
                    <FaHandHoldingUsd />
                  </div>
                ) : (
                  <div
                    className="comment__details__reactions__button"
                    title="react"
                    style={{
                      backgroundColor: !!reaction ? "#ff3953" : "#334756",
                    }}
                  >
                    <AiFillLike />
                  </div>
                )}
              </div>
            }
          />
          <Popup
            content={<ReactionsSummary reactions={comment.reactions || []} />}
            on="click"
            pinned
            closeOnDocumentClick
            className="comment__details__reactions__popup"
            trigger={
              <p style={{ cursor: "pointer" }}>
                {comment.reactions?.length ?? 0} reactions
              </p>
            }
          />
          <p>{" • "}</p>

          <p>{dayjs(new Date(Number(comment.createdAt))).fromNow()} ago</p>
        </div>
      </div>
    </div>
  );
};
