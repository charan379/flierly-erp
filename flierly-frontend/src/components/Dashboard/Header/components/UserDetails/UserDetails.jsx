import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";

export default function UserDetails() {
  const navigate = useNavigate();
  const user = { name: "john", email: "john@example.com" };
  return (
    <div className="user-details" onClick={() => navigate("/profile")}>
      <Avatar
        size="large"
        shape="circle"
        className="last"
        src={user?.photo ? user.photo : undefined}
        style={{
          color: "#f56a00",
          boxShadow: "rgba(150, 190, 238, 0.35) 0px 0px 6px 1px",
          backgroundColor: user?.photo ? "none" : "#fde3cf",
          fontSize: "18px"
        }}
      >
        {user?.name?.charAt(0)?.toUpperCase()}
      </Avatar>
      <div className="user-info">
        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </div>
    </div>
  );
}
