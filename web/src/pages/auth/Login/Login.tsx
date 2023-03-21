import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Input, Icon, Message, Button, Form } from "semantic-ui-react";
import { setUser } from "../../../actions";
import { Footer } from "../../../components";
import { RELOADED_KEY, TOKEN_KEY } from "../../../constants";
import { useLoginMutation } from "../../../graphql/generated/graphql";
import { ErrorType, StateType } from "../../../types";
import { del, store } from "../../../utils";
import "./Login.css";
interface Props {}
const Login: React.FC<Props> = () => {
  const navigator = useNavigate();
  const { user: me } = useSelector((state: StateType) => state);
  const [{ fetching, data }, login] = useLoginMutation();
  const dispatch = useDispatch();
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
    await login({ input: { email, password } });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!me?.emailVerified) {
      navigator("/app/pets", { replace: true });
    }
    return () => {
      mounted = false;
    };
  }, [me, navigator]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.login) {
      if (data.login.error) {
        setForm((state) => ({ ...state, password: "", confirmPassword: "" }));
        setError(data.login.error);
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
    if (mounted && !!data?.login.jwt) {
      (async () => {
        const value = await store(TOKEN_KEY, data.login.jwt as any);
        if (value) {
          await del(RELOADED_KEY);
          dispatch(setUser(data.login.me as any));
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [data, dispatch]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.login.jwt) {
      setError({ field: "", message: "" });
      setForm({ email: "", password: "" });
      navigator("/", { replace: true });
    }
    return () => {
      mounted = false;
    };
  }, [data, navigator]);

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
            loading={fetching}
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
            <div className="login__forgot__password__link">
              <Link to={"/auth/change-password"}>Forgot Password?</Link>
            </div>

            {error?.message && (
              <Message negative>
                <p style={{ color: "red" }}>{error ? error.message : ""}</p>
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
