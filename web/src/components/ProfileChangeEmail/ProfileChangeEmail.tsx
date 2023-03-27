import React from "react";
import { Button, Form, Icon, Input } from "semantic-ui-react";
import { ErrorType } from "../../types";
import "./ProfileChangeEmail.css";
interface Props {}
const ProfileChangeEmail: React.FC<Props> = ({}) => {
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
    <div className="profile__change__email">
      <h1>Change Account Email</h1>
      <p>
        When you change your email you will need to login again with your new
        credentials.
      </p>
      <Form>
        <Input
          fluid
          className={"profile__change__email__input"}
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
        <div className="profile__change__email__inputs">
          <Input
            fluid
            className={"profile__change__email__input"}
            iconPosition="left"
            type={"password"}
            onChange={onChange}
            placeholder="New Password"
            icon={<Icon name="lock" />}
            key={"password"}
            value={password}
            name="password"
            error={error?.field === "password"}
          />
          <Input
            fluid
            className={"profile__change__email__input"}
            iconPosition="left"
            type={"password"}
            onChange={onChange}
            placeholder="Confirm New Password"
            icon={<Icon name="lock" />}
            key={"confirmPassword"}
            value={confirmPassword}
            name="confirmPassword"
            error={error?.field === "confirmPassword"}
          />
        </div>
        <Button secondary type="submit">
          Change Email
        </Button>
      </Form>
    </div>
  );
};

export default ProfileChangeEmail;
