import React from "react";
import { Button, Form, Icon, Input } from "semantic-ui-react";
import { ErrorType } from "../../types";
import "./ProfileDeleteAccount.css";
interface Props {}
const ProfileDeleteAccount: React.FC<Props> = ({}) => {
  const [error, setError] = React.useState<ErrorType>({
    field: "",
    message: "",
  });

  const [{ password, confirmPassword }, setForm] = React.useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((state) => ({
      ...state,
      [name]: value,
    }));
  };
  return (
    <div className="profile__delete__account">
      <h1>Delete Account</h1>
      <p>
        Deleting your account is an irreversible action. Once you delete your
        account you will lose everything associated to it.
      </p>
      <Form>
        <div className="profile__delete__account__inputs">
          <Input
            fluid
            className={"profile__delete__account__input"}
            iconPosition="left"
            type={"password"}
            onChange={onChange}
            placeholder="Account Password"
            icon={<Icon name="lock" />}
            key={"password"}
            value={password}
            name="password"
            error={error?.field === "password"}
          />
          <Input
            fluid
            className={"profile__delete__account__input"}
            iconPosition="left"
            type={"password"}
            onChange={onChange}
            placeholder="Confirm Account Password"
            icon={<Icon name="lock" />}
            key={"confirmPassword"}
            value={confirmPassword}
            name="confirmPassword"
            error={error?.field === "confirmPassword"}
          />
        </div>
        <Button secondary type="submit">
          Delete Account
        </Button>
      </Form>
    </div>
  );
};

export default ProfileDeleteAccount;
