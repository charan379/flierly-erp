import React, { useEffect } from "react";
import useLocale from "@/features/Locale/hooks/useLocale";
import { InfoCircleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import Loading from "@/components/Loading";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { LoadingTypes } from "../../@types/loading";

interface LoginFormProps {
  redirectOnLogin?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ redirectOnLogin = false }) => {
  const { translate, langDirection } = useLocale();
  const { loading, login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const callbackParam = new URLSearchParams(window.location.search).get("callback");
  const callback = callbackParam ? JSON.parse(callbackParam || "{}") : null;

  useEffect(() => {
    if (redirectOnLogin && loading === LoadingTypes.SUCCEEDED && isLoggedIn) {
      navigate(callback?.pathname ? { pathname: callback.pathname, search: callback.search } : "/erp");
    }
  }, [isLoggedIn, loading, navigate, redirectOnLogin, callback]);

  return (
    <Loading isLoading={loading === LoadingTypes.PENDING}>
      <Form
        layout="vertical"
        name="login"
        className="auth-form"
        id="login-form"
        initialValues={{ remember: true }}
        onFinish={login}
      >
        <div style={{ direction: langDirection }}>
          <Form.Item
            label={translate("username")}
            name="username"
            rules={[
              { required: true, message: translate("username_is_required") },
              { type: "string" },
            ]}
            tooltip={{
              title: translate("username_is_required"),
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={translate("username")}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={translate("password")}
            name="password"
            rules={[{ required: true, message: translate("password_is_required") }]}
            tooltip={{
              title: translate("password_is_required"),
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder={translate("password")}
              size="large"
            />
          </Form.Item>

          <Flex justify="space-between">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{translate("remember_me")}</Checkbox>
            </Form.Item>
            <a id="login-form-forgot" href="/forgetpassword" style={{marginLeft: langDirection === "rtl" ? "220px" : undefined,}} >
              {translate("forgot_password")}
            </a>
          </Flex>
        </div>

        <Form.Item style={{margin: "5px 0px 5px 0px"}}>
          <Button
            type="primary"
            htmlType="submit"
            className="auth-form-button"
            loading={loading === LoadingTypes.PENDING}
            size="large"
          >
            {translate("sign_in")}
          </Button>
          {translate("or")} <a href="/register">{translate("register_now")}</a>
        </Form.Item>
      </Form>
    </Loading>
  );
};

export default LoginForm;
