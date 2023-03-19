import React from "react";
import { GiCancel } from "react-icons/gi";
import { Button, Form, TextArea } from "semantic-ui-react";
import {
  CommentType,
  PetType,
  useCommentToPetMutation,
  useReplyCommentMutation,
} from "../../graphql/generated/graphql";
import Comment from "../Comment/Comment";

import "./PetComments.css";
interface Props {
  pet: PetType;
  setReplyTo: React.Dispatch<
    React.SetStateAction<
      | (CommentType & {
          parentCommentId: string;
        })
      | undefined
    >
  >;
  replyTo:
    | (CommentType & {
        parentCommentId: string;
      })
    | undefined;
  petId: string;
}
const PetComments: React.FC<Props> = ({ pet, setReplyTo, replyTo, petId }) => {
  const [{ fetching }, commentToPet] = useCommentToPetMutation();
  const [{ fetching: loading }, replyToComment] = useReplyCommentMutation();
  const [comment, setComment] = React.useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!!!comment.trim()) return;
    if (!!replyTo) {
      await replyToComment({
        input: {
          comment,
          id: replyTo.parentCommentId,
          userId: replyTo.user?.id || "",
        },
      });
    } else {
      await commentToPet({
        input: {
          id: petId,
          comment,
        },
      });
    }
    setComment("");
    setReplyTo(undefined);
  };
  return (
    <div className="pet__comments">
      <h1>Reviews about {pet.name}</h1>
      <div className="pet__comments__comments">
        {pet.comments?.length === 0 ? (
          <p>No reviews about {pet.name}</p>
        ) : (
          pet.comments?.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment as any}
              setReplyTo={setReplyTo}
              sold={pet.sold}
            />
          ))
        )}
      </div>
      {!!replyTo ? (
        <p style={{ display: "flex", alignItems: "center" }}>
          replying to: @{replyTo.user?.firstName} on "{replyTo.comment}"
          <GiCancel
            style={{ marginLeft: 5, color: "#ff3953", fontSize: "1.2rem" }}
            title={"cancel reply"}
            onClick={() => setReplyTo(undefined)}
          />
        </p>
      ) : null}
      <Form onSubmit={onSubmit}>
        <TextArea
          placeholder={
            !!!replyTo
              ? "Write a comment about this pet..."
              : `replying to: @${replyTo.user?.firstName} on "${replyTo.comment}"`
          }
          fluid
          className={"pet__comments__input"}
          onChange={(e) => setComment(e.target.value)}
          key={"comment"}
          value={comment}
          name="comment"
        />

        <Button
          disabled={pet.sold || loading || fetching}
          color="green"
          type="submit"
          className="pet__comments__btn"
        >
          COMMENT
        </Button>
      </Form>
    </div>
  );
};

export default PetComments;
