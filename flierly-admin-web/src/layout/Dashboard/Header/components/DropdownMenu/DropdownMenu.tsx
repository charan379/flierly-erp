import React, { useState } from "react";
import { Badge, Button, Dropdown, DropDownProps, MenuProps } from "antd";
import UserAvatar from "../UserAvatar";
import useLocale from "@/features/Locale/hooks/useLocale";
import { Link } from "react-router-dom";
import {
  LogoutOutlined,
  ReloadOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import UserDetails from "../UserDetails/UserDetails";
import { useAuth } from "@/modules/auth/hooks/useAuth";

const DropdownMenu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange: DropDownProps["onOpenChange"] = (open: boolean, info: {source: "trigger" | "menu";}) => {
    if (open && info.source === "trigger") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };


  const { translate } = useLocale();
  const { logout, loading, refresh } = useAuth();

  const items: MenuProps["items"] = [
    {
      label: <UserDetails />,
      key: "user-details",
    },
    {
      type: "divider",
    },
    {
      icon: <UserOutlined />,
      key: "profile-settings",
      label: translate("profile_settings"),
    },
    {
      icon: <ToolOutlined />,
      key: "app-settings",
      label: <Link to="/settings">{translate("app_settings")}</Link>,
    },
    {
      type: "divider",
    },
    {
      icon: <ReloadOutlined spin={loading === "refreshing"} />,
      key: "refresh-authentication",
      label: (
        <Button onClick={() => refresh()}>{translate("refresh_auth")}</Button>
      ),
    },
    {
      icon: <LogoutOutlined />,
      key: "logout",
      label: <Button onClick={() => logout()}>{translate("logout")}</Button>,
    },
  ];

  return (
    <Dropdown
      arrow
      autoAdjustOverflow
      menu={{ items }}
      trigger={["click"]}
      onOpenChange={handleOpenChange}
      open={open}
      placement="bottomLeft"
      overlayStyle={{ width: "max-content" }}
    >
      <Badge>
        <UserAvatar />
      </Badge>
    </Dropdown>
  );
};

export default DropdownMenu;
