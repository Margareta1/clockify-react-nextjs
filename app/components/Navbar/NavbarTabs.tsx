import { TabMenu, TabMenuTabChangeEvent } from "primereact/tabmenu";
import { useEffect, useState } from "react";
import { MenuItem } from "primereact/menuitem";
import { useRouter } from "next/router";

const items: MenuItem[] = [
  { label: "Trackers", icon: "pi pi-spin pi-spinner" },
  { label: "History", icon: "pi-history" },
  { label: "Logout" },
];

const NavbarTabs = () => {
  // const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {}, [router.pathname]);
  // const changeActiveIndex = (e: TabMenuTabChangeEvent) => {
  //   setActiveIndex(e.index);
  // };

  return <TabMenu model={items} />;
};

export { NavbarTabs };
