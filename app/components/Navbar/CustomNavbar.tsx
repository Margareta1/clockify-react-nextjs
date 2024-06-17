import { MegaMenu } from "primereact/megamenu";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarTabs } from "./NavbarTabs";
import { auth } from "@/app/configurations";

const CustomNavbar = () => {
  const [user] = useAuthState(auth);

  return (
    <MegaMenu
      orientation="horizontal"
      breakpoint="100vw"
      start={<NavbarLogo />}
      end={user ? <NavbarTabs /> : null}
    />
  );
};

export { CustomNavbar };
