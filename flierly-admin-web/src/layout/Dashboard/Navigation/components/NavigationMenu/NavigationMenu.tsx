import useTheme from "@/features/Theme/hooks/useTheme";
import { Menu } from "antd";
import React from "react";
import filterEnabledItems from "../../utils/filterEnabledItems";
import getMenuItems from "@/layout/Dashboard/Navigation/utils/getMenuItems";

const NavigationMenu: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Menu
      className={"custom-scrollbar-display"}
      items={filterEnabledItems(getMenuItems())}
      mode="inline"
      theme={theme}
      selectable={false}
      style={{
        overflow: "auto",
        background: "inherit",
        textAlign: 'start',
      }}
    />
  );
};

export default NavigationMenu;
