import React from "react";
import { Avatar } from "antd";
import { useAuth } from "@/modules/auth/hooks/useAuth";

/**
 * UserAvatar component to display the user's avatar or initials.
 *
 */
const UserAvatar: React.FC = () => {
  const { user } = useAuth();

  return (
    <Avatar
      size="large"
      shape="circle"
      src={user?.email || undefined}
      style={{
        color: "#f56a00",
        boxShadow: "rgba(150, 190, 238, 0.35) 0px 0px 10px 2px",
        backgroundColor: "#fde3cf",
        float: "right",
        cursor: "pointer",
        fontSize: "18px",
      }}
    >
      {user?.username?.[0]?.toUpperCase()}
    </Avatar>
  );
};

export default UserAvatar;
