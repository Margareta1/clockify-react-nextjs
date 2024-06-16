import { TabMenu, TabMenuTabChangeEvent } from "primereact/tabmenu";
import { useEffect, useState } from "react";
import { MenuItem } from "primereact/menuitem";
import { useRouter } from "next/router";

const items: MenuItem[] = [
  { label: "Trackers", icon: "pi pi-clock" },
  { label: "History", icon: "pi pi-history" },
  { label: "Logout", icon: "pi pi-power-off"},
];

const NavbarTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleChangeIndex = (e: TabMenuTabChangeEvent) => {
    setActiveIndex(e.index);
  }

  return <TabMenu model={items} activeIndex={activeIndex} onTabChange={handleChangeIndex} />;
};

export { NavbarTabs };
