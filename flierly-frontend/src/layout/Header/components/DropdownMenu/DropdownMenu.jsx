import { Badge, Dropdown } from "antd";
import UserAvatar from "../UserAvatar/UserAvatar";
import useLocale from "@/locale/useLocale";
import { Link } from "react-router-dom";
import { LogoutOutlined, ToolOutlined, UserOutlined } from "@ant-design/icons";
import UserDetails from "../UserDetails/UserDetails";

export default function DropdownMenu() {
  const { translate } = useLocale();

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
      label: <Link to={"/logout"}>{translate("logout")}</Link>,
    },
  ];

  return (
    <Dropdown
      arrow
      autoAdjustOverflow
      menu={{ items }}
      trigger={["click"]}
      placement="bottomRight"
      stye={{ width: "280px", float: "right" }}
    >
      <Badge>
        <UserAvatar />
      </Badge>
    </Dropdown>
  );
}
