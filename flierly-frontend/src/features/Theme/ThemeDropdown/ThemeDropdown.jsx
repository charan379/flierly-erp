import { Badge, Dropdown } from "antd";
import React from "react";
import ThemeToggler from "../ThemeToggler";
import ThemeSwitcher from "../ThemeSwitcher";

const ThemeDropdown = () => {
  const items = [
    {
      label: <ThemeSwitcher />,
      key: "theme-switcher",
    },
    {
      type: "divider",
    },
  ];

  return (
    <Dropdown
      arrow
      trigger={["contextMenu"]}
      autoAdjustOverflow
      menu={{ items }}
      placement="bottomLeft"
      stye={{ width: "280px" }}
    >
      <Badge>
        <ThemeToggler />
      </Badge>
    </Dropdown>
  );
};

export default ThemeDropdown;
