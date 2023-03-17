import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, TextArea } from "semantic-ui-react";
import { PetType } from "../../graphql/generated/graphql";
import { StateType } from "../../types";
import { encodeId } from "../../utils";
import "./PetButtons.css";
interface Props {
  pet: PetType;
}
const PetButtons: React.FC<Props> = ({ pet }) => {
  const { user } = useSelector((state: StateType) => state);

  const navigate = useNavigate();
  const [message, setMessage] = React.useState<string>(
    `Hey ${pet.seller?.email}, is this still available?`
  );
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!!!message.trim()) return;
    setMessage("");
  };

  return (
    <div className="pet__buttons">
      {user?.id !== pet.seller?.id ? (
        <Form loading={false} onSubmit={onSubmit}>
          <TextArea
            placeholder="Write a message to the seller..."
            fluid
            className={"pet__buttons__input"}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            name="message"
          />
          <Button
            color="green"
            type="submit"
            className="pet__buttons__send__btn"
          >
            SEND
          </Button>
        </Form>
      ) : (
        <Form loading={false}>
          <Button
            color="green"
            type="button"
            fluid
            className="pet__buttons__send__btn"
            onClick={() => navigate(`/app/pet/edit/${encodeId(pet.id)}`)}
          >
            EDIT
          </Button>
          <Button
            color="green"
            type="button"
            fluid
            className="pet__buttons__send__btn__tertiary"
          >
            SOLD
          </Button>
        </Form>
      )}
    </div>
  );
};

export default PetButtons;
