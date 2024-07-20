import { useTheme } from "@/theme/useTheme";
import { BulbFilled, MoonFilled, SunFilled } from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { Button, Tooltip } from "antd";
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
          marginTop: "5px",
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
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="28" fontFamily="Verdana" fontSize="25" fill="black">
        A
      </text>
    </svg>
  );
};

export default ThemeToggler;
