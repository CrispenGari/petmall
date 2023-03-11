import React from "react";
import "./CommentReactions.css";
import { AiFillLike, AiFillDislike, AiFillHeart } from "react-icons/ai";
import { FaHandHoldingHeart, FaHandHoldingUsd } from "react-icons/fa";
import { useReactToCommentMutation } from "../../graphql/generated/graphql";
import { OperationContext } from "urql";
interface Props {
  setReaction: React.Dispatch<React.SetStateAction<string>>;
  reaction?: string;
  commentId: string;
  refetchPet: (opts?: Partial<OperationContext> | undefined) => void;
}

const CommentReactions: React.FC<Props> = ({
  setReaction,
  reaction,
  commentId: id,
  refetchPet,
}) => {
  const [{ data }, reactToComment] = useReactToCommentMutation();

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.reactToComment.success) {
      refetchPet();
    }
    return () => {
      mounted = false;
    };
  }, [data, refetchPet]);
  return (
    <div className="comment__reactions">
      <div
        className={`comment__reactions__button ${
          reaction === "LIKE" ? "comment__reactions__button--active" : ""
        }`}
        onClick={async () => {
          await reactToComment({
            input: {
              id,
              reaction: "LIKE",
            },
          });
          setReaction("LIKE");
        }}
      >
        <AiFillLike />
      </div>
      <div
        className={`comment__reactions__button ${
          reaction === "LOVE" ? "comment__reactions__button--active" : ""
        }`}
        onClick={async () => {
          await reactToComment({
            input: {
              id,
              reaction: "LOVE",
            },
          });
          setReaction("LOVE");
        }}
      >
        <AiFillHeart />
      </div>
      <div
        className={`comment__reactions__button ${
          reaction === "OFFER_LOVE" ? "comment__reactions__button--active" : ""
        }`}
        onClick={async () => {
          await reactToComment({
            input: {
              id,
              reaction: "OFFER_LOVE",
            },
          });
          setReaction("OFFER_LOVE");
        }}
      >
        <FaHandHoldingHeart />
      </div>
      <div
        className={`comment__reactions__button ${
          reaction === "OFFER_MONEY" ? "reaction__button--active" : ""
        }`}
        onClick={async () => {
          await reactToComment({
            input: {
              id,
              reaction: "OFFER_MONEY",
            },
          });
          setReaction("OFFER_MONEY");
        }}
      >
        <FaHandHoldingUsd />
      </div>
      <div
        className={`comment__reactions__button ${
          reaction === "DISLIKE" ? "comment__reactions__button--active" : ""
        }`}
        onClick={async () => {
          await reactToComment({
            input: {
              id,
              reaction: "DISLIKE",
            },
          });
          setReaction("DISLIKE");
        }}
      >
        <AiFillDislike />
      </div>
    </div>
  );
};

export default CommentReactions;
