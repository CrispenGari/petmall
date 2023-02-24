import React from "react";
import { useForm } from "react-hook-form";
import styles from "@/styles/Register.module.css";
import { useRegisterMutation } from "@/graphql/generated/graphql";
import { Button, Form, Image, Message } from "semantic-ui-react";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "@/actions";
import { TOKEN_KEY } from "@/constants";
import { store } from "@/utils";
interface Props {}
interface ErrorType {
  message: string;
  field: "email" | "password" | "confirm-password" | string;
}

interface FormType {
  email: string;
  password: string;
  confirmPassword: string;
}
const Register: React.FC<Props> = ({}) => {
  const { register, handleSubmit, setValue } = useForm<FormType>();
  const router = useRouter();
  const [error, setError] = React.useState<ErrorType | undefined>();
  const [{ data, fetching }, registerHandler] = useRegisterMutation();
  const dispatch = useDispatch();
  const onSubmit = async (data: FormType) => {
    console.log({ data });
    await registerHandler({
      input: {
        ...data,
      },
    });
  };

  console.log({ data });

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.register) {
      if (data.register.error) {
        setError(data.register.error);
        setValue("password", "");
      } else {
        setValue("email", "");
        setError(undefined);
        setValue("password", "");
        setValue("confirmPassword", "");
        dispatch(setUser(data.register.me || null));
        (async () => {
          await store(TOKEN_KEY, data.register.jwt ?? "");
          router.replace("/");
        })();
      }
    }
    return () => {
      mounted = false;
    };
  }, [data, dispatch, setValue, router]);

  return (
    <div className={styles.register}>
      <Form onSubmit={handleSubmit(onSubmit)} error={!!error}>
        <Image src="/icon.png" alt="logo" width={100} />
        <h1>REGISTER</h1>
        <p>
          If you {"don't"} have an account yet with PETMALL go ahead and create
          a new one.
        </p>

        {!!error && (
          <Message
            error={!!error}
            header="Authentication Error"
            content={error?.message || ""}
          />
        )}

        <Form.Field error={error?.field === "email"}>
          <input
            type="email"
            placeholder="jonh@petmall.com"
            {...register("email")}
          />
        </Form.Field>

        <Form.Field error={error?.field === "password"}>
          <input
            type="password"
            placeholder="password"
            {...register("password")}
          />
        </Form.Field>
        <Form.Field error={error?.field === "confirm-password"}>
          <input
            type="password"
            placeholder="confirm password"
            {...register("confirmPassword")}
          />
        </Form.Field>
        <Button type="submit" loading={fetching}>
          REGISTER
        </Button>
        <div className={styles.register__divider}>
          <span>You already have an Account?</span>
          <span></span>
        </div>

        <Button
          type="button"
          disabled={fetching}
          onClick={() => {
            router.push("/auth/login");
          }}
        >
          LOGIN
        </Button>
      </Form>
      <Footer />
    </div>
  );
};

export default Register;
