import React from "react";
import { PetType } from "../../graphql/generated/graphql";
import Reactions from "../Reactions/Reactions";
import CountUp from "react-countup";
import { AiFillLike, AiFillDislike, AiFillHeart } from "react-icons/ai";
import { FaHandHoldingHeart, FaHandHoldingUsd } from "react-icons/fa";
import { Icon, Popup } from "semantic-ui-react";
import ReactionsSummary from "../ReactionsSummary/ReactionsSummary";
import SellerCard from "../SellerCard/SellerCard";
import "./PetDetails.css";
import PetButtons from "../PetButtons/PetButtons";
interface PropsType {
  pet: PetType;
  reaction: string;
  setReaction: React.Dispatch<React.SetStateAction<string>>;
}
interface StateType {}
class PetDetails extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      props: { pet, reaction, setReaction },
    } = this;
    const repliesCount: number =
      pet.comments
        ?.map((cmt) => cmt.replies?.length || 0)
        .reduce((a, b) => a + b, 0) || 0;
    const commentCount: number = pet.comments?.length || 0;

    return (
      <div className="pet__details">
        <h1>{pet.name}</h1>
        <p>
          {pet.age} weeks • {pet.gender.toLowerCase()}
        </p>
        <img alt={pet.name} src={pet.image} />
        <CountUp
          start={0}
          end={pet.price || 0}
          duration={1}
          separator=" "
          decimals={2}
          decimal="."
          prefix="R "
          className="pet__details__price"
        />
        {pet.sold ? <div className="pet__details__badge">SOLD</div> : null}
        <p style={{ color: "white", fontSize: "1rem" }}>{pet.description}</p>

        <PetButtons pet={pet} />
        <div className="pet__details__reaction">
          <div>
            <Popup
              content={
                <Reactions
                  petId={pet.id || ""}
                  reaction={reaction}
                  sold={pet.sold}
                  setReaction={setReaction}
                />
              }
              on="click"
              pinned
              closeOnDocumentClick
              className="pet__details__reactions__popup"
              trigger={
                <div className="pet__details__button">
                  {reaction === "DISLIKE" ? (
                    <div
                      className="pet__details__reaction__button"
                      title="react"
                      style={{
                        backgroundColor: !!reaction ? "#ff3953" : "#334756",
                      }}
                    >
                      <AiFillDislike />
                    </div>
                  ) : reaction === "LOVE" ? (
                    <div
                      className="pet__details__reaction__button"
                      title="react"
                      style={{
                        backgroundColor: !!reaction ? "#ff3953" : "#334756",
                      }}
                    >
                      <AiFillHeart />
                    </div>
                  ) : reaction === "OFFER_LOVE" ? (
                    <div
                      className="pet__details__reaction__button"
                      title="react"
                      style={{
                        backgroundColor: !!reaction ? "#ff3953" : "#334756",
                      }}
                    >
                      <FaHandHoldingHeart />
                    </div>
                  ) : reaction === "OFFER_MONEY" ? (
                    <div
                      className="pet__details__reaction__button"
                      title="react"
                      style={{
                        backgroundColor: !!reaction ? "#ff3953" : "#334756",
                      }}
                    >
                      <FaHandHoldingUsd />
                    </div>
                  ) : (
                    <div
                      className="pet__details__reaction__button"
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
              content={<ReactionsSummary reactions={pet.reactions || []} />}
              on="click"
              pinned
              closeOnDocumentClick
              className="comment__details__reactions__popup"
              trigger={<p>{pet.reactions?.length ?? 0} likes</p>}
            />
          </div>
          <div>
            <div className="pet__details__button__disabled">
              <Icon name="comments" />
            </div>
            <p>{repliesCount + commentCount} comments</p>
          </div>
        </div>

        {!!!pet.seller ? null : <SellerCard seller={pet.seller} />}
      </div>
    );
  }
}

export default PetDetails;
