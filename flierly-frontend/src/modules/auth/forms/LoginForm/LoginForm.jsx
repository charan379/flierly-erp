import React from "react";
import useLocale from "@/features/Language/hooks/useLocale";
import {
  InfoCircleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Loading from "@/components/Loading";
import { useAuth } from "../../hooks/useAuth";
import { loadingTypes } from "@/types/loading";

/**
 * LoginForm component to display a login form with email and password fields.
 *
 * @returns {JSX.Element} The rendered LoginForm component.
 */
const LoginForm = () => {
  const { translate, langDirection } = useLocale(); // Using the custom hook to get translation function and language direction
  const { loading, login } = useAuth();

  return (
    <Loading isLoading={loading === loadingTypes.PENDING}>
      {/* form */}
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
        {/* form fields */}
        <div style={{ direction: langDirection }}>
          {" "}
          {/* Setting text direction based on language */}
          {/* Username */}
          <Form.Item
            label={translate("username")} // Translated label for username filed
            name="username" // Name of the form field
            rules={[
              // Validation rules
              { required: true, message: translate("username_is_required") },
              { type: "string" },
            ]}
            tooltip={{
              title: translate("username_is_required"), // Tooltip text
              icon: <InfoCircleOutlined />, // Tooltip icon
            }}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />} // Prefix icon for the input field
              placeholder={translate("username")}
              size="large" // Size of the input field
            />
          </Form.Item>
          {/* password */}
          <Form.Item
            label={translate("password")} // Translated label for password field
            name="password" // Name of the form field
            rules={[
              // Validation rules
              { required: true, message: translate("password_is_required") },
            ]}
            tooltip={{
              title: translate("password_is_required"), // Tooltip text
              icon: <InfoCircleOutlined />, // Tooltip icon
            }}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />} // Prefix icon for the password field
              placeholder={translate("password")} // Translated placeholder text
              size="large" // Size of the input field
            />
          </Form.Item>
          {/* remember me with password reset link */}
          <Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              noStyle
              required /* Remember me checkbox */
            >
              <Checkbox>{translate("remember_me")}</Checkbox>
            </Form.Item>
            {/*  */}
            <a
              className="float-right-line-normal-pt-2" // CSS class for the forgot password link
              id="login-form-forgot"
              href="/forgetpassword" // Link to forgot password page
              style={{ marginLeft: langDirection === "rtl" ? "220px" : "0px" }} // Conditional margin based on language direction
            >
              {translate("forgot_password")} {/* Translated link text */}
            </a>
            {/*  */}
          </Form.Item>
        </div>
        {/* form submission */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="auth-form-button"
            loading={loading === loadingTypes.PENDING}
            size="large"
          >
            {translate("sign_in")}
          </Button>
          {translate("or")}{" "}
          <a href="/register"> {translate("register_now")} </a>
        </Form.Item>
      </Form>
    </Loading>
  );
};

export default LoginForm;
