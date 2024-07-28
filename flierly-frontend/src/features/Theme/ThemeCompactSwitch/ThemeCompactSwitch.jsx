import useLocale from "@/locale/useLocale";
import { useTheme } from "@/theme/useTheme";
import { CompressOutlined } from "@ant-design/icons";
import { Flex, Space, Switch } from "antd";
import React from "react";

const ThemeCompactSwitch = () => {
  const { translate } = useLocale();
  const { toggleCompactTheme, isCompactTheme } = useTheme();

  return (
    <Flex component="div" justify="space-between" vertical={false}>
      <Space direction="horizontal" size="small" style={{ display: "flex" }}>
        <span>{translate("compact_theme")}</span>
        <CompressOutlined rotate="0" style={{ fontSize: "18px" }} />
      </Space>
      <Switch
        value={isCompactTheme}
        defaultValue={false}
        onChange={toggleCompactTheme}
      />
    </Flex>
  );
};

export default ThemeCompactSwitch;
