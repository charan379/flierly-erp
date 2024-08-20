import { Badge, Dropdown } from "antd";
import UserAvatar from "../UserAvatar/UserAvatar";
import useLocale from "@/locale/useLocale";
import { Link } from "react-router-dom";
import { LogoutOutlined, ToolOutlined, UserOutlined } from "@ant-design/icons";
import UserDetails from "../UserDetails/UserDetails";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export default function DropdownMenu() {
  const { translate } = useLocale();

  const { logout } = useAuth();

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
      label: <Link to={"/profile"}>{translate("profile_settings")}</Link>,
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
      trigger={["click", "contextMenu"]}
      placement="bottomLeft"
      stye={{ width: "280px" }}
    >
      <Badge>
        <UserAvatar />
      </Badge>
    </Dropdown>
  );
}
