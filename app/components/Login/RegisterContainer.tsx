import Link from "next/link";
import styles from "../../styles/registerContainer.module.css";

const RegisterContainer = () => {
  return (
    <div className={styles.registerContainer}>
      <i className={`pi pi-user-plus ${styles.addUserIcon}`} />
      <div className={styles.goToRegisterContainer}>
        <p>Need an account?</p>
        <p>
          <Link href="/register" passHref className={styles.registerLink}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export { RegisterContainer };
