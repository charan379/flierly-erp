import { Badge, Dropdown } from "antd";
import React from "react";
import ThemeToggler from "../ThemeToggler";
import ThemeSwitcher from "../ThemeSwitcher";
import ThemeCompactSwitch from "../ThemeCompactSwitch";

const ThemeDropdown = () => {
  const items = [
    {
      label: <ThemeSwitcher />,
      key: "theme-switcher",
    },
    {
      type: "divider",
    },
    {
      label: <ThemeCompactSwitch />,
      key: "theme-compact-switch",
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
