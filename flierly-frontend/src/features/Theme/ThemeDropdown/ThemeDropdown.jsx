import { Badge, Button, Dropdown } from "antd";
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
      trigger={["click"]}
      autoAdjustOverflow
      menu={{ items }}
      placement="bottom"
      stye={{ width: "max-content" }}
      onOpenChange={handleOpenChange}
      open={open}
      arrow={true}
      destroyPopupOnHide={true}
    >
      <Button shape="circle" size="large">
        {/* <ThemeToggler /> */}
      </Button>
    </Dropdown>
  );
};

export default ThemeDropdown;
