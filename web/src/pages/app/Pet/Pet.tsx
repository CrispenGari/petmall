import React from "react";

import { Form, Icon, Button, TextArea, Popup } from "semantic-ui-react";
import { Comment, Header, Reactions } from "../../../components";
import {
  useCommentToPetMutation,
  useGetPetByIdQuery,
} from "../../../graphql/generated/graphql";
import { withGlobalProps } from "../../../hoc";
import { GlobalPropsType } from "../../../types";
import CountUp from "react-countup";
import { AiFillLike, AiFillDislike, AiFillHeart } from "react-icons/ai";
import { FaHandHoldingHeart, FaHandHoldingUsd } from "react-icons/fa";

import "./Pet.css";
interface Props {
  globalProps: GlobalPropsType;
}
const Pet: React.FC<Props> = ({ globalProps: { params } }) => {
  const [{ data }, refetchPet] = useGetPetByIdQuery({
    variables: { input: { id: params.petId as string } },
  });

  const [{ data: result, fetching }, commentToPet] = useCommentToPetMutation();
  const [comment, setComment] = React.useState<string>("");
  const [reaction, setReaction] = React.useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!!!comment.trim()) return;
    await commentToPet({
      input: {
        id: params.petId as string,
        comment,
      },
    });
    setComment("");
    await refetchPet();
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.getPetById?.success) {
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  console.log({ result });
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
                  <Reactions reaction={reaction} setReaction={setReaction} />
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
                      >
                        <AiFillDislike />
                      </div>
                    ) : reaction === "LOVE" ? (
                      <div
                        className="pet__page__pet__reaction__button"
                        title="react"
                      >
                        <AiFillHeart />
                      </div>
                    ) : reaction === "OFFER_HEART" ? (
                      <div
                        className="pet__page__pet__reaction__button"
                        title="react"
                      >
                        <FaHandHoldingHeart />
                      </div>
                    ) : reaction === "OFFER__MONEY" ? (
                      <div
                        className="pet__page__pet__reaction__button"
                        title="react"
                      >
                        <FaHandHoldingUsd />
                      </div>
                    ) : (
                      <div
                        className="pet__page__pet__reaction__button"
                        title="react"
                      >
                        <AiFillLike />
                      </div>
                    )}
                  </div>
                }
              />

              <p>{data?.getPetById?.pet?.reactions?.length ?? 0} likes</p>
            </div>
            <div>
              <div className="pet__page__pet__button__disabled">
                <Icon name="comments" />
              </div>
              <p>{data?.getPetById?.pet?.comments?.length ?? 0} comments</p>
            </div>
          </div>
          <div className="pet__page__pet__seller"></div>
        </div>
        <div className="pet__page__comments">
          <h1>Comments about {data?.getPetById?.pet?.name}</h1>
          <div className="pet__page__comments__comments">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <Comment />
              ))}
          </div>
          <Form loading={fetching} onSubmit={onSubmit}>
            <TextArea
              placeholder="Write a comment about this pet..."
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
