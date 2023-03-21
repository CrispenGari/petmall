import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Icon, Message, Button, Form } from "semantic-ui-react";
import { setUser } from "../../../actions";
import { Footer } from "../../../components";
import { COLORS, RELOADED_KEY, TOKEN_KEY } from "../../../constants";
import {
  useResendVerificationCodeMutation,
  useVerifyEmailMutation,
} from "../../../graphql/generated/graphql";
import { ErrorType, StateType } from "../../../types";
import { del, store } from "../../../utils";
import "./VerifyEmail.css";
interface Props {}
const VerifyEmail: React.FC<Props> = () => {
  const navigator = useNavigate();
  const { user: me } = useSelector((state: StateType) => state);
  const [{ fetching, data }, verifyEmail] = useVerifyEmailMutation();
  const [{ fetching: resending, data: result }, resendVerificationCode] =
    useResendVerificationCodeMutation();
  const dispatch = useDispatch();
  const [{ code }, setForm] = React.useState<{
    code: string;
  }>({
    code: "",
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
    await verifyEmail({ input: { code, email: me?.email ? me.email : "" } });
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
    if (mounted && !!data?.verifyEmail) {
      if (data.verifyEmail.error) {
        setForm({ code: "" });
        setError(data.verifyEmail.error);
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
    if (mounted && !!data?.verifyEmail.jwt) {
      (async () => {
        const value = await store(TOKEN_KEY, data.verifyEmail.jwt as any);
        if (value) {
          await del(RELOADED_KEY);
          dispatch(setUser(data.verifyEmail.me as any));
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [data, dispatch]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.verifyEmail.jwt) {
      setError({ field: "", message: "" });
      setForm({ code: "" });
      navigator("/", { replace: true });
    }
    return () => {
      mounted = false;
    };
  }, [data, navigator]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!result?.resendVerificationCode) {
      if (result.resendVerificationCode.error) {
        setForm((state) => ({ code: "" }));
        setError(result.resendVerificationCode.error);
      } else {
        setError({ field: "", message: "" });
      }
    }
    return () => {
      mounted = false;
    };
  }, [result]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!result?.resendVerificationCode.jwt) {
      (async () => {
        const value = await store(
          TOKEN_KEY,
          result.resendVerificationCode.jwt as any
        );
        if (value) {
          dispatch(setUser(result.resendVerificationCode.me as any));
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [result, dispatch]);

  return (
    <div className="verify__email">
      <div className="verify__email__wrapper">
        <div className="verify__email__card">
          <div className="verify__email__card__content">
            <img alt="logo" src="/adaptive-icon.png" />
            <h1>Verify Email</h1>
            <p>
              Please verify your email using the code that has been sent to your
              email address.
            </p>
          </div>
          <Form
            loading={fetching || resending}
            className={"verify__email__form"}
            onSubmit={onSubmit}
          >
            {result?.resendVerificationCode.me && (
              <Message positive>
                <p style={{ color: COLORS.main }}>
                  the verification code has been resent to{" "}
                  {result.resendVerificationCode.me.email}.
                </p>
              </Message>
            )}
            <Input
              fluid
              className={"verify__email__form__input"}
              iconPosition="left"
              type={"text"}
              onChange={onChange}
              placeholder="0 0 0 - 0 0 0"
              icon={<Icon name="clone" />}
              key={"code"}
              value={code}
              name="code"
              error={!!error.field}
            />
            <div className="verify__email__resend__code">
              <div
                onClick={async () => {
                  await resendVerificationCode({});
                }}
              >
                Did not receive the code?
              </div>
            </div>
            {error?.message && (
              <Message negative>
                <p style={{ color: "red" }}>{error ? error.message : ""}</p>
              </Message>
            )}
            <Button color="green" type="submit" fluid>
              VERIFY EMAIL
            </Button>
          </Form>
          <p>
            Or you already have an Account <span></span>
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

export default VerifyEmail;
