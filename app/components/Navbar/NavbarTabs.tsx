import { TabMenu, TabMenuTabChangeEvent } from "primereact/tabmenu";
import { MenuItem } from "primereact/menuitem";
import { useSignOut } from "react-firebase-hooks/auth";
import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/app/configurations";

const NavbarTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [signOut] = useSignOut(auth);
  const router = useRouter();

  const handleChangeIndex = (e: TabMenuTabChangeEvent) => {
    setActiveIndex(e.index);
  };

  const items: MenuItem[] = [
    {
      label: "Trackers",
      icon: "pi pi-clock",
      command: () => {
        router.push("/tracker");
      },
    },
    {
      label: "History",
      icon: "pi pi-history",
      command: () => {
        router.push("/history");
      },
    },
    {
      label: "Logout",
      icon: "pi pi-power-off",
      command: async () => {
        const success = await signOut();
        if (success) {
          router.push("/");
        }
      },
    },
  ];

  return (
    <TabMenu
      model={items}
      activeIndex={activeIndex}
      onTabChange={handleChangeIndex}
    />
  );
};

export { NavbarTabs };
