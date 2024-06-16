import styles from "../../styles/authForm.module.css";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { AuthType, LoginType } from "@/app/types/loginTypes";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

interface Props {
  type: AuthType;
}

const AuthForm: React.FC<Props> = ({ type }) => {
  const { register, handleSubmit, reset } = useForm<LoginType>();
  const title = type === AuthType.LOGIN ? "Login" : "Register";

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className={styles.loginForm}>
      <h2 className={styles.loginTitle}>{title}</h2>
      <FormProvider {...useForm()}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
          <div>
            <InputText
              className={styles.inputText}
              placeholder="Username"
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
            <span className={styles.loginButtonText}>{title}</span>
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export { AuthForm };
