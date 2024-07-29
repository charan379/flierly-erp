import useLocale from "@/locale/useLocale";
import { useTheme } from "@/theme/useTheme";
import { CompressOutlined } from "@ant-design/icons";
import { Flex, Space, Switch, Typography } from "antd";
import React from "react";

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
          {"Compact Theme"}
        </Typography.Title>
        <CompressOutlined rotate="16" style={{ fontSize: "16px" }} />
      </Space>
      <Switch value={isCompactTheme} defaultValue={false} onClick={onClick} />
    </Flex>
  );
};

export default ThemeCompactSwitch;
