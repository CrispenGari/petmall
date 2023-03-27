import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Icon, Input, Message } from "semantic-ui-react";
import { setUser } from "../../actions";
import { COLORS, RELOADED_KEY, TOKEN_KEY } from "../../constants";
import { useDeleteAccountMutation } from "../../graphql/generated/graphql";
import { ErrorType } from "../../types";
import { del } from "../../utils";
import "./ProfileDeleteAccount.css";
interface Props {}
const ProfileDeleteAccount: React.FC<Props> = () => {
  const [error, setError] = React.useState<ErrorType>({
    field: "",
    message: "",
  });

  const dispatch = useDispatch();

  const [count, setCount] = useState<number>(5);
  const [{ fetching, data }, deleteAccount] = useDeleteAccountMutation();

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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await deleteAccount({
      input: {
        confirmPassword,
        password,
      },
    });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && data?.deleteAccount.error) {
      setError(data.deleteAccount.error);
      setForm({ confirmPassword: "", password: "" });
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && count > -1 && !!data?.deleteAccount.success) {
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
    if (mounted && count <= 0) {
      (async () => {
        await del(RELOADED_KEY);
        await del(TOKEN_KEY);
        dispatch(setUser(null));
        window.location.reload();
      })();
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, count]);

  return (
    <div className="profile__delete__account">
      <h1>Delete Account</h1>
      <p>
        Deleting your account is an irreversible action. Once you delete your
        account you will lose everything associated to it.
      </p>

      {data?.deleteAccount.success && (
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
        <Button secondary type="submit" disabled={fetching}>
          Delete Account
        </Button>
      </Form>
    </div>
  );
};

export default ProfileDeleteAccount;
