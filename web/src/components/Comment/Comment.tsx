import React from "react";
import { AiFillLike, AiFillDislike, AiFillHeart } from "react-icons/ai";
import { FaHandHoldingHeart, FaHandHoldingUsd, FaReply } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Popup } from "semantic-ui-react";
import { OperationContext } from "urql";
import { CommentType } from "../../graphql/generated/graphql";
import { StateType } from "../../types";
import CommentReactions from "../CommentReactions/CommentReactions";
import ReactionsSummary from "../ReactionsSummary/ReactionsSummary";
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
  refetchPet: (opts?: Partial<OperationContext> | undefined) => void;
}
const Comment: React.FC<Props> = ({ comment, setReplyTo, refetchPet }) => {
  return (
    <div className="comment__main">
      <CommentChild
        parentCommentId={comment.id}
        comment={comment}
        withReply
        setReplyTo={setReplyTo}
        refetchPet={refetchPet}
      />
      <div className="comment__responses">
        {comment.replies?.map((reply, index) => (
          <CommentChild
            parentCommentId={comment.id}
            comment={reply}
            key={index}
            withReply
            setReplyTo={setReplyTo}
            refetchPet={refetchPet}
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
  refetchPet: (opts?: Partial<OperationContext> | undefined) => void;
}> = ({ comment, withReply, setReplyTo, parentCommentId, refetchPet }) => {
  const [reaction, setReaction] = React.useState<string>("");
  const { user } = useSelector((state: StateType) => state);

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
              <CommentReactions
                commentId={comment.id}
                reaction={reaction}
                setReaction={setReaction}
                refetchPet={refetchPet}
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
                ) : reaction === "OFFER__MONEY" ? (
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
        </div>
      </div>
    </div>
  );
};
