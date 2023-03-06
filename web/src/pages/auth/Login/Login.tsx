import React from "react";
import { useNavigate } from "react-router-dom";
import { Input, Icon, Message, Button, Form } from "semantic-ui-react";
import { Footer } from "../../../components";
import { ErrorType } from "../../../types";
import "./Login.css";
interface Props {}
const Login: React.FC<Props> = ({}) => {
  const navigator = useNavigate();
  const [{ email, password }, setForm] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "",
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
    console.log({ email, password });
  };
  return (
    <div className="login">
      <div className="login__wrapper">
        <div className="login__card">
          <div className="login__card__content">
            <img alt="logo" src="/adaptive-icon.png" />
            <h1>Login</h1>
            <p>
              If you have an account you can <strong>LOGIN</strong>.
            </p>
          </div>
          <Form
            // loading={loading}
            className={"login__form"}
            onSubmit={onSubmit}
          >
            <Input
              fluid
              className={"login__form__input"}
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

            <Input
              className={"login__form__input"}
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
            {error?.message && (
              <Message negative>
                <p>{error ? error.message : ""}</p>
              </Message>
            )}
            <Button color="green" type="submit" fluid>
              LOGIN
            </Button>
          </Form>
          <p>
            New to PetMall. <span></span>
          </p>
          <Button
            color="green"
            type="button"
            fluid
            onClick={() => navigator("/auth/register")}
          >
            REGISTER
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
