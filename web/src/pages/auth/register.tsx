import React from "react";
import { useForm } from "react-hook-form";
import styles from "@/styles/Register.module.css";
import { useRegisterMutation } from "@/graphql/generated/graphql";
interface Props {}
interface FormType {
  email: string;
  password: string;
  confirmPassword: string;
}
const Register: React.FC<Props> = ({}) => {
  const { register, handleSubmit } = useForm<FormType>();

  const [{ data, fetching }, registerHandler] = useRegisterMutation();
  const onSubmit = async (data: FormType) => {
    await registerHandler({
      input: {
        ...data,
        isWeb: true,
      },
    });
  };

  console.log(JSON.stringify({ data: data?.register, fetching }, null, 2));

  return (
    <div className={styles.register}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <input
            type="text"
            placeholder="jonh@petmall.com"
            {...register("email")}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="password"
            {...register("password")}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="confirm password"
            {...register("confirmPassword")}
          />
        </p>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
