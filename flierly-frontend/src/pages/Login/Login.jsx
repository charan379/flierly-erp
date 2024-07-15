import AuthModule from "@/modules/Auth/AuthModule";
import React from "react";
import LoginForm from "@/forms/LoginForm";

const Login = () => {
  return <AuthModule authForm={<LoginForm />} AUTH_TITLE="sign_in" />;
};

export default Login;
