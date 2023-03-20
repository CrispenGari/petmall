import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Icon, Message, Button, Form } from "semantic-ui-react";
import { setUser } from "../../../actions";
import { Footer } from "../../../components";
import { TOKEN_KEY } from "../../../constants";
import { useRegisterMutation } from "../../../graphql/generated/graphql";
import { ErrorType } from "../../../types";
import { store } from "../../../utils";
import "./Register.css";
interface Props {}
const Register: React.FC<Props> = () => {
  const navigator = useNavigate();
  const [{ fetching, data }, register] = useRegisterMutation();
  const dispatch = useDispatch();
  const [{ email, password, confirmPassword, firstName, lastName }, setForm] =
    React.useState<{
      email: string;
      password: string;
      confirmPassword: string;
      firstName: string;
      lastName: string;
    }>({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
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
    await register({
      input: { confirmPassword, email, password, firstName, lastName },
    });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.register) {
      if (data.register.error) {
        setForm((state) => ({ ...state, password: "", confirmPassword: "" }));
        setError(data.register.error);
      } else {
        setError({ field: "", message: "" });
      }
    }
    return () => {
      mounted = false;
    };
  }, [data]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.register.jwt) {
      (async () => {
        const value = await store(TOKEN_KEY, data.register.jwt as any);
        if (value) {
          dispatch(setUser(data.register.me as any));
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [data, dispatch]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.register.jwt) {
      setError({ field: "", message: "" });
      setForm({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
      });
      navigator("/auth/verify-email", { replace: true });
    }
    return () => {
      mounted = false;
    };
  }, [data, navigator]);

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
            loading={fetching}
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
              fluid
              className={"register__form__input"}
              iconPosition="left"
              type={"text"}
              onChange={onChange}
              placeholder="first name(s)"
              icon={<Icon name="user" />}
              key={"firstName"}
              value={firstName}
              name="firstName"
              error={error?.field === "firstName"}
            />
            <Input
              fluid
              className={"register__form__input"}
              iconPosition="left"
              type={"text"}
              onChange={onChange}
              placeholder="last name"
              icon={<Icon name="user" />}
              key={"lastName"}
              value={lastName}
              name="lastName"
              error={error?.field === "lastName"}
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
                <p style={{ color: "red" }}>{error ? error.message : ""}</p>
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
