import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Icon, Input, Message } from "semantic-ui-react";
import { setUser } from "../../actions";
import { COLORS, RELOADED_KEY, TOKEN_KEY } from "../../constants";
import {
  LogoutDocument,
  useChangeAccountPasswordMutation,
} from "../../graphql/generated/graphql";
import { client } from "../../providers/UrqlProvider";
import { ErrorType } from "../../types";
import { del } from "../../utils";
import "./ProfileChangePassword.css";
interface Props {}
const ProfileChangePassword: React.FC<Props> = () => {
  const [{ fetching, data }, changeAccountPassword] =
    useChangeAccountPasswordMutation();

  const dispatch = useDispatch();

  const [count, setCount] = useState<number>(5);
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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await changeAccountPassword({
      input: {
        confirmPassword,
        currentAccountPassword: currentPassword,
        password,
      },
    });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && data?.changeAccountPassword.error) {
      setError(data.changeAccountPassword.error);
      setForm({ confirmPassword: "", password: "", currentPassword: "" });
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && count > -1 && !!data?.changeAccountPassword.success) {
      const intervalId = setInterval(() => {
        setCount((state) => state - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
    return () => {
      mounted = false;
    };
  }, [count, data]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.changeAccountPassword.success && count === 0) {
      (async () => {
        const { data } = await client.mutation(LogoutDocument, {}).toPromise();
        if (data.logout) {
          await del(RELOADED_KEY);
          await del(TOKEN_KEY);
          dispatch(setUser(null));
          window.location.reload();
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, count, data]);

  return (
    <div className="profile__change__password">
      <h1>Change Account Password</h1>
      <p>
        When you change your account password, you will need to login again with
        new credentials.
      </p>

      {data?.changeAccountPassword.success && (
        <Message success className="profile__change__password__message">
          <Message.Header>Success</Message.Header>
          <p>
            Logging out in <strong>{count}s</strong>.
          </p>
        </Message>
      )}
      {error.field && (
        <Message error className="profile__change__password__message">
          <Message.Header>Error</Message.Header>
          <p style={{ color: COLORS.red }}>{error.message}.</p>
        </Message>
      )}
      <Form onSubmit={onSubmit}>
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
        <Button secondary type="submit" disabled={fetching}>
          Change Password
        </Button>
      </Form>
    </div>
  );
};

export default ProfileChangePassword;
