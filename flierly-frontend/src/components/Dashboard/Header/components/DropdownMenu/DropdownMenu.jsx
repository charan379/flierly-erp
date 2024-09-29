import { Badge, Dropdown } from "antd";
import UserAvatar from "../UserAvatar/UserAvatar";
import useLocale from "@/features/Language/hooks/useLocale";
import { Link } from "react-router-dom";
import {
  LogoutOutlined,
  ReloadOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import UserDetails from "../UserDetails/UserDetails";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useState } from "react";

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const { translate } = useLocale();

  const { logout, loading, refresh } = useAuth();

  const items = [
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
      label: <Link to={"/settings"}>{translate("app_settings")}</Link>,
    },
    {
      type: "divider",
    },
    {
      icon: <ReloadOutlined spin={loading === "refreshing"} />,
      key: "refresh-authentication",
      label: <Link onClick={() => refresh()}>{translate("refresh_auth")}</Link>,
    },
    {
      icon: <LogoutOutlined />,
      key: "logout",
      label: <Link onClick={() => logout()}>{translate("logout")}</Link>,
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
      stye={{ width: "max-content" }}
    >
      <Badge>
        <UserAvatar />
      </Badge>
    </Dropdown>
  );
}
