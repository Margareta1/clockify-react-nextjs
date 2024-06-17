import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { RegisterForm } from "@/app/components";
import { auth } from "@/app/configurations";
import styles from "../app/styles/authPage.module.css";

const Register = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  return (
    <div className={styles.loginContainer}>
      <RegisterForm />
    </div>
  );
}

export default Register;