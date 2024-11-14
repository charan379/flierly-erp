import useLocale from "@/features/Language/hooks/useLocale";
import { CompressOutlined } from "@ant-design/icons";
import { Flex, Space, Switch, Typography } from "antd";
import React from "react";
import useTheme from "../../hooks/useTheme";

const ThemeCompactSwitch = () => {
  const { translate } = useLocale();
  const { toggleCompactTheme, isCompactTheme } = useTheme();
  const onClick = (event) => {
    event.stopPropagation();
    toggleCompactTheme();
  };
  return (
    <Flex
      component="div"
      justify="space-between"
      align="center"
      vertical={false}
      onClick={onClick}
    >
      <Space direction="horizontal" size="large" style={{ display: "flex" }}>
        <Typography.Title level={5} style={{ marginTop: "0.2em" }}>
          {translate("compact_theme")}
        </Typography.Title>
        <CompressOutlined rotate="16" style={{ fontSize: "16px" }} />
      </Space>
      <Switch value={isCompactTheme} defaultValue={false} onClick={onClick} />
    </Flex>
  );
};

export default ThemeCompactSwitch;
