import { Avatar } from "antd";

export default function UserAvatar() {
  const user = { name: "john", email: "john@example.com" };
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
      }}
    >
      {user?.name?.charAt(0)?.toUpperCase()}
    </Avatar>
  );
}
