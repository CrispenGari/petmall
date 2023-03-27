import React from "react";
import { Button, Form, Icon, Input } from "semantic-ui-react";
import { ErrorType } from "../../types";
import "./ProfileChangePassword.css";
interface Props {}
const ProfileChangePassword: React.FC<Props> = ({}) => {
  const [error, setError] = React.useState<ErrorType>({
    field: "",
    message: "",
  });

  const [{ password, confirmPassword, currentPassword }, setForm] =
    React.useState<{
      password: string;
      confirmPassword: string;
      currentPassword: string;
    }>({
      password: "",
      confirmPassword: "",
      currentPassword: "",
    });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((state) => ({
      ...state,
      [name]: value,
    }));
  };
  return (
    <div className="profile__change__password">
      <h1>Change Account Password</h1>
      <p>
        When you change your account password, you will need to login again with
        new credentials.
      </p>
      <Form>
        <Input
          fluid
          className={"profile__change__password__input"}
          iconPosition="left"
          type={"password"}
          onChange={onChange}
          placeholder="Current Account Password"
          icon={<Icon name="lock" />}
          key={"currentPassword"}
          value={currentPassword}
          name="currentPassword"
          error={error?.field === "currentPassword"}
        />
        <div className="profile__change__password__inputs">
          <Input
            fluid
            className={"profile__change__password__input"}
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
            className={"profile__change__password__input"}
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
          Change Password
        </Button>
      </Form>
    </div>
  );
};

export default ProfileChangePassword;
