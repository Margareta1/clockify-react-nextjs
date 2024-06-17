import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RegisterContainer, LoginForm } from "@/app/components";
import { auth } from "@/app/configurations";
import styles from "../app/styles/authPage.module.css";

const Login = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/tracker");
    }
  }, [user]);

  return (
    <div className={styles.loginContainer}>
      <LoginForm />
      <RegisterContainer />
    </div>
  );
}

export default Login;
