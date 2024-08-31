import AuthModule from "@/modules/auth/AuthModule";
import React from "react";
import LoginForm from "@/modules/auth/forms/LoginForm";

const Login = () => {
  return (
    <AuthModule authForm={<LoginForm redirectOnLogin />} AUTH_TITLE="sign_in" />
  );
};

export default Login;
