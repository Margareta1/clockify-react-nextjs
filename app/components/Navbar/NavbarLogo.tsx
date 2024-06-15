import Image from "next/image";
import devotLogo from "../../assets/DevotLogo.svg";
import styles from '../../styles/navbarLogo.module.css'

const NavbarLogo = () => {
  return (
    <div className={styles.navbarStartContainer}>
      <Image height={30} src={devotLogo} alt="logo" width={20} />
      <p className={styles.navbarStartLogoSpan}>devōt</p>
      <p className={styles.navbarStartTitleSpan}>Tracking tool</p>
    </div>
  );
};

export { NavbarLogo };
