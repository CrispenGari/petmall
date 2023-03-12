import React from "react";
import "./Reactions.css";
import { AiFillLike, AiFillDislike, AiFillHeart } from "react-icons/ai";
import { FaHandHoldingHeart, FaHandHoldingUsd } from "react-icons/fa";
import { useReactToPetMutation } from "../../graphql/generated/graphql";
interface Props {
  setReaction: React.Dispatch<React.SetStateAction<string>>;
  reaction?: string;
  petId: string;
}

interface Props {}
const Reactions: React.FC<Props> = ({ reaction, setReaction, petId: id }) => {
  const [, reactToPet] = useReactToPetMutation();

  return (
    <div className="reactions">
      <div
        className={`reaction__button ${
          reaction === "LIKE" ? "reaction__button--active" : ""
        }`}
        onClick={async () => {
          await reactToPet({
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
        className={`reaction__button ${
          reaction === "LOVE" ? "reaction__button--active" : ""
        }`}
        onClick={async () => {
          await reactToPet({
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
        className={`reaction__button ${
          reaction === "OFFER_LOVE" ? "reaction__button--active" : ""
        }`}
        onClick={async () => {
          await reactToPet({
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
        className={`reaction__button ${
          reaction === "OFFER_MONEY" ? "reaction__button--active" : ""
        }`}
        onClick={async () => {
          await reactToPet({
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
        className={`reaction__button ${
          reaction === "DISLIKE" ? "reaction__button--active" : ""
        }`}
        onClick={async () => {
          await reactToPet({
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

export default Reactions;
