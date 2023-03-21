import React from "react";
import { useDispatch } from "react-redux";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Button, Form, Icon, Input, Message } from "semantic-ui-react";
import { setUser } from "../../../actions";
import { Footer } from "../../../components";
import { COLORS, RELOADED_KEY, TOKEN_KEY } from "../../../constants";
import {
  LogoutDocument,
  useChangePasswordMutation,
} from "../../../graphql/generated/graphql";
import { client } from "../../../providers/UrqlProvider";
import { ErrorType } from "../../../types";
import { del } from "../../../utils";
import "./ResetPassword.css";
interface Props {}
const ResetPassword: React.FC<Props> = () => {
  const navigator = useNavigate();
  const params = useParams();
  const [query] = useSearchParams();
  const [{ fetching, data }, changePassword] = useChangePasswordMutation();

  const dispatch = useDispatch();
  const [{ confirmPassword, password }, setForm] = React.useState<{
    confirmPassword: string;
    password: string;
  }>({
    confirmPassword: "",
    password: "",
  });
  const [error, setError] = React.useState<ErrorType>({
    field: "",
    message: "",
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
    await changePassword({
      input: {
        confirmPassword,
        password,
        resetPasswordToken: params.resetPasswordToken || "",
        email: query.get("email") || "",
      },
    });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.changePassword.error) {
      setError(data?.changePassword.error);
      setForm({ password: "", confirmPassword: "" });
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.changePassword.success) {
      setError({ field: "", message: "" });
      setForm({ password: "", confirmPassword: "" });
      (async () => {
        const { data } = await client.mutation(LogoutDocument, {}).toPromise();
        if (data.logout) {
          await del(RELOADED_KEY);
          await del(TOKEN_KEY);
          dispatch(setUser(null));
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [data, dispatch]);

  return (
    <div className="reset__password">
      <div className="reset__password__wrapper">
        <div className="reset__password__card">
          <div className="reset__password__card__content">
            <img alt="logo" src="/adaptive-icon.png" />
            <h1>Reset Password</h1>
            <p>Please enter and confirm the new password of your account.</p>
          </div>
          <Form
            loading={fetching}
            className={"reset__password__form"}
            onSubmit={onSubmit}
          >
            {data?.changePassword.success ? (
              <Message positive>
                <p style={{ color: COLORS.main }}>
                  Your password for your account has been reset. We recommend
                  you to{" "}
                  <Link to={"/auth/login"} replace={true}>
                    login
                  </Link>{" "}
                  with the new password.{" "}
                </p>
              </Message>
            ) : null}
            <Input
              className={"register__form__input"}
              iconPosition="left"
              onChange={onChange}
              type={"password"}
              placeholder="password"
              icon={<Icon name="lock" />}
              value={password}
              name="password"
              fluid
              error={error?.field === "password"}
            />
            <Input
              className={"register__form__input"}
              iconPosition="left"
              onChange={onChange}
              type={"password"}
              placeholder="confirm password"
              icon={<Icon name="lock" />}
              value={confirmPassword}
              name="confirmPassword"
              fluid
              error={error?.field === "confirm-password"}
            />

            {error?.field && (
              <Message negative>
                <p style={{ color: "red" }}>{error ? error.message : ""}</p>
              </Message>
            )}
            <Button color="green" type="submit" fluid>
              RESET PASSWORD
            </Button>
          </Form>
          <p>
            Oh I changed my mind. <span></span>
          </p>
          <Button
            color="green"
            type="button"
            fluid
            onClick={() => navigator("/auth/login")}
          >
            LOGIN
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
