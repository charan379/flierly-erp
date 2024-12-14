import React, { useState } from "react";
import { Badge, Dropdown, DropDownProps, MenuProps } from "antd";
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

const ProfileDropdown: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange: DropDownProps["onOpenChange"] = (open: boolean, info: { source: "trigger" | "menu"; }) => {
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
      label: translate("refresh_auth"),
      onClick: () => refresh(),
    },
    {
      icon: <LogoutOutlined />,
      key: "logout",
      label: translate("logout"),
      onClick: () => logout(),
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
      destroyPopupOnHide={true}
    >
      <Badge>
        <UserAvatar />
      </Badge>
    </Dropdown>
  );
};

export default ProfileDropdown;
