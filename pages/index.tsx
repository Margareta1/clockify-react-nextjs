import { AuthForm } from "@/app/components/Login/AuthForm";
import styles from "../styles/loginPage.module.css";
import { RegisterContainer } from "@/app/components/Login/RegisterContainer";
import { AuthType } from "@/app/types/loginTypes";

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <AuthForm type={AuthType.LOGIN} />
      <RegisterContainer />
    </div>
  );
}
