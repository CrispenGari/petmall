import React from "react";
import { Button, Form, Icon, Input, Message } from "semantic-ui-react";
import { ErrorType } from "../../types";
import "./ProfileResetPassword.css";
interface Props {}
const ProfileResetPassword: React.FC<Props> = ({}) => {
  const [error, setError] = React.useState<ErrorType>({
    field: "",
    message: "",
  });

  const [{ password, confirmPassword, email }, setForm] = React.useState<{
    password: string;
    confirmPassword: string;
    email: string;
  }>({
    password: "",
    confirmPassword: "",
    email: "",
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((state) => ({
      ...state,
      [name]: value,
    }));
  };
  return (
    <div className="profile__reset__password">
      <h1>Reset Password</h1>
      <p>
        The reset account password link will be sent to your account email
        address.
      </p>

      <Message success className="profile__reset__password__message">
        <Message.Header>Changes in Service</Message.Header>
        <p>
          We updated our privacy policy here to better service our customers. We
          recommend reviewing the changes.
        </p>
      </Message>
      <Form>
        <Input
          fluid
          disabled
          className={"profile__reset__password__input"}
          iconPosition="left"
          type={"email"}
          onChange={onChange}
          placeholder="New Email Address"
          icon={<Icon name="mail" />}
          key={"email"}
          value={email}
          name="email"
          error={error?.field === "email"}
        />

        <Button secondary type="submit">
          Reset Password
        </Button>
      </Form>
    </div>
  );
};

export default ProfileResetPassword;
