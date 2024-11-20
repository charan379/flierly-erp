import React from "react";
import AuthLayout from "../../layout/AuthLayout/AuthLayout";
import LoginForm from "../../forms/LoginForm";

const Login: React.FC = () => {
  return (
    <AuthLayout isForSignUp={false} title="sign_in">
      <LoginForm redirectOnLogin />
    </AuthLayout>
  );
};

export default Login;
