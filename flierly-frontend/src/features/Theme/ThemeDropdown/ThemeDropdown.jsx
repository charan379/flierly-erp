import { Badge, Dropdown } from "antd";
import React, { useState } from "react";
import ThemeToggler from "../ThemeToggler";
import ThemeSwitcher from "../ThemeSwitcher";
import ThemeCompactSwitch from "../ThemeCompactSwitch";

const ThemeDropdown = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };

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
      trigger={["contextMenu"]}
      autoAdjustOverflow
      menu={{ items }}
      placement="bottom"
      stye={{ width: "280px" }}
      onOpenChange={handleOpenChange}
      open={open}
    >
      <Badge>
        <ThemeToggler />
      </Badge>
    </Dropdown>
  );
};

export default ThemeDropdown;
