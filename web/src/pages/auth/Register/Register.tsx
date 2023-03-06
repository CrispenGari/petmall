import React from "react";
import { useNavigate } from "react-router-dom";
import { Input, Icon, Message, Button, Form } from "semantic-ui-react";
import { Footer } from "../../../components";
import { ErrorType } from "../../../types";
import "./Register.css";
interface Props {}
const Register: React.FC<Props> = ({}) => {
  const navigator = useNavigate();
  const [{ email, password, confirmPassword }, setForm] = React.useState<{
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    email: "",
    password: "",
    confirmPassword: "",
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
    console.log({ email, password, confirmPassword });
  };
  return (
    <div className="register">
      <div className="register__wrapper">
        <div className="register__card">
          <div className="register__card__content">
            <img alt="logo" src="/adaptive-icon.png" />
            <h1>REGISTER</h1>
            <p>
              If you are new to PetMall click <strong>REGISTER</strong> button
              with valid credentials.
            </p>
          </div>
          <Form
            // loading={loading}
            className={"register__form"}
            onSubmit={onSubmit}
          >
            <Input
              fluid
              className={"register__form__input"}
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
              error={error?.field === "confirmPassword"}
            />
            {error?.message && (
              <Message negative>
                <p>{error ? error.message : ""}</p>
              </Message>
            )}
            <Button color="green" type="submit" fluid>
              REGISTER
            </Button>
          </Form>
          <p>
            Already have an account? <span></span>
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

export default Register;
