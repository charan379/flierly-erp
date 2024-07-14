import Loading from "@/components/Loading";
import LoginForm from "@/forms/LoginForm";
import AuthModule from "@/modules/Auth/AuthModule";
import useLocale from "@/redux/locale/useLocale";
import { Button, Form } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return <AuthModule authForm={<FormContainer />} AUTH_TITLE="sign_in" />;
};

const FormContainer = () => {
  const { translate, langDirection } = useLocale();

  return (
    <Loading isLoading={false}>
      <Form
        layout="vertical"
        name="login_form"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={() => console.log("onFinish completed")}
      >
        <LoginForm />
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={false}
            size="large"
          >
            {translate("sign_in")}
          </Button>
          {translate('or')} <a href="/register"> {translate('register_now')} </a>
        </Form.Item>
      </Form>
    </Loading>
  );
};

export default Login;
