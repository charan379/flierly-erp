import React, { useEffect } from "react";
import useLocale from "@/features/Locale/hooks/useLocale";
import {
  InfoCircleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Loading from "@/components/Loading";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { LoadingTypes } from "../../@types/loading";

interface LoginFormProps {
  redirectOnLogin?: boolean; // Optional prop for redirecting after login
}

/**
 * LoginForm component to display a login form with email and password fields.
 */
const LoginForm: React.FC<LoginFormProps> = ({ redirectOnLogin = false }) => {
  const { translate, langDirection } = useLocale();
  const { loading, login, isLoggedIn } = useAuth();

  const navigate = useNavigate();

  let callback: { pathname?: string; search?: string } | null = null;
  const callbackParam = new URLSearchParams(window.location.search).get(
    "callback"
  );
  if (callbackParam) {
    try {
      callback = JSON.parse(callbackParam);
    } catch {
      console.error("Failed to parse callback parameter");
    }
  }

  useEffect(() => {
    if (redirectOnLogin && loading === LoadingTypes.SUCCEEDED && isLoggedIn) {
      if (callback?.pathname) {
        navigate({ pathname: callback.pathname, search: callback.search });
      } else {
        navigate("/erp");
      }
    }
  }, [isLoggedIn, loading, navigate, redirectOnLogin, callback]);

  return (
    <Loading isLoading={loading === LoadingTypes.PENDING}>
      <Form
        layout="vertical"
        name="login"
        className="auth-form"
        id="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={(values) => login(values)}
      >
        <div style={{ direction: langDirection }}>
          {/* Username */}
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

          {/* Password */}
          <Form.Item
            label={translate("password")}
            name="password"
            rules={[
              { required: true, message: translate("password_is_required") },
            ]}
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

          {/* Remember Me */}
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{translate("remember_me")}</Checkbox>
            </Form.Item>
            <a
              className="float-right-line-normal-pt-2"
              id="login-form-forgot"
              href="/forgetpassword"
              style={{
                marginLeft: langDirection === "rtl" ? "220px" : "0px",
              }}
            >
              {translate("forgot_password")}
            </a>
          </Form.Item>
        </div>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="auth-form-button"
            loading={loading === LoadingTypes.PENDING}
            size="large"
          >
            {translate("sign_in")}
          </Button>
          {translate("or")}{" "}
          <a href="/register">{translate("register_now")}</a>
        </Form.Item>
      </Form>
    </Loading>
  );
};

export default LoginForm;
