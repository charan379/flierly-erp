import useLocale from "@/locale/useLocale";
import { useTheme } from "@/theme/useTheme";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import { Avatar, Form, Segmented } from "antd";
import React from "react";

const ThemeSwitcher = () => {
  const { themePreference, setThemePreference } = useTheme();
  const { translate } = useLocale();

  const onValuesChange = ({ themePreference }) => {
    setThemePreference(themePreference);
  };

  const options = [
    {
      label: (
        <div style={{ padding: 4 }}>
          <Avatar
            icon={<SunFilled />}
            style={{
              backgroundColor: "var(--bg-color-primary-flierly)",
              color: "var(--font-color-primary-flierly)",
              fontSize: "20px",
              opacity: themePreference === "light" ? 1 : 0.5,
            }}
          />
          <div>{translate("light-theme")}</div>
        </div>
      ),
      value: "light",
    },
    {
      label: (
        <div style={{ padding: 4 }}>
          <Avatar
            icon={<MoonFilled />}
            style={{
              backgroundColor: "var(--bg-color-primary-flierly)",
              color: "var(--font-color-primary-flierly)",
              fontSize: "20px",
              opacity: themePreference === "dark" ? 1 : 0.5,
            }}
          />
          <div>{translate("dark-theme")}</div>
        </div>
      ),
      value: "dark",
    },
    {
      label: (
        <div style={{ padding: 4 }}>
          <Avatar
            style={{
              backgroundColor: "var(--bg-color-primary-flierly)",
              color: "var(--font-color-primary-flierly)",
              fontSize: "20px",
              opacity: themePreference === "system" ? 1 : 0.5,
            }}
          >
            A
          </Avatar>
          <div>{translate("system-theme")}</div>
        </div>
      ),
      value: "system",
    },
  ];

  return (
    <Form
      layout="vertical"
      name="theme-switcher"
      initialValues={{
        themePreference: themePreference,
      }}
      onValuesChange={onValuesChange}
      style={{}}
    >
      {/* Theme Preference */}
      <Form.Item name="themePreference">
        <Segmented options={options} />
      </Form.Item>
    </Form>
  );
};

export default ThemeSwitcher;
