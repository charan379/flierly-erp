import React from "react";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../UserAvatar";

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="user-details" onClick={() => navigate("/profile")}>
      <UserAvatar size="large" shape="circle" />
      <div className="user-info">
        <p>{user?.username}</p>
        <p>{user?.email}</p>
      </div>
    </div>
  );
};

export default UserDetails;
