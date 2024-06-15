import { MegaMenu } from "primereact/megamenu";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarTabs } from "./NavbarTabs";

const CustomNavbar = () => {
  return (
    <MegaMenu
      orientation="horizontal"
      breakpoint="100vw"
      start={<NavbarLogo />}
      end={<NavbarTabs />}
    />
  );
};

export { CustomNavbar };
