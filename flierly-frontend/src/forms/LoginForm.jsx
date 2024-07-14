import useLocale from "@/redux/locale/useLocale";
import {
  InfoCircleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Checkbox, Form, Input } from "antd";
import React from "react";

/**
 * LoginForm component to display a login form with email and password fields.
 * 
 * @returns {JSX.Element} The rendered LoginForm component.
 */
const LoginForm = () => {
  const { translate, langDirection } = useLocale(); // Using the custom hook to get translation function and language direction

  return (
    <div style={{ direction: langDirection }}> {/* Setting text direction based on language */}
      <Form.Item
        label={translate("email")} // Translated label for email field
        name="email" // Name of the form field
        rules={[{ required: true }, { type: "email" }]} // Validation rules
        tooltip={{
          title: translate("email_is_required"), // Tooltip text
          icon: <InfoCircleOutlined />, // Tooltip icon
        }}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />} // Prefix icon for the input field
          placeholder={translate("email")} // Translated placeholder text
          type="email" // Input type
          size="large" // Size of the input field
        />
      </Form.Item>

      <Form.Item
        label={translate("password")} // Translated label for password field
        name="password" // Name of the form field
        rules={[{ required: true }]} // Validation rules
        tooltip={{
          title: translate('password_is_required'), // Tooltip text
          icon: <InfoCircleOutlined />, // Tooltip icon
        }}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />} // Prefix icon for the password field
          placeholder={translate("password")} // Translated placeholder text
          size="large" // Size of the input field
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle  /* Remember me checkbox */> 
          <Checkbox>{translate("remember_me")}</Checkbox> 
        </Form.Item>
        {/*  */}
        <a
          className="login-form-forgot" // CSS class for the forgot password link
          href="/forgetpassword" // Link to forgot password page
          style={{ marginLeft: langDirection === "rtl" ? "220px" : "0px" }} // Conditional margin based on language direction
        >
          {translate("forgot_password")} {/* Translated link text */}
        </a>
        {/*  */}
      </Form.Item>
    </div>
  );
};

export default LoginForm; // Exporting the component as default
