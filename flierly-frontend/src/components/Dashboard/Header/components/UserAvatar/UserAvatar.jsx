import { useAuth } from "@/modules/auth/hooks/useAuth";
import { Avatar } from "antd";

export default function UserAvatar() {
  const { user } = useAuth();
  return (
    <Avatar
      size="large"
      className="header-icon last"
      shape="circle"
      src={user?.photo ? user.photo : undefined}
      style={{
        color: "#f56a00",
        boxShadow: "rgba(150, 190, 238, 0.35) 0px 0px 10px 2px",
        backgroundColor: user?.photo ? "none" : "#fde3cf",
        float: "right",
        cursor: "pointer",
        fontSize: "18px",
      }}
    >
      {user?.username?.charAt(0)?.toUpperCase()}
    </Avatar>
  );
}
