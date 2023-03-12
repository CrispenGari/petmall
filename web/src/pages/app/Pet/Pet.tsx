import React from "react";

import { Form, Icon, Button, TextArea, Popup } from "semantic-ui-react";
import {
  Comment,
  Header,
  Reactions,
  ReactionsSummary,
} from "../../../components";
import {
  CommentType,
  useCommentToPetMutation,
  useGetPetByIdQuery,
  usePetInteractionSubscription,
  useReplyCommentMutation,
} from "../../../graphql/generated/graphql";
import { withGlobalProps } from "../../../hoc";
import { GlobalPropsType, StateType } from "../../../types";
import CountUp from "react-countup";
import { AiFillLike, AiFillDislike, AiFillHeart } from "react-icons/ai";
import { FaHandHoldingHeart, FaHandHoldingUsd } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import "./Pet.css";
import { useSelector } from "react-redux";
interface Props {
  globalProps: GlobalPropsType;
}
const Pet: React.FC<Props> = ({ globalProps: { params } }) => {
  const [{ data }, refetchPet] = useGetPetByIdQuery({
    variables: { input: { id: params.petId as string } },
  });
  const [{ data: petModification }] = usePetInteractionSubscription();

  const { user } = useSelector((state: StateType) => state);
  const [{ fetching }, commentToPet] = useCommentToPetMutation();
  const [{ fetching: loading }, replyToComment] = useReplyCommentMutation();
  const [comment, setComment] = React.useState<string>("");
  const [reaction, setReaction] = React.useState<string>("");
  const [replyTo, setReplyTo] = React.useState<
    | (CommentType & {
        parentCommentId: string;
      })
    | undefined
  >();

  console.log({
    petId: petModification?.petInteraction.petId,
    id: params.petId,
  });
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!petModification?.petInteraction.petId) {
      (async () => {
        if (petModification.petInteraction.petId === (params.petId as string)) {
          await refetchPet();
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [refetchPet, petModification, params]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!!!comment.trim()) return;
    if (!!replyTo) {
      await replyToComment({
        input: {
          comment,
          id: replyTo.parentCommentId,
        },
      });
    } else {
      await commentToPet({
        input: {
          id: params.petId as string,
          comment,
        },
      });
    }

    setComment("");
  };

  const repliesCount: number =
    data?.getPetById?.pet?.comments
      ?.map((cmt) => cmt.replies?.length || 0)
      .reduce((a, b) => a + b, 0) || 0;
  const commentCount: number = data?.getPetById?.pet?.comments?.length || 0;

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.getPetById?.pet?.reactions) {
      const _reaction = data?.getPetById?.pet?.reactions.find(
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
  }, [user, data]);

  return (
    <div className="pet__page">
      <Header />
      <div className="pet__page__pet__container">
        <div className="pet__page__pet">
          <h1>{data?.getPetById?.pet?.name}</h1>
          <p>
            {data?.getPetById?.pet?.age} weeks •{" "}
            {data?.getPetById?.pet?.gender.toLowerCase()}
          </p>
          <img
            alt={data?.getPetById?.pet?.name}
            src={data?.getPetById?.pet?.image}
          />
          <CountUp
            start={0}
            end={data?.getPetById?.pet?.price || 0}
            duration={1}
            separator=" "
            decimals={2}
            decimal="."
            prefix="R "
            className="pet__page__pet__price"
          />
          <p style={{ color: "white", fontSize: "1rem" }}>
            {data?.getPetById?.pet?.description}
          </p>
          <div className="pet__page__pet__reaction">
            <div>
              <Popup
                content={
                  <Reactions
                    petId={data?.getPetById?.pet?.id || ""}
                    reaction={reaction}
                    setReaction={setReaction}
                  />
                }
                on="click"
                pinned
                closeOnDocumentClick
                className="pet__page__reactions__popup"
                trigger={
                  <div className="pet__page__pet__button">
                    {reaction === "DISLIKE" ? (
                      <div
                        className="pet__page__pet__reaction__button"
                        title="react"
                        style={{
                          backgroundColor: !!reaction ? "#ff3953" : "#334756",
                        }}
                      >
                        <AiFillDislike />
                      </div>
                    ) : reaction === "LOVE" ? (
                      <div
                        className="pet__page__pet__reaction__button"
                        title="react"
                        style={{
                          backgroundColor: !!reaction ? "#ff3953" : "#334756",
                        }}
                      >
                        <AiFillHeart />
                      </div>
                    ) : reaction === "OFFER_LOVE" ? (
                      <div
                        className="pet__page__pet__reaction__button"
                        title="react"
                        style={{
                          backgroundColor: !!reaction ? "#ff3953" : "#334756",
                        }}
                      >
                        <FaHandHoldingHeart />
                      </div>
                    ) : reaction === "OFFER_MONEY" ? (
                      <div
                        className="pet__page__pet__reaction__button"
                        title="react"
                        style={{
                          backgroundColor: !!reaction ? "#ff3953" : "#334756",
                        }}
                      >
                        <FaHandHoldingUsd />
                      </div>
                    ) : (
                      <div
                        className="pet__page__pet__reaction__button"
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
                content={
                  <ReactionsSummary
                    reactions={data?.getPetById?.pet?.reactions || []}
                  />
                }
                on="click"
                pinned
                closeOnDocumentClick
                className="comment__details__reactions__popup"
                trigger={
                  <p>{data?.getPetById?.pet?.reactions?.length ?? 0} likes</p>
                }
              />
            </div>
            <div>
              <div className="pet__page__pet__button__disabled">
                <Icon name="comments" />
              </div>
              <p>{repliesCount + commentCount} comments</p>
            </div>
          </div>
          <div className="pet__page__pet__seller"></div>
        </div>
        <div className="pet__page__comments">
          <h1>Reviews about {data?.getPetById?.pet?.name}</h1>
          <div className="pet__page__comments__comments">
            {data?.getPetById?.pet?.comments?.length === 0 ? (
              <p>No reviews about {data?.getPetById?.pet?.name}</p>
            ) : (
              data?.getPetById?.pet?.comments?.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment as any}
                  setReplyTo={setReplyTo}
                />
              ))
            )}
          </div>
          {!!replyTo ? (
            <p style={{ display: "flex", alignItems: "center" }}>
              replying to: @{replyTo.user?.email} on "{replyTo.comment}"
              <GiCancel
                style={{ marginLeft: 5, color: "#ff3953", fontSize: "1.2rem" }}
                title={"cancel reply"}
                onClick={() => setReplyTo(undefined)}
              />
            </p>
          ) : null}
          <Form loading={fetching || loading} onSubmit={onSubmit}>
            <TextArea
              placeholder={
                !!!replyTo
                  ? "Write a comment about this pet..."
                  : `replying to: @${replyTo.user?.email} on "${replyTo.comment}"`
              }
              fluid
              className={"pet__page__comments__input"}
              onChange={(e) => setComment(e.target.value)}
              key={"comment"}
              value={comment}
              name="comment"
            />

            <Button
              color="green"
              type="submit"
              className="pet__page__comments__btn"
            >
              COMMENT
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default withGlobalProps(Pet);
