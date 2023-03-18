import React from "react";
import { ReactionType } from "../../graphql/generated/graphql";
import "./ReactionsSummary.css";
import { AiFillLike, AiFillDislike, AiFillHeart } from "react-icons/ai";
import { FaHandHoldingHeart, FaHandHoldingUsd } from "react-icons/fa";
import { REACTIONS } from "../../constants";

interface Props {
  reactions: ReactionType[];
}
const ReactionsSummary: React.FC<Props> = ({ reactions }) => {
  return (
    <div className="reactions__summary">
      {REACTIONS.map((reaction) => (
        <GetReactionIconCount
          key={reaction}
          reaction={reaction}
          reactions={reactions}
        />
      ))}
    </div>
  );
};

export default ReactionsSummary;

const GetReactionIconCount: React.FunctionComponent<{
  reaction: string;
  reactions: ReactionType[];
}> = ({ reaction, reactions }) => {
  const count = reactions.filter((r) => r.reaction === reaction).length || 0;
  return (
    <p className="get__reaction__icon__count">
      {reaction === "DISLIKE" ? (
        <AiFillDislike />
      ) : reaction === "LOVE" ? (
        <AiFillHeart />
      ) : reaction === "OFFER_LOVE" ? (
        <FaHandHoldingHeart />
      ) : reaction === "OFFER_MONEY" ? (
        <FaHandHoldingUsd />
      ) : (
        <AiFillLike />
      )}
      <span>{count}</span>
    </p>
  );
};
