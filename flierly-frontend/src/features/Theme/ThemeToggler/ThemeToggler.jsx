import { useTheme } from "@/theme/useTheme";
import { BulbFilled, MoonFilled, SunFilled } from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { Avatar, Button, Tooltip } from "antd";
import React from "react";

const ThemeToggler = () => {
  const { themePreference, setThemePreference } = useTheme();

  const themeIcon = () => {
    if (themePreference === "system") return <Icon component={A} />;
    if (themePreference === "dark") return <MoonFilled />;
    if (themePreference === "light") return <SunFilled />;
    return <BulbFilled />;
  };

  return (
    <Tooltip title="Toggle Theme">
      <Button
        type="default"
        shape="circle"
        size="large"
        style={{
          // marginTop: "5px",
        }}
        icon={themeIcon()}
        onClick={() => {
          switch (themePreference) {
            case "system":
              setThemePreference("light");
              break;
            case "light":
              setThemePreference("dark");
              break;
            case "dark":
              setThemePreference("system");
              break;
            default:
              break;
          }
        }}
      />
    </Tooltip>
  );
};

const A = () => {
  return (
    <Avatar
      style={{
        backgroundColor: "var(--bg-color-primary-flierly)",
        color: "var(--font-color-primary-flierly)",
        fontSize: "20px",
      }}
    >
      A
    </Avatar>
  );
};

export default ThemeToggler;
