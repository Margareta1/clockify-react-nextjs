import { AuthForm } from "@/app/components/Login/AuthForm";
import styles from "../styles/loginPage.module.css";
import { AuthType } from "@/app/types/loginTypes";

export default function Register() {
  return (
    <div className={styles.loginContainer}>
      <AuthForm type={AuthType.REGISTER} />
    </div>
  );
}
