import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Icon, Input, Message } from "semantic-ui-react";
import { Footer } from "../../../components";
import { COLORS } from "../../../constants";
import { useRequestForgotPasswordLinkMutation } from "../../../graphql/generated/graphql";
import { ErrorType } from "../../../types";
import "./ForgotPassword.css";
interface Props {}
const ForgotPassword: React.FC<Props> = () => {
  const navigator = useNavigate();
  const [{ fetching, data }, requestForgotPasswordLink] =
    useRequestForgotPasswordLinkMutation();
  const [{ email }, setForm] = React.useState<{
    email: string;
  }>({
    email: "",
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
    requestForgotPasswordLink({ input: { email: email.trim().toLowerCase() } });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.requestForgotPassword.error) {
      setError(data.requestForgotPassword.error);
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!!data?.requestForgotPassword.success) {
      setError({ field: "", message: "" });
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  return (
    <div className="forgot__password">
      <div className="forgot__password__wrapper">
        <div className="forgot__password__card">
          <div className="forgot__password__card__content">
            <img alt="logo" src="/adaptive-icon.png" />
            <h1>Forgot Password</h1>
            <p>
              Please enter the email address of your account. The reset password
              link will be directly sent to this email address.
            </p>
          </div>
          <Form
            loading={fetching}
            className={"forgot__password__form"}
            onSubmit={onSubmit}
          >
            {data?.requestForgotPassword.success ? (
              <Message positive>
                <p style={{ color: COLORS.main }}>
                  The reset password link has been sent to{" "}
                  <strong>{email}</strong>.
                </p>
              </Message>
            ) : null}
            <Input
              fluid
              className={"forgot__password__form__input"}
              iconPosition="left"
              type={"email"}
              onChange={onChange}
              placeholder="email@petmall.com"
              icon={<Icon name="at" />}
              key={"email"}
              value={email}
              name="email"
              error={error?.field === "email"}
            />

            {error?.message && (
              <Message negative>
                <p style={{ color: "red" }}>{error ? error.message : ""}</p>
              </Message>
            )}
            <Button color="green" type="submit" fluid>
              REQUEST LINK
            </Button>
          </Form>
          <p>
            Oh I remember my password. <span></span>
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

export default ForgotPassword;
