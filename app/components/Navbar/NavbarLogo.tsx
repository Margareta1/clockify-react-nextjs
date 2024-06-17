import Image from "next/image";
import DevotLogo from '../../assets/DevotLogo.svg'
import styles from '../../styles/navbarLogo.module.css'

const NavbarLogo = () => {
  return (
    <div className={styles.navbarStartContainer}>
      <Image height={30} src={DevotLogo} alt="logo" width={60} />
      <p className={styles.navbarStartLogoSpan}>devōt</p>
      <p className={styles.navbarStartTitleSpan}>Tracking tool</p>
    </div>
  );
};

export { NavbarLogo };
