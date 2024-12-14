import React from "react";
import { Avatar, AvatarProps } from "antd";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { UserOutlined } from "@ant-design/icons";

interface UserAvatarProps {
  size?: AvatarProps["size"];
  shape?: AvatarProps["shape"];
}
/**
 * UserAvatar component to display the user's avatar or initials.
 *
 */
const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  const { user } = useAuth();

  return (
    <Avatar
      size={props?.size ?? "default"}
      shape={props?.shape ?? "circle"}
      src={user?.email || undefined}
      style={{
        color: "#f56a00",
        backgroundColor: "#fde3cf",
        cursor: "pointer",
        fontSize: "22px",
      }}
      icon={<UserOutlined />}
    >
      {user?.username?.[0]?.toUpperCase()}
    </Avatar>
  );
};

export default UserAvatar;
