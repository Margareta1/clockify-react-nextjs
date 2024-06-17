import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import {
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth } from "@/app/configurations";
import styles from "../../styles/authForm.module.css";
import { AuthType } from "@/app/types/authTypes";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm<AuthType>();
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const onSubmit: SubmitHandler<AuthType> = async (data) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        data.Username,
        data.Password
      );
      if (!newUser) return;
      router.push("/tracker");
    } catch (error) {
      throw new Error;
    }
  };

  return (
    <div className={styles.loginForm}>
      <h2 className={styles.loginTitle}>Register</h2>
      <FormProvider {...useForm()}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
          <div>
            <InputText
            type="email"
              className={styles.inputText}
              placeholder="Email"
              id="Username"
              {...register("Username", { required: true })}
            />
          </div>
          <div>
            <InputText
              id="Password"
              type="password"
              placeholder="Password"
              className={styles.inputText}
              {...register("Password", { required: true })}
            />
          </div>
          <Button type="submit" className={styles.loginButton}>
            <span className={styles.loginButtonText}>Register</span>
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export { RegisterForm };
