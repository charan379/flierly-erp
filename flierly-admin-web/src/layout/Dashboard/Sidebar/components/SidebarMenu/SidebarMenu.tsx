import useTheme from "@/features/Theme/hooks/useTheme";
import { Menu } from "antd";
import React from "react";
import filterEnabledItems from "../../../Navigation/utils/filterEnabledItems";
import getMenuItems from "@/layout/Dashboard/Navigation/utils/getMenuItems";

const SidebarMenu: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Menu
      className={"custom-scrollbar-display"}
      items={filterEnabledItems(getMenuItems())}
      mode="inline"
      theme={theme}
      defaultSelectedKeys={["dashboard"]}
      selectable={false}
      style={{
        overflow: "auto",
        borderRadius: "10px",
        height: "78dvh",
        paddingBottom: "30px",
        paddingTop: "10px",
        background: "red",
        textAlign: 'start',
      }}
    />
  );
};

export default SidebarMenu;
