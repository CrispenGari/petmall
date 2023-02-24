import React from "react";
import { useForm } from "react-hook-form";
import styles from "@/styles/Login.module.css";
import { useLoginMutation } from "@/graphql/generated/graphql";
import { Button, Form, Image, Input } from "semantic-ui-react";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/router";
interface Props {}
interface FormType {
  email: string;
  password: string;
}
const Register: React.FC<Props> = ({}) => {
  const { register, handleSubmit } = useForm<FormType>();
  const router = useRouter();
  const [{ data, fetching }, loginHandler] = useLoginMutation();
  const onSubmit = async (data: FormType) => {
    await loginHandler({
      input: {
        ...data,
      },
    });
  };

  return (
    <div className={styles.login}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Image src="/icon.png" alt="logo" width={100} />
        <h1>LOGIN</h1>
        <p>If you have an account go ahead and LOGIN with your credentials.</p>
        <Form.Field
          error={{
            content: "Please enter a valid email address",
            pointing: "below",
          }}
          control={Input}
          type="email"
          placeholder="jonh@petmall.com"
          {...register("email")}
        />

        <Form.Field
          error={{
            content: "Please enter a valid email address",
            pointing: "below",
          }}
          control={Input}
          type="password"
          placeholder="password"
          {...register("password")}
        />

        <Button type="submit" loading={fetching}>
          LOGIN
        </Button>
        <div className={styles.login__divider}>
          <span>You are new to PetMall?</span>
          <span></span>
        </div>
        <Button
          type="button"
          disabled={fetching}
          onClick={() => {
            router.push("/auth/register");
          }}
        >
          REGISTER
        </Button>
      </Form>
      <Footer />
    </div>
  );
};

export default Register;
